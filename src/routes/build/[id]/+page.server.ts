import { CareerCache } from "$lib/cache/CareerCache.js";
import { CareerBuild, type ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import type { BuildPageViewModel } from "$lib/viewmodels/BuildPageViewModel.js";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	const { id } = event.params;

	let careerBuild: CareerBuild | null = null;

	// If the ID is a UUID, this is the new supabase user ID
	if (Number.isInteger(id)) {
		careerBuild = await CareerBuild.findOne({
			where: { id: parseInt(id) },
			relations: {
				user: true,
				career: {
					hero: true,
				},
			},
			select: {
				user: {
					id: true,
					name: true,
				},
			},
		});
	}
	// Otherwise, it's the old firebase user ID
	else {
		careerBuild = await CareerBuild.findOne({
			where: { firebaseId: id },
			relations: {
				user: true,
				career: {
					hero: true,
				},
			},
			select: {
				user: {
					id: true,
					name: true,
				},
			},
		});
	}

	if (!careerBuild) {
		error(404, `Build ${id} not found.`);
	}

	if (!careerBuild.careerId) {
		error(404, `Build ${id} does not have a career.`);
	}

	const career = await CareerCache.get(careerBuild.careerId);

	if (!career) {
		error(404, `Career ${careerBuild.careerId} not found.`);
	}

	const buildPojo = careerBuild.toObject();
	buildPojo.career = career;

	let pageDescription = `${careerBuild.name} by ${careerBuild.user.name}.
        ${careerBuild.career.name} build for ${careerBuild.career.hero.name}. 
		${careerBuild.primaryWeapon.weapon.name} with ${careerBuild.primaryWeapon.property1?.name}, ${careerBuild.primaryWeapon.property2?.name}, and ${careerBuild.primaryWeapon.trait?.name}.
		${careerBuild.secondaryWeapon.weapon.name} with ${careerBuild.secondaryWeapon.property1?.name}, ${careerBuild.secondaryWeapon.property2?.name}, and ${careerBuild.secondaryWeapon.trait?.name}.
		Necklace with ${careerBuild.necklace.property1?.name}, ${careerBuild.necklace.property2?.name}, and ${careerBuild.necklace.trait?.name}.
		Charm with ${careerBuild.charm.property1?.name}, ${careerBuild.charm.property2?.name}, and ${careerBuild.charm.trait?.name}.
		Trinket with ${careerBuild.trinket.property1?.name}, ${careerBuild.trinket.property2?.name}, and ${careerBuild.trinket.trait?.name}.`;

	let viewModel: BuildPageViewModel = {
		build: buildPojo,
		title: `${careerBuild.name} by ${careerBuild.user.name}`,
		description: pageDescription,
	};

	return { viewModel };
};
