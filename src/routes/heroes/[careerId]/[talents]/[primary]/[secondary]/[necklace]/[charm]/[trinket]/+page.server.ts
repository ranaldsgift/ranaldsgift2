import { StaticData } from "$lib/data/StaticData.js";
import { WeaponData } from "$lib/data/WeaponData.js";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import type { INecklaceBuild } from "$lib/entities/builds/NecklaceBuild.js";
import type { IWeaponBuild } from "$lib/entities/builds/WeaponBuild.js";
import type { ICareer } from "$lib/entities/career/Career.js";
import type { IProperty } from "$lib/entities/Property.js";
import type { ITrait } from "$lib/entities/Trait.js";
import { LegacyDataHelper, type LegacyPropertyCategory, type LegacyTraitCategory } from "$lib/helpers/LegacyDataHelper.js";

interface ViewModel {
	pageTitle: string;
	careers: ICareer[];
	selectedCareer: ICareer;
	build: ICareerBuild;
}

export const load = async (event) => {
	// THREE URL patterns, old/1.0/2.0
	///:careerId?/:talents?/:primary?/:secondary?/:necklace?/:charm?/:trinket?

	// old
	// https://www.ranalds.gift/heroes/1/112321/44,4,3,6/12,5,3,2/3,2,1/4,5,4/7,2,1

	// 1.0
	//https://www.ranalds.gift/heroes/1/112321/43-4-3-6/56-5-3-2/3-2-1/4-5-4/7-2-1

	// 2.0

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
	} else {
		throw new Error("Invalid URL format");
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
		throw new Error(`Trait with name ${traitName} not found`);
	}
	return trait;
}

function getProperty(category: LegacyPropertyCategory, id: number, properties: IProperty[]) {
	let propertyName = LegacyDataHelper.getPropertyName(category, id);
	let property = properties.find((property) => {
		return property.name === propertyName;
	});

	if (!property) {
		throw new Error(`Property with name ${propertyName} not found`);
	}
	return property;
}

