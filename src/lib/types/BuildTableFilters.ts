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
	search?: string | null;
	sort?: keyof ICareerBuild | null;
	ascending?: boolean;
	favorite?: boolean;
	rated?: boolean;
	favoriteByUser?: string | null;
	ratedByUser?: string | null;
	offset?: number | null;
	limit?: number | null;
};
