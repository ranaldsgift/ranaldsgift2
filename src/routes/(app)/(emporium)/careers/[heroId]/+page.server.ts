import { CareerCache, WeaponsCache } from "$lib/cache/RedisCache.js";
import { CareerBuildCareers, type ICareerBuildCareers } from "$lib/entities/views/CareerBuildCareers";
import { CareerBuildHeroPrimaryWeapons } from "$lib/entities/views/CareerBuildHeroPrimaryWeapons.js";
import { LogHelper } from "$lib/helpers/LogHelper.js";
import TypeOrm from "$lib/server/db";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
	LogHelper.debug("Loading hero page");
	const db = await TypeOrm.getDb(null);

	if (!db) {
		LogHelper.error("Database connection failed");
		error(500, "Database connection failed");
	}

	let careerStats: ICareerBuildCareers[] = [];
	let heroPrimaryWeaponStats: CareerBuildHeroPrimaryWeapons[] = [];

	try {
		careerStats = await db.getRepository(CareerBuildCareers).findBy({ heroId: Number(params.heroId) });
		heroPrimaryWeaponStats = await db.getRepository(CareerBuildHeroPrimaryWeapons).findBy({ heroId: Number(params.heroId) });
	} catch (err) {
		LogHelper.error(`Error loading career stats for hero ${params.heroId}: ${err}`);
		error(500, `Error loading career stats for hero ${params.heroId}`);
	}

	const careers = await CareerCache.getAll();
	const weapons = await WeaponsCache.getAll();

	let careerStatsPojo = careerStats
		.map((stat) => {
			let totalBuildsForHero = 0;
			careerStats.forEach((s) => {
				if (s.heroId === stat.heroId) {
					totalBuildsForHero += Number(s.count);
				}
			});
			return {
				heroId: stat.heroId,
				careerId: stat.careerId,
				name: careers.find((c) => c.id === stat.careerId)?.name ?? "",
				count: Number(stat.count),
				percentageOfTotal: Math.round((stat.count / totalBuildsForHero) * 100),
			};
		})
		.sort((a, b) => b.percentageOfTotal - a.percentageOfTotal);

	let totalPrimaryWeapons = 0;
	heroPrimaryWeaponStats.forEach((stat) => {
		totalPrimaryWeapons += Number(stat.count);
	});

	let heroPrimaryWeaponStatsPojo = heroPrimaryWeaponStats
		.map((stat) => {
			return {
				heroId: stat.heroId,
				weapon: {
					id: stat.weaponId,
					name: weapons.find((w) => w.id === stat.weaponId)?.name ?? "",
					codename: weapons.find((w) => w.id === stat.weaponId)?.codename ?? "",
					tooltip: weapons.find((w) => w.id === stat.weaponId)?.tooltip ?? "",
				},
				count: Number(stat.count),
				percentageOfTotal: Math.round((stat.count / totalPrimaryWeapons) * 100),
			};
		})
		.sort((a, b) => b.percentageOfTotal - a.percentageOfTotal);

	return {
		viewModel: {
			heroId: Number(params.heroId),
			heroName: careers.find((c) => c.hero.id === Number(params.heroId))?.hero.name ?? "",
			careerStats: careerStatsPojo,
			primaryWeaponStats: heroPrimaryWeaponStatsPojo,
		},
	};
};
