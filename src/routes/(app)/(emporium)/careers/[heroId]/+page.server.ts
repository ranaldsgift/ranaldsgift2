import { CareerCache, HeroCache, WeaponsCache } from "$lib/cache/RedisCache.js";
import { CareerBuildCareers } from "$lib/entities/views/CareerBuildCareers";
import { CareerBuildHeroPrimaryWeapons } from "$lib/entities/views/CareerBuildHeroPrimaryWeapons.js";
import { CareerBuildHeroSecondaryWeapons } from "$lib/entities/views/CareerBuildHeroSecondaryWeapons";
import { LogHelper } from "$lib/helpers/LogHelper.js";
import TypeOrm from "$lib/server/db";
import { error } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";

export const load = async ({ params }) => {
	LogHelper.debug("Loading hero page");
	const db = await TypeOrm.getDb(null);

	if (!db) {
		LogHelper.error("Database connection failed");
		error(500, "Database connection failed");
	}

	let careerStats: CareerBuildCareers[] = [];
	let heroPrimaryWeaponStats: CareerBuildHeroPrimaryWeapons[] = [];
	let heroSecondaryWeaponStats: CareerBuildHeroSecondaryWeapons[] = [];

	try {
		careerStats = await db.getRepository(CareerBuildCareers).findBy({ heroId: Number(params.heroId) });
		heroPrimaryWeaponStats = await db.getRepository(CareerBuildHeroPrimaryWeapons).findBy({ heroId: Number(params.heroId) });
		heroSecondaryWeaponStats = await db.getRepository(CareerBuildHeroSecondaryWeapons).findBy({ heroId: Number(params.heroId) });
	} catch (err) {
		LogHelper.error(`Error loading career stats for hero ${params.heroId}: ${err}`);
		error(500, `Error loading career stats for hero ${params.heroId}`);
	}

	if (careerStats.length > 1) {
		careerStats = careerStats.sort((a, b) => Number(b.count) - Number(a.count));
	}

	if (heroPrimaryWeaponStats.length > 1) {
		heroPrimaryWeaponStats = heroPrimaryWeaponStats.sort((a, b) => Number(b.count) - Number(a.count));
	}

	if (heroSecondaryWeaponStats.length > 1) {
		heroSecondaryWeaponStats = heroSecondaryWeaponStats.sort((a, b) => Number(b.count) - Number(a.count));
	}

	const hero = await HeroCache.get(Number(params.heroId));

	let totalHeroBuilds = 0;
	careerStats.forEach((stat) => {
		totalHeroBuilds += Number(stat.count);
	});

	let totalPrimaryWeapons = 0;
	heroPrimaryWeaponStats.forEach((stat) => {
		totalPrimaryWeapons += Number(stat.count);
	});

	let totalSecondaryWeapons = 0;
	heroSecondaryWeaponStats.forEach((stat) => {
		totalSecondaryWeapons += Number(stat.count);
	});

	return {
		viewModel: {
			heroId: Number(params.heroId),
			heroName: hero.name,
			careerStats: instanceToPlain(careerStats) as CareerBuildCareers[],
			primaryWeaponStats: instanceToPlain(heroPrimaryWeaponStats) as CareerBuildHeroPrimaryWeapons[],
			secondaryWeaponStats: instanceToPlain(heroSecondaryWeaponStats) as CareerBuildHeroSecondaryWeapons[],
			totalPrimaryWeapons,
			totalSecondaryWeapons,
			totalHeroBuilds,
		},
	};
};
