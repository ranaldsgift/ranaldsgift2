import { CareerCache, WeaponsCache } from "$lib/cache/RedisCache.js";
import { CareerWeaponCounts } from "$lib/entities/views/CareerWeaponCounts.js";
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

	const weaponId = params.weaponId;

	if (!weaponId) {
		error(404, "Weapon not found");
	}

	let weapon = await WeaponsCache.get(Number(weaponId));
	let careers = await CareerCache.getAll();

	let hero = careers.find(
		(c) =>
			c.primaryWeapons.filter((w) => w.id === weapon.id).length > 0 || c.secondaryWeapons.filter((w) => w.id === weapon.id).length > 0
	)?.hero;
	let weaponCareers = careers.filter(
		(c) =>
			c.primaryWeapons.filter((w) => w.id === weapon.id).length > 0 || c.secondaryWeapons.filter((w) => w.id === weapon.id).length > 0
	);

	if (!hero) {
		error(404, "Hero not found");
	}

	let weaponStats: WeaponCounts[] = [];
	let weaponPropertyStats: WeaponPropertyCounts[] = [];
	let weaponTraitStats: WeaponTraitCounts[] = [];
	let weaponCareerStats: CareerWeaponCounts[] = [];

	try {
		weaponStats = await db.getRepository(WeaponCounts).findBy({ weaponId: Number(weaponId) });
		weaponPropertyStats = await db.getRepository(WeaponPropertyCounts).findBy({ weaponId: Number(weaponId) });
		weaponTraitStats = await db.getRepository(WeaponTraitCounts).findBy({ weaponId: Number(weaponId) });
		weaponCareerStats = await db.getRepository(CareerWeaponCounts).findBy({ weaponId: Number(weaponId) });
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

	if (weaponCareerStats.length > 1) {
		weaponCareerStats = weaponCareerStats.sort((a, b) => b.count - a.count);
	}

	return {
		hero,
		careers: weaponCareers,
		weapon,
		weaponStats: instanceToPlain(weaponStats) as WeaponCounts[],
		weaponPropertyStats: instanceToPlain(weaponPropertyStats) as WeaponPropertyCounts[],
		weaponTraitStats: instanceToPlain(weaponTraitStats) as WeaponTraitCounts[],
		weaponCareerStats: instanceToPlain(weaponCareerStats) as CareerWeaponCounts[],
		totalBuilds: weaponCareerStats.reduce((acc, curr) => acc + Number(curr.count), 0),
	};
};
