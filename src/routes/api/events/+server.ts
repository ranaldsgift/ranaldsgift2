import type { RequestHandler } from "./$types";
import { error } from "console";
import { Event, type IEvent } from "$lib/entities/Event";

export const GET: RequestHandler = async ({ locals, url }) => {
	const endAfter = url.searchParams.get("endAfter");
	const startBefore = url.searchParams.get("startBefore");
	let isActive = true;

	// Allow users to see inactive events if they are an admin or moderator
	if (locals.sessionUserProfile && (locals.sessionUserProfile.role === "Admin" || locals.sessionUserProfile.role === "Moderator")) {
		isActive = url.searchParams.get("isActive") === "true";
	}

	let data: IEvent[] | null = null;
	try {
		let query = Event.createQueryBuilder("event");

		if (endAfter) {
			query = query.where("event.endDate > :endAfter", { endAfter: new Date(endAfter) });
		}

		if (startBefore) {
			query = query.where("event.startDate < :startBefore", { startBefore: new Date(startBefore) });
		}

		if (isActive) {
			query = query.andWhere("event.isActive = :isActive", { isActive: true });
		}

		let entities = await query.getMany();
		data = entities.map((entity) => entity.toObject());
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	const response = JSON.stringify({
		items: data,
		count: data?.length || 0,
	});

	return new Response(response);
};
