import { CareerCache } from "$lib/cache/CareerCache.js";
import type { ICareer } from "$lib/entities/career/Career.js";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import { PropertiesCache } from "$lib/cache/PropertiesCache.js";
import { TraitsCache } from "$lib/cache/TraitsCache.js";

interface ViewModel {
	pageTitle: string;
	careers: ICareer[];
	selectedCareer: ICareer;
	build: ICareerBuild;
}

export const load = async (event) => {
	const careers = await CareerCache.getAll();

	let sortedCareers = careers
		.sort((a, b) => {
			if (a.hero.id - b.hero.id === 0) {
				return a.id - b.id;
			}
			return a.hero.id - b.hero.id;
		})
		.map((career) => {
			return career.toObject();
		});

	const propertiesData = (await PropertiesCache.getAll()).map((property) => property.toObject());
	const necklaceProperties = propertiesData.filter((property) => property.category.name === "necklace");
	const charmProperties = propertiesData.filter((property) => property.category.name === "charm");
	const trinketProperties = propertiesData.filter((property) => property.category.name === "trinket");

	const traitsData = (await TraitsCache.getAll()).map((trait) => trait.toObject());
	const necklaceTraits = traitsData.filter((trait) => trait.category.name === "defence_accessory");
	const charmTraits = traitsData.filter((trait) => trait.category.name === "offence_accessory");
	const trinketTraits = traitsData.filter((trait) => trait.category.name === "utility_accessory");

	let initialBuild = {
		career: sortedCareers[0],
		primaryWeapon: {
			weapon: sortedCareers[0].primaryWeapons[0],
			property1: sortedCareers[0].primaryWeapons[0].properties[0],
			property2: sortedCareers[0].primaryWeapons[0].properties[1],
			trait: sortedCareers[0].primaryWeapons[0].traits[0],
		},
		secondaryWeapon: {
			weapon: sortedCareers[0].secondaryWeapons[0],
			property1: sortedCareers[0].secondaryWeapons[0].properties[0],
			property2: sortedCareers[0].secondaryWeapons[0].properties[1],
			trait: sortedCareers[0].secondaryWeapons[0].traits[0],
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
		careers: sortedCareers,
		selectedCareer: sortedCareers[0],
		build: initialBuild,
	};

	return {
		viewModel,
	};
};
