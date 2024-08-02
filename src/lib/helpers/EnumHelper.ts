export class EnumHelper {
	public static getKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
		return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
	}

	public static getValues<O extends object, K extends keyof O = keyof O>(obj: O): O[K][] {
		return Object.values(obj).filter((v) => typeof v === "string") as O[K][];
	}
}
