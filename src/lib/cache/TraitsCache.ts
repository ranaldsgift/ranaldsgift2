import { Trait } from "$lib/entities/Trait";
import { TraitCategory } from "$lib/entities/TraitCategory";
import StaticDataCache from "./StaticDataCache";

export class TraitsCache {
	private static instance: StaticDataCache<Trait> | null = null;

	public static async getInstance(): Promise<StaticDataCache<Trait>> {
		if (!TraitsCache.instance) {
			TraitsCache.instance = new StaticDataCache<Trait>();
			const traits = await Trait.find({ relations: { category: true } });
			for (const trait of traits) {
				TraitsCache.instance.set(trait.id, trait);
			}
		}
		return TraitsCache.instance;
	}

	public static async getAllForCategory(category: TraitCategory): Promise<Trait[]> {
		const instance = await TraitsCache.getInstance();
		return instance.getAll().filter((trait) => trait.category.id === category.id);
	}

	public static async getAll(): Promise<Trait[]> {
		const instance = await TraitsCache.getInstance();
		return instance.getAll();
	}

	public static async get(id: number): Promise<Trait> {
		const instance = await TraitsCache.getInstance();
		return instance.get(id);
	}
}
