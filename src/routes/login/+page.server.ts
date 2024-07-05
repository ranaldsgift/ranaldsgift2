import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = async (event) => {
	if (event.locals.sessionUser) {
		redirect(301, `/user/${event.locals.sessionUser?.id}`);
	}
};
