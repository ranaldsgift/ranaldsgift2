import { Event } from "$lib/entities/Event";
import { LessThan } from "typeorm";

export const load = async () => {
	const events = await Event.find();
	const eventsPojo = events.map((event) => event.toObject());

	return { events: eventsPojo };
};
