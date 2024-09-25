import { Event } from "$lib/entities/Event";

export const load = async () => {
	const events = await Event.find();
	const upcomingEvents = events.filter((event) => event.startDate > new Date()).map((event) => event.toObject());
	const pastEvents = events.filter((event) => event.endDate < new Date()).map((event) => event.toObject());
	const activeEvents = events
		.filter((event) => {
			const now = new Date();
			return event.startDate <= now && event.endDate > now;
		})
		.map((event) => event.toObject());

	return { activeEvents, upcomingEvents, pastEvents };
};
