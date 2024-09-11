import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, depends, cookies }) => {
	return {
		session: locals.session,
		sessionUserProfile: locals.sessionUserProfile,
		cookies: cookies.getAll(),
	};
}) satisfies LayoutServerLoad;
