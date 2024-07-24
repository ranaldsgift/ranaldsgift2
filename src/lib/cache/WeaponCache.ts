import { Weapon, type IWeapon } from "$lib/entities/Weapon";
import redis from "$lib/server/redis";
import StaticDataCache from "./StaticDataCache";

export class WeaponCache {
	private static instance: StaticDataCache<IWeapon> | null = null;

	public static async getInstance(): Promise<StaticDataCache<IWeapon>> {
		if (!WeaponCache.instance) {
			WeaponCache.instance = new StaticDataCache<IWeapon>();

			let weapons = await redis.get<IWeapon[]>("weapons");

			if (!weapons) {
				const weaponsData = await Weapon.find({
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
				weapons = weaponsData.map((weapon) => weapon.toObject());
			}
			for (const weapon of weapons) {
				WeaponCache.instance.set(weapon.id, weapon);
			}
		}
		return WeaponCache.instance;
	}

	public static async getAll(): Promise<IWeapon[]> {
		const instance = await WeaponCache.getInstance();
		return instance.getAll();
	}

	public static async get(id: number): Promise<IWeapon> {
		const instance = await WeaponCache.getInstance();
		return instance.get(id);
	}
}
