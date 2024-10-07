import { User, type IUser } from "$lib/entities/User.js";
import { LogHelper } from "$lib/helpers/LogHelper.js";
import { json } from "@sveltejs/kit";
import { plainToInstance } from "class-transformer";
import { QueryFailedError } from "typeorm";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { session, user } = { session: locals.session, user: locals.sessionUser };

	if (!user) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	const userPojo: IUser = await request.json();

	if (!userPojo) {
		return json({ error: "User data not found" }, { status: 400 });
	}

	if (user.id !== userPojo.id) {
		if (user.role !== "Admin" && user.role !== "Moderator") {
			return json({ error: "Unauthorized" }, { status: 401 });
		}
	}

	let userEntity = plainToInstance(User, userPojo);

	if (!userEntity) {
		return json({ error: "Unable to parse user data" }, { status: 400 });
	}

	try {
		userEntity = await userEntity.save({ data: { session } });
		locals.sessionUserProfile = userEntity.toObject();
	} catch (err) {
		if (err instanceof QueryFailedError) {
			LogHelper.error(`/api-v2/user/save - ${err.message} - CODE: [${err.driverError.code}]`);
			let errorMessage = "Failed to save user";
			if (err.driverError.code === "23505") {
				errorMessage = "User with that name already exists";
			}
			return json({ error: errorMessage }, { status: 400 });
		}
	}

	return json(userPojo);
}
