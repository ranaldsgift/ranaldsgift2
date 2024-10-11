import { EventCache } from "$lib/cache/RedisCache.js";
import { Event } from "$lib/entities/Event.js";
import { type IUser } from "$lib/entities/User.js";
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

	const eventPojo: IUser = await request.json();

	if (!eventPojo) {
		return json({ error: "Event data not found" }, { status: 400 });
	}

	const eventEntity = plainToInstance(Event, eventPojo);

	if (!eventEntity) {
		return json({ error: "Unable to parse event data" }, { status: 400 });
	}

	eventEntity.save({ data: { session } });
	EventCache.update(eventEntity.id, eventEntity);

	return json({ message: "Event data saved" });
}
