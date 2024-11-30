import { CareerCache, WeaponsCache } from "$lib/cache/RedisCache.js";
import { CareerBuildCareerPrimaryWeapons } from "$lib/entities/views/CareerBuildCareerPrimaryWeapons";
import { CareerBuildCareerProperties } from "$lib/entities/views/CareerBuildCareerProperties";
import { CareerBuildCareers, type ICareerBuildCareers } from "$lib/entities/views/CareerBuildCareers";
import { CareerBuildCareerSecondaryWeapons } from "$lib/entities/views/CareerBuildCareerSecondaryWeapons";
import { CareerBuildCareerTraits } from "$lib/entities/views/CareerBuildCareerTraits";
import { CareerBuildHeroPrimaryWeapons } from "$lib/entities/views/CareerBuildHeroPrimaryWeapons.js";
import { CareerBuildTalentCounts } from "$lib/entities/views/CareerBuildTalentCounts";
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

	let careerStats: ICareerBuildCareers[] = [];
	let careerPrimaryWeaponStats: CareerBuildCareerPrimaryWeapons[] = [];
	let careerSecondaryWeaponStats: CareerBuildCareerSecondaryWeapons[] = [];
	let careerTalentStats: CareerBuildTalentCounts[] = [];
	let careerPropertyStats: CareerBuildCareerProperties[] = [];
	let careerTraitStats: CareerBuildCareerTraits[] = [];

	try {
		careerPrimaryWeaponStats = await db.getRepository(CareerBuildCareerPrimaryWeapons).findBy({
			careerId: Number(params.careerId),
		});
		careerSecondaryWeaponStats = await db.getRepository(CareerBuildCareerSecondaryWeapons).findBy({
			careerId: Number(params.careerId),
		});
		careerTalentStats = await db.getRepository(CareerBuildTalentCounts).findBy({
			careerId: Number(params.careerId),
		});
		careerPropertyStats = await db.getRepository(CareerBuildCareerProperties).findBy({
			careerId: Number(params.careerId),
		});
		careerTraitStats = await db.getRepository(CareerBuildCareerTraits).findBy({
			careerId: Number(params.careerId),
		});
	} catch (err) {
		LogHelper.error(`Error loading career stats for hero ${params.heroId}: ${err}`);
		error(500, `Error loading career stats for hero ${params.heroId}`);
	}

	if (careerPrimaryWeaponStats.length > 1) {
		careerPrimaryWeaponStats = careerPrimaryWeaponStats.sort((a, b) => b.count - a.count);
	}

	/* 	const careers = await CareerCache.getAll();
	const weapons = await WeaponsCache.getAll();

	let careerStatsPojo = careerStats.map((stat) => {
		let totalBuildsForHero = 0;
		careerStats.forEach((s) => {
			if (s.heroId === stat.heroId) {
				totalBuildsForHero += s.count;
			}
		});
		return {
			heroId: stat.heroId,
			careerId: stat.careerId,
			name: careers.find((c) => c.id === stat.careerId)?.name ?? "",
			count: Number(stat.count),
			percentageOfTotal: Math.round((stat.count / totalBuildsForHero) * 100),
		};
	});

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
					codename: weapons.find((w) => w.id === stat.weaponId)?.codename ?? "",
					tooltip: weapons.find((w) => w.id === stat.weaponId)?.tooltip ?? "",
				},
				count: Number(stat.count),
				percentageOfTotal: Math.round((stat.count / totalPrimaryWeapons) * 100),
			};
		})
		.sort((a, b) => b.percentageOfTotal - a.percentageOfTotal); */

	const careers = await CareerCache.getAll();

	return {
		viewModel: {
			careerId: Number(params.careerId),
			careerName: careers.find((c) => c.id === Number(params.careerId))?.name ?? "",
			heroId: Number(params.heroId),
			heroName: careers.find((c) => c.hero.id === Number(params.heroId))?.hero.name ?? "",
			primaryWeaponStats: instanceToPlain(careerPrimaryWeaponStats) as CareerBuildCareerPrimaryWeapons[],
			secondaryWeaponStats: instanceToPlain(careerSecondaryWeaponStats) as CareerBuildCareerSecondaryWeapons[],
			careerTalentStats: instanceToPlain(careerTalentStats) as CareerBuildTalentCounts[],
			careerPropertyStats: instanceToPlain(careerPropertyStats) as CareerBuildCareerProperties[],
			careerTraitStats: instanceToPlain(careerTraitStats) as CareerBuildCareerTraits[],
		},
	};
};
