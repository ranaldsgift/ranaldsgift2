import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, depends, cookies }) => {
	const { session } = await locals.safeGetSession();

	return {
		session,
		sessionUserProfile: locals.sessionUserProfile ? locals.sessionUserProfile.toObject() : null,
		cookies: cookies.getAll(),
	};
}) satisfies LayoutServerLoad;
