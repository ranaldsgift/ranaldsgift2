import { error, json, redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals }) => {
    const {error: err} = await locals.supabase.auth.signOut()

    if (err) {
        throw error(500, "Internal Server Error");
    }

    // return success
    return json({error: null}, {status: 201});
};