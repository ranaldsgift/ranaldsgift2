import { CareerCache } from "$lib/cache/RedisCache";
import CareerHelper from "$lib/helpers/CareerHelper";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	let data = null;
	let id = url.searchParams.get("id");
	let dataCount = 0;

	try {
		if (id) {
			const career = await CareerCache.get(parseInt(id));
			data = [career];
			dataCount = 1;
		} else {
			data = await CareerCache.getAll();
			data = CareerHelper.getSorted(data);
			dataCount = data.length;
		}
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
