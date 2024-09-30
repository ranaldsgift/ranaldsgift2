import type { ICareer } from "$lib/entities/career/Career";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { getContext, setContext } from "svelte";
import { LocalStorageState } from "./LocalStorageState.svelte";

export type InventoryTab = "PRIMARY" | "SECONDARY" | "EQUIPMENT";

class BuildCreatorPageState {
	selectedCareer: ICareer | null = $state(null);
	build: ICareerBuild | null = $state(null);
	inventoryTab: LocalStorageState<InventoryTab> = new LocalStorageState("BuildCreatorPageInventoryTab", "PRIMARY");
}

const PAGE_CONTEXT_KEY = Symbol("BUILD_CREATOR_PAGE_CONTEXT_KEY");

export function initializeBuildCreatorPageState() {
	const buildCreatorPageState = new BuildCreatorPageState();
	setContext(PAGE_CONTEXT_KEY, buildCreatorPageState);
	return buildCreatorPageState;
}

export function getBuildCreatorPageState() {
	return getContext<BuildCreatorPageState>(PAGE_CONTEXT_KEY);
}
