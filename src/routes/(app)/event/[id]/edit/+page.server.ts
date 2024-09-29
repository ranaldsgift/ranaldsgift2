import { type IEvent } from "$lib/entities/Event";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	const id = parseInt(event.params.id);

	let eventPojo: IEvent | null = null;

	const response = await event.fetch(`/api/event?id=${id}`, { method: "GET" });

	if (!response.ok) {
		error(404, `Failed to fetch build ${id}.`);
	}

	eventPojo = await response.json();

	if (!eventPojo) {
		error(404, `Event ${id} not found.`);
	}

	return { event: eventPojo };
};
