import type { LayoutServerLoad } from "./$types";
import { Event } from "$lib/entities/Event";
import { MoreThan } from "typeorm";

export const load = (async ({ locals, depends, cookies }) => {
	return {
		session: locals.session,
		sessionUserProfile: locals.sessionUserProfile,
		cookies: cookies.getAll(),
	};
}) satisfies LayoutServerLoad;
