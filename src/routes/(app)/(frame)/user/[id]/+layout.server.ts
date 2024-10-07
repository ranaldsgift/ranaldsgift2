import { User } from "$lib/entities/User";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	event.depends(`user:${event.params.id}`);
	const { id } = event.params;

	let user: User | null = null;

	let query = User.createQueryBuilder("user")
		.loadRelationCountAndMap("user.authoredBuildsCount", "user.authoredBuilds")
		.loadRelationCountAndMap("user.ratedBuildsCount", "user.ratedBuilds")
		.loadRelationCountAndMap("user.favoriteBuildsCount", "user.favoriteBuilds");

	if (id.includes("-")) {
		query = query.where("user.id = :id", { id });
	} else {
		query = query.where("user.firebaseId = :id", { id });
	}

	user = await query.getOne();

	if (!user) {
		error(404, "User not found");
	}

	return {
		userData: user.toObject(),
	};
};
