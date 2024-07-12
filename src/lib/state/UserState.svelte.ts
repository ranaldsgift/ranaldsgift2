import { browser } from "$app/environment";
import type { IUser, User } from "$lib/entities/User";
import { getContext, setContext } from "svelte";

class UserState {
	id: string | null = $state(null);
	user: IUser | null = $state(null);
	showVideo: boolean = $state(false);

	constructor(user: IUser | null) {
		if (user) {
			this.user = user;
			this.id = user.id;
			this.showVideo = user.showVideo;
		}

		$effect(() => {
			if (this.user) {
				this.showVideo = this.showVideo;
			} else {
				this.showVideo = localStorage.getItem("showVideo") === "true";
			}
		});
	}

	reset() {
		this.id = null;
		this.user = null;
		this.showVideo = false;
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

export class LocalStore<T> {
	value = $state<T>() as T;
	key = "";

	constructor(key: string, value: T) {
		this.key = key;
		this.value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = this.deserialize(item);
		}

		$effect(() => {
			localStorage.setItem(this.key, this.serialize(this.value));
		});
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T {
		return JSON.parse(item);
	}
}

export function localStore<T>(key: string, value: T) {
	return new LocalStore(key, value);
}
