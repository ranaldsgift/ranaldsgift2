import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import BuildHelper from "$lib/helpers/BuildHelper.js";
import { CareerCache, PropertiesCache, TraitsCache } from "$lib/cache/RedisCache.js";
import type { HeroesPageViewModel } from "$lib/viewmodels/HeroesPageViewModel.js";
import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum.js";
import { ROOT_API_URL } from "$lib/data/constants/constants.js";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	let careers = await CareerCache.getAll();
	careers = careers.sort((a, b) => {
		if (a.hero.id - b.hero.id === 0) {
			return a.id - b.id;
		}
		return a.hero.id - b.hero.id;
	});
	let viewModel: HeroesPageViewModel = {
		title: `${careers[0].name} - ${careers[0].hero.name}`,
		careers: careers,
		selectedCareer: careers[0],
	};

	const properties = await PropertiesCache.getAll();
	const traits = await TraitsCache.getAll();

	if (event.url.searchParams.size > 0) {
		const buildHash = event.url.searchParams.get("build");

		if (buildHash) {
			const response = await event.fetch(`${ROOT_API_URL}/heroes/share?id=${buildHash}`);

			if (!response.ok) {
				error(404, `Build ${buildHash} not found.`);
			}

			const build = await response.json();

			if (!build) {
				error(404, `Build ${buildHash} not found.`);
			}

			viewModel.build = build;
			return { viewModel };
		}

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
			property1: careers[0].primaryWeapons[0].properties?.[0],
			property2: careers[0].primaryWeapons[0].properties?.[1],
			trait: careers[0].primaryWeapons[0].traits?.[0],
			powerLevel: 300,
			rarity: ItemRarityEnum.Red,
		},
		secondaryWeapon: {
			weapon: careers[0].secondaryWeapons[0],
			property1: careers[0].secondaryWeapons[0].properties?.[0],
			property2: careers[0].secondaryWeapons[0].properties?.[1],
			trait: careers[0].secondaryWeapons[0].traits?.[0],
			powerLevel: 300,
			rarity: ItemRarityEnum.Red,
		},
		necklace: {
			trait: necklaceTraits[0],
			property1: necklaceProperties[0],
			property2: necklaceProperties[1],
			powerLevel: 300,
			rarity: ItemRarityEnum.Red,
		},
		charm: {
			trait: charmTraits[0],
			property1: charmProperties[0],
			property2: charmProperties[1],
			powerLevel: 300,
			rarity: ItemRarityEnum.Red,
		},
		trinket: {
			trait: trinketTraits[0],
			property1: trinketProperties[1],
			property2: trinketProperties[2],
			powerLevel: 300,
			rarity: ItemRarityEnum.Red,
		},
	};

	viewModel.build = initialBuild;

	return {
		viewModel,
	};
};
