import { Difficulty, type IDifficulty } from "$lib/entities/Difficulty";
import redis from "$lib/server/redis";
import StaticDataCache from "./StaticDataCache";

export class DifficultyCache {
	private static instance: StaticDataCache<IDifficulty> | null = null;
	private static redisKey: string = "difficulties";

	private static async getInstance(): Promise<StaticDataCache<IDifficulty>> {
		if (!DifficultyCache.instance) {
			DifficultyCache.instance = new StaticDataCache<IDifficulty>();

			let difficulties = await redis.get<IDifficulty[]>(DifficultyCache.redisKey);

			if (!difficulties) {
				const difficultyData = await Difficulty.find();
				difficulties = difficultyData.map((difficulty) => difficulty.toObject());
			}
			for (const difficulty of difficulties) {
				DifficultyCache.instance.set(difficulty.id, difficulty);
			}
			await redis.set(DifficultyCache.redisKey, difficulties);
		}

		return DifficultyCache.instance;
	}

	public static async getAll(): Promise<IDifficulty[]> {
		const instance = await DifficultyCache.getInstance();
		return instance.getAll();
	}

	public static async get(id: number): Promise<IDifficulty> {
		const instance = await DifficultyCache.getInstance();
		return instance.get(id);
	}
}
