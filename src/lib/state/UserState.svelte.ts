import type { IUser } from "$lib/entities/User";
import { getContext, setContext } from "svelte";
import { LocalStorageState } from "./LocalStorageState.svelte";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

class UserState {
	user: IUser | null = $state(null);
	showVideo: LocalStorageState<boolean> = new LocalStorageState("showVideo", false);
	isPrivileged: boolean = $derived(this.user?.role === "Admin" || this.user?.role === "Moderator");

	constructor(user: IUser | null) {
		if (user) {
			this.user = user;
			this.showVideo.value = user.showVideo;
		}

		$effect(() => {
			if (this.user) {
				this.showVideo.value = this.user.showVideo;
			} else if (window.innerWidth >= 768) {
				this.showVideo.value = true;
			}
		});
	}

	updateUser(user: IUser) {
		this.user = user;
	}

	reset() {
		this.user = null;
	}

	addFavorite(build: ICareerBuild) {
		if (this.user) {
			this.user.favoriteBuilds.push(build);
		}
	}

	removeFavorite(build: ICareerBuild) {
		if (this.user) {
			this.user.favoriteBuilds = this.user.favoriteBuilds.filter((b) => b.id !== build.id);
		}
	}

	addRating(build: ICareerBuild) {
		if (this.user) {
			this.user.ratedBuilds.push(build);
		}
	}

	removeRating(build: ICareerBuild) {
		if (this.user) {
			this.user.ratedBuilds = this.user.ratedBuilds.filter((b) => b.id !== build.id);
		}
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
