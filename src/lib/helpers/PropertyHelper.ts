import type { IProperty } from "$lib/entities/Property";

class PropertyHelper {
	static getModifier(property: IProperty) {
		if (property.name === "Stamina") {
			return "";
		}

		if (property.name === "Push/Block Angle") {
			return "°";
		}

		return "%";
	}
}

export default PropertyHelper;
