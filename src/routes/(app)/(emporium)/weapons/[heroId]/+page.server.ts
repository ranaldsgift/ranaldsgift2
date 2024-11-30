import { CareerCache, HeroCache } from "$lib/cache/RedisCache.js";
import { HeroPrimaryWeaponCounts } from "$lib/entities/views/HeroPrimaryWeaponCounts.js";
import { HeroSecondaryWeaponCounts } from "$lib/entities/views/HeroSecondaryWeaponCounts.js";
import { HeroWeaponCounts } from "$lib/entities/views/HeroWeaponCounts";
import { HeroWeaponPropertyCounts } from "$lib/entities/views/HeroWeaponPropertyCounts.js";
import { HeroWeaponTraitCounts } from "$lib/entities/views/HeroWeaponTraitCounts.js";
import { WeaponCounts } from "$lib/entities/views/WeaponCounts.js";
import { WeaponPropertyCounts } from "$lib/entities/views/WeaponPropertyCounts.js";
import { WeaponTraitCounts } from "$lib/entities/views/WeaponTraitCounts.js";
import { LogHelper } from "$lib/helpers/LogHelper.js";
import TypeOrm from "$lib/server/db";
import { error } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";

export const load = async ({ locals, params }) => {
	LogHelper.debug("Loading Hero Weapons page");
	const db = await TypeOrm.getDb(null);

	if (!db) {
		LogHelper.error("Database connection failed");
		error(500, "Database connection failed");
	}

	if (!Number(params.heroId)) {
		error(400, "Hero ID is required");
	}

	let hero = await HeroCache.get(Number(params.heroId));

	if (!hero) {
		error(404, "Hero not found");
	}

	let allCareers = await CareerCache.getAll();
	let careers = allCareers.filter((career) => career.hero.id === Number(params.heroId));

	let weaponStats: HeroWeaponCounts[] = [];
	let primaryWeaponStats: HeroPrimaryWeaponCounts[] = [];
	let secondaryWeaponStats: HeroSecondaryWeaponCounts[] = [];
	let weaponPropertyStats: HeroWeaponPropertyCounts[] = [];
	let weaponTraitStats: HeroWeaponTraitCounts[] = [];

	try {
		weaponStats = await db.getRepository(HeroWeaponCounts).findBy({ heroId: Number(params.heroId) });
		primaryWeaponStats = await db.getRepository(HeroPrimaryWeaponCounts).findBy({ heroId: Number(params.heroId) });
		secondaryWeaponStats = await db.getRepository(HeroSecondaryWeaponCounts).findBy({ heroId: Number(params.heroId) });
		weaponPropertyStats = await db.getRepository(HeroWeaponPropertyCounts).findBy({ heroId: Number(params.heroId) });
		weaponTraitStats = await db.getRepository(HeroWeaponTraitCounts).findBy({ heroId: Number(params.heroId) });
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
		careers: careers,
		weaponStats: instanceToPlain(weaponStats) as HeroWeaponCounts[],
		primaryWeaponStats: instanceToPlain(primaryWeaponStats) as HeroPrimaryWeaponCounts[],
		secondaryWeaponStats: instanceToPlain(secondaryWeaponStats) as HeroSecondaryWeaponCounts[],
		weaponPropertyStats: instanceToPlain(weaponPropertyStats) as HeroWeaponPropertyCounts[],
		weaponTraitStats: instanceToPlain(weaponTraitStats) as HeroWeaponTraitCounts[],
	};
};
