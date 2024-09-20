import type { LayoutServerLoad } from "./$types";
import { Event } from "$lib/entities/Event";
import { MoreThan } from "typeorm";

export const load = (async ({ locals, depends, cookies }) => {
	const events = await Event.find({ where: { isActive: true, endDate: MoreThan(new Date()) } });
	const eventsPojo = events.map((event) => event.toObject());

	return {
		session: locals.session,
		sessionUserProfile: locals.sessionUserProfile,
		cookies: cookies.getAll(),
		events: eventsPojo,
	};
}) satisfies LayoutServerLoad;
