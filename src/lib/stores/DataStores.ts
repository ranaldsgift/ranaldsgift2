import { ROOT_API_URL } from "$lib/data/constants/constants";
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

export const HeroesStore = new AsyncStore<Hero>(`${ROOT_API_URL}/heroes`, STATIC_DATA_CACHE_DURATION);
export const CareersStore = new AsyncStore<ICareer>(`${ROOT_API_URL}/careers`, STATIC_DATA_CACHE_DURATION);
export const WeaponsStore = new AsyncStore<IWeapon>(`${ROOT_API_URL}/weapons`, STATIC_DATA_CACHE_DURATION);
export const PropertiesStore = new AsyncStore<IProperty>(`${ROOT_API_URL}/properties`, STATIC_DATA_CACHE_DURATION);
export const TraitsStore = new AsyncStore<ITrait>(`${ROOT_API_URL}/traits`, STATIC_DATA_CACHE_DURATION);
export const DifficultiesStore = new AsyncStore<IDifficulty>(`${ROOT_API_URL}/difficulties`, STATIC_DATA_CACHE_DURATION);
export const DifficultyModifiersStore = new AsyncStore<IDifficultyModifier>(
	`${ROOT_API_URL}/difficultymodifiers`,
	STATIC_DATA_CACHE_DURATION
);
export const MissionsStore = new AsyncStore<IMission>(`${ROOT_API_URL}/missions`, STATIC_DATA_CACHE_DURATION);
export const PatchesStore = new AsyncStore<IPatch>(`${ROOT_API_URL}/patches`, STATIC_DATA_CACHE_DURATION);
export const TwitchSettingsStore = new AsyncStore<ITwitchSetting>(`${ROOT_API_URL}/twitchsettings`, STATIC_DATA_CACHE_DURATION);
export const BookSettingsStore = new AsyncStore<IBookSetting>(`${ROOT_API_URL}/booksettings`, STATIC_DATA_CACHE_DURATION);
export const PotionsStore = new AsyncStore<IPotion>(`${ROOT_API_URL}/potions`, STATIC_DATA_CACHE_DURATION);
export const BuildRolesStore = new AsyncStore<IBuildRole>(`${ROOT_API_URL}/buildroles`, STATIC_DATA_CACHE_DURATION);
export const EventsStore = new AsyncStore<IEvent>(`${ROOT_API_URL}/events`, STATIC_DATA_CACHE_DURATION);

export const CareerBuildsStore = new AuthoredAsyncStore<ICareerBuild>(`${ROOT_API_URL}/builds`, 60 * 1000 * 5);
