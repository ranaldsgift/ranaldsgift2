import { HeroCache } from "$lib/cache/RedisCache";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
	const heroes = await HeroCache.getAll();

	if (!heroes) {
		return new Response(null, { status: 404 });
	}

	return new Response(
		JSON.stringify({
			items: heroes,
			count: heroes.length,
		})
	);
};
