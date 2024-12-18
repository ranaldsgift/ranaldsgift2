import { env } from "$env/dynamic/private";
import { BookSetting } from "$lib/entities/BookSetting";
import { BuildRole } from "$lib/entities/BuildRole";
import { Career } from "$lib/entities/career/Career";
import { CareerPerk } from "$lib/entities/career/CareerPerk";
import { CareerSkill } from "$lib/entities/career/CareerSkill";
import { CareerTalent } from "$lib/entities/career/CareerTalent";
import { CareerPassive } from "$lib/entities/career/CareerPassive";
import { Difficulty } from "$lib/entities/Difficulty";
import { Hero } from "$lib/entities/Hero";
import { Mission } from "$lib/entities/Mission";
import { PageViewsCareerBuild } from "$lib/entities/PageViewCareerBuild";
import { Patch } from "$lib/entities/Patch";
import { Potion } from "$lib/entities/Potion";
import { Property } from "$lib/entities/Property";
import { Trait } from "$lib/entities/Trait";
import { TwitchSetting } from "$lib/entities/TwitchSetting";
import { User } from "$lib/entities/User";
import { UserRole } from "$lib/entities/UserRole";
import { Weapon } from "$lib/entities/Weapon";
import { CareerBuild } from "$lib/entities/builds/CareerBuild";
import { CharmBuild } from "$lib/entities/builds/CharmBuild";
import { NecklaceBuild } from "$lib/entities/builds/NecklaceBuild";
import { TrinketBuild } from "$lib/entities/builds/TrinketBuild";
import { WeaponBuild } from "$lib/entities/builds/WeaponBuild";
import { AuthoredEntitySubscriber } from "$lib/entities/subscribers/AuthoredEntitySubscriber";
import { EntitySubscriber } from "$lib/entities/subscribers/EntitySubscriber";
import { DatabaseHelper } from "$lib/helpers/DatabaseHelper";
import { LogHelper } from "$lib/helpers/LogHelper";
import type { SupabaseClient } from "@supabase/supabase-js";
import { DataSource } from "typeorm";
import { DifficultyModifier } from "$lib/entities/DifficultyModifier";
import { Event } from "$lib/entities/Event";
import { CareerBuildCareers } from "$lib/entities/views/CareerBuildCareers";
import { Illusion } from "$lib/entities/ItemIllusion";
import { Team } from "$lib/entities/Team";
import { CareerBuildCareerPrimaryWeapons } from "$lib/entities/views/CareerBuildCareerPrimaryWeapons";
import { CareerBuildPrimaryWeaponProperties } from "$lib/entities/views/CareerBuildPrimaryWeaponProperties";
import { CareerBuildCareerProperties } from "$lib/entities/views/CareerBuildCareerProperties";
import { CareerBuildCareerTraits } from "$lib/entities/views/CareerBuildCareerTraits";
import { CareerBuildSecondaryWeaponProperties } from "$lib/entities/views/CareerBuildSecondaryWeaponProperties";
import { CareerBuildHeroes } from "$lib/entities/views/CareerBuildHeroes";
import { CareerBuildHeroPrimaryWeapons } from "$lib/entities/views/CareerBuildHeroPrimaryWeapons";
import { CareerBuildTalentCounts } from "$lib/entities/views/CareerBuildTalentCounts";
import { CareerBuildCareerSecondaryWeapons } from "$lib/entities/views/CareerBuildCareerSecondaryWeapons";
import { WeaponCounts } from "$lib/entities/views/WeaponCounts";
import { WeaponTraitCounts } from "$lib/entities/views/WeaponTraitCounts";
import { WeaponPropertyCounts } from "$lib/entities/views/WeaponPropertyCounts";
import { CareerWeaponTraitCounts } from "$lib/entities/views/CareerWeaponTraitCounts";
import { CareerWeaponPropertyCounts } from "$lib/entities/views/CareerWeaponPropertyCounts";
import { CareerPrimaryWeaponCounts } from "$lib/entities/views/CareerPrimaryWeaponCounts";
import { CareerSecondaryWeaponCounts } from "$lib/entities/views/CareerSecondaryWeaponCounts";
import { HeroWeaponTraitCounts } from "$lib/entities/views/HeroWeaponTraitCounts";
import { HeroWeaponPropertyCounts } from "$lib/entities/views/HeroWeaponPropertyCounts";
import { HeroPrimaryWeaponCounts } from "$lib/entities/views/HeroPrimaryWeaponCounts";
import { HeroSecondaryWeaponCounts } from "$lib/entities/views/HeroSecondaryWeaponCounts";
import { HeroWeaponCounts } from "$lib/entities/views/HeroWeaponCounts";
import { CareerWeaponCounts } from "$lib/entities/views/CareerWeaponCounts";
import { CareerBuildHeroSecondaryWeapons } from "$lib/entities/views/CareerBuildHeroSecondaryWeapons";
import { TimestampedEntitySubscriber } from "$lib/entities/subscribers/TimestampedEntitySubscriber";

