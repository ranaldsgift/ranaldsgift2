import { CareerBuild, type ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import { json } from "@sveltejs/kit";
import { plainToInstance } from "class-transformer";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { session, user, userProfile } = { session: locals.session, user: locals.sessionUser, userProfile: locals.sessionUserProfile };

	if (!user || !userProfile) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	if (userProfile.role !== "Admin" && userProfile.role !== "Moderator") {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	const buildPojo: ICareerBuild = await request.json();

	if (!buildPojo) {
		return json({ error: "Build data not found" }, { status: 400 });
	}

	const buildEntity = plainToInstance(CareerBuild, buildPojo);

	if (!buildEntity) {
		return json({ error: "Unable to parse Build data" }, { status: 400 });
	}

	buildEntity.save({ data: { session } });

	return json({ message: "Event data saved" });
}
