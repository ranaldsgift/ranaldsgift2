import type { ICareer } from "$lib/entities/career/Career";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { getContext, setContext } from "svelte";
import { LocalStorageState } from "./LocalStorageState.svelte";

export type InventoryTab = "PRIMARY" | "SECONDARY" | "EQUIPMENT";

class HeroesPageState {
	selectedCareer: ICareer | null = $state(null);
	build: ICareerBuild | null = $state(null);
	inventoryTab: LocalStorageState<InventoryTab> = new LocalStorageState("HeroesPageInventoryTab", "PRIMARY");
}

const HEROES_PAGE_CONTEXT_KEY = Symbol("HEROES_PAGE_CONTEXT_KEY");

export function initializeHeroesPageState() {
	const heroesPageState = new HeroesPageState();
	setContext(HEROES_PAGE_CONTEXT_KEY, heroesPageState);
	return heroesPageState;
}

export function getHeroesPageState() {
	return getContext<HeroesPageState>(HEROES_PAGE_CONTEXT_KEY);
}