let PRIVATE_SUPABASE_HOST = env.PRIVATE_SUPABASE_HOST;
let PRIVATE_SUPABASE_PASSWORD = env.PRIVATE_SUPABASE_PASSWORD;
let PRIVATE_SUPABASE_USERNAME = env.PRIVATE_SUPABASE_USERNAME;
let PRIVATE_SUPABASE_PORT = parseInt(env.PRIVATE_SUPABASE_PORT ?? "54322");
let PRIVATE_INITIALIZE_DB = env.PRIVATE_INITIALIZE_DB === "true";
let PRIVATE_SYNCHRONIZE_DB = env.PRIVATE_SYNCHRONIZE_DB === "true";

class TypeOrm {
	private static instance: Promise<DataSource | null> = null as any;
	public static initializeDb: boolean = PRIVATE_INITIALIZE_DB;

	private constructor() {
		// Private constructor to prevent external instantiation
	}

	public static getDb(supabaseServiceClient: SupabaseClient | null): Promise<DataSource | null> {
		// TODO - Figure out why using the path instead of specifying each entity doesn't work
		//const __filename = fileURLToPath(import.meta.url);
		//const __dirname = path.dirname(__filename);
		//const entitiesPath = path.resolve(__dirname, "..", "entities/*.ts");

		if (!TypeOrm.instance) {
			TypeOrm.instance = new DataSource({
				type: "postgres",
				host: PRIVATE_SUPABASE_HOST,
				port: PRIVATE_SUPABASE_PORT,
				username: PRIVATE_SUPABASE_USERNAME,
				password: PRIVATE_SUPABASE_PASSWORD,
				database: "postgres",
				entities: [
					User,
					UserRole,
					Hero,
					Career,
					CareerPassive,
					CareerPerk,
					CareerSkill,
					CareerTalent,
					Weapon,
					Illusion,
					Property,
					Trait,
					BuildRole,
					Difficulty,
					DifficultyModifier,
					Mission,
					Patch,
					Potion,
					TwitchSetting,
					BookSetting,
					CareerBuild,
					WeaponBuild,
					CharmBuild,
					NecklaceBuild,
					TrinketBuild,
					PageViewsCareerBuild,
					Event,
					CareerBuildCareers,
					CareerBuildHeroPrimaryWeapons,
					CareerBuildHeroSecondaryWeapons,
					CareerBuildCareerPrimaryWeapons,
					CareerBuildCareerSecondaryWeapons,
					CareerBuildPrimaryWeaponProperties,
					CareerBuildSecondaryWeaponProperties,
					CareerBuildCareerProperties,
					CareerBuildCareerTraits,
					CareerBuildHeroes,
					CareerBuildTalentCounts,
					CareerBuildCareerSecondaryWeapons,
					WeaponTraitCounts,
					WeaponPropertyCounts,
					WeaponCounts,
					CareerWeaponCounts,
					CareerPrimaryWeaponCounts,
					CareerSecondaryWeaponCounts,
					CareerWeaponTraitCounts,
					CareerWeaponPropertyCounts,
					HeroPrimaryWeaponCounts,
					HeroSecondaryWeaponCounts,
					HeroWeaponCounts,
					HeroWeaponTraitCounts,
					HeroWeaponPropertyCounts,
					Team,
				],
				migrations: [],
				subscribers: [EntitySubscriber, AuthoredEntitySubscriber, TimestampedEntitySubscriber],
				logging: false,
				// For development only
				synchronize: PRIVATE_SYNCHRONIZE_DB,
				dropSchema: PRIVATE_INITIALIZE_DB,
			})
				.initialize()
				.then(async (db) => {
					LogHelper.info("Data Source has been initialized!");

					if (TypeOrm.initializeDb) {
						LogHelper.debug("Performing initial data sync");
						await DatabaseHelper.initialize(supabaseServiceClient, db?.manager.queryRunner);
						TypeOrm.initializeDb = false;
						LogHelper.info("Initial data sync completed successfully!");
					}

					return db;
				})
				.catch((err) => {
					LogHelper.error(`Error during Data Source initialization ${err}`);
					return null;
				});
		}
		return TypeOrm.instance;
	}
}

export default TypeOrm;
