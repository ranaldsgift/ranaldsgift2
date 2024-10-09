import { Career } from "$lib/entities/career/Career";
import { CareerPerk } from "$lib/entities/career/CareerPerk";
import { CareerSkill } from "$lib/entities/career/CareerSkill";
import { CareerTalent, type ICareerTalent } from "$lib/entities/career/CareerTalent";
import { CareerPassive } from "$lib/entities/career/CareerPassive";
import { Hero } from "$lib/entities/Hero";
import { Weapon, WeaponTooltip } from "$lib/entities/Weapon";
import { LegacyDataHelper, type LegacyTraitCategory } from "./LegacyDataHelper";
import { LogHelper } from "./LogHelper";
import { Trait } from "$lib/entities/Trait";
import { Property } from "$lib/entities/Property";
import { unlistedPerksData } from "$lib/data/legacy/UnlistedPerks";
import { roleData } from "$lib/data/legacy/Roles";
import { BuildRole } from "$lib/entities/BuildRole";
import { missionData } from "$lib/data/legacy/Missions";
import { Mission } from "$lib/entities/Mission";
import { patchList } from "$lib/data/legacy/PatchList";
import { Patch } from "$lib/entities/Patch";
import { potionData } from "$lib/data/legacy/Potions";
import { Potion } from "$lib/entities/Potion";
import { twitchData } from "$lib/data/legacy/Twitch";
import { TwitchSetting } from "$lib/entities/TwitchSetting";
import { difficultyData } from "$lib/data/legacy/Difficulties";
import { Difficulty } from "$lib/entities/Difficulty";
import { firebaseData } from "$lib/data/legacy/FirebaseBackup";
import { User } from "$lib/entities/User";
import { EnumHelper } from "./EnumHelper";
import { UserRoleEnum } from "$lib/enums/UserRoleEnum";
import { PatchTypeEnum } from "$lib/enums/PatchTypeEnum";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { QueryRunner } from "typeorm";
import { CareerBuild } from "$lib/entities/builds/CareerBuild";
import { WeaponBuild } from "$lib/entities/builds/WeaponBuild";
import { CharmBuild } from "$lib/entities/builds/CharmBuild";
import { NecklaceBuild } from "$lib/entities/builds/NecklaceBuild";
import { TrinketBuild } from "$lib/entities/builds/TrinketBuild";
import { BookSetting } from "$lib/entities/BookSetting";
import { bookData } from "$lib/data/legacy/Books";
import { env } from "$env/dynamic/private";
import PropertyCategoryEnum from "$lib/enums/PropertyCategoryEnum";
import TraitCategoryEnum from "$lib/enums/TraitCategoryEnum";
import { CareerCache } from "$lib/cache/CareerCache";
import { plainToInstance } from "class-transformer";
import { DifficultyModifier } from "$lib/entities/DifficultyModifier";

// Use this flag to import data from Firebase into Supabase
let IMPORT_FIREBASE_DATA = true;

export class DatabaseHelper {
	/**
	 * Initializes the database with data for Heroes, Careers, Weapons
	 *
	 * @param supabase Supabase client with service role key instead of anon key. This is used for user migration only.
	 */
	static async initialize(supabase: SupabaseClient | null = null, queryRunner: QueryRunner | null = null) {
		try {
			await this.createHeroes();
			await this.createCareers();
			await this.createProperties();
			await this.createTraits();
			await this.createWeapons();
			await this.createUnlistedCareerPerks();
			await this.createBuildRoles();
			await this.createMissions();
			await this.createPatches();
			await this.createPotions();
			//await this.createTwitchSettings();
			await this.createBookSettings();
			await this.createDifficulties();
			await this.createDifficultyModifiers();

			// TODO - Realistically this logic is not related to this app and should be a separate service
			// It may be worth keeping just to be used to populate the database with "dummy" data for "testing"
			// Since I'm usually lazy and don't typically write any unit tests this will likely end up being useful
			if (IMPORT_FIREBASE_DATA) {
				if (supabase) {
					await this.importFirebaseUserData(supabase);
					await this.importFirebaseBuildData();
					//await this.updateUserRatings();
				} else {
					LogHelper.info("Supabase client with service role not initialized. Skipping user data import.");
				}
			}

			queryRunner?.query(`
                create or replace function public.handle_new_user()
                returns trigger as $$
                begin
                insert into public.user (id)
                values (new.id);
                return new;
                end;
                $$ language plpgsql security definer;
    
                drop trigger on_auth_user_created on auth.users;
    
                create trigger on_auth_user_created
                after insert on auth.users
                for each row execute procedure public.handle_new_user();
            `);
		} catch (error) {
			LogHelper.error(`Error initializing database!`);
			console.log(error);
		}
	}

	/**
	 * Populates the database with initial Hero data from legacy data
	 */
	private static async createHeroes() {
		LogHelper.info("Creating heroes...");
		const careers = LegacyDataHelper.getCareers();
		const uniqueHeroes = [...new Set(careers.map((career) => career.heroName))];

		for (var heroName of uniqueHeroes) {
			var hero = await Hero.findOne({ where: { name: heroName } });

			if (hero) {
				LogHelper.info(`Hero with name ${heroName} already exists in the database. Skipping...`);
				continue;
			}

			hero = new Hero();
			hero.name = heroName;
			await hero.save();
		}

		LogHelper.info("Created heroes successfully!");
	}

