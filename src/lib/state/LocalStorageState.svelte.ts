import { browser } from "$app/environment";

export class LocalStorageState<T> {
	value = $state<T>() as T;
	key = "";

	constructor(key: string, value: T) {
		this.key = key;
		this.value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item && item !== "undefined") this.value = this.deserialize(item);
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

export function localStorageState<T>(key: string, value: T) {
	return new LocalStorageState(key, value);
}
