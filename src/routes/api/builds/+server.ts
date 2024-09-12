import { CareerCache } from "$lib/cache/CareerCache";
import { WeaponCache } from "$lib/cache/WeaponCache";
import { CareerBuild, type ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { DataHelper } from "$lib/helpers/DataHelper";
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
	let search = url.searchParams.get("search");
	let sort = url.searchParams.get("sort");
	let asc = url.searchParams.get("asc") === "true";
	let favorite = url.searchParams.get("favorite") === "true";
	let rated = url.searchParams.get("rated") === "true";
	let favoriteByUserId = url.searchParams.get("favoriteByUser");
	let ratedByUserId = url.searchParams.get("ratedByUser");
	let isDeleted = url.searchParams.get("isDeleted") === "true";

	let data = null;
	let dataCount = null;
	try {
		let query = CareerBuild.createQueryBuilder("build")
			.leftJoinAndSelect("build.user", "user")
			.leftJoinAndSelect("build.difficulty", "difficulty")
			.leftJoinAndSelect("build.difficultyModifier", "difficultyModifier")
			.leftJoinAndSelect("build.mission", "mission")
			.leftJoinAndSelect("build.potion", "potion")
			.leftJoinAndSelect("build.book", "book")
			.leftJoinAndSelect("build.twitch", "twitch")
			.leftJoinAndSelect("build.roles", "roles")
			.leftJoinAndSelect("build.career", "career")
			.leftJoinAndSelect("build.primaryWeapon", "primaryWeaponBuild")
			.leftJoin("primaryWeaponBuild.weapon", "primaryWeapon")
			.leftJoinAndSelect("build.secondaryWeapon", "secondaryWeaponBuild")
			.leftJoin("secondaryWeaponBuild.weapon", "secondaryWeapon")
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
			.loadRelationCountAndMap("build.userRatingsCount", "build.userRatings")
			.loadRelationCountAndMap("build.userFavoritesCount", "build.userFavorites");

		if (userId) {
			query = query.andWhere(`user.id = :userId`, { userId: userId });
		}

		if (search) {
			query = query.andWhere(
				`CONCAT_WS(' ', build.name, build.description, user.name, career.name, hero.name, primaryWeapon.weapon.name, secondaryWeapon.weapon.name) ILIKE :search`,
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
				query = query.andWhere(`career.id = :careerId`, { careerId: careerId });
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

		if (sort) {
			query = query.orderBy(`build.${sort}`, asc ? "ASC" : "DESC");
		}

		if (favorite) {
			query = query.andWhere(`userFavorites.id = :userId`, { userId: locals.sessionUser?.id });
		}

		if (rated) {
			query = query.andWhere(`userRatings.id = :userId`, { userId: locals.sessionUser?.id });
		}

		if (favoriteByUserId) {
			query = query.andWhere(`userFavorites.id = :userId`, { userId: favoriteByUserId });
		}

		if (ratedByUserId) {
			query = query.andWhere(`userRatings.id = :userId`, { userId: ratedByUserId });
		}

		if (isDeleted) {
			query = query.andWhere(`build.isDeleted = :isDeleted`, { isDeleted: isDeleted });
		}

		data = await query
			.skip(offset * limit)
			.take(limit)
			.getMany();

		dataCount = await query.getCount();
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	let builds: ICareerBuild[] = [];

	for (let build of data) {
		let buildPojo = build.toObject({ exposeUnsetFields: false });
		buildPojo.career = await CareerCache.get(build.careerId!);
		buildPojo.primaryWeapon.weapon = await WeaponCache.get(build.primaryWeapon.weaponId!);
		buildPojo.secondaryWeapon.weapon = await WeaponCache.get(build.secondaryWeapon.weaponId!);
		builds.push(buildPojo);
	}

	return new Response(JSON.stringify({ items: builds, count: dataCount }), { status: 200 });
};