	/**
	 * Populates the database with initial Career data from legacy data
	 */
	private static async createCareers() {
		LogHelper.info("Creating careers...");
		const careers = LegacyDataHelper.getCareers();

		for (var oldCareer of careers) {
			var career = await Career.findOne({ where: { codename: oldCareer.codeName } });

			if (career) {
				LogHelper.info(`Career with codename ${oldCareer.codeName} already exists in the database. Skipping...`);
				continue;
			}

			career = new Career();
			career.name = oldCareer.name;
			career.codename = oldCareer.codeName;
			career.health = oldCareer.health;

			career.passive = new CareerPassive();
			career.passive.name = oldCareer.passive.name;
			career.passive.description = oldCareer.passive.description;

			career.skill = new CareerSkill();
			career.skill.name = oldCareer.skill.name;
			career.skill.description = oldCareer.skill.description;
			career.skill.cooldown = parseInt(oldCareer.skill.cooldown);

			career.perks = [];
			for (var oldPerk of oldCareer.perks) {
				var perk = new CareerPerk();
				perk.name = oldPerk.name;
				perk.description = oldPerk.description;
				career.perks.push(perk);
			}

			career.talents = [];
			var talentNumber = 1;
			for (var oldTalent of oldCareer.talents) {
				var talent = new CareerTalent();
				talent.name = oldTalent.name;
				talent.description = oldTalent.description;
				talent.talentNumber = talentNumber++;
				career.talents.push(talent);
			}

			var hero = await Hero.findOne({ where: { name: oldCareer.heroName } });
			if (hero) {
				career.hero = hero;
			}
			await career.save();
		}

		LogHelper.info("Created careers successfully!");
	}

	/**
	 * Populates the database with initial Weapon data from legacy data
	 */
	private static async createWeapons() {
		LogHelper.info("Creating weapons...");
		let legacyWeapons = LegacyDataHelper.getWeapons();
		legacyWeapons = legacyWeapons.sort((a: any, b: any) => a.id - b.id);

		for (var oldWeapon of legacyWeapons) {
			var weapon = await Weapon.findOne({
				where: { codename: oldWeapon.codeName },
				relations: { canWieldPrimary: true, canWieldSecondary: true },
			});

			if (weapon) {
				LogHelper.info(`Weapon with codename ${oldWeapon.codeName} already exists in the database. Skipping...`);
				continue;
			}

			weapon = new Weapon();
			weapon.name = oldWeapon.name;
			weapon.codename = oldWeapon.codeName;
			weapon.description = oldWeapon.flavorText;

			for (var careerCodename of oldWeapon.canWieldPrimary) {
				var career = await Career.findOne({ where: { codename: careerCodename } });
				if (career) {
					if (!weapon.canWieldPrimary) {
						weapon.canWieldPrimary = [];
					}
					weapon.canWieldPrimary.push(career);
				}
			}

			for (var careerCodename of oldWeapon.canWieldSecondary) {
				var career = await Career.findOne({ where: { codename: careerCodename } });
				if (!weapon.canWieldSecondary) {
					weapon.canWieldSecondary = [];
				}
				if (career) {
					weapon.canWieldSecondary.push(career);
				}
			}

			weapon.tooltips = [];

			for (var i = 0; i < oldWeapon.description.split(", ").length; i++) {
				var tooltip = await WeaponTooltip.findOne({ where: { codename: oldWeapon.description.split(", ")[i] } });

				if (!tooltip) {
					tooltip = new WeaponTooltip();
					tooltip.name = oldWeapon.tooltipLocalized.split(", ")[i];
					tooltip.codename = oldWeapon.description.split(", ")[i];
					await tooltip.save();
				}
				weapon.tooltips.push(tooltip);
			}

			weapon.dodgeDistance = parseFloat(oldWeapon.dodgeDistance);
			weapon.dodgeSpeed = parseFloat(oldWeapon.dodgeSpeed);

			if (parseInt(oldWeapon.dodgeCount)) {
				weapon.dodgeCount = parseInt(oldWeapon.dodgeCount);
			}

			if (parseInt(oldWeapon.stamina)) {
				weapon.stamina = parseInt(oldWeapon.stamina);
			}

			if (parseFloat(oldWeapon.blockInnerCost)) {
				weapon.blockInnerCost = parseFloat(oldWeapon.blockInnerCost);
			}

			if (parseFloat(oldWeapon.blockOuterCost)) {
				weapon.blockOuterCost = parseFloat(oldWeapon.blockOuterCost);
			}

			if (parseInt(oldWeapon.blockAngle)) {
				weapon.blockAngle = parseInt(oldWeapon.blockAngle);
			}

			if (parseFloat(oldWeapon.rightClickMovementModifier)) {
				weapon.rightClickMovementModifier = parseFloat(oldWeapon.rightClickMovementModifier);
			}

			const traitCategory = EnumHelper.getValues(TraitCategoryEnum).find((value) => value === oldWeapon.traitCategory);
			if (!traitCategory) {
				LogHelper.error(`Trait category with name ${oldWeapon.traitCategory} is unknown.`);
				continue;
			}

			weapon.traitCategory = traitCategory;
			const traits = await Trait.find({ where: { category: traitCategory } });
			weapon.traits = traits;

			const propertyCategory = EnumHelper.getValues(PropertyCategoryEnum).find((value) => value === oldWeapon.propertyCategory);
			if (!propertyCategory) {
				LogHelper.error(`Property category with name ${oldWeapon.propertyCategory} is unknown.`);
				continue;
			}
			weapon.propertyCategory = propertyCategory;
			const properties = await Property.find({ where: { category: propertyCategory } });
			weapon.properties = properties;

			await weapon.save();
		}

		LogHelper.info("Created weapons successfully!");
	}

