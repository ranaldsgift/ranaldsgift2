import "reflect-metadata";
import { createServerClient } from "@supabase/ssr";
import { type Handle, redirect, error } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import TypeOrm from "$lib/server/db";
import { env } from "$env/dynamic/private";
import { User } from "$lib/entities/User";
import { LogHelper } from "$lib/helpers/LogHelper";

// This key must be set in the environment variables in order to import data from Firebase into Supabase
let PRIVATE_SUPABASE_SERVICE_ROLE_KEY = env.PRIVATE_SUPABASE_SERVICE_ROLE_KEY;

const supabase: Handle = async ({ event, resolve }) => {
	if (PRIVATE_SUPABASE_SERVICE_ROLE_KEY) {
		event.locals.supabaseServiceClient = createServerClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE_KEY, {
			cookies: {
				get: (key) => event.cookies.get(key),
				set: (key, value, options) => {
					event.cookies.set(key, value, {
						...options,
						path: "/",
					});
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: "/" });
				},
			},
		});
	}
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: "/" });
				});
			},
		},
	});

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			// JWT validation has failed
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === "content-range" || name === "x-supabase-api-version";
		},
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.sessionUser = user;

	return resolve(event);
};

export const mainHook: Handle = async ({ event, resolve }) => {
	LogHelper.debug("Running Main Hook...");

	// Initialize connection to database
	await TypeOrm.getDb(event.locals.supabaseServiceClient);

	if (event.locals.sessionUser?.id) {
		const userProfile = await User.findOne({ where: { id: event.locals.sessionUser?.id } });
		if (userProfile) {
			event.locals.sessionUserProfile = userProfile.toObject();
		}
	} else {
		event.locals.sessionUserProfile = null;
	}

	const response = await resolve(event);
	return response;
};

export const handle: Handle = sequence(supabase, authGuard, mainHook);
