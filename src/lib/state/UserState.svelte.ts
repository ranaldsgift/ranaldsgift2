import { browser } from "$app/environment";
import type { IUser, User } from "$lib/entities/User";
import { getContext, setContext } from "svelte";

class UserState {
	id: string | null = $state(null);
	user: IUser | null = $state(null);
	showVideo: boolean = $derived.by(() => {
		if (this.user?.showVideo) return this.user.showVideo;

		if (browser) {
			return localStorage.getItem("showVideo") === "true";
		}

		return false;
	});

	constructor(user: IUser | null) {
		if (user) {
			this.user = user;
			this.id = user.id;
		}
	}

	reset() {
		this.id = null;
		this.user = null;
	}
}

const USER_CONTEXT_KEY = "USER_CONTEXT_KEY";

export function setUserState(user: IUser | null) {
	const userState = new UserState(user);
	setContext(USER_CONTEXT_KEY, userState);
	return userState;
}

export function getUserState() {
	return getContext<UserState>(USER_CONTEXT_KEY);
}
