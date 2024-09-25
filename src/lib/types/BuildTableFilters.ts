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
	difficultyId?: number | null;
	difficultyModifierId?: number | null;
	potionId?: number | null;
	buildRoleId?: number | null;
	twitchSettingId?: number | null;
	bookSettingId?: number | null;
	patchId?: number | null;
	missionId?: number | null;
	search?: string | null;
	sort?: keyof ICareerBuild | null;
	asc?: boolean;
	favoriteByUserId?: string | null;
	ratedByUserId?: string | null;
	offset?: number | null;
	limit?: number | null;
};
