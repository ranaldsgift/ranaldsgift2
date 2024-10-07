import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
	if (!locals.sessionUserProfile) {
		error(401, "Unauthorized");
	}

	if (locals.sessionUserProfile.id !== params.id) {
		// Only allow admins or moderators to edit other users
		if (locals.sessionUserProfile.role !== "Admin" && locals.sessionUserProfile.role !== "Moderator") {
			error(401, "Unauthorized");
		}
	}
};
