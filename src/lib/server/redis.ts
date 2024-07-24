import "dotenv/config";

import { Redis } from "@upstash/redis";

export const databaseName = process.env.NODE_ENV === "development" ? "redis-with-svelte-kit-dev" : "redis-with-svelte-kit";

const redis = new Redis({
	url: process.env.PRIVATE_UPSTASH_REDIS_REST_URL,
	token: process.env.PRIVATE_UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
