import { CareerBuild } from "$lib/entities/builds/CareerBuild";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { CareerCache, WeaponsCache } from "$lib/cache/RedisCache";

export const GET: RequestHandler = async ({ url, params }) => {
	const id = url.searchParams.get("id");

	if (!id) {
		error(404, "No ID provided.");
	}

	let careerBuild: CareerBuild | null = null;

	let query = CareerBuild.createQueryBuilder("build")
		.leftJoin("build.user", "user")
		.addSelect(["user.id", "user.name"])
		.leftJoinAndSelect("build.difficulty", "difficulty")
		.leftJoinAndSelect("build.difficultyModifier", "difficultyModifier")
		.leftJoinAndSelect("build.mission", "mission")
		.leftJoinAndSelect("build.potion", "potion")
		.leftJoinAndSelect("build.book", "book")
		.leftJoinAndSelect("build.roles", "roles")
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
		.leftJoinAndSelect("primaryWeaponBuild.illusion", "pwb.illusion")
		.leftJoinAndSelect("secondaryWeaponBuild.property1", "swb.property1")
		.leftJoinAndSelect("secondaryWeaponBuild.property2", "swb.property2")
		.leftJoinAndSelect("secondaryWeaponBuild.trait", "swb.trait")
		.leftJoinAndSelect("secondaryWeaponBuild.illusion", "swb.illusion")
		.leftJoinAndSelect("necklace.property1", "necklaceBuild.property1")
		.leftJoinAndSelect("necklace.property2", "necklaceBuild.property2")
		.leftJoinAndSelect("necklace.trait", "necklaceBuild.trait")
		.leftJoinAndSelect("necklace.illusion", "necklaceBuild.illusion")
		.leftJoinAndSelect("charm.property1", "charmBuild.property1")
		.leftJoinAndSelect("charm.property2", "charmBuild.property2")
		.leftJoinAndSelect("charm.trait", "charmBuild.trait")
		.leftJoinAndSelect("charm.illusion", "charmBuild.illusion")
		.leftJoinAndSelect("trinket.property1", "trinketBuild.property1")
		.leftJoinAndSelect("trinket.property2", "trinketBuild.property2")
		.leftJoinAndSelect("trinket.trait", "trinketBuild.trait")
		.leftJoinAndSelect("trinket.illusion", "trinketBuild.illusion")
		.leftJoinAndSelect("build.level5Talent", "level5Talent")
		.leftJoinAndSelect("build.level10Talent", "level10Talent")
		.leftJoinAndSelect("build.level15Talent", "level15Talent")
		.leftJoinAndSelect("build.level20Talent", "level20Talent")
		.leftJoinAndSelect("build.level25Talent", "level25Talent")
		.leftJoinAndSelect("build.level30Talent", "level30Talent")
		.loadRelationCountAndMap("build.ratingsCount", "build.userRatings")
		.loadRelationCountAndMap("build.favoritesCount", "build.userFavorites");

	if (Number(id)) {
		query = query.where("build.id = :id", { id });
	} else {
		query = query.where("build.firebaseId = :id", { id });
	}

	careerBuild = await query.getOne();

	if (!careerBuild || !careerBuild.careerId || !careerBuild.primaryWeapon.weaponId || !careerBuild.secondaryWeapon.weaponId) {
		return new Response(null, { status: 404 });
	}

	let buildPojo = careerBuild.toObject({ exposeUnsetFields: false });
	buildPojo.career = await CareerCache.get(careerBuild.careerId);
	buildPojo.primaryWeapon.weapon = await WeaponsCache.get(careerBuild.primaryWeapon.weaponId);
	buildPojo.secondaryWeapon.weapon = await WeaponsCache.get(careerBuild.secondaryWeapon.weaponId);

	if (!careerBuild.careerId) {
		error(404, `Build ${id} does not have a career.`);
	}

	return new Response(JSON.stringify(buildPojo));
};
