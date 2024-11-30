import { CareerCache } from "$lib/cache/RedisCache.js";
import { CareerBuildCareers, type ICareerBuildCareers } from "$lib/entities/views/CareerBuildCareers";
import { CareerBuildHeroes } from "$lib/entities/views/CareerBuildHeroes.js";
import { LogHelper } from "$lib/helpers/LogHelper.js";
import TypeOrm from "$lib/server/db";
import CareersPageViewModel from "$lib/viewmodels/CareersPageViewModel.svelte";
import { error } from "@sveltejs/kit";

export const load = async ({ locals }) => {
	LogHelper.debug("Loading careers page");
	const db = await TypeOrm.getDb(null);

	if (!db) {
		LogHelper.error("Database connection failed");
		error(500, "Database connection failed");
	}

	const careerStats = await db.getRepository(CareerBuildCareers).find();
	const heroStats = await db.getRepository(CareerBuildHeroes).find();

	const careers = await CareerCache.getAll();

	const viewModel = new CareersPageViewModel();

	viewModel.careerStats = careerStats
		.map((stat) => {
			let totalBuildsForHero = heroStats.find((hero) => hero.heroId === stat.heroId)?.count ?? 0;
			return {
				heroId: stat.heroId,
				careerId: stat.careerId,
				name: careers.find((c) => c.id === stat.careerId)?.name ?? "",
				count: Number(stat.count),
				percentageOfTotal: Math.round((stat.count / totalBuildsForHero) * 100),
			};
		})
		.sort((a, b) => b.percentageOfTotal - a.percentageOfTotal);

	let totalBuildCount = 0;
	heroStats.forEach((stat) => {
		totalBuildCount += Number(stat.count);
	});
	viewModel.totalBuilds = totalBuildCount;

	viewModel.heroStats = heroStats.map((stat) => {
		return {
			heroId: stat.heroId,
			name: careers.find((c) => c.hero.id === stat.heroId)?.hero.name ?? "",
			count: Number(stat.count),
			percentageOfTotal: Math.round((stat.count / (viewModel.totalBuilds ?? 0)) * 100),
		};
	});

	return {
		...viewModel,
	};
};
