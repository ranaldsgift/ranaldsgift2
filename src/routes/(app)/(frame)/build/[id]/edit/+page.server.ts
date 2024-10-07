import { type ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import { UserRoleEnum } from "$lib/enums/UserRoleEnum.js";
import type { EditBuildPageViewModel } from "$lib/viewmodels/BuildPageViewModel.js";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	const { id } = event.params;

	if (!id) {
		error(404, `Build ID parameter not found.`);
	}

	const response = await event.fetch(`/api/build?id=${id}`, { method: "GET" });

	if (!response.ok) {
		error(404, `Failed to fetch build ${id}.`);
	}

	let careerBuild: ICareerBuild = await response.json();

	if (!careerBuild) {
		error(404, `Build ${id} not found.`);
	}

	if (!careerBuild.user) {
		error(404, `Failed to pull user data for build ${id}.`);
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
		build: careerBuild,
		title: `Edit ${careerBuild.name} by ${careerBuild.user.name}`,
	};

	return {
		viewModel: viewModel,
	};
};
