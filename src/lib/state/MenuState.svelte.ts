import { getContext, setContext } from "svelte";

class MenuPageState {
	constructor(isOpen: boolean) {
		this.isOpen = isOpen;
	}

	isOpen: boolean = $state(false);

	toggle() {
		this.isOpen = !this.isOpen;
	}
}

const MENU_STATE_CONTEXT_KEY = Symbol("MENU_STATE_CONTEXT_KEY");

export function setMenuState(isOpen: boolean) {
	const state = new MenuPageState(isOpen);
	setContext(MENU_STATE_CONTEXT_KEY, state);
	return state;
}

export function getMenuState() {
	return getContext<MenuPageState>(MENU_STATE_CONTEXT_KEY);
}
