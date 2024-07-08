import { StaticData } from "$lib/data/StaticData.js";
import { WeaponData } from "$lib/data/WeaponData.js";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import type { INecklaceBuild } from "$lib/entities/builds/NecklaceBuild.js";
import type { IWeaponBuild } from "$lib/entities/builds/WeaponBuild.js";
import type { ICareer } from "$lib/entities/career/Career.js";
import type { IProperty } from "$lib/entities/Property.js";
import type { ITrait } from "$lib/entities/Trait.js";
import { LegacyDataHelper, type LegacyPropertyCategory, type LegacyTraitCategory } from "$lib/helpers/LegacyDataHelper.js";
import { error } from "@sveltejs/kit";

interface ViewModel {
	pageTitle: string;
	careers: ICareer[];
	selectedCareer: ICareer;
	build: ICareerBuild;
}

export const load = async (event) => {
	let careerBuild: ICareerBuild;

	if (event.params.primary.includes(",")) {
		careerBuild = loadCareerFromOldURL(
			event.params.careerId,
			event.params.talents,
			event.params.primary,
			event.params.secondary,
			event.params.necklace,
			event.params.charm,
			event.params.trinket
		);
	} else if (event.params.primary.includes("-")) {
		careerBuild = loadCareerFromNewURL(
			event.params.careerId,
			event.params.talents,
			event.params.primary,
			event.params.secondary,
			event.params.necklace,
			event.params.charm,
			event.params.trinket,
			"-"
		);
	} else {
		error(404, "Invalid URL parameters");
	}

	// TODO - Redirect to /heroes URL with route params

	let viewModel: ViewModel = {
		pageTitle: "Heroes",
		careers: StaticData.careers,
		selectedCareer: StaticData.careers[0],
		build: careerBuild,
	};

	return { viewModel };
};

function getTrait(category: LegacyTraitCategory, id: number, traits: ITrait[]) {
	let traitName = LegacyDataHelper.getTraitName(category, id);
	let trait = traits.find((trait) => {
		return trait.name === traitName;
	});

	if (!trait) {
		error(404, `Trait with name ${traitName} not found`);
	}
	return trait;
}

function getProperty(category: LegacyPropertyCategory, id: number, properties: IProperty[]) {
	let propertyName = LegacyDataHelper.getPropertyName(category, id);
	let property = properties.find((property) => {
		return property.name === propertyName;
	});

	if (!property) {
		error(404, `Property with name ${propertyName} not found`);
	}
	return property;
}

function getWeapon(id: number, type: "melee" | "range") {
	let weaponCodename = LegacyDataHelper.getOldWeaponCodename(id, type);
	let weapon = WeaponData.find((weapon) => {
		return weapon.codename === weaponCodename;
	});

	if (!weapon) {
		error(404, `Weapon with id ${id} not found`);
	}

	return weapon;
}

