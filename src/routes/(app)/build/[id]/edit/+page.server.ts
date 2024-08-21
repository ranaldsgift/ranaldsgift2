import { CareerBuild } from "$lib/entities/builds/CareerBuild.js";
import { UserRoleEnum } from "$lib/enums/UserRoleEnum.js";
import { DataHelper } from "$lib/helpers/DataHelper.js";
import type { EditBuildPageViewModel } from "$lib/viewmodels/BuildPageViewModel.js";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	const { id } = event.params;

	if (!id) {
		error(404, `Build ID parameter not found.`);
	}

	let careerBuild: CareerBuild | null = null;

	// If the ID is a UUID, this is the new supabase user ID
	if (Number.isInteger(id)) {
		careerBuild = await CareerBuild.findOne({ where: { id: parseInt(id) } });
	}
	// Otherwise, it's the old firebase user ID
	else {
		careerBuild = await CareerBuild.findOne({ where: { firebaseId: id } });
	}

	if (!careerBuild) {
		error(404, `Build ${id} not found.`);
	}

	if (!event.locals.sessionUser || event.locals.sessionUserProfile?.id !== event.locals.sessionUser.id) {
		error(403, `You must be logged in to edit a build.`);
	}

	if (
		event.locals.sessionUser?.id !== careerBuild.user.id &&
		event.locals.sessionUserProfile?.role !== UserRoleEnum.Admin &&
		event.locals.sessionUserProfile?.role !== UserRoleEnum.Moderator
	) {
		error(403, `You do not have permission to edit this build.`);
	}

	let viewModel: EditBuildPageViewModel = {
		build: careerBuild.toObject(),
		title: `Edit ${careerBuild.name} by ${careerBuild.user.name}`,
	};

	return {
		viewModel: viewModel,
	};
};
