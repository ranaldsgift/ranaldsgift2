import { CareerBuild } from "$lib/entities/builds/CareerBuild";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { CareerCache } from "$lib/cache/CareerCache";

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get("id");

	if (!id) {
		error(404, "No ID provided.");
	}

	let careerBuild: CareerBuild | null = null;

	if (Number.isInteger(url.searchParams.get(id))) {
		careerBuild = await CareerBuild.findOne({
			where: { id: parseInt(id) },
			relations: {
				user: true,
				userRatings: true,
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
				userRatings: true,
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
		return new Response(null, { status: 404 });
	}

	if (!careerBuild.careerId) {
		error(404, `Build ${id} does not have a career.`);
	}

	let buildPojo = careerBuild.toObject();
	buildPojo.career = await CareerCache.get(careerBuild.careerId);

	return new Response(JSON.stringify(buildPojo));
};