	/**
	 * Populates the database with initial Property data from legacy data
	 */
	private static async createProperties() {
		LogHelper.info("Creating properties...");

		const legacyProperties = LegacyDataHelper.getProperties();

		for (var oldPropertyCategory of legacyProperties) {
			const propertyCategory = EnumHelper.getValues(PropertyCategoryEnum).find((key) => key === oldPropertyCategory.name);
			if (!propertyCategory) {
				LogHelper.error(`Property category with name ${oldPropertyCategory.name} is unknown.`);
				continue;
			}

			for (var oldProperty of oldPropertyCategory.properties) {
				var property = await Property.findOne({ where: { name: oldProperty.name, category: propertyCategory } });

				if (property) {
					LogHelper.info(`Property with name ${oldProperty.name} already exists in the database. Skipping...`);
					continue;
				}

				property = new Property();
				property.name = oldProperty.name;
				property.description = oldProperty.description;
				property.category = propertyCategory;
				property.minimumValue = oldProperty.min_value;
				property.maximumValue = oldProperty.max_value;
				property.step = oldProperty.step;

				await property.save();
			}
		}

		LogHelper.info("Created properties successfully!");
	}

	/**
	 * Populates the database with initial Trait data from legacy data
	 */
	private static async createTraits() {
		LogHelper.info("Creating traits...");

		const legacyTraits = LegacyDataHelper.getTraits();

		for (var oldTraitCategory of legacyTraits) {
			const traitCategory = EnumHelper.getValues(TraitCategoryEnum).find((key) => key === oldTraitCategory.name);
			if (!traitCategory) {
				LogHelper.error(`Trait category with name ${oldTraitCategory.name} is unknown.`);
				continue;
			}

			for (var oldTrait of oldTraitCategory.traits) {
				var trait = await Trait.findOne({ where: { name: oldTrait.name, category: traitCategory } });

				if (trait) {
					LogHelper.info(`Trait with name ${oldTrait.name} already exists in the database. Skipping...`);
					continue;
				}

				trait = new Trait();
				trait.name = oldTrait.name;
				trait.description = oldTrait.description;
				trait.category = traitCategory;
				await trait.save();
			}
		}

		LogHelper.info("Created traits successfully!");
	}

	/**
	 * Populates the database with initial Career Perks that are not listed in the game
	 */
	private static async createUnlistedCareerPerks() {
		LogHelper.info("Creating unlisted career perks...");

		for (var oldPerk of unlistedPerksData) {
			var perk = await CareerPerk.findOne({ where: { name: oldPerk.name } });

			if (perk) {
				LogHelper.info(`Perk with name ${oldPerk.name} already exists in the database. Skipping...`);
				continue;
			}

			perk = new CareerPerk();
			perk.name = oldPerk.name;
			perk.description = oldPerk.description;
			var career = await Career.findOne({ where: { id: oldPerk.careerId } });
			if (career) {
				perk.career = career;
			}
			await perk.save();
		}

		LogHelper.info("Created unlisted career perks successfully!");
	}

	/**
	 * Populates the database with initial Build Role data
	 */
	private static async createBuildRoles() {
		LogHelper.info("Creating build roles...");

		for (var oldBuildRole of roleData) {
			var buildRole = await BuildRole.findOne({ where: { name: oldBuildRole.name } });

			if (buildRole) {
				LogHelper.info(`Build role with name ${oldBuildRole.name} already exists in the database. Skipping...`);
				continue;
			}

			buildRole = new BuildRole();
			buildRole.name = oldBuildRole.name;
			await buildRole.save();
		}

		LogHelper.info("Created build roles successfully!");
	}

	/**
	 * Populates the database with initial Difficulty data
	 */
	private static async createDifficulties() {
		LogHelper.info("Creating difficulties...");

		for (var oldDifficulty of difficultyData) {
			var difficulty = await Difficulty.findOne({ where: { name: oldDifficulty.name } });

			if (difficulty) {
				LogHelper.info(`Difficulty with name ${oldDifficulty.name} already exists in the database. Skipping...`);
				continue;
			}

			let difficultyName = oldDifficulty.name;
			if (difficultyName === "C1DWONS") {
				difficultyName = "Cataclysm 2";
			}
			if (difficultyName === "C3DWONS") {
				difficultyName = "Cataclysm 3";
			}

			difficulty = new Difficulty();
			difficulty.name = difficultyName;
			await difficulty.save();
		}

		LogHelper.info("Created difficulties successfully!");
	}

	/**
	 * Populates the database with initial Difficulty Modifier data
	 */
	private static async createDifficultyModifiers() {
		LogHelper.info("Creating difficulty modifiers...");

		const difficultyModifiers = ["Onslaught", "Onslaught+", "Dutch Spice Tourney Version", "Spicy Onslaught"];

		for (var difficultyModifierName of difficultyModifiers) {
			var difficultyModifierEntity = await DifficultyModifier.findOne({ where: { name: difficultyModifierName } });

			if (difficultyModifierEntity) {
				LogHelper.info(`Difficulty modifier with name ${difficultyModifierName} already exists in the database. Skipping...`);
				continue;
			}

			difficultyModifierEntity = new DifficultyModifier();
			difficultyModifierEntity.name = difficultyModifierName;
			await difficultyModifierEntity.save();
		}

		LogHelper.info("Created difficulties successfully!");
	}

