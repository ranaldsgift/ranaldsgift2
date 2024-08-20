import { Career, type ICareer } from "$lib/entities/career/Career";
import type { IDifficulty } from "$lib/entities/Difficulty";
import type { Hero } from "$lib/entities/Hero";
import type { IPatch } from "$lib/entities/Patch";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";
import { AsyncStore } from "./AsyncStore";

const CACHE_DURATION = 60 * 60 * 1000 * 24; // 24 hours

export const HeroesStore = new AsyncStore<Hero>("/api/heroes");
export const CareersStore = new AsyncStore<ICareer>("/api/careers", CACHE_DURATION);
export const PropertiesStore = new AsyncStore<IProperty>("/api/properties", CACHE_DURATION);
export const TraitsStore = new AsyncStore<ITrait>("/api/traits", CACHE_DURATION);
export const DifficultiesStore = new AsyncStore<IDifficulty>("/api/difficulties", CACHE_DURATION);
export const PatchesStore = new AsyncStore<IPatch>("/api/patches", CACHE_DURATION);
