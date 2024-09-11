import { CareerBuild } from "$lib/entities/builds/CareerBuild";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, params }) => {
	const id = url.searchParams.get("id");

	if (!id) {
		error(404, "No ID provided.");
	}

	let careerBuild: CareerBuild | null = null;

	let query = CareerBuild.createQueryBuilder("build")
		.leftJoin("build.user", "user")
		.leftJoinAndSelect("build.career", "career")
		.leftJoinAndSelect("build.difficulty", "difficulty")
		.leftJoinAndSelect("build.difficultyModifier", "difficultyModifier")
		.leftJoinAndSelect("build.mission", "mission")
		.leftJoinAndSelect("build.potion", "potion")
		.leftJoinAndSelect("build.book", "book")
		.leftJoinAndSelect("build.twitch", "twitch")
		.leftJoinAndSelect("build.roles", "roles")
		.leftJoinAndSelect("career.hero", "hero")
		.leftJoinAndSelect("career.skill", "careerSkill")
		.leftJoinAndSelect("career.passive", "careerPassive")
		.leftJoinAndSelect("career.perks", "careerPerks")
		.leftJoinAndSelect("career.talents", "careerTalents")
		.orderBy("careerTalents.id", "ASC")
		.leftJoinAndSelect("build.primaryWeapon", "primaryWeaponBuild")
		.leftJoin("primaryWeaponBuild.weapon", "primaryWeapon")
		.leftJoinAndSelect("primaryWeapon.tooltips", "primaryWeaponTooltips")
		.leftJoinAndSelect("build.secondaryWeapon", "secondaryWeaponBuild")
		.leftJoin("secondaryWeaponBuild.weapon", "secondaryWeapon")
		.leftJoinAndSelect("secondaryWeapon.tooltips", "secondaryWeaponTooltips")
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
		.loadRelationCountAndMap("build.favoritesCount", "build.userFavorites")
		.loadRelationCountAndMap("build.ratingsCount", "build.userRatings")
		.andWhere(`build.isDeleted = :isDeleted`, { isDeleted: false });

	query.addSelect("primaryWeapon.id");
	query.addSelect("primaryWeapon.name");
	query.addSelect("primaryWeapon.codename");

	query.addSelect("secondaryWeapon.id");
	query.addSelect("secondaryWeapon.name");
	query.addSelect("secondaryWeapon.codename");

	query.addSelect("user.id");
	query.addSelect("user.name");

	if (Number.isInteger(parseInt(id))) {
		query.andWhere(`build.id = :id`, { id: parseInt(id) });
	}
	// Otherwise, it's the old firebase user ID
	else {
		query.andWhere(`build.firebaseId = :id`, { id });
	}

	careerBuild = await query.getOne();

	if (!careerBuild) {
		return new Response(null, { status: 404 });
	}

	if (!careerBuild.careerId) {
		error(404, `Build ${id} does not have a career.`);
	}

	let buildPojo = careerBuild.toObject({ exposeUnsetFields: false });

	return new Response(JSON.stringify(buildPojo));
};