function loadCareerFromOldURL(
	careerId: string,
	talentsParam: string,
	meleeParam: string,
	rangeParam: string,
	necklaceParam: string,
	charmParam: string,
	trinketParam: string
): ICareerBuild {
	let careerBuild: ICareerBuild;
	let talents: number[];
	let primaryWeapon: IWeaponBuild;
	let secondaryWeapon: IWeaponBuild;
	let necklace: INecklaceBuild;
	let charm: INecklaceBuild;
	let trinket: INecklaceBuild;

	let career = StaticData.careers.find((career) => {
		return career.id === parseInt(careerId);
	});
	if (!career) {
		error(404, `Career with id ${careerId} not found`);
	}

	if (typeof talentsParam != "undefined") {
		if (talentsParam.length !== 6) {
			error(404, `Invalid talents parameters: ${talentsParam}`);
		}
	}

	talents =
		talentsParam.length > 6
			? talentsParam
					.substring(0, 6)
					.split("")
					.map((x) => {
						return parseInt(x);
					})
			: talentsParam.split("").map((x) => {
					return parseInt(x);
			  });

	if (talents.filter((talent) => talent < 0 || talent > 3).length > 0) {
		error(404, `Invalid talent values: ${talents}`);
	}

	if (typeof meleeParam === "undefined" || meleeParam.split(",").length !== 4) {
		error(404, `Invalid melee weapon parameters: ${meleeParam}`);
	}

	let meleeParams = meleeParam.split(",");
	let weapon = getWeapon(parseInt(meleeParams[0]), "melee");
	let property1 = getProperty(weapon?.propertyCategory?.name as LegacyPropertyCategory, parseInt(meleeParams[1]), weapon.properties);
	let property2 = getProperty(weapon?.propertyCategory?.name as LegacyPropertyCategory, parseInt(meleeParams[2]), weapon.properties);
	let trait = getTrait(weapon?.traitCategory?.name as LegacyTraitCategory, parseInt(meleeParams[3]), weapon.traits);

	let primaryWeaponBuild: IWeaponBuild = {
		weapon,
		property1,
		property2,
		trait,
	};
	primaryWeapon = primaryWeaponBuild;

	if (typeof rangeParam === "undefined" || rangeParam.split(",").length !== 4) {
		error(404, `Invalid range weapon parameters: ${rangeParam}`);
	}
	let rangeParams = rangeParam.split(",");
	weapon = getWeapon(parseInt(rangeParams[0]), career.id === 6 || career.id === 16 ? "melee" : "range");
	property1 = getProperty(weapon?.propertyCategory?.name as LegacyPropertyCategory, parseInt(rangeParams[1]), weapon.properties);
	property2 = getProperty(weapon?.propertyCategory?.name as LegacyPropertyCategory, parseInt(rangeParams[2]), weapon.properties);
	trait = getTrait(weapon?.traitCategory?.name as LegacyTraitCategory, parseInt(rangeParams[3]), weapon.traits);

	let secondaryWeaponBuild: IWeaponBuild = {
		weapon,
		property1,
		property2,
		trait,
	};
	secondaryWeapon = secondaryWeaponBuild;

	if (typeof necklaceParam === "undefined") {
		error(404, `Invalid necklace parameters: ${necklaceParam}`);
	}

	let necklaceParams = necklaceParam.split(",");
	let properties = StaticData.properties.filter((property) => {
		return property.category?.name === "necklace";
	});
	let traits = StaticData.traits.filter((trait) => {
		return trait.category?.name === "defence_accessory";
	});

	property1 = getProperty("necklace", parseInt(necklaceParams[0]), properties);
	property2 = getProperty("necklace", parseInt(necklaceParams[1]), properties);
	trait = getTrait("defence_accessory", parseInt(necklaceParams[2]), traits);

	let necklaceBuild: INecklaceBuild = {
		property1,
		property2,
		trait,
	};
	necklace = necklaceBuild;

	if (typeof charmParam === "undefined") {
		error(404, `Invalid charm parameters: ${charmParam}`);
	}

	let charmParams = charmParam.split(",");
	properties = StaticData.properties.filter((property) => {
		return property.category?.name === "charm";
	});
	traits = StaticData.traits.filter((trait) => {
		return trait.category?.name === "offence_accessory";
	});
	property1 = getProperty("charm", parseInt(charmParams[0]), properties);
	property2 = getProperty("charm", parseInt(charmParams[1]), properties);
	trait = getTrait("offence_accessory", parseInt(charmParams[2]), traits);

	let charmBuild: INecklaceBuild = {
		property1,
		property2,
		trait,
	};
	charm = charmBuild;

	if (typeof trinketParam === "undefined") {
		error(404, `Invalid trinket parameters: ${trinketParam}`);
	}

	let trinketParams = trinketParam.split(",");
	properties = StaticData.properties.filter((property) => {
		return property.category?.name === "trinket";
	});
	traits = StaticData.traits.filter((trait) => {
		return trait.category?.name === "utility_accessory";
	});

	property1 = getProperty("trinket", parseInt(trinketParams[0]), properties);
	property2 = getProperty("trinket", parseInt(trinketParams[1]), properties);
	trait = getTrait("utility_accessory", parseInt(trinketParams[2]), traits);

	let trinketBuild: INecklaceBuild = {
		property1,
		property2,
		trait,
	};
	trinket = trinketBuild;

	careerBuild = {
		career: career,
		talent1: talents[0],
		talent2: talents[1] + 3,
		talent3: talents[2] + 6,
		talent4: talents[3] + 9,
		talent5: talents[4] + 12,
		talent6: talents[5] + 15,
		primaryWeapon: primaryWeapon,
		secondaryWeapon: secondaryWeapon,
		necklace: necklace,
		charm: charm,
		trinket: trinket,
	};

	return careerBuild;
}

