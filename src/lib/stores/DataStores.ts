import type { IBookSetting } from "$lib/entities/BookSetting";
import type { IBuildRole } from "$lib/entities/BuildRole";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { type ICareer } from "$lib/entities/career/Career";
import type { IDifficulty } from "$lib/entities/Difficulty";
import type { IDifficultyModifier } from "$lib/entities/DifficultyModifier";
import type { IEvent } from "$lib/entities/Event";
import type { Hero } from "$lib/entities/Hero";
import type { IMission } from "$lib/entities/Mission";
import type { IPatch } from "$lib/entities/Patch";
import type { IPotion } from "$lib/entities/Potion";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";
import type { ITwitchSetting } from "$lib/entities/TwitchSetting";
import type { IWeapon } from "$lib/entities/Weapon";
import { AsyncStore, AuthoredAsyncStore } from "./AsyncStore";

const STATIC_DATA_CACHE_DURATION = 60 * 60 * 1000 * 24; // 24 hours

export const HeroesStore = new AsyncStore<Hero>("/api/heroes", STATIC_DATA_CACHE_DURATION);
export const CareersStore = new AsyncStore<ICareer>("/api/careers", STATIC_DATA_CACHE_DURATION);
export const WeaponsStore = new AsyncStore<IWeapon>("/api/weapons", STATIC_DATA_CACHE_DURATION);
export const PropertiesStore = new AsyncStore<IProperty>("/api/properties", STATIC_DATA_CACHE_DURATION);
export const TraitsStore = new AsyncStore<ITrait>("/api/traits", STATIC_DATA_CACHE_DURATION);
export const DifficultiesStore = new AsyncStore<IDifficulty>("/api/difficulties", STATIC_DATA_CACHE_DURATION);
export const DifficultyModifiersStore = new AsyncStore<IDifficultyModifier>("/api/difficultymodifiers", STATIC_DATA_CACHE_DURATION);
export const MissionsStore = new AsyncStore<IMission>("/api/missions", STATIC_DATA_CACHE_DURATION);
export const PatchesStore = new AsyncStore<IPatch>("/api/patches", STATIC_DATA_CACHE_DURATION);
export const TwitchSettingsStore = new AsyncStore<ITwitchSetting>("/api/twitchsettings", STATIC_DATA_CACHE_DURATION);
export const BookSettingsStore = new AsyncStore<IBookSetting>("/api/booksettings", STATIC_DATA_CACHE_DURATION);
export const PotionsStore = new AsyncStore<IPotion>("/api/potions", STATIC_DATA_CACHE_DURATION);
export const BuildRolesStore = new AsyncStore<IBuildRole>("/api/buildroles", STATIC_DATA_CACHE_DURATION);
export const EventsStore = new AsyncStore<IEvent>(`/api/events`, STATIC_DATA_CACHE_DURATION);

export const CareerBuildsStore = new AuthoredAsyncStore<ICareerBuild>("/api/builds", 60 * 1000 * 5);
