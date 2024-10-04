import { CareerCache } from "$lib/cache/CareerCache";
import { PatchCache } from "$lib/cache/PatchCache";
import { WeaponCache } from "$lib/cache/WeaponCache";
import { CareerBuild, type ICareerBuild } from "$lib/entities/builds/CareerBuild";
import BuildHelper from "$lib/helpers/BuildHelper";
import { error, type RequestHandler } from "@sveltejs/kit";
import { Brackets } from "typeorm";

export const GET: RequestHandler = async ({ url, locals }) => {
	let offset = Number(url.searchParams.get("offset"));
	let limit = Number(url.searchParams.get("limit"));
	let userId = url.searchParams.get("userId");
	let heroId = url.searchParams.get("heroId");
	let careerId = url.searchParams.get("careerId");
	let weaponId = url.searchParams.get("weaponId");
	let primaryWeaponId = url.searchParams.get("primaryWeaponId");
	let secondaryWeaponId = url.searchParams.get("secondaryWeaponId");
	let charmTraitId = url.searchParams.get("charmTraitId");
	let necklaceTraitId = url.searchParams.get("necklaceTraitId");
	let trinketTraitId = url.searchParams.get("trinketTraitId");
	let missionId = url.searchParams.get("missionId");
	let difficultyId = url.searchParams.get("difficultyId");
	let difficultyModifierId = url.searchParams.get("difficultyModifierId");
	let potionId = url.searchParams.get("potionId");
	let bookSettingId = url.searchParams.get("bookSettingId");
	let twitchSettingId = url.searchParams.get("twitchSettingId");
	let buildRoleId = url.searchParams.get("buildRoleId");
	let patchId = url.searchParams.get("patchId");
	let search = url.searchParams.get("search");
	let sort = url.searchParams.get("sort");
	let asc = url.searchParams.get("asc") === "true";
	let favoriteByUserId = url.searchParams.get("favoriteByUserId");
	let ratedByUserId = url.searchParams.get("ratedByUserId");
	let excludeBuildIds = url.searchParams.get("excludeBuildIds");
	let excludeAuthorIds = url.searchParams.get("excludeAuthorIds");
	let isDeleted = false;

	// Allow users to see deleted builds if they are an admin or moderator or if they are the author of the build
	if (
		locals.sessionUserProfile &&
		(locals.sessionUserProfile.role === "Admin" ||
			locals.sessionUserProfile.role === "Moderator" ||
			locals.sessionUserProfile.id === userId)
	) {
		isDeleted = url.searchParams.get("isDeleted") === "true";
	}

	let data = null;
	let dataCount = null;
	try {
		let query = CareerBuild.createQueryBuilder("build")
			.leftJoin("build.user", "user")
			.addSelect(["user.id", "user.name"])
			.leftJoin("build.userFavorites", "userFavorites")
			.leftJoin("build.userRatings", "userRatings")
			.leftJoinAndSelect("build.difficulty", "difficulty")
			.leftJoinAndSelect("build.difficultyModifier", "difficultyModifier")
			.leftJoinAndSelect("build.mission", "mission")
			.leftJoinAndSelect("build.potion", "potion")
			.leftJoinAndSelect("build.book", "book")
			.leftJoinAndSelect("build.roles", "roles")
			.leftJoinAndSelect("build.career", "career")
			.leftJoinAndSelect("career.hero", "hero")
			.leftJoinAndSelect("build.primaryWeapon", "primaryWeaponBuild")
			.leftJoin("primaryWeaponBuild.weapon", "primaryWeapon")
			.addSelect(["primaryWeapon.id", "primaryWeapon.name"])
			.leftJoinAndSelect("build.secondaryWeapon", "secondaryWeaponBuild")
			.leftJoin("secondaryWeaponBuild.weapon", "secondaryWeapon")
			.addSelect(["secondaryWeapon.id", "secondaryWeapon.name"])
			.leftJoinAndSelect("build.necklace", "necklace")
			.leftJoinAndSelect("build.charm", "charm")
			.leftJoinAndSelect("build.trinket", "trinket")
			.leftJoinAndSelect("primaryWeaponBuild.property1", "pwb.property1")
			.leftJoinAndSelect("primaryWeaponBuild.property2", "pwb.property2")
			.leftJoinAndSelect("primaryWeaponBuild.trait", "pwb.trait")
			.leftJoinAndSelect("secondaryWeaponBuild.property1", "swb.property1")
			.leftJoinAndSelect("secondaryWeaponBuild.property2", "swb.property2")
			.leftJoinAndSelect("secondaryWeaponBuild.trait", "swb.trait")
			.leftJoinAndSelect("necklace.property1", "necklaceBuild.property1")
			.leftJoinAndSelect("necklace.property2", "necklaceBuild.property2")
			.leftJoinAndSelect("necklace.trait", "necklaceBuild.trait")
			.leftJoinAndSelect("charm.property1", "charmBuild.property1")
			.leftJoinAndSelect("charm.property2", "charmBuild.property2")
			.leftJoinAndSelect("charm.trait", "charmBuild.trait")
			.leftJoinAndSelect("trinket.property1", "trinketBuild.property1")
			.leftJoinAndSelect("trinket.property2", "trinketBuild.property2")
			.leftJoinAndSelect("trinket.trait", "trinketBuild.trait")
			.leftJoinAndSelect("build.talent1", "talent1")
			.leftJoinAndSelect("build.talent2", "talent2")
			.leftJoinAndSelect("build.talent3", "talent3")
			.leftJoinAndSelect("build.talent4", "talent4")
			.leftJoinAndSelect("build.talent5", "talent5")
			.leftJoinAndSelect("build.talent6", "talent6")
			.addSelect((subQuery) => {
				return subQuery
					.select("COUNT(ratings.userId)", "ratingsCount")
					.from("user_rated_builds_career_build", "ratings")
					.where("ratings.careerBuildId = build.id");
			}, "build_ratingscount")
			.addSelect((subQuery) => {
				return subQuery
					.select("COUNT(favorites.userId)", "favoritesCount")
					.from("user_favorite_builds_career_build", "favorites")
					.where("favorites.careerBuildId = build.id");
			}, "build_favoritescount");

		if (userId) {
			query = query.andWhere(`user.id = :userId`, { userId: userId });
		}

		if (search) {
			query = query.andWhere(
				`CONCAT_WS(' ', build.name, build.description, user.name, career.name, hero.name, primaryWeapon.name, secondaryWeapon.name) ILIKE :search`,
				{ search: `%${search}%` }
			);
		}

		if (heroId) {
			if (Number(heroId)) {
				query = query.andWhere(`career.hero.id = :heroId`, { heroId: heroId });
			}
		}

		if (careerId) {
			if (Number(careerId)) {
				query = query.andWhere(`build."careerId" = :careerId`, { careerId: careerId });
			}
		}

		if (weaponId) {
			if (Number(weaponId)) {
				query = query.andWhere(
					new Brackets((qb) => {
						qb.where("primaryWeapon.id = :weaponId", {
							weaponId: weaponId,
						}).orWhere("secondaryWeapon.id = :weaponId", { weaponId: weaponId });
					})
				);
			}
		}

		if (primaryWeaponId) {
			if (Number(primaryWeaponId)) {
				query = query.andWhere(`primaryWeapon.id = :primaryWeaponId`, { primaryWeaponId: primaryWeaponId });
			}
		}

		if (secondaryWeaponId) {
			if (Number(secondaryWeaponId)) {
				query = query.andWhere(`secondaryWeapon.id = :secondaryWeaponId`, { secondaryWeaponId: secondaryWeaponId });
			}
		}

		if (charmTraitId) {
			if (Number(charmTraitId)) {
				query = query.andWhere(`charm.trait.id = :charmTraitId`, { charmTraitId: charmTraitId });
			}
		}

		if (necklaceTraitId) {
			if (Number(necklaceTraitId)) {
				query = query.andWhere(`necklace.trait.id = :necklaceTraitId`, { necklaceTraitId: necklaceTraitId });
			}
		}

		if (trinketTraitId) {
			if (Number(trinketTraitId)) {
				query = query.andWhere(`trinket.trait.id = :trinketTraitId`, { trinketTraitId: trinketTraitId });
			}
		}

		if (difficultyId) {
			if (Number(difficultyId)) {
				query = query.andWhere(`build.difficulty.id = :difficultyId`, { difficultyId: difficultyId });
			}
		}

		if (difficultyModifierId) {
			if (Number(difficultyModifierId)) {
				query = query.andWhere(`build.difficultyModifier.id = :difficultyModifierId`, {
					difficultyModifierId: difficultyModifierId,
				});
			}
		}

		if (potionId) {
			if (Number(potionId)) {
				query = query.andWhere(`build.potion.id = :potionId`, { potionId: potionId });
			}
		}

		if (bookSettingId) {
			if (Number(bookSettingId)) {
				query = query.andWhere(`build.book.id = :bookSettingId`, { bookSettingId: bookSettingId });
			}
		}

		/* 		if (twitchSettingId) {
			if (Number(twitchSettingId)) {
				query = query.andWhere(`build.twitch.id = :twitchSettingId`, { twitchSettingId: twitchSettingId });
			}
		} */

		if (buildRoleId) {
			if (Number(buildRoleId)) {
				query = query
					.andWhere((qb) => {
						const subQuery = qb
							.subQuery()
							.select("1")
							.from("career_build_roles_build_role", "cbr")
							.where("cbr.careerBuildId = build.id")
							.andWhere("cbr.buildRoleId = :buildRoleId")
							.getQuery();
						return "EXISTS " + subQuery;
					})
					.setParameter("buildRoleId", buildRoleId);
			}
		}

		if (missionId) {
			if (Number(missionId)) {
				query = query.andWhere(`build.mission.id = :missionId`, { missionId: missionId });
			}
		}

		if (patchId) {
			if (Number(patchId)) {
				query = query.andWhere(`build.patch.id = :patchId`, { patchId: patchId });
			}
		}

		if (sort) {
			if (sort === "random") {
				let randomSortKeys = ["dateModified", "dateCreated", "name", "description", "ratingsCount", "favoritesCount"];
				sort = randomSortKeys[Math.floor(Math.random() * randomSortKeys.length)];
			}

			if (sort === "ratingsCount") {
				query = query.orderBy("build_ratingscount", asc ? "ASC" : "DESC");
			} else if (sort === "favoritesCount") {
				query = query.orderBy("build_favoritescount", asc ? "ASC" : "DESC");
			} else if (sort === "random") {
				query = query.orderBy("RANDOM()");
			} else {
				query = query.orderBy(`build.${sort}`, asc ? "ASC" : "DESC");
			}
		}

		if (ratedByUserId) {
			query = query.andWhere(`userRatings.id = :userId`, { userId: ratedByUserId });
		}

		if (favoriteByUserId) {
			query = query.andWhere(`userFavorites.id = :userId`, { userId: favoriteByUserId });
		}

		if (excludeBuildIds) {
			query = query.andWhere(`build.id NOT IN (:...excludeBuildIds)`, { excludeBuildIds: excludeBuildIds.split(",") });
		}

		if (excludeAuthorIds) {
			query = query.andWhere(`build.user.id NOT IN (:...excludeAuthorIds)`, { excludeAuthorIds: excludeAuthorIds.split(",") });
		}

		if (isDeleted) {
			query = query.andWhere(`build.isDeleted = :isDeleted`, { isDeleted: isDeleted });
		}

		const { raw, entities } = await query
			.skip(offset * limit)
			.take(limit)
			.getRawAndEntities();

		data = { raw, entities };
		dataCount = await query.getCount();
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	let builds: ICareerBuild[] = [];
	let patches = await PatchCache.getAll();

	for (let build of data.entities) {
		if (!build.careerId) {
			continue;
		}

		let buildPojo = build.toObject({ exposeUnsetFields: false });
		buildPojo.career = await CareerCache.get(build.careerId!);
		buildPojo.primaryWeapon.weapon = await WeaponCache.get(build.primaryWeapon.weaponId!);
		buildPojo.secondaryWeapon.weapon = await WeaponCache.get(build.secondaryWeapon.weaponId!);
		buildPojo.patchNumber = BuildHelper.getPatch(buildPojo, patches)?.number;
		buildPojo.ratingsCount = parseInt(data.raw.find((r) => r.build_id === build.id)?.build_ratingscount || "0");
		buildPojo.favoritesCount = parseInt(data.raw.find((r) => r.build_id === build.id)?.build_favoritescount || "0");
		builds.push(buildPojo);
	}

	return new Response(JSON.stringify({ items: builds, count: dataCount }), { status: 200 });
};