	/**
	 * Populates the database with initial Mission data
	 */
	private static async createMissions() {
		LogHelper.info("Creating missions...");

		for (var oldMission of missionData) {
			var mission = await Mission.findOne({ where: { name: oldMission.name } });

			if (mission) {
				LogHelper.info(`Mission with name ${oldMission.name} already exists in the database. Skipping...`);
				continue;
			}

			mission = new Mission();
			mission.name = oldMission.name;
			await mission.save();
		}

		LogHelper.info("Created missions successfully!");
	}

	/**
	 * Populates the database with initial Patch data
	 */
	private static async createPatches() {
		LogHelper.info("Creating patches...");

		for (var oldPatch of patchList) {
			var patch = await Patch.findOne({ where: { number: oldPatch.number } });

			if (patch) {
				LogHelper.info(`Patch with number ${oldPatch.number} already exists in the database. Skipping...`);
				continue;
			}

			patch = new Patch();
			patch.type = PatchTypeEnum[oldPatch.type as "Hotfix" | "Update"];
			patch.number = oldPatch.number;
			patch.date = oldPatch.date;
			await patch.save();
		}

		LogHelper.info("Created patches successfully!");
	}

	/**
	 * Populates the database with initial Potion data
	 */
	private static async createPotions() {
		LogHelper.info("Creating potions...");

		for (var oldPotion of potionData) {
			var potion = await Potion.findOne({ where: { name: oldPotion.name } });

			if (potion) {
				LogHelper.info(`Potion with name ${oldPotion.name} already exists in the database. Skipping...`);
				continue;
			}

			potion = new Potion();
			potion.name = oldPotion.name;
			await potion.save();
		}

		LogHelper.info("Created potions successfully!");
	}

	/**
	 * Populates the database with initial Twitch settings
	 */
	private static async createTwitchSettings() {
		LogHelper.info("Creating Twitch settings...");

		for (var oldTwitchSetting of twitchData) {
			var twitchSetting = await TwitchSetting.findOne({ where: { name: oldTwitchSetting.name } });

			if (twitchSetting) {
				LogHelper.info(`Twitch settings with name ${oldTwitchSetting.name} already exists in the database. Skipping...`);
				continue;
			}

			twitchSetting = new TwitchSetting();
			twitchSetting.name = oldTwitchSetting.name;
			await twitchSetting.save();
		}

		LogHelper.info("Created Twitch settings successfully!");
	}

	/**
	 * Populates the database with initial Book settings for builds
	 */
	private static async createBookSettings() {
		LogHelper.info("Creating Book settings...");

		for (var oldBookSetting of bookData) {
			var bookSetting = await BookSetting.findOne({ where: { name: oldBookSetting.name } });

			if (bookSetting) {
				LogHelper.info(`Twitch settings with name ${oldBookSetting.name} already exists in the database. Skipping...`);
				continue;
			}

			bookSetting = new BookSetting();
			bookSetting.name = oldBookSetting.name;
			await bookSetting.save();
		}

		LogHelper.info("Created Twitch settings successfully!");
	}

	/**
	 * Use this function to migrate user data from Firebase to the the supabase database
	 */
	private static async importFirebaseUserData(supabase: SupabaseClient) {
		LogHelper.info("Importing user data from Firebase...");

		const firebaseUserIds: string[] = Object.keys(firebaseData.__collections__.users);
		const firebaseUserData: FirebaseUserData[] = Object.values(firebaseData.__collections__.users);

		const {
			data: { users },
			error,
		} = await supabase.auth.admin.listUsers({ page: 1, perPage: 3000 });

		if (error) {
			LogHelper.error(`Error fetching users from Supabase: ${error.message}`);
			return;
		}

		var supabaseUsers = users.map((user) => {
			return {
				id: user.id,
				email: user.email,
				firebaseId: user.user_metadata.fbuser?.uid,
			};
		});

		for (var i = 0; i < firebaseUserIds.length; i++) {
			var supabaseUser = supabaseUsers.find((user) => user.firebaseId === firebaseUserIds[i]);
			if (!supabaseUser) {
				LogHelper.error(`User with firebase ID ${firebaseUserIds[i]} not found in Supabase database.`);
				// TODO - Implement user creation in Supabase instead of using external script
				continue;
			}

			var user = await User.findOne({ where: { id: supabaseUser.id } });

			if (user) {
				LogHelper.info(`User with ID ${supabaseUser.id} already exists in the database. Skipping...`);
				continue;
			}

			user = new User();
			user.id = supabaseUser.id;
			user.firebaseId = firebaseUserIds[i];
			user.name = firebaseUserData[i].username;
			user.discord = firebaseUserData[i].discord;
			user.youtube = firebaseUserData[i].youtube;
			user.twitch = firebaseUserData[i].twitch;
			user.steam = firebaseUserData[i].steam;
			user.showVideo = firebaseUserData[i].showVideo ?? false;
			user.role = UserRoleEnum.Member;

			var seconds = firebaseUserData[i].dateCreated.value._seconds;
			var nanoseconds = firebaseUserData[i].dateCreated.value._nanoseconds;
			var dateCreated = new Date(seconds * 1000 + nanoseconds / 1000000);
			user.dateCreated = dateCreated;

			seconds = firebaseUserData[i].dateModified.value._seconds;
			nanoseconds = firebaseUserData[i].dateModified.value._nanoseconds;
			var dateModified = new Date(seconds * 1000 + nanoseconds / 1000000);
			user.dateModified = dateModified;

			await user.save();
		}

		LogHelper.info("Imported user data from Firebase successfully!");
	}

