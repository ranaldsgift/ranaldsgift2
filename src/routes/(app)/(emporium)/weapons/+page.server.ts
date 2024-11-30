import { WeaponCounts } from "$lib/entities/views/WeaponCounts.js";
import { WeaponPropertyCounts } from "$lib/entities/views/WeaponPropertyCounts.js";
import { WeaponTraitCounts } from "$lib/entities/views/WeaponTraitCounts.js";
import { LogHelper } from "$lib/helpers/LogHelper.js";
import TypeOrm from "$lib/server/db";
import { error } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";

export const load = async ({ locals, params }) => {
	LogHelper.debug("Loading weapons page");
	const db = await TypeOrm.getDb(null);

	if (!db) {
		LogHelper.error("Database connection failed");
		error(500, "Database connection failed");
	}

	let weaponStats: WeaponCounts[] = [];
	let weaponPropertyStats: WeaponPropertyCounts[] = [];
	let weaponTraitStats: WeaponTraitCounts[] = [];

	try {
		weaponStats = await db.getRepository(WeaponCounts).find();
		weaponPropertyStats = await db.getRepository(WeaponPropertyCounts).find();
		weaponTraitStats = await db.getRepository(WeaponTraitCounts).find();
	} catch (err) {
		LogHelper.error(`Error loading weapon stats: ${err}`);
		error(500, `Error loading weapon stats`);
	}

	if (weaponStats.length > 1) {
		weaponStats = weaponStats.sort((a, b) => b.count - a.count);
	}

	if (weaponPropertyStats.length > 1) {
		weaponPropertyStats = weaponPropertyStats.sort((a, b) => b.count - a.count);
	}

	if (weaponTraitStats.length > 1) {
		weaponTraitStats = weaponTraitStats.sort((a, b) => b.count - a.count);
	}

	return {
		weaponStats: instanceToPlain(weaponStats) as WeaponCounts[],
		weaponPropertyStats: instanceToPlain(weaponPropertyStats) as WeaponPropertyCounts[],
		weaponTraitStats: instanceToPlain(weaponTraitStats) as WeaponTraitCounts[],
	};
};
