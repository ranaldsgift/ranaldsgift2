import { getContext, setContext } from "svelte";
import { LocalStorageState } from "./LocalStorageState.svelte";
import type { BuildTableFilter } from "$lib/types/BuildTableFilters";

class BuildsPageState {
	filter: BuildTableFilter = $state({
		userId: null,
		heroId: null,
		careerId: null,
		weaponId: null,
		primaryWeaponId: null,
		secondaryWeaponId: null,
		charmTraitId: null,
		necklaceTraitId: null,
		trinketTraitId: null,
		search: null,
		sort: "dateModified",
		asc: false,
		offset: 0,
		limit: 10,
	});
	showFilters: LocalStorageState<boolean> = new LocalStorageState("BuildsPageShowFilters", false);
}

const CONTEXT_KEY = Symbol("BUILDS_PAGE_CONTEXT_KEY");

export function initializeBuildsPageState() {
	const buildsPageState = new BuildsPageState();
	setContext(CONTEXT_KEY, buildsPageState);
	return buildsPageState;
}

export function getBuildsPageState() {
	return getContext<BuildsPageState>(CONTEXT_KEY);
}
