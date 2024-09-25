import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { DifficultyModifierCache } from "$lib/cache/RedisCache";

export const GET: RequestHandler = async () => {
	let data = null;
	try {
		data = await DifficultyModifierCache.getAll();
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	const response = JSON.stringify({
		items: data,
		count: data.length,
	});

	return new Response(response);
};
