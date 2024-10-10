import { User, type IUser } from "$lib/entities/User.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { session, user } = { session: locals.session, user: locals.sessionUser };

	if (!user) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	const data: { showVideo: boolean } = await request.json();

	if (!data) {
		return json({ error: "Data not found" }, { status: 400 });
	}

	const userEntity = await User.findOne({
		where: { id: user.id },
	});

	if (!userEntity) {
		return json({ error: "Unable to parse user data" }, { status: 400 });
	}

	userEntity.showVideo = data.showVideo;

	userEntity.save({ data: { session } });
	locals.sessionUserProfile = userEntity.toObject();

	return json({ message: "User data saved" });
}
