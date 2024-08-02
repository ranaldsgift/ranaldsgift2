import type { ICareer } from "$lib/entities/career/Career.js";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import BuildHelper from "$lib/helpers/BuildHelper.js";
import { CareerCache } from "$lib/cache/CareerCache.js";
import { PropertiesCache } from "$lib/cache/PropertiesCache.js";
import { TraitsCache } from "$lib/cache/TraitsCache.js";

interface ViewModel {
	pageTitle: string;
	careers: ICareer[];
	selectedCareer: ICareer;
	build?: ICareerBuild;
}

export const load = async (event) => {
	const careers = await CareerCache.getSorted();
	let viewModel: ViewModel = {
		pageTitle: "Heroes",
		careers: careers,
		selectedCareer: careers[0],
	};

	const properties = await PropertiesCache.getAll();
	const traits = await TraitsCache.getAll();

	if (event.url.searchParams.size > 0) {
		const careerId = event.url.searchParams.get("career");

		if (careerId) {
			const career = await CareerCache.get(parseInt(careerId));
			const build = BuildHelper.getBuildFromSearchParams(event.url.searchParams, career, properties, traits);
			if (build) {
				viewModel.build = build;
				return { viewModel };
			}
		}
	}

	const necklaceProperties = properties.filter((property) => property?.category === "necklace");
	const charmProperties = properties.filter((property) => property?.category === "charm");
	const trinketProperties = properties.filter((property) => property?.category === "trinket");

	const necklaceTraits = traits.filter((trait) => trait?.category === "defence_accessory");
	const charmTraits = traits.filter((trait) => trait?.category === "offence_accessory");
	const trinketTraits = traits.filter((trait) => trait?.category === "utility_accessory");

	let initialBuild: ICareerBuild = {
		career: careers[0],
		primaryWeapon: {
			weapon: careers[0].primaryWeapons[0],
			property1: careers[0].primaryWeapons[0].properties[0],
			property2: careers[0].primaryWeapons[0].properties[1],
			trait: careers[0].primaryWeapons[0].traits[0],
		},
		secondaryWeapon: {
			weapon: careers[0].secondaryWeapons[0],
			property1: careers[0].secondaryWeapons[0].properties[0],
			property2: careers[0].secondaryWeapons[0].properties[1],
			trait: careers[0].secondaryWeapons[0].traits[0],
		},
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

	viewModel.build = initialBuild;

	return {
		viewModel,
	};
};
