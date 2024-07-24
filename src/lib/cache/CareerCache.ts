import { Career, type ICareer } from "$lib/entities/career/Career";
import redis from "$lib/server/redis";
import StaticDataCache from "./StaticDataCache";

export class CareerCache {
	private static instance: StaticDataCache<ICareer> | null = null;

	private static async getInstance(): Promise<StaticDataCache<ICareer>> {
		if (!CareerCache.instance) {
			CareerCache.instance = new StaticDataCache<ICareer>();

			let careers = await redis.get<ICareer[]>("careers");

			if (!careers) {
				const careersData = await Career.find({
					relations: {
						passive: true,
						skill: true,
						perks: true,
						talents: true,
						hero: true,
						primaryWeapons: { properties: true, traits: true, tooltips: true },
						secondaryWeapons: { properties: true, traits: true, tooltips: true },
					},
					relationLoadStrategy: "query",
					order: {
						talents: {
							id: "ASC",
						},
					},
				});
				careers = careersData.map((career) => career.toObject());
			}
			for (const career of careers) {
				CareerCache.instance.set(career.id, career);
			}
			await redis.set("careers", careers);
		}

		return CareerCache.instance;
	}

	public static async getAll(): Promise<ICareer[]> {
		const instance = await CareerCache.getInstance();
		return instance.getAll();
	}

	public static async getSorted(): Promise<ICareer[]> {
		const instance = await CareerCache.getInstance();
		return instance.getAll().sort((a, b) => {
			if (a.hero.id - b.hero.id === 0) {
				return a.id - b.id;
			}
			return a.hero.id - b.hero.id;
		});
	}

	public static async get(id: number): Promise<ICareer> {
		const instance = await CareerCache.getInstance();
		return instance.get(id);
	}
}
