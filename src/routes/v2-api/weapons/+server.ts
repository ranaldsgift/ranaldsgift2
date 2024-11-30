import { WeaponsCache } from "$lib/cache/RedisCache";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	let data = null;
	const id = url.searchParams.get("id");

	try {
		if (id) {
			const weapon = await WeaponsCache.get(Number(id));
			data = weapon ? [weapon] : [];
		} else {
			data = await WeaponsCache.getAll();
		}
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