	private static async updateUserRatings() {
		const firebaseUserIds: string[] = Object.keys(firebaseData.__collections__.users);
		const firebaseUserData: FirebaseUserData[] = Object.values(firebaseData.__collections__.users);

		for (var i = 0; i < firebaseUserIds.length; i++) {
			let user = await User.findOne({ where: { firebaseId: firebaseUserIds[i] } });
			if (!user) {
				LogHelper.error(
					`Cannot update user ratings for user with firebase ID ${firebaseUserIds[i]}. User not found in the database.`
				);
				continue;
			}

			if (firebaseUserData[i].likedBuilds && firebaseUserData[i].likedBuilds.length > 0) {
				for (var firebaseBuildId of firebaseUserData[i].likedBuilds) {
					/*                    let userRating = await UserBuildRating.findOne({ where: { user: user, build: { firebaseId: firebaseBuildId } } });

                    if (userRating) {
                        LogHelper.info(`User rating for build with firebase ID ${firebaseBuildId} already exists in the database. Skipping...`);
                        continue;
                    }

                    let build = await CareerBuild.findOne({ where: { firebaseId: firebaseBuildId } });

                    if (!build) {
                        LogHelper.error(`Build with firebase ID ${firebaseBuildId} not found in the database.`);
                        continue;
                    }
                    userRating = new UserBuildRating();
                    userRating.user = user;
                    userRating.build = build;
                    await userRating.save(); */
				}
			}
		}
	}

	private static isBotBuild(firebaseBuild: FirebaseBuild) {
		const lowerCaseName = firebaseBuild.name.toLowerCase();

		if (
			lowerCaseName.includes("bot|") ||
			lowerCaseName.includes("bot build") ||
			lowerCaseName.includes("build bot") ||
			lowerCaseName.includes(" bot ")
		) {
			LogHelper.info(`Build with name ${firebaseBuild.name} is a bot build.`);
			return true;
		}
		return false;
	}

