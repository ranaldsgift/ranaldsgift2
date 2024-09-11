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
			favoriteBuilds: true,
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

	let message = `Added ${buildEntity.name} to your favorites.`;
	let favorited = true;

	if (userEntity.favoriteBuilds.some((build) => build.id === buildEntity.id)) {
		userEntity.favoriteBuilds = userEntity.favoriteBuilds.filter((build) => build.id !== buildEntity.id);
		message = `Removed ${buildEntity.name} from your favorites.`;
		favorited = false;
	} else {
		userEntity.favoriteBuilds.push(buildEntity);
	}
	userEntity.save();

	return json({ message, favorited });
}
