import { CareerBuildCareers } from "$lib/entities/views/CareerBuildCareers";
import { DataHelper } from "$lib/helpers/DataHelper";
import TypeOrm from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	// load BuildTableFilter object from request query params
	const db = await TypeOrm.getDb(null);

	const stats = await db?.manager.find(CareerBuildCareers);

	return { stats: DataHelper.serialize(stats) };
}) satisfies PageServerLoad;
