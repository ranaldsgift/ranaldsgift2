import { Event } from "$lib/entities/Event";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
	const idParam = url.searchParams.get("id");

	if (!idParam || !Number(idParam)) {
		error(404, "No ID provided.");
	}

	const id = parseInt(idParam);

	const event = await Event.findOne({ where: { id } });

	if (!event) {
		error(404, `Event ${idParam} not found.`);
	}

	return new Response(JSON.stringify(event.toObject()));
};
