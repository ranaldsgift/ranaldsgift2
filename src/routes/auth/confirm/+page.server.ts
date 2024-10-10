import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";

export const load = async ({ url, locals: { supabase } }) => {
	const token = url.searchParams.get("token_hash");
	const type = url.searchParams.get("type");

	if (!token || !type) {
		return { error: "No token or type received" };
	}

	const { error } = await supabase.auth.verifyOtp({
		token_hash: token,
		type: type as EmailOtpType,
	});

	if (error) {
		return { error: error.message };
	}

	redirect(302, "/");
};
