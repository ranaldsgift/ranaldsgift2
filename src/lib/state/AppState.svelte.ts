import { browser } from "$app/environment";
import { page } from "$app/stores";
import type { AppLayout } from "$lib/types/AppLayout";
import { getContext, setContext } from "svelte";

class AppState {
	layout: AppLayout = $state("app");

	constructor() {
		if (browser) {
			page.subscribe((currentPage) => {
				if (currentPage.route.id?.includes("(emporium)")) {
					this.layout = "emporium";
				} else if (currentPage.route.id?.includes("(frame)")) {
					this.layout = "frame";
				} else if (currentPage.route.id?.includes("(noframe)")) {
					this.layout = "noframe";
				} else if (currentPage.route.id?.includes("(spoils)")) {
					this.layout = "spoils";
				} else {
					this.layout = "app";
				}
			});
		}
	}
}

const CONTEXT_KEY = Symbol("CONTEXT_KEY");

export function initializeAppState() {
	const state = new AppState();
	setContext(CONTEXT_KEY, state);
	return state;
}

export function getAppState() {
	return getContext<AppState>(CONTEXT_KEY);
}
