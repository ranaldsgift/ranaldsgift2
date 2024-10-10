import "dotenv/config";

import { Redis } from "@upstash/redis";
import { PRIVATE_UPSTASH_REDIS_REST_URL, PRIVATE_UPSTASH_REDIS_REST_TOKEN } from "$env/static/private";

export const databaseName = process.env.NODE_ENV === "development" ? "redis-with-svelte-kit-dev" : "redis-with-svelte-kit";

const redis = new Redis({
	url: PRIVATE_UPSTASH_REDIS_REST_URL,
	token: PRIVATE_UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
