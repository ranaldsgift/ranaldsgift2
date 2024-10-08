import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

export type BuildTableFilter = {
	userId?: string | null;
	heroId?: number | null;
	careerId?: number | null;
	weaponId?: number | null;
	primaryWeaponId?: number | null;
	secondaryWeaponId?: number | null;
	charmTraitId?: number | null;
	necklaceTraitId?: number | null;
	trinketTraitId?: number | null;
	isBot?: boolean | null;
	isDeathwish?: boolean | null;
	isTwitch?: boolean | null;
	difficultyId?: number | null;
	difficultyModifierId?: number | null;
	potionId?: number | null;
	buildRoleId?: number | null;
	bookSettingId?: number | null;
	patchId?: number | null;
	missionId?: number | null;
	search?: string | null;
	sort?: keyof ICareerBuild | "random" | null;
	asc?: boolean;
	favoriteByUserId?: string | null;
	ratedByUserId?: string | null;
	offset?: number | null;
	limit?: number | null;
	excludeBuildIds?: number[] | null;
	excludeAuthorIds?: string[] | null;
};

export type BuildTableFilters = keyof BuildTableFilter | "random";
