import { CareerCache } from "$lib/cache/CareerCache";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	let data = null;
	let dataCount = null;
	try {
		data = await CareerCache.getSorted();
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	const response = JSON.stringify({
		items: data,
		count: dataCount,
	});

	return new Response(response);
};
