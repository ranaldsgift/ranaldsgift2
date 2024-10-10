import { ROOT_API_URL } from "$lib/data/constants/constants";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { error } from "console";

export const load = async (event) => {
	const { id } = event.params;

	let careerBuild: ICareerBuild | null = null;

	const response = await event.fetch(`${ROOT_API_URL}/build?id=${id}`, { method: "GET" });

	if (!response.ok) {
		error(404, `Failed to fetch build ${id}.`);
	}

	careerBuild = await response.json();

	if (!careerBuild) {
		error(404, `Build ${id} not found.`);
	}

	if (!careerBuild?.user) {
		error(404, `Failed to pull user data for build ${id}.`);
	}

	return {
		build: careerBuild,
	};
};
