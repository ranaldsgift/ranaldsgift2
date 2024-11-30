import { CareerBuild } from "$lib/entities/builds/CareerBuild.js";
import { User } from "$lib/entities/User.js";
import { json } from "@sveltejs/kit";

export async function POST({ locals, params }) {
	const user = locals.sessionUser;

	if (!user) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	const userEntity = await User.findOne({
		where: { id: user.id },
		relations: {
			ratedBuilds: true,
		},
	});

	if (!userEntity) {
		return json({ error: `Unable to find user ${user.id}` }, { status: 400 });
	}

	const careerBuildId = parseInt(params.id);

	const buildEntity = await CareerBuild.findOne({
		where: { id: careerBuildId },
	});

	if (!buildEntity) {
		return json({ error: `Unable to find build ${careerBuildId}` }, { status: 400 });
	}

	let message = `Thanks for rating ${buildEntity.user?.name}'s ${buildEntity.name}.`;
	let rated = true;

	if (userEntity.ratedBuilds.some((build) => build.id === buildEntity.id)) {
		userEntity.ratedBuilds = userEntity.ratedBuilds.filter((build) => build.id !== buildEntity.id);
		message = `Removed ${buildEntity.name} from your ratings.`;
		rated = false;
	} else {
		userEntity.ratedBuilds.push(buildEntity);
	}
	userEntity.save();

	return json({ message, rated });
}
