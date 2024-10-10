import { CareerCache } from "$lib/cache/CareerCache";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
	const careerId = url.searchParams.get("id");

	if (!careerId) {
		return new Response(null, { status: 404 });
	}

	const id = parseInt(careerId);
	const career = await CareerCache.get(id);

	if (!career) {
		return new Response(null, { status: 404 });
	}

	return new Response(JSON.stringify(career));
};