	/**
	 * Use this function to migrate build data from Firebase to the the supabase database
	 */
	private static async importFirebaseBuildData() {
		LogHelper.info("Importing build data from Firebase...");

		const buildIds = Object.keys(firebaseData.__collections__.builds);
		const buildData: FirebaseBuild[] = Object.values(firebaseData.__collections__.builds);

		const traitData = await Trait.find();
		const propertyData = await Property.find();
		const weaponData = await Weapon.find();
		const careerData = (await CareerCache.getAll()).map((career) => plainToInstance(Career, career));

		const buildRoleData = await BuildRole.find();
		const difficultyData = await Difficulty.find();
		const missionData = await Mission.find();
		const potionData = await Potion.find();
		const bookData = await BookSetting.find();
		const onslaughtModifier = await DifficultyModifier.findOne({ where: { name: "Onslaught" } });

		for (var i = 0; i < buildIds.length; i++) {
			let firebaseBuild = buildData[i];

			let build = await CareerBuild.findOne({ where: { firebaseId: buildIds[i] } });

			if (build) {
				LogHelper.info(`Build with firebase ID ${buildIds[i]} already exists in the database. Skipping...`);
				continue;
			}

			build = new CareerBuild();

			// Setting User
			let user = await User.findOne({ where: { firebaseId: firebaseBuild.userId } });
			if (!user) {
				LogHelper.error(`User with firebase ID ${firebaseBuild.userId} not found in the database.`);
				continue;
			}
			build.user = user;

			// Setting name, description, and firebase id
			build.firebaseId = buildIds[i];
			build.name = firebaseBuild.name;
			build.description = firebaseBuild.description;

			// Setting Career

			let career = careerData.find((career) => {
				return career.id === firebaseBuild.careerId;
			});
			if (!career) {
				LogHelper.error(`Career with ID ${firebaseBuild.careerId} not found in the database.`);
				continue;
			}
			build.career = career;

			// Setting Primary Weapon

			let primaryWeaponBuild = new WeaponBuild();
			let primaryWeapon = weaponData.find((weapon) => {
				return weapon.id === firebaseBuild.primaryWeapon.id;
			});
			if (!primaryWeapon) {
				LogHelper.error(`Primary weapon with ID ${firebaseBuild.primaryWeapon.id} not found in the database.`);
				continue;
			}
			primaryWeaponBuild.weapon = primaryWeapon;

			let primaryLegacyProperty1 = LegacyDataHelper.getPropertyFromCategory(
				primaryWeapon.propertyCategory,
				firebaseBuild.primaryWeapon.property1Id
			);

			let primaryWeaponProperty1 = propertyData.find((property) => {
				return property.name === primaryLegacyProperty1?.name && property.category === primaryWeapon.propertyCategory;
			});
			if (!primaryWeaponProperty1) {
				LogHelper.error(
					`Property with name ${primaryLegacyProperty1?.name} for category ${primaryWeapon.propertyCategory} not found in the database.`
				);
				continue;
			}
			primaryWeaponBuild.property1 = primaryWeaponProperty1;

			let primaryLegacyProperty2 = LegacyDataHelper.getPropertyFromCategory(
				primaryWeapon.propertyCategory,
				firebaseBuild.primaryWeapon.property2Id
			);

			let primaryWeaponProperty2 = propertyData.find((property) => {
				return property.name === primaryLegacyProperty2?.name && property.category === primaryWeapon.propertyCategory;
			});
			if (!primaryWeaponProperty2) {
				LogHelper.error(
					`Property with name ${primaryLegacyProperty2?.name} for category ${primaryWeapon.propertyCategory} not found in the database.`
				);
				continue;
			}
			primaryWeaponBuild.property2 = primaryWeaponProperty2;

			let primaryLegacyTrait = LegacyDataHelper.getTraitMapById(
				primaryWeapon.traitCategory as LegacyTraitCategory,
				firebaseBuild.primaryWeapon.traitId
			);
			let primaryWeaponTrait = traitData.find((trait) => {
				return trait.name === primaryLegacyTrait?.name && trait.category === primaryWeapon.traitCategory;
			});
			if (!primaryWeaponTrait) {
				LogHelper.error(
					`Trait with name ${primaryLegacyTrait?.name} for category ${primaryWeapon.traitCategory} not found in the database.`
				);
				LogHelper.error(
					`Could not find firebase trait ID ${firebaseBuild.primaryWeapon.traitId} for weapon ID ${firebaseBuild.primaryWeapon.id}`
				);
				continue;
			}
			primaryWeaponBuild.trait = primaryWeaponTrait;
			primaryWeaponBuild.user = user;
			build.primaryWeapon = primaryWeaponBuild;

			// Setting Secondary Weapon
			let secondaryWeaponBuild = new WeaponBuild();

			let secondaryWeapon = weaponData.find((weapon) => {
				return weapon.id === firebaseBuild.secondaryWeapon.id;
			});
			if (!secondaryWeapon) {
				LogHelper.error(`Secondary weapon with ID ${firebaseBuild.secondaryWeapon.id} not found in the database.`);
				continue;
			}
			secondaryWeaponBuild.weapon = secondaryWeapon;

			let secondaryLegacyProperty1 = LegacyDataHelper.getPropertyFromCategory(
				secondaryWeapon.propertyCategory,
				firebaseBuild.secondaryWeapon.property1Id
			);
			let secondaryWeaponProperty1 = propertyData.find((property) => {
				return property.name === secondaryLegacyProperty1?.name && property.category === secondaryWeapon.propertyCategory;
			});
			if (!secondaryWeaponProperty1) {
				LogHelper.error(
					`Property with name ${secondaryLegacyProperty1?.name} for category ${secondaryWeapon.propertyCategory} not found in the database.`
				);
				continue;
			}
			secondaryWeaponBuild.property1 = secondaryWeaponProperty1;

			let secondaryLegacyProperty2 = LegacyDataHelper.getPropertyFromCategory(
				secondaryWeapon.propertyCategory,
				firebaseBuild.secondaryWeapon.property2Id
			);
			let secondaryWeaponProperty2 = propertyData.find((property) => {
				return property.name === secondaryLegacyProperty2?.name && property.category === secondaryWeapon.propertyCategory;
			});
			if (!secondaryWeaponProperty2) {
				LogHelper.error(
					`Property with name ${secondaryLegacyProperty2?.name} for category ${secondaryWeapon.propertyCategory} not found in the database.`
				);
				continue;
			}
			secondaryWeaponBuild.property2 = secondaryWeaponProperty2;

			let secondaryLegacyTrait = LegacyDataHelper.getTraitMapById(
				secondaryWeapon.traitCategory as LegacyTraitCategory,
				firebaseBuild.secondaryWeapon.traitId
			);
			let secondaryWeaponTrait = traitData.find((trait) => {
				return trait.name === secondaryLegacyTrait?.name && trait.category === secondaryWeapon.traitCategory;
			});
			if (!secondaryWeaponTrait) {
				LogHelper.error(
					`Trait with name ${secondaryLegacyTrait?.name} for category ${secondaryWeapon.traitCategory} not found in the database.`
				);
				LogHelper.error(`Could not find firebase trait ID ${firebaseBuild.secondaryWeapon.traitId}`);
				continue;
			}
			secondaryWeaponBuild.trait = secondaryWeaponTrait;
			secondaryWeaponBuild.user = user;
			build.secondaryWeapon = secondaryWeaponBuild;

			// Setting Charm
			let charm = new CharmBuild();

			let charmProperty1 = propertyData.find((property) => {
				return (
					property.name === LegacyDataHelper.getPropertyFromCategory("charm", firebaseBuild.charm.property1Id)?.name &&
					property.category === "charm"
				);
			});
			if (!charmProperty1) {
				LogHelper.error(
					`Property with name ${
						LegacyDataHelper.getPropertyFromCategory("charm", firebaseBuild.charm.property1Id)?.name
					} for category charm not found in the database.`
				);
				continue;
			}
			charm.property1 = charmProperty1;

			let charmProperty2 = propertyData.find((property) => {
				return (
					property.name === LegacyDataHelper.getPropertyFromCategory("charm", firebaseBuild.charm.property2Id)?.name &&
					property.category === "charm"
				);
			});
			if (!charmProperty2) {
				LogHelper.error(
					`Property with name ${
						LegacyDataHelper.getPropertyFromCategory("charm", firebaseBuild.charm.property2Id)?.name
					} for category charm not found in the database.`
				);
				continue;
			}
			charm.property2 = charmProperty2;

			let charmTrait = traitData.find((trait) => {
				return (
					trait.name === LegacyDataHelper.getTraitMapById("offence_accessory", firebaseBuild.charm.traitId)?.name &&
					trait.category === "offence_accessory"
				);
			});
			if (!charmTrait) {
				LogHelper.error(
					`Trait with name ${
						LegacyDataHelper.getTraitMapById("offence_accessory", firebaseBuild.charm.traitId)?.name
					} for category offence_accessory not found in the database.`
				);
				continue;
			}
			charm.trait = charmTrait;
			charm.user = user;
			build.charm = charm;

			// Setting Necklace
			let necklace = new NecklaceBuild();

			let necklaceProperty1 = propertyData.find((property) => {
				return (
					property.name === LegacyDataHelper.getPropertyFromCategory("necklace", firebaseBuild.necklace.property1Id)?.name &&
					property.category === "necklace"
				);
			});
			if (!necklaceProperty1) {
				LogHelper.error(
					`Property with name ${
						LegacyDataHelper.getPropertyFromCategory("necklace", firebaseBuild.necklace.property1Id)?.name
					} for category necklace not found in the database.`
				);
				continue;
			}
			necklace.property1 = necklaceProperty1;

			let necklaceProperty2 = propertyData.find((property) => {
				return (
					property.name === LegacyDataHelper.getPropertyFromCategory("necklace", firebaseBuild.necklace.property2Id)?.name &&
					property.category === "necklace"
				);
			});
			if (!necklaceProperty2) {
				LogHelper.error(
					`Property with name ${
						LegacyDataHelper.getPropertyFromCategory("necklace", firebaseBuild.necklace.property2Id)?.name
					} for category necklace not found in the database.`
				);
				continue;
			}
			necklace.property2 = necklaceProperty2;

			let necklaceTrait = traitData.find((trait) => {
				return (
					trait.name === LegacyDataHelper.getTraitMapById("defence_accessory", firebaseBuild.necklace.traitId)?.name &&
					trait.category === "defence_accessory"
				);
			});
			if (!necklaceTrait) {
				LogHelper.error(
					`Trait with name ${
						LegacyDataHelper.getTraitMapById("defence_accessory", firebaseBuild.necklace.traitId)?.name
					} for category defence_accessory not found in the database.`
				);
				continue;
			}
			necklace.trait = necklaceTrait;
			necklace.user = user;
			build.necklace = necklace;

			// Setting Trinket
			let trinket = new TrinketBuild();

			let trinketProperty1 = propertyData.find((property) => {
				return (
					property.name === LegacyDataHelper.getPropertyFromCategory("trinket", firebaseBuild.trinket.property1Id)?.name &&
					property.category === "trinket"
				);
			});
			if (!trinketProperty1) {
				LogHelper.error(
					`Property with name ${
						LegacyDataHelper.getPropertyFromCategory("trinket", firebaseBuild.trinket.property1Id)?.name
					} for category trinket not found in the database.`
				);
				continue;
			}
			trinket.property1 = trinketProperty1;

			let trinketProperty2 = propertyData.find((property) => {
				return (
					property.name === LegacyDataHelper.getPropertyFromCategory("trinket", firebaseBuild.trinket.property2Id)?.name &&
					property.category === "trinket"
				);
			});
			if (!trinketProperty2) {
				LogHelper.error(
					`Property with name ${
						LegacyDataHelper.getPropertyFromCategory("trinket", firebaseBuild.trinket.property2Id)?.name
					} for category trinket not found in the database.`
				);
				continue;
			}
			trinket.property2 = trinketProperty2;

			let trinketTrait = traitData.find((trait) => {
				return (
					trait.name === LegacyDataHelper.getTraitMapById("utility_accessory", firebaseBuild.trinket.traitId)?.name &&
					trait.category === "utility_accessory"
				);
			});
			if (!trinketTrait) {
				LogHelper.error(
					`Trait with name ${
						LegacyDataHelper.getTraitMapById("utility_accessory", firebaseBuild.trinket.traitId)?.name
					} for category trinket not found in the database.`
				);
				continue;
			}
			trinket.trait = trinketTrait;
			trinket.user = user;
			build.trinket = trinket;

			// Setting Talents
			let talent1 = build.career.talents.find((talent) => {
				return talent.talentNumber === firebaseBuild.talent1;
			});
			if (!talent1) {
				LogHelper.error(`Talent with number ${firebaseBuild.talent1} not found for career ${career.name}`);
				continue;
			}
			build.level5Talent = talent1;

			let talent2 = build.career.talents.find((talent) => {
				return talent.talentNumber === firebaseBuild.talent2 + 3;
			});
			if (!talent2) {
				LogHelper.error(`Talent with number ${firebaseBuild.talent2 + 3} not found for career ${career.name}`);
				continue;
			}
			build.level10Talent = talent2;

			let talent3 = build.career.talents.find((talent) => {
				return talent.talentNumber === firebaseBuild.talent3 + 6;
			});
			if (!talent3) {
				LogHelper.error(`Talent with number ${firebaseBuild.talent3 + 6} not found for career ${career.name}`);
				continue;
			}
			build.level15Talent = talent3;

			let talent4 = build.career.talents.find((talent) => {
				return talent.talentNumber === firebaseBuild.talent4 + 9;
			});
			if (!talent4) {
				LogHelper.error(`Talent with number ${firebaseBuild.talent4 + 9} not found for career ${career.name}`);
				continue;
			}
			build.level20Talent = talent4;

			let talent5 = build.career.talents.find((talent) => {
				return talent.talentNumber === firebaseBuild.talent5 + 12;
			});
			if (!talent5) {
				LogHelper.error(`Talent with number ${firebaseBuild.talent5 + 12} not found for career ${career.name}`);
				continue;
			}
			build.level25Talent = talent5;

			let talent6 = build.career.talents.find((talent) => {
				return talent.talentNumber === firebaseBuild.talent6 + 15;
			});
			if (!talent6) {
				LogHelper.error(`Talent with number ${firebaseBuild.talent6 + 15} not found for career ${career.name}`);
				continue;
			}
			build.level30Talent = talent6;

			// Setting Roles
			if (firebaseBuild.roles) {
				build.roles = [];
				for (var roleId of firebaseBuild.roles) {
					var role = buildRoleData.find((role) => {
						return role.id === roleId;
					});
					if (role) {
						build.roles.push(role);
					}
				}
			}

			// Setting Mission
			if (firebaseBuild.mission) {
				var mission = missionData.find((mission) => {
					return mission.id === firebaseBuild.mission;
				});
				if (mission) {
					build.mission = mission;
				}
			}

			// Setting Difficulty
			if (firebaseBuild.difficulty) {
				let firebaseDifficultyId = firebaseBuild.difficulty;

				// Old builds used 7 and 8 for C1 and C3 respectively, since 8 is now C3 we can keep this but 7 is now Cataclysm 2
				// Assign old builds with C1DWONS to Cataclysm 1 to fix this issue
				// Assign old builds with C1DWONS or C3DWONS to both Deathwish and Onslaught
				if (firebaseDifficultyId === 7 || firebaseDifficultyId === 8) {
					build.isDeathwish = true;
					if (onslaughtModifier) {
						build.difficultyModifier = onslaughtModifier;
					}
				}

				if (firebaseDifficultyId === 7) {
					firebaseDifficultyId = 2;
				}

				var difficulty = difficultyData.find((difficulty) => {
					return difficulty.id === firebaseDifficultyId;
				});

				if (difficulty) {
					build.difficulty = difficulty;
				}
			}

			// Setting Potion
			if (firebaseBuild.potion) {
				var potion = potionData.find((potion) => {
					return potion.id === firebaseBuild.potion;
				});
				if (potion) {
					build.potion = potion;
				}
			}

			// Setting Twitch
			if (firebaseBuild.twitch) {
				build.isTwitch = true;
				switch (firebaseBuild.twitch) {
					case 1:
						build.twitchSpawnSize = 100;
						break;
					case 2:
						build.twitchSpawnSize = 150;
						break;
					case 3:
						build.twitchSpawnSize = 200;
						break;
				}
			}

			// Setting Book
			if (firebaseBuild.book) {
				var book = bookData.find((book) => {
					return book.id === firebaseBuild.book;
				});
				if (book) {
					build.book = book;
				}
			}

			// Setting Videos
			if (firebaseBuild.videos && firebaseBuild.videos.length > 0) {
				build.videos = firebaseBuild.videos;
			}

			// Setting bot
			build.isBot = DatabaseHelper.isBotBuild(firebaseBuild);

			// Save the build
			build = await build.save({ data: { authorizationBypassKey: env.PRIVATE_DATABASE_AUTHORIZATION_BYPASS_KEY } });

			// Verifying and updating rated builds

			if (firebaseBuild.likes) {
				for (var firebaseUserId of firebaseBuild.likes) {
					let user = await User.findOne({ where: { firebaseId: firebaseUserId }, relations: { ratedBuilds: true } });

					if (!user) {
						LogHelper.error(`User with firebase ID ${firebaseUserId} not found in the database.`);
						continue;
					}

					let userRatedBuild = user.ratedBuilds.find((ratedBuild) => {
						return ratedBuild.id === build.id;
					});

					if (userRatedBuild) {
						LogHelper.info(`User with firebase ID ${firebaseUserId} has already rated build with ID ${build.id}. Skipping...`);
						continue;
					}
					user.ratedBuilds.push(build);
					await user.save();
				}
			}
		}
	}
}

