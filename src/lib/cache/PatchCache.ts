import { Patch, type IPatch } from "$lib/entities/Patch";
import redis from "$lib/server/redis";
import StaticDataCache from "./StaticDataCache";

export class PatchCache {
	private static cache: StaticDataCache<IPatch> | null = null;
	private static redisKey: string = "patches";

	private static async getInstance(): Promise<StaticDataCache<IPatch>> {
		if (!PatchCache.cache) {
			PatchCache.cache = new StaticDataCache<IPatch>();
		}
		return PatchCache.cache;
	}

	public static async getAll(): Promise<IPatch[]> {
		const cache = await PatchCache.getInstance();

		if (cache.count() === 0) {
			let redisData = await redis.get<IPatch[]>(PatchCache.redisKey);

			if (!redisData) {
				redisData = await PatchCache.reloadAll();
			}

			return redisData;
		}

		return cache.getAll();
	}

	public static async reloadAll(): Promise<IPatch[]> {
		const cache = await PatchCache.getInstance();
		cache.clear();

		const data = await Patch.find();
		const redisData = data.map((item) => item.toObject());

		for (const redisItem of redisData) {
			cache.set(redisItem.id, redisItem);
		}
		await redis.set(PatchCache.redisKey, redisData);

		return cache.getAll();
	}

	public static async get(id: number): Promise<IPatch | null> {
		const redisKey = `${PatchCache.redisKey}-${id}`;
		const cache = await PatchCache.getInstance();
		let cachedData = cache.get(id);

		if (!cachedData) {
			let redisData = await redis.get<IPatch>(redisKey);

			if (!redisData) {
				const data = await Patch.findOne({ where: { id } });

				if (!data) {
					return null;
				}

				redisData = data.toObject();
			}

			cache.set(redisData.id, redisData);
			await redis.set(redisKey, cache.getAll());
			cachedData = redisData;
		}

		return cachedData;
	}
}
