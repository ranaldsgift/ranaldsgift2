import { Career, type ICareer } from "$lib/entities/career/Career";
import type { Hero } from "$lib/entities/Hero";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";
import { AsyncStore } from "./AsyncStore";

const CAREER_STORE_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const HeroesStore = new AsyncStore<Hero>("/api/heroes");
export const CareersStore = new AsyncStore<ICareer>("/api/careers", CAREER_STORE_CACHE_DURATION);
export const PropertiesStore = new AsyncStore<IProperty>("/api/properties", CAREER_STORE_CACHE_DURATION);
export const TraitsStore = new AsyncStore<ITrait>("/api/traits", CAREER_STORE_CACHE_DURATION);
