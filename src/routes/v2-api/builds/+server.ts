import { PatchesCache } from "$lib/cache/RedisCache";
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
	let isBot = url.searchParams.get("isBot");
	let isDeathwish = url.searchParams.get("isDeathwish");
	let isTwitch = url.searchParams.get("isTwitch");
	let difficultyId = url.searchParams.get("difficultyId");
	let difficultyModifierId = url.searchParams.get("difficultyModifierId");
	let potionId = url.searchParams.get("potionId");
	let buildRoleId = url.searchParams.get("buildRoleId");
	let bookSettingId = url.searchParams.get("bookSettingId");
	let patchId = url.searchParams.get("patchId");
	let missionId = url.searchParams.get("missionId");
	let search = url.searchParams.get("search");
	let sort = url.searchParams.get("sort") || "dateModified";
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
			.leftJoin("build.career", "career")
			.addSelect(["career.id", "career.name"])
			.leftJoin("career.hero", "hero")
			.addSelect(["hero.id", "hero.name"])
			.leftJoin("build.primaryWeapon", "primaryWeaponBuild")
			.addSelect([
				"primaryWeaponBuild.id",
				"primaryWeaponBuild.rarity",
				"primaryWeaponBuild.weaponId",
				"primaryWeaponBuild.powerLevel",
				"primaryWeaponBuild.property1Value",
				"primaryWeaponBuild.property2Value",
			])
			.leftJoin("primaryWeaponBuild.weapon", "primaryWeapon")
			.addSelect(["primaryWeapon.id"])
			.leftJoin("primaryWeaponBuild.property1", "primaryWeaponProperty1")
			.addSelect(["primaryWeaponProperty1.id"])
			.leftJoin("primaryWeaponBuild.property2", "primaryWeaponProperty2")
			.addSelect(["primaryWeaponProperty2.id"])
			.leftJoin("primaryWeaponBuild.trait", "primaryWeaponTrait")
			.addSelect(["primaryWeaponTrait.id"])

			.leftJoin("build.secondaryWeapon", "secondaryWeaponBuild")
			.addSelect([
				"secondaryWeaponBuild.id",
				"secondaryWeaponBuild.rarity",
				"secondaryWeaponBuild.weaponId",
				"secondaryWeaponBuild.powerLevel",
				"secondaryWeaponBuild.property1Value",
				"secondaryWeaponBuild.property2Value",
			])
			.leftJoin("secondaryWeaponBuild.weapon", "secondaryWeapon")
			.addSelect(["secondaryWeapon.id"])
			.leftJoin("secondaryWeaponBuild.property1", "secondaryWeaponProperty1")
			.addSelect(["secondaryWeaponProperty1.id"])
			.leftJoin("secondaryWeaponBuild.property2", "secondaryWeaponProperty2")
			.addSelect(["secondaryWeaponProperty2.id"])
			.leftJoin("secondaryWeaponBuild.trait", "secondaryWeaponTrait")
			.addSelect(["secondaryWeaponTrait.id"])
			.leftJoin("build.necklace", "necklace")
			.addSelect(["necklace.id", "necklace.rarity", "necklace.powerLevel", "necklace.property1Value", "necklace.property2Value"])
			.leftJoin("necklace.property1", "necklaceProperty1")
			.addSelect(["necklaceProperty1.id"])
			.leftJoin("necklace.property2", "necklaceProperty2")
			.addSelect(["necklaceProperty2.id"])
			.leftJoin("necklace.trait", "necklaceTrait")
			.addSelect(["necklaceTrait.id"])
			.leftJoin("build.charm", "charm")
			.addSelect(["charm.id", "charm.rarity", "charm.powerLevel", "charm.property1Value", "charm.property2Value"])
			.leftJoin("charm.property1", "charmProperty1")
			.addSelect(["charmProperty1.id"])
			.leftJoin("charm.property2", "charmProperty2")
			.addSelect(["charmProperty2.id"])
			.leftJoin("charm.trait", "charmTrait")
			.addSelect(["charmTrait.id"])
			.leftJoin("build.trinket", "trinket")
			.addSelect(["trinket.id", "trinket.rarity", "trinket.powerLevel", "trinket.property1Value", "trinket.property2Value"])
			.leftJoin("trinket.property1", "trinketProperty1")
			.addSelect(["trinketProperty1.id"])
			.leftJoin("trinket.property2", "trinketProperty2")
			.addSelect(["trinketProperty2.id"])
			.leftJoin("trinket.trait", "trinketTrait")
			.addSelect(["trinketTrait.id"])
			.leftJoin("build.level5Talent", "level5Talent")
			.addSelect(["level5Talent.id", "level5Talent.talentNumber"])
			.leftJoin("build.level10Talent", "level10Talent")
			.addSelect(["level10Talent.id", "level10Talent.talentNumber"])
			.leftJoin("build.level15Talent", "level15Talent")
			.addSelect(["level15Talent.id", "level15Talent.talentNumber"])
			.leftJoin("build.level20Talent", "level20Talent")
			.addSelect(["level20Talent.id", "level20Talent.talentNumber"])
			.leftJoin("build.level25Talent", "level25Talent")
			.addSelect(["level25Talent.id", "level25Talent.talentNumber"])
			.leftJoin("build.level30Talent", "level30Talent")
			.addSelect(["level30Talent.id", "level30Talent.talentNumber"])
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

		if (isBot) {
			query = query.andWhere(`build.isBot = :isBot`, { isBot: isBot });
		}

		if (isDeathwish) {
			query = query.andWhere(`build.isDeathwish = :isDeathwish`, { isDeathwish: isDeathwish });
		}

		if (isTwitch) {
			query = query.andWhere(`build.isTwitch = :isTwitch`, { isTwitch: isTwitch });
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

		// Default to 10 if no limit is provided and also limit to maximum of 10
		if (!limit || limit > 10) {
			limit = 10;
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
	let patches = await PatchesCache.getAll();

	for (let build of data.entities) {
		if (!build.careerId) {
			continue;
		}

		let buildPojo = build.toObject({ exposeUnsetFields: false });
		/* 		buildPojo.career = await CareerCache.get(build.careerId!);
		buildPojo.primaryWeapon.weapon = await WeaponCache.get(build.primaryWeapon.weaponId!);
		buildPojo.secondaryWeapon.weapon = await WeaponCache.get(build.secondaryWeapon.weaponId!); */
		buildPojo.patchNumber = BuildHelper.getPatch(buildPojo, patches)?.number;
		buildPojo.ratingsCount = parseInt(data.raw.find((r) => r.build_id === build.id)?.build_ratingscount || "0");
		buildPojo.favoritesCount = parseInt(data.raw.find((r) => r.build_id === build.id)?.build_favoritescount || "0");
		builds.push(buildPojo);
	}

	return new Response(JSON.stringify({ items: builds, count: dataCount }), { status: 200 });
};
