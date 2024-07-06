import type { ICareer } from "$lib/entities/career/Career.js";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import { StaticData } from "$lib/data/StaticData.js";

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

	const necklaceProperties = StaticData.properties.filter((property) => property?.category?.name === "necklace");
	const charmProperties = StaticData.properties.filter((property) => property?.category?.name === "charm");
	const trinketProperties = StaticData.properties.filter((property) => property?.category?.name === "trinket");

	const necklaceTraits = StaticData.traits.filter((trait) => trait?.category?.name === "defence_accessory");
	const charmTraits = StaticData.traits.filter((trait) => trait?.category?.name === "offence_accessory");
	const trinketTraits = StaticData.traits.filter((trait) => trait?.category?.name === "utility_accessory");

	let initialBuild = {
		career: StaticData.careers[0],
		primaryWeapon: {
			weapon: StaticData.careers[0].primaryWeapons[0],
			property1: StaticData.careers[0].primaryWeapons[0].properties[0],
			property2: StaticData.careers[0].primaryWeapons[0].properties[1],
			trait: StaticData.careers[0].primaryWeapons[0].traits[0],
		},
		secondaryWeapon: {
			weapon: StaticData.careers[0].secondaryWeapons[0],
			property1: StaticData.careers[0].secondaryWeapons[0].properties[0],
			property2: StaticData.careers[0].secondaryWeapons[0].properties[1],
			trait: StaticData.careers[0].secondaryWeapons[0].traits[0],
		},
		talent1: 0,
		talent2: 0,
		talent3: 0,
		talent4: 0,
		talent5: 0,
		talent6: 0,
		powerLevel: 300,
		necklace: {
			trait: necklaceTraits[0],
			property1: necklaceProperties[0],
			property2: necklaceProperties[1],
		},
		charm: {
			trait: charmTraits[0],
			property1: charmProperties[0],
			property2: charmProperties[1],
		},
		trinket: {
			trait: trinketTraits[0],
			property1: trinketProperties[0],
			property2: trinketProperties[1],
		},
	};

	let viewModel: ViewModel = {
		pageTitle: "Heroes",
		careers: StaticData.careers,
		selectedCareer: StaticData.careers[0],
		build: initialBuild,
	};

	return {
		viewModel,
	};
};
