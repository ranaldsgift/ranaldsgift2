import type { ICareer } from "$lib/entities/career/Career";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { getContext, setContext } from "svelte";
import { LocalStorageState } from "./LocalStorageState.svelte";

export type InventoryTab = "PRIMARY" | "SECONDARY" | "EQUIPMENT";

export class BuildEditorPageState {
	selectedCareer: ICareer | null = $state(null);
	build: ICareerBuild | null = $state(null);
	inventoryTab: LocalStorageState<InventoryTab> = new LocalStorageState("BuildEditorPageInventoryTab", "PRIMARY");
}

const PAGE_CONTEXT_KEY = Symbol("BUILD_EDITOR_PAGE_CONTEXT_KEY");

export function initializeBuildEditorPageState() {
	const buildEditorPageState = new BuildEditorPageState();
	setContext(PAGE_CONTEXT_KEY, buildEditorPageState);
	return buildEditorPageState;
}

export function getBuildEditorPageState() {
	return getContext<BuildEditorPageState>(PAGE_CONTEXT_KEY);
}
