import { CareerBuild, type ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import { LogHelper } from "$lib/helpers/LogHelper.js";
import { json } from "@sveltejs/kit";
import { plainToInstance } from "class-transformer";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { session, user, userProfile } = { session: locals.session, user: locals.sessionUser, userProfile: locals.sessionUserProfile };

	if (!user) {
		return json({ error: "Login to save a build" }, { status: 401 });
	}

	if (!userProfile) {
		return json({ error: "Please complete your profile to save a build" }, { status: 401 });
	}

	const buildPojo: ICareerBuild = await request.json();

	if (!buildPojo) {
		return json({ error: "Build data not found" }, { status: 400 });
	}

	if (buildPojo.id && buildPojo.user?.id !== user.id) {
		// Allow admins to save other user's builds
		if (userProfile.role !== "Admin" && userProfile.role !== "Moderator") {
			return json({ error: "You can only make changes to your own builds" }, { status: 401 });
		}
	}

	let buildEntity = plainToInstance(CareerBuild, buildPojo);

	if (!buildEntity) {
		return json({ error: "Unable to parse Build data" }, { status: 400 });
	}

	try {
		buildEntity = await buildEntity.save({ data: { session } });
	} catch (error) {
		LogHelper.error("Error saving build: " + error);
		return json({ error: "Failed to save build. Please try again." }, { status: 500 });
	}

	return json({ message: "Build saved!", buildId: buildEntity.id });
}