interface FirebaseUserData {
	username: string;
	discord: string;
	youtube: string;
	twitch: string;
	steam: string;
	showVideo?: boolean;
	dateCreated: {
		value: { _seconds: number; _nanoseconds: number };
	};
	dateModified: {
		value: { _seconds: number; _nanoseconds: number };
	};
	likedBuilds: string[];
}

interface FirebaseBuild {
	careerId: number;
	favorites: never[];
	secondaryWeapon: { traitId: number; property2Id: number; id: number; property1Id: number };
	trinket: { traitId: number; property2Id: number; property1Id: number };
	roles: number[];
	book?: number;
	primaryWeapon: { traitId: number; property2Id: number; id: number; property1Id: number };
	heroId: number;
	description: string;
	videos: string[];
	dateCreated: {
		value: { _seconds: number; _nanoseconds: number };
	};
	isDeleted: boolean;
	potion?: number;
	twitch?: number;
	dateModified: {
		value: { _seconds: number; _nanoseconds: number };
	};
	necklace: { traitId: number; property2Id: number; property1Id: number };
	userId: string;
	difficulty?: number;
	talent6: number;
	mission: number;
	talent4: number;
	talent5: number;
	charm: { traitId: number; property2Id: number; property1Id: number };
	name: string;
	talent2: number;
	talent3: number;
	talent1: number;
	username: string;
	favoriteCount: number;
	likeCount: number;
	likes: string[];
}