function getWeapon(id: number, type: "melee" | "range") {
	let weaponCodename = LegacyDataHelper.getOldWeaponCodename(id, type);
	let weapon = WeaponData.find((weapon) => {
		return weapon.codename === weaponCodename;
	});

	if (!weapon) {
		throw new Error(`Weapon with id ${id} not found`);
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
		throw new Error(`Career with id ${careerId} not found`);
	}

	if (typeof talentsParam != "undefined") {
		if (talentsParam.length !== 6) {
			throw new Error(`Invalid talents parameters: ${talentsParam}`);
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

	if (talents.filter((talent) => talent < 1 || talent > 3).length > 0) {
		throw new Error(`Invalid talent values: ${talents}`);
	}

	if (typeof meleeParam === "undefined" || meleeParam.split(",").length !== 4) {
		throw new Error(`Invalid melee weapon parameters: ${meleeParam}`);
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
		throw new Error(`Invalid range weapon parameters: ${rangeParam}`);
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
		throw new Error(`Invalid necklace parameters: ${necklaceParam}`);
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
		throw new Error(`Invalid charm parameters: ${charmParam}`);
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
		throw new Error(`Invalid trinket parameters: ${trinketParam}`);
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
/* 
function loadCareerFromNewURL(
	careerId: string,
	talentsParam: string,
	primaryParam: string,
	secondaryParam: string,
	necklaceParam: string,
	charmParam: string,
	trinketParam: string
): ICareerBuild {
	if (typeof talentsParam != "undefined") {
		talents =
			talentsParam.length > 6
				? talentsParam
						.subString(0, 6)
						.split("")
						.map((x) => {
							return parseInt(x);
						})
				: talentsParam.split("").map((x) => {
						return parseInt(x);
				  });
	}

	if (typeof meleeParam != "undefined") {
		meleeParams = meleeParam.split(",");
		meleeId = parseInt(meleeParams[0]);

		if (meleeParams.length > 1) {
			meleeProperty1 = parseInt(meleeParams[1]);
		}
		if (meleeParams.length > 2) {
			meleeProperty2 = parseInt(meleeParams[2]);
		}
		if (meleeParams.length > 3) {
			meleeTrait = parseInt(meleeParams[3]);
		}
	}

	if (typeof rangeParam != "undefined") {
		rangeParams = rangeParam.split(",");
		rangeId = parseInt(rangeParams[0]);

		if (rangeParams.length > 1) {
			rangeProperty1 = parseInt(rangeParams[1]);
		}
		if (rangeParams.length > 2) {
			rangeProperty2 = parseInt(rangeParams[2]);
		}
		if (rangeParams.length > 3) {
			rangeTrait = parseInt(rangeParams[3]);
		}
	}

	if (typeof necklaceParam != "undefined") {
		necklaceParams = necklaceParam.split(",");
		necklaceProperty1 = parseInt(necklaceParams[0]);

		if (necklaceParams.length > 1) {
			necklaceProperty2 = parseInt(necklaceParams[1]);
		}
		if (necklaceParams.length > 2) {
			necklaceTrait = parseInt(necklaceParams[2]);
		}
	}

	if (typeof charmParam != "undefined") {
		charmParams = charmParam.split(",");
		charmProperty1 = parseInt(charmParams[0]);

		if (charmParams.length > 1) {
			charmProperty2 = parseInt(charmParams[1]);
		}
		if (charmParams.length > 2) {
			charmTrait = parseInt(charmParams[2]);
		}
	}

	if (typeof trinketParam != "undefined") {
		trinketParams = trinketParam.split(",");
		trinketProperty1 = parseInt(trinketParams[0]);

		if (necklaceParams.length > 1) {
			trinketProperty2 = parseInt(trinketParams[1]);
		}
		if (necklaceParams.length > 2) {
			trinketTrait = parseInt(trinketParams[2]);
		}
	}

	var heroWeapons = meleeWeaponsData.filter((weapon) => {
		return weapon.canWield.indexOf(hero.codeName) >= 0;
	});

	var melee = heroWeapons.find((weapon) => {
		return parseInt(weapon.id) === parseInt(meleeId);
	});
	if (!melee) {
		melee = heroWeapons[0];
	}

	primary = DataHelper.getWeaponByCodename(melee.codeName);
	primary = primary ? primary : DataHelper.getPrimaryWeaponsForCareer(careerId)[0];

	if (parseInt(careerId) !== 6 && parseInt(careerId) !== 16) {
		heroWeapons = rangeWeaponsData.filter((weapon) => {
			return weapon.canWield.indexOf(hero.codeName) >= 0;
		});
	}

	var range = heroWeapons.find((weapon) => {
		return parseInt(weapon.id) === parseInt(rangeId);
	});
	if (!range) {
		range = heroWeapons[0];
	}

	secondary = DataHelper.getWeaponByCodename(range.codeName);
	secondary = secondary ? secondary : DataHelper.getSecondaryWeaponsForCareer(careerId)[0];

	if (secondary.traitCategory === "ranged_ammo") {
		rangeTrait = rangeTrait > 2 ? (rangeTrait === 3 || rangeTrait === 8 ? 1 : rangeTrait - 1) : rangeTrait;
	} else if (secondary.traitCategory === "ranged_heat") {
		rangeTrait =
			rangeTrait > 1 ? (rangeTrait === 2 || rangeTrait === 7 ? 1 : rangeTrait > 7 ? rangeTrait - 2 : rangeTrait - 1) : rangeTrait;
	}

	properties = [
		meleeProperty1,
		meleeProperty2,
		rangeProperty1,
		rangeProperty2,
		necklaceProperty1,
		necklaceProperty2,
		charmProperty1,
		charmProperty2,
		trinketProperty1,
		trinketProperty2,
	];
	traits = [meleeTrait, rangeTrait, necklaceTrait, charmTrait, trinketTrait];

	return {
		...state,
		careerId: careerId,
		primaryWeaponId: primary.id,
		secondaryWeaponId: secondary.id,
		talents: talents,
		properties: properties,
		traits: traits,
		isLoadedFromParams: true,
	};
}
 */
