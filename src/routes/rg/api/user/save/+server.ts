import { User, type IUser } from "$lib/entities/User.js";
import { json } from "@sveltejs/kit";
import { plainToInstance } from "class-transformer";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { session, user } = await locals.safeGetSession();

	if (!user) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	const userPojo: IUser = await request.json();

	if (!userPojo) {
		return json({ error: "User data not found" }, { status: 400 });
	}

	if (user.id !== userPojo.id) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	const userEntity = plainToInstance(User, userPojo);

	if (!userEntity) {
		return json({ error: "Unable to parse user data" }, { status: 400 });
	}

	userEntity.save({ data: { session } });
	locals.sessionUserProfile = userPojo;

	return json({ message: "User data saved" });
}
