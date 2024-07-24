import { Trait, type ITrait } from "$lib/entities/Trait";
import redis from "$lib/server/redis";
import StaticDataCache from "./StaticDataCache";

export class TraitsCache {
	private static instance: StaticDataCache<ITrait> | null = null;

	public static async getInstance(): Promise<StaticDataCache<ITrait>> {
		if (!TraitsCache.instance) {
			TraitsCache.instance = new StaticDataCache<ITrait>();

			let traits = await redis.get<ITrait[]>("traits");

			if (!traits) {
				const traitsData = await Trait.find({ relations: { category: true } });
				traits = traitsData.map((trait) => trait.toObject());
			}
			for (const trait of traits) {
				TraitsCache.instance.set(trait.id, trait);
			}
		}
		return TraitsCache.instance;
	}

	public static async getAllForCategory(category: TraitCategoryEnum): Promise<ITrait[]> {
		const instance = await TraitsCache.getInstance();
		return instance.getAll().filter((trait) => trait.category?.name === category);
	}

	public static async getAll(): Promise<ITrait[]> {
		const instance = await TraitsCache.getInstance();
		return instance.getAll();
	}

	public static async get(id: number): Promise<ITrait> {
		const instance = await TraitsCache.getInstance();
		return instance.get(id);
	}
}
