import { CareerCache } from "$lib/cache/CareerCache";
import { WeaponCache } from "$lib/cache/WeaponCache";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({}) => {
	let data = null;
	try {
		data = await WeaponCache.getAll();
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
