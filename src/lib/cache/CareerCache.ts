import { Career, type ICareer } from "$lib/entities/career/Career";
import StaticDataCache from "./StaticDataCache";

export class CareerCache {
	private static instance: StaticDataCache<Career> | null = null;

	public static async getInstance(): Promise<StaticDataCache<Career>> {
		if (!CareerCache.instance) {
			CareerCache.instance = new StaticDataCache<Career>();
			const careers = await Career.find({
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
			for (const career of careers) {
				CareerCache.instance.set(career.id, career);
			}
		}

		return CareerCache.instance;
	}

	public static async getAll(): Promise<Career[]> {
		const instance = await CareerCache.getInstance();
		return instance.getAll();
	}

	public static async getSorted(): Promise<ICareer[]> {
		const instance = await CareerCache.getInstance();
		return instance
			.getAll()
			.sort((a, b) => {
				if (a.hero.id - b.hero.id === 0) {
					return a.id - b.id;
				}
				return a.hero.id - b.hero.id;
			})
			.map((career) => {
				return career.toObject();
			});
	}

	public static async get(id: number): Promise<Career> {
		const instance = await CareerCache.getInstance();
		return instance.get(id);
	}
}
