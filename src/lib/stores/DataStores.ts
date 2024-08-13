import { Career, type ICareer } from "$lib/entities/career/Career";
import type { Hero } from "$lib/entities/Hero";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";
import { AsyncStore } from "./AsyncStore";

const CAREER_STORE_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const HeroesStore = new AsyncStore<Hero>("/rg/api/heroes");
export const CareersStore = new AsyncStore<ICareer>("/rg/api/careers", CAREER_STORE_CACHE_DURATION);
export const PropertiesStore = new AsyncStore<IProperty>("/rg/api/properties", CAREER_STORE_CACHE_DURATION);
export const TraitsStore = new AsyncStore<ITrait>("/rg/api/traits", CAREER_STORE_CACHE_DURATION);
