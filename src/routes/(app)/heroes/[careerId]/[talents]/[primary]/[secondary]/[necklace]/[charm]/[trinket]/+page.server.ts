import { CareerCache } from "$lib/cache/CareerCache.js";
import { PropertiesCache } from "$lib/cache/PropertiesCache.js";
import { TraitsCache } from "$lib/cache/TraitsCache.js";
import { WeaponCache } from "$lib/cache/WeaponCache.js";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import type { INecklaceBuild } from "$lib/entities/builds/NecklaceBuild.js";
import type { IWeaponBuild } from "$lib/entities/builds/WeaponBuild.js";
import type { IProperty } from "$lib/entities/Property.js";
import type { ITrait } from "$lib/entities/Trait.js";
import PropertyCategoryEnum from "$lib/enums/PropertyCategoryEnum.js";
import TraitCategoryEnum from "$lib/enums/TraitCategoryEnum.js";
import BuildHelper from "$lib/helpers/BuildHelper.js";
import { LegacyDataHelper, type LegacyPropertyCategory, type LegacyTraitCategory } from "$lib/helpers/LegacyDataHelper.js";
import { error, redirect } from "@sveltejs/kit";

export const load = async (event) => {
	let careerBuild: ICareerBuild;

	if (event.params.primary.includes(",")) {
		careerBuild = await loadCareerFromOldURL(
			event.params.careerId,
			event.params.talents,
			event.params.primary,
			event.params.secondary,
			event.params.necklace,
			event.params.charm,
			event.params.trinket
		);
	} else if (event.params.primary.includes("-")) {
		careerBuild = await loadCareerFromNewURL(
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

	redirect(301, `/heroes/${BuildHelper.getQueryStringFromBuild(careerBuild)}`);
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

async function getWeapon(id: number, type: "melee" | "range") {
	let weaponCodename = LegacyDataHelper.getOldWeaponCodename(id, type);

	if (!weaponCodename) {
		error(404, `Weapon with id ${id} not found`);
	}

	let weapon = await WeaponCache.findByCodename(weaponCodename);

	if (!weapon) {
		error(404, `Weapon with id ${id} not found`);
	}

	return weapon;
}

async function loadCareerFromOldURL(
	careerId: string,
	talentsParam: string,
	meleeParam: string,
	rangeParam: string,
	necklaceParam: string,
	charmParam: string,
	trinketParam: string
): Promise<ICareerBuild> {
	let careerBuild: ICareerBuild;
	let talents: number[];
	let primaryWeapon: IWeaponBuild;
	let secondaryWeapon: IWeaponBuild;
	let necklace: INecklaceBuild;
	let charm: INecklaceBuild;
	let trinket: INecklaceBuild;

	let career = await CareerCache.get(parseInt(careerId));

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
	let weapon = await getWeapon(parseInt(meleeParams[0]), "melee");

	if (!weapon) {
		error(404, `Weapon with id ${meleeParams[0]} not found`);
	}

	let property1 = getProperty(weapon?.propertyCategory as LegacyPropertyCategory, parseInt(meleeParams[1]), weapon.properties);
	let property2 = getProperty(weapon?.propertyCategory as LegacyPropertyCategory, parseInt(meleeParams[2]), weapon.properties);
	let trait = getTrait(weapon?.traitCategory as LegacyTraitCategory, parseInt(meleeParams[3]), weapon.traits);

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
	weapon = await getWeapon(parseInt(rangeParams[0]), career.id === 6 || career.id === 16 ? "melee" : "range");

	if (!weapon) {
		error(404, `Weapon with id ${rangeParams[0]} not found`);
	}

	property1 = getProperty(weapon?.propertyCategory as LegacyPropertyCategory, parseInt(rangeParams[1]), weapon.properties);
	property2 = getProperty(weapon?.propertyCategory as LegacyPropertyCategory, parseInt(rangeParams[2]), weapon.properties);

	let rangeTraitId = parseInt(rangeParams[3]);
	if (weapon?.traitCategory === "ranged_ammo") {
		rangeTraitId = rangeTraitId > 2 ? (rangeTraitId === 3 || rangeTraitId === 8 ? 1 : rangeTraitId - 1) : rangeTraitId;
	} else if (weapon?.traitCategory === "ranged_heat") {
		rangeTraitId =
			rangeTraitId > 1
				? rangeTraitId === 2 || rangeTraitId === 7
					? 1
					: rangeTraitId > 7
					? rangeTraitId - 2
					: rangeTraitId - 1
				: rangeTraitId;
	}
	trait = getTrait(weapon?.traitCategory as LegacyTraitCategory, rangeTraitId, weapon.traits);

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
	let properties = await PropertiesCache.getAllForCategory(PropertyCategoryEnum.NECKLACE);
	let traits = await TraitsCache.getAllForCategory(TraitCategoryEnum.Necklace);

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
	properties = await PropertiesCache.getAllForCategory(PropertyCategoryEnum.CHARM);
	traits = await TraitsCache.getAllForCategory(TraitCategoryEnum.Charm);

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
	properties = await PropertiesCache.getAllForCategory(PropertyCategoryEnum.TRINKET);
	traits = await TraitsCache.getAllForCategory(TraitCategoryEnum.Trinket);

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
		talent1: career.talents.find((talent) => talent.talentNumber === talents[0]),
		talent2: career.talents.find((talent) => talent.talentNumber === talents[1] + 3),
		talent3: career.talents.find((talent) => talent.talentNumber === talents[2] + 6),
		talent4: career.talents.find((talent) => talent.talentNumber === talents[3] + 9),
		talent5: career.talents.find((talent) => talent.talentNumber === talents[4] + 12),
		talent6: career.talents.find((talent) => talent.talentNumber === talents[5] + 15),
		primaryWeapon: primaryWeapon,
		secondaryWeapon: secondaryWeapon,
		necklace: necklace,
		charm: charm,
		trinket: trinket,
	};

	return careerBuild;
}

async function loadCareerFromNewURL(
	careerId: string,
	talentsParam: string,
	primaryParam: string,
	secondaryParam: string,
	necklaceParam: string,
	charmParam: string,
	trinketParam: string,
	separator: string
): Promise<ICareerBuild> {
	let careerBuild: ICareerBuild;
	let talents: number[];
	let primaryWeapon: IWeaponBuild;
	let secondaryWeapon: IWeaponBuild;
	let necklace: INecklaceBuild;
	let charm: INecklaceBuild;
	let trinket: INecklaceBuild;

	let career = await CareerCache.get(parseInt(careerId));
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
	let weapon = await WeaponCache.get(parseInt(meleeParams[0]));

	if (!weapon) {
		error(404, `Weapon with id ${meleeParams[0]} not found`);
	}

	let property1 = getProperty(weapon?.propertyCategory as LegacyPropertyCategory, parseInt(meleeParams[1]), weapon.properties);
	let property2 = getProperty(weapon?.propertyCategory as LegacyPropertyCategory, parseInt(meleeParams[2]), weapon.properties);
	let trait = getTrait(weapon?.traitCategory as LegacyTraitCategory, parseInt(meleeParams[3]), weapon.traits);

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
	weapon = await WeaponCache.get(parseInt(rangeParams[0]));

	if (!weapon) {
		error(404, `Weapon with id ${rangeParams[0]} not found`);
	}

	property1 = getProperty(weapon?.propertyCategory as LegacyPropertyCategory, parseInt(rangeParams[1]), weapon.properties);
	property2 = getProperty(weapon?.propertyCategory as LegacyPropertyCategory, parseInt(rangeParams[2]), weapon.properties);
	trait = getTrait(weapon?.traitCategory as LegacyTraitCategory, parseInt(rangeParams[3]), weapon.traits);

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
	let properties = await PropertiesCache.getAllForCategory(PropertyCategoryEnum.NECKLACE);
	let traits = await TraitsCache.getAllForCategory(TraitCategoryEnum.Necklace);

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
	properties = await PropertiesCache.getAllForCategory(PropertyCategoryEnum.CHARM);
	traits = await TraitsCache.getAllForCategory(TraitCategoryEnum.Charm);

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
	properties = await PropertiesCache.getAllForCategory(PropertyCategoryEnum.TRINKET);
	traits = await TraitsCache.getAllForCategory(TraitCategoryEnum.Trinket);

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
		talent1: career.talents.find((talent) => talent.talentNumber === talents[0]),
		talent2: career.talents.find((talent) => talent.talentNumber === talents[1] + 3),
		talent3: career.talents.find((talent) => talent.talentNumber === talents[2] + 6),
		talent4: career.talents.find((talent) => talent.talentNumber === talents[3] + 9),
		talent5: career.talents.find((talent) => talent.talentNumber === talents[4] + 12),
		talent6: career.talents.find((talent) => talent.talentNumber === talents[5] + 15),
		primaryWeapon: primaryWeapon,
		secondaryWeapon: secondaryWeapon,
		necklace: necklace,
		charm: charm,
		trinket: trinket,
	};

	return careerBuild;
}
