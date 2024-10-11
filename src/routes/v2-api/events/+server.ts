import type { RequestHandler } from "./$types";
import { type IEvent } from "$lib/entities/Event";
import { EventCache } from "$lib/cache/RedisCache";

export const GET: RequestHandler = async ({ locals, url }) => {
	const endAfter = url.searchParams.get("endAfter");
	const startBefore = url.searchParams.get("startBefore");
	let isActive = true;

	// Allow users to see inactive events if they are an admin or moderator
	if (locals.sessionUserProfile && (locals.sessionUserProfile.role === "Admin" || locals.sessionUserProfile.role === "Moderator")) {
		isActive = url.searchParams.get("isActive") === "true";
	}

	let events: IEvent[] = await EventCache.getAll();

	if (events && events.length > 0) {
		events = events.filter((event) => {
			if (endAfter && new Date(event.endDate) <= new Date(endAfter)) {
				return false;
			}
			if (startBefore && new Date(event.startDate) >= new Date(startBefore)) {
				return false;
			}
			if (isActive && !event.isActive) {
				return false;
			}
			return true;
		});
	}

	const response = JSON.stringify({
		items: events,
		count: events.length,
	});

	return new Response(response);
};
