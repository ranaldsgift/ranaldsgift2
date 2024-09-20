import { CareerCache } from "$lib/cache/CareerCache";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	let data = null;
	try {
		data = await CareerCache.getAll();
		data = data.sort((a, b) => {
			if (a.hero.id - b.hero.id === 0) {
				return a.id - b.id;
			}
			return a.hero.id - b.hero.id;
		});
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
