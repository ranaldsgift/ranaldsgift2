import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, depends, cookies }) => {
	const { session } = await locals.safeGetSession();

	return {
		session,
		sessionUserProfile: locals.sessionUserProfile,
		cookies: cookies.getAll(),
	};
}) satisfies LayoutServerLoad;
