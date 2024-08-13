import type { Actions } from "./$types";
import { fail, error, redirect } from "@sveltejs/kit";
import { FormHelper } from "$lib/helpers/FormHelper";
import { User } from "$lib/entities/User";
import type { QueryFailedError } from "typeorm";
import type { AuthError } from "@supabase/supabase-js";
import { LogHelper } from "$lib/helpers/LogHelper";

export const actions: Actions = {
	login: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();

		if (!email) {
			return fail(400, { email, missing: true });
		}

		if (!locals.supabase) {
			error(500, "Internal Server Error");
		}

		try {
			const { error } = await locals.supabase.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: url.origin ?? undefined,
				},
			});
			if (error) throw error;
		} catch (err) {
			console.error(err);
			let authError = err as AuthError;
			error(500, `Internal Server Error - ${authError.message}`);
		}

		const { user } = await locals.safeGetSession();
		return { id: user?.id };
	},

	logout: async ({ request, url, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user || !locals.supabase) {
			redirect(301, "/");
		}

		try {
			const { error } = await locals.supabase.auth.signOut();
			if (error) throw error;
			return { error: null };
		} catch (err) {
			console.error(err);
			error(500, "Internal Server Error");
		}
	},

	save: async ({ request, locals }) => {
		const sessionUser = locals.sessionUser;
		if (!locals.sessionUser || !locals.sessionUserProfile || locals.sessionUser.id !== locals.sessionUserProfile.id) {
			error(401, "Unauthorized");
		}

		const formData = await request.formData();
		const user = FormHelper.deserializeFormData<User>(User, formData);

		if (!user) {
			error(401, "User not found");
		}

		if (user.id !== locals.sessionUser.id) {
			// Allow Admins and Moderators to edit other users
			if (locals.sessionUserProfile.role !== "Admin" && locals.sessionUserProfile.role !== "Moderator") {
				error(401, "Unauthorized");
			}
		}

		try {
			await user.save();
		} catch (err) {
			let qfe = err as QueryFailedError;
			error(500, qfe.driverError.name + " - " + qfe.driverError.cause + " - " + qfe.driverError.message);
		}

		return { id: user?.id };
	},
};
