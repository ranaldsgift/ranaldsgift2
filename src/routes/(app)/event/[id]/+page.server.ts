import { Event } from "$lib/entities/Event";

export const load = async ({ params }) => {
	const id = parseInt(params.id);
	const event = await Event.findOne({ where: { id } });
	const eventPojo = event?.toObject();

	return { event: eventPojo };
};
