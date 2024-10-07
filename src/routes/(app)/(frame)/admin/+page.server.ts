import { error } from "@sveltejs/kit";

export const load = async ({ locals }) => {
	if (!locals.sessionUser || !locals.sessionUserProfile) {
		throw error(401, "You must login to access this page.");
	}

	if (locals.sessionUserProfile.role !== "Admin" && locals.sessionUserProfile.role !== "Moderator") {
		throw error(403, "You must be an admin or moderator to access this page.");
	}
};
