import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import { getContext, setContext } from "svelte";

class TeamState {
	builds: Record<string, ICareerBuild> = $state({});
}

const CONTEXT_KEY = Symbol("CONTEXT_KEY");

export function initializeTeamState() {
	const state = new TeamState();
	setContext(CONTEXT_KEY, state);
	return state;
}

export function getTeamState() {
	return getContext<TeamState>(CONTEXT_KEY);
}
