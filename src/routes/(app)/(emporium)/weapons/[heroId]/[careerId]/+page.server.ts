import { CareerCache, HeroCache } from "$lib/cache/RedisCache.js";
import { HeroPrimaryWeaponCounts } from "$lib/entities/views/HeroPrimaryWeaponCounts.js";
import { HeroSecondaryWeaponCounts } from "$lib/entities/views/HeroSecondaryWeaponCounts.js";
import { HeroWeaponCounts } from "$lib/entities/views/HeroWeaponCounts";
import { HeroWeaponPropertyCounts } from "$lib/entities/views/HeroWeaponPropertyCounts.js";
import { HeroWeaponTraitCounts } from "$lib/entities/views/HeroWeaponTraitCounts.js";
import { CareerWeaponCounts } from "$lib/entities/views/CareerWeaponCounts";
import { CareerPrimaryWeaponCounts } from "$lib/entities/views/CareerPrimaryWeaponCounts";
import { CareerSecondaryWeaponCounts } from "$lib/entities/views/CareerSecondaryWeaponCounts";
import { CareerWeaponPropertyCounts } from "$lib/entities/views/CareerWeaponPropertyCounts";
import { CareerWeaponTraitCounts } from "$lib/entities/views/CareerWeaponTraitCounts";
import { LogHelper } from "$lib/helpers/LogHelper.js";
import TypeOrm from "$lib/server/db";
import { error } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";

export const load = async ({ locals, params }) => {
	LogHelper.debug("Loading Career Weapons page");
	const db = await TypeOrm.getDb(null);

	if (!db) {
		LogHelper.error("Database connection failed");
		error(500, "Database connection failed");
	}

	if (!Number(params.careerId)) {
		error(400, "Career ID is required");
	}

	let careers = await CareerCache.getAll();
	let heroCareers = careers.filter((career) => career.hero.id === Number(params.heroId));
	let career = careers.find((c) => c.id === Number(params.careerId));

	if (!career) {
		error(404, "Career not found");
	}

	let hero = await HeroCache.get(Number(params.heroId));

	let weaponStats: CareerWeaponCounts[] = [];
	let primaryWeaponStats: CareerPrimaryWeaponCounts[] = [];
	let secondaryWeaponStats: CareerSecondaryWeaponCounts[] = [];
	let weaponPropertyStats: CareerWeaponPropertyCounts[] = [];
	let weaponTraitStats: CareerWeaponTraitCounts[] = [];

	try {
		weaponStats = await db.getRepository(CareerWeaponCounts).findBy({ careerId: Number(params.careerId) });
		primaryWeaponStats = await db.getRepository(CareerPrimaryWeaponCounts).findBy({ careerId: Number(params.careerId) });
		secondaryWeaponStats = await db.getRepository(CareerSecondaryWeaponCounts).findBy({ careerId: Number(params.careerId) });
		weaponPropertyStats = await db.getRepository(CareerWeaponPropertyCounts).findBy({ careerId: Number(params.careerId) });
		weaponTraitStats = await db.getRepository(CareerWeaponTraitCounts).findBy({ careerId: Number(params.careerId) });
	} catch (err) {
		LogHelper.error(`Error loading weapon stats: ${err}`);
		error(500, `Error loading weapon stats`);
	}

	if (weaponStats.length > 1) {
		weaponStats = weaponStats.sort((a, b) => b.count - a.count);
	}

	if (primaryWeaponStats.length > 1) {
		primaryWeaponStats = primaryWeaponStats.sort((a, b) => b.count - a.count);
	}

	if (secondaryWeaponStats.length > 1) {
		weaponPropertyStats = weaponPropertyStats.sort((a, b) => b.count - a.count);
	}

	if (weaponPropertyStats.length > 1) {
		weaponPropertyStats = weaponPropertyStats.sort((a, b) => b.count - a.count);
	}

	if (weaponTraitStats.length > 1) {
		weaponTraitStats = weaponTraitStats.sort((a, b) => b.count - a.count);
	}

	return {
		heroId: params.heroId,
		heroName: hero.name,
		careerId: Number(params.careerId),
		careerName: career.name,
		careers: heroCareers,
		weaponStats: instanceToPlain(weaponStats) as HeroWeaponCounts[],
		primaryWeaponStats: instanceToPlain(primaryWeaponStats) as HeroPrimaryWeaponCounts[],
		secondaryWeaponStats: instanceToPlain(secondaryWeaponStats) as HeroSecondaryWeaponCounts[],
		weaponPropertyStats: instanceToPlain(weaponPropertyStats) as HeroWeaponPropertyCounts[],
		weaponTraitStats: instanceToPlain(weaponTraitStats) as HeroWeaponTraitCounts[],
	};
};
