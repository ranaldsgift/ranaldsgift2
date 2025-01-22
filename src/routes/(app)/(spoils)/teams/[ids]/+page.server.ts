import { error } from "@sveltejs/kit";
import { Team, type ITeam } from "$lib/entities/Team";
import { type ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { ROOT_API_URL } from "$lib/data/constants/constants";
import hash from "object-hash";
import { LogHelper } from "$lib/helpers/LogHelper.js";

const buildHashLength = 40;

export const load = async (event) => {
	LogHelper.debug(`Loading team page`);
	const ids = event.params.ids;
	const teamName = event.url.searchParams.get("name");

	if (!ids) {
		error(404, "Not build ids provided.");
	}

	// Check if it's just a regular team id with data saved in the database
	if (!ids.includes(";") && !ids.includes(",") && !ids.includes("-") && Number(ids)) {
		LogHelper.debug(`Loading saved team from database.`);
		const team = await Team.findOne({ where: { id: Number(ids) } });

		if (!team) {
			error(404, "Team not found.");
		}

		return { team: team.toObject() };
	}

	let team: ITeam = {
		id: 0,
		name: teamName ?? "",
		videos: [],
		builds: [],
	};

	if (ids.includes(";") || !Number(ids)) {
		LogHelper.debug(`Loading team with ids: ${ids}`);
		const buildIds = ids.split(";");

		for (const buildId of buildIds) {
			if (!buildId || buildId === "") {
				continue;
			}

			let careerBuild: ICareerBuild | null = null;

			if (Number(buildId) || buildId.length !== buildHashLength) {
				LogHelper.debug(`Fetching saved build from database: ${buildId}`);
				const response = await event.fetch(`${ROOT_API_URL}/build?id=${buildId}`, { method: "GET" });

				if (!response.ok) {
					error(404, `Failed to fetch build ${buildId}.`);
				}

				careerBuild = await response.json();

				if (!careerBuild) {
					error(404, `Build ${buildId} not found.`);
				}
			} else {
				LogHelper.debug(`Fetching build from build hash: ${buildId}`);
				const response = await event.fetch(`${ROOT_API_URL}/heroes/share?id=${buildId}`, { method: "GET" });

				if (!response.ok) {
					error(404, `Failed to fetch build ${buildId}.`);
				}

				careerBuild = await response.json();

				if (!careerBuild) {
					error(404, `Build ${buildId} not found.`);
				}
			}

			if (!careerBuild.id) {
				careerBuild.id = buildId;
			}

			team.builds?.push(careerBuild);
		}
	}

	return { team };
};
