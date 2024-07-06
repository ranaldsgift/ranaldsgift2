import { Weapon } from "$lib/entities/Weapon";
import StaticDataCache from "./StaticDataCache";

export class WeaponCache {
	private static instance: StaticDataCache<Weapon> | null = null;

	public static async getInstance(): Promise<StaticDataCache<Weapon>> {
		if (!WeaponCache.instance) {
			WeaponCache.instance = new StaticDataCache<Weapon>();
			const weapons = await Weapon.find({
				relations: {
					properties: true,
					traits: true,
					tooltips: true,
					propertyCategory: true,
					traitCategory: true,
				},
				relationLoadStrategy: "query",
				order: {
					id: "ASC",
				},
			});
			for (const weapon of weapons) {
				WeaponCache.instance.set(weapon.id, weapon);
			}
		}

		return WeaponCache.instance;
	}

	public static async getAll(): Promise<Weapon[]> {
		const instance = await WeaponCache.getInstance();
		return instance.getAll();
	}

	public static async get(id: number): Promise<Weapon> {
		const instance = await WeaponCache.getInstance();
		return instance.get(id);
	}
}
