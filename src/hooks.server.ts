import "reflect-metadata";
import { createServerClient } from "@supabase/ssr";
import { type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import TypeOrm from "$lib/server/db";
import { env } from "$env/dynamic/private";
import { User } from "$lib/entities/User";
import type { Session } from "@supabase/supabase-js";

// This key must be set in the environment variables in order to import data from Firebase into Supabase
let PRIVATE_SUPABASE_SERVICE_ROLE_KEY = env.PRIVATE_SUPABASE_SERVICE_ROLE_KEY;

const supabase: Handle = async ({ event, resolve }) => {
	if (PRIVATE_SUPABASE_SERVICE_ROLE_KEY) {
		event.locals.supabaseServiceClient = createServerClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE_KEY, {
			cookies: {
				getAll: () => event.cookies.getAll(),
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						event.cookies.set(name, value, { ...options, path: "/" });
					});
				},
			},
		});
	}

	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: "/" });
				});
			},
		},
	});

	const getSessionAndUser = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return {
				session: null,
				user: null,
			};
		}

		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			// JWT validation has failed
			return {
				session: null,
				user: null,
			};
		}

		const newSession: Omit<Session, "user"> & { user?: Session["user"] } = session;
		delete newSession.user;
		return { session: Object.assign({}, newSession, { user }), user };
	};

	const { session, user } = await getSessionAndUser();

	event.locals.session = session;
	event.locals.sessionUser = user;

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

export const ormHook: Handle = async ({ event, resolve }) => {
	// Initialize connection to database
	await TypeOrm.getDb(event.locals.supabaseServiceClient);

	return resolve(event);
};

export const userHook: Handle = async ({ event, resolve }) => {
	if (event.locals.sessionUser?.id) {
		const userProfile = await User.createQueryBuilder("user")
			.where({ id: event.locals.sessionUser?.id })
			.select([
				"user.id",
				"user.name",
				"user.role",
				"user.showVideo",
				"user.isSupporter",
				"user.isDeveloper",
				"authoredBuild.id",
				"ratedBuild.id",
				"favoriteBuild.id",
			])
			.leftJoin("user.authoredBuilds", "authoredBuild")
			.leftJoin("user.ratedBuilds", "ratedBuild")
			.leftJoin("user.favoriteBuilds", "favoriteBuild")
			.getOne();

		if (userProfile) {
			event.locals.sessionUserProfile = userProfile.toObject({ exposeUnsetFields: false });
		}
	} else {
		event.locals.sessionUserProfile = null;
	}
	return resolve(event);
};

export const handle: Handle = sequence(supabase, ormHook, userHook);
