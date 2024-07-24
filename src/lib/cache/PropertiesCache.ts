import { Property, type IProperty } from "$lib/entities/Property";
import redis from "$lib/server/redis";
import StaticDataCache from "./StaticDataCache";

export class PropertiesCache {
	private static instance: StaticDataCache<IProperty> | null = null;

	public static async getInstance(): Promise<StaticDataCache<IProperty>> {
		if (!PropertiesCache.instance) {
			PropertiesCache.instance = new StaticDataCache<IProperty>();

			let properties = await redis.get<IProperty[]>("properties");

			if (!properties) {
				const propertyData = await Property.find({
					relations: {
						category: true,
					},
				});
				properties = propertyData.map((property) => property.toObject());
			}

			for (const property of properties) {
				PropertiesCache.instance.set(property.id, property);
			}
		}
		return PropertiesCache.instance;
	}

	public static async getAllForCategory(category: PropertyCategoryEnum): Promise<IProperty[]> {
		const instance = await PropertiesCache.getInstance();
		return instance.getAll().filter((property) => property.category?.name === category);
	}

	public static async getAll(): Promise<IProperty[]> {
		return (await PropertiesCache.getInstance()).getAll();
	}

	public static async get(id: number): Promise<IProperty> {
		return (await PropertiesCache.getInstance()).get(id);
	}
}
