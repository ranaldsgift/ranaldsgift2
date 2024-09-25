import type { IBookSetting } from "$lib/entities/BookSetting";
import type { IBuildRole } from "$lib/entities/BuildRole";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { Career, type ICareer } from "$lib/entities/career/Career";
import type { IDifficulty } from "$lib/entities/Difficulty";
import type { IDifficultyModifier } from "$lib/entities/DifficultyModifier";
import type { Hero } from "$lib/entities/Hero";
import type { IMission } from "$lib/entities/Mission";
import type { IPatch } from "$lib/entities/Patch";
import type { IPotion } from "$lib/entities/Potion";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";
import type { ITwitchSetting } from "$lib/entities/TwitchSetting";
import { AsyncStore } from "./AsyncStore";

const CACHE_DURATION = 60 * 60 * 1000 * 24; // 24 hours

export const HeroesStore = new AsyncStore<Hero>("/api/heroes");
export const CareersStore = new AsyncStore<ICareer>("/api/careers", CACHE_DURATION);
export const PropertiesStore = new AsyncStore<IProperty>("/api/properties", CACHE_DURATION);
export const TraitsStore = new AsyncStore<ITrait>("/api/traits", CACHE_DURATION);
export const DifficultiesStore = new AsyncStore<IDifficulty>("/api/difficulties", CACHE_DURATION);
export const DifficultyModifiersStore = new AsyncStore<IDifficultyModifier>("/api/difficultymodifiers", CACHE_DURATION);
export const MissionsStore = new AsyncStore<IMission>("/api/missions", CACHE_DURATION);
export const PatchesStore = new AsyncStore<IPatch>("/api/patches", CACHE_DURATION);
export const TwitchSettingsStore = new AsyncStore<ITwitchSetting>("/api/twitchsettings", CACHE_DURATION);
export const BookSettingsStore = new AsyncStore<IBookSetting>("/api/booksettings", CACHE_DURATION);
export const PotionsStore = new AsyncStore<IPotion>("/api/potions", CACHE_DURATION);
export const BuildRolesStore = new AsyncStore<IBuildRole>("/api/buildroles", CACHE_DURATION);

export const CareerBuildsStore = new AsyncStore<ICareerBuild>("/api/builds");