function loadCareerFromNewURL(
	careerId: string,
	talentsParam: string,
	primaryParam: string,
	secondaryParam: string,
	necklaceParam: string,
	charmParam: string,
	trinketParam: string,
	separator: string
): ICareerBuild {
	let careerBuild: ICareerBuild;
	let talents: number[];
	let primaryWeapon: IWeaponBuild;
	let secondaryWeapon: IWeaponBuild;
	let necklace: INecklaceBuild;
	let charm: INecklaceBuild;
	let trinket: INecklaceBuild;

	let career = StaticData.careers.find((career) => {
		return career.id === parseInt(careerId);
	});
	if (!career) {
		error(404, `Career with id ${careerId} not found`);
	}

	if (typeof talentsParam != "undefined") {
		if (talentsParam.length !== 6) {
			error(404, `Invalid talents parameters: ${talentsParam}`);
		}
	}

	talents =
		talentsParam.length > 6
			? talentsParam
					.substring(0, 6)
					.split("")
					.map((x) => {
						return parseInt(x);
					})
			: talentsParam.split("").map((x) => {
					return parseInt(x);
			  });

	if (talents.filter((talent) => talent < 0 || talent > 3).length > 0) {
		error(404, `Invalid talent values: ${talents}`);
	}

	if (typeof primaryParam === "undefined" || primaryParam.split(separator).length !== 4) {
		error(404, `Invalid melee weapon parameters: ${primaryParam}`);
	}

	let meleeParams = primaryParam.split(separator);
	let weapon = WeaponData.find((weapon) => {
		return weapon.id === parseInt(meleeParams[0]);
	});

	if (!weapon) {
		error(404, `Weapon with id ${meleeParams[0]} not found`);
	}

	let property1 = getProperty(weapon?.propertyCategory?.name as LegacyPropertyCategory, parseInt(meleeParams[1]), weapon.properties);
	let property2 = getProperty(weapon?.propertyCategory?.name as LegacyPropertyCategory, parseInt(meleeParams[2]), weapon.properties);
	let trait = getTrait(weapon?.traitCategory?.name as LegacyTraitCategory, parseInt(meleeParams[3]), weapon.traits);

	let primaryWeaponBuild: IWeaponBuild = {
		weapon,
		property1,
		property2,
		trait,
	};
	primaryWeapon = primaryWeaponBuild;

	if (typeof secondaryParam === "undefined" || secondaryParam.split(separator).length !== 4) {
		error(404, `Invalid range weapon parameters: ${secondaryParam}`);
	}
	let rangeParams = secondaryParam.split(separator);
	weapon = WeaponData.find((weapon) => {
		return weapon.id === parseInt(rangeParams[0]);
	});

	if (!weapon) {
		error(404, `Weapon with id ${rangeParams[0]} not found`);
	}

	property1 = getProperty(weapon?.propertyCategory?.name as LegacyPropertyCategory, parseInt(rangeParams[1]), weapon.properties);
	property2 = getProperty(weapon?.propertyCategory?.name as LegacyPropertyCategory, parseInt(rangeParams[2]), weapon.properties);
	trait = getTrait(weapon?.traitCategory?.name as LegacyTraitCategory, parseInt(rangeParams[3]), weapon.traits);

	let secondaryWeaponBuild: IWeaponBuild = {
		weapon,
		property1,
		property2,
		trait,
	};
	secondaryWeapon = secondaryWeaponBuild;

	if (typeof necklaceParam === "undefined") {
		error(404, `Invalid necklace parameters: ${necklaceParam}`);
	}

	let necklaceParams = necklaceParam.split(separator);
	let properties = StaticData.properties.filter((property) => {
		return property.category?.name === "necklace";
	});
	let traits = StaticData.traits.filter((trait) => {
		return trait.category?.name === "defence_accessory";
	});

	property1 = getProperty("necklace", parseInt(necklaceParams[0]), properties);
	property2 = getProperty("necklace", parseInt(necklaceParams[1]), properties);
	trait = getTrait("defence_accessory", parseInt(necklaceParams[2]), traits);

	let necklaceBuild: INecklaceBuild = {
		property1,
		property2,
		trait,
	};
	necklace = necklaceBuild;

	if (typeof charmParam === "undefined") {
		error(404, `Invalid charm parameters: ${charmParam}`);
	}

	let charmParams = charmParam.split(separator);
	properties = StaticData.properties.filter((property) => {
		return property.category?.name === "charm";
	});
	traits = StaticData.traits.filter((trait) => {
		return trait.category?.name === "offence_accessory";
	});
	property1 = getProperty("charm", parseInt(charmParams[0]), properties);
	property2 = getProperty("charm", parseInt(charmParams[1]), properties);
	trait = getTrait("offence_accessory", parseInt(charmParams[2]), traits);

	let charmBuild: INecklaceBuild = {
		property1,
		property2,
		trait,
	};
	charm = charmBuild;

	if (typeof trinketParam === "undefined") {
		error(404, `Invalid trinket parameters: ${trinketParam}`);
	}

	let trinketParams = trinketParam.split(separator);
	properties = StaticData.properties.filter((property) => {
		return property.category?.name === "trinket";
	});
	traits = StaticData.traits.filter((trait) => {
		return trait.category?.name === "utility_accessory";
	});

	property1 = getProperty("trinket", parseInt(trinketParams[0]), properties);
	property2 = getProperty("trinket", parseInt(trinketParams[1]), properties);
	trait = getTrait("utility_accessory", parseInt(trinketParams[2]), traits);

	let trinketBuild: INecklaceBuild = {
		property1,
		property2,
		trait,
	};
	trinket = trinketBuild;

	careerBuild = {
		career: career,
		talent1: talents[0],
		talent2: talents[1] + 3,
		talent3: talents[2] + 6,
		talent4: talents[3] + 9,
		talent5: talents[4] + 12,
		talent6: talents[5] + 15,
		primaryWeapon: primaryWeapon,
		secondaryWeapon: secondaryWeapon,
		necklace: necklace,
		charm: charm,
		trinket: trinket,
	};

	return careerBuild;
}
