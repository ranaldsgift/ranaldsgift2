import { TraitsCache } from "$lib/cache/TraitsCache";
import { DataHelper } from "$lib/helpers/DataHelper";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	let data = null;
	let dataCount = null;
	try {
		data = await TraitsCache.getAll();
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	const response = DataHelper.serialize({
		items: data.map((item) => item.toObject()),
		count: dataCount,
	});

	return new Response(response);
};
