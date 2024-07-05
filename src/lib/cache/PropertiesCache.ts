import { Property } from "$lib/entities/Property";
import StaticDataCache from "./StaticDataCache";

export class PropertiesCache {
	private static instance: StaticDataCache<Property> | null = null;

	public static async getInstance(): Promise<StaticDataCache<Property>> {
		if (!PropertiesCache.instance) {
			PropertiesCache.instance = new StaticDataCache<Property>();
			const properties = await Property.find({
				relations: {
					category: true,
				},
			});
			for (const property of properties) {
				PropertiesCache.instance.set(property.id, property);
			}
		}
		return PropertiesCache.instance;
	}

	public static async getAll(): Promise<Property[]> {
		return (await PropertiesCache.getInstance()).getAll();
	}

	public static async get(id: number): Promise<Property> {
		return (await PropertiesCache.getInstance()).get(id);
	}
}
