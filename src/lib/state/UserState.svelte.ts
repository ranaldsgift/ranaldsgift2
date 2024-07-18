import type { IUser } from "$lib/entities/User";
import { getContext, setContext } from "svelte";
import { LocalStorageState } from "./LocalStorageState.svelte";

class UserState {
	user: IUser | null = $state(null);
	showVideo: LocalStorageState<boolean> = new LocalStorageState("showVideo", false);

	constructor(user: IUser | null) {
		if (user) {
			this.user = user;
			this.showVideo.value = user.showVideo;
		}

		$effect(() => {
			if (this.user) {
				this.showVideo.value = this.user.showVideo;
			}
		});
	}

	reset() {
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
