import type { IEntity } from "$lib/entities/BaseEntity";

export class AsyncStore<TModel extends IEntity> {
	constructor(rootApiUrl: string, cacheDuration?: number) {
		this.apiUrl = rootApiUrl;
		if (cacheDuration) {
			this.cacheDuration = cacheDuration;
		}
	}
	private apiUrl: string;
	// Default duration is 1 minute
	private cacheDuration: number = 60 * 1000;
	private cache = new Map<string, { expires: number; data: Promise<{ items: TModel[]; count: number }> }>();

	/**
	 * Load data from the API using the provided query string, if any.
	 * Data is cached on the client side for 60 seconds by default.
	 * @param queryString Additional query parameters to be appended to the API URL.
	 * @param cacheDuration In milliseconds. Default is 60 seconds.
	 * @returns
	 */
	loadData(queryString?: string, cacheDuration?: number, useLocalStorage: boolean = true): Promise<{ items: TModel[]; count: number }> {
		const apiQueryString = `${this.apiUrl}?${queryString}`;
		let duration = cacheDuration ?? this.cacheDuration;

		// Check localStorage first
		const localStorageKey = `asyncStore_${apiQueryString}`;
		const localStorageData = localStorage.getItem(localStorageKey);
		if (useLocalStorage) {
			if (localStorageData) {
				const { expires, data } = JSON.parse(localStorageData);
				if (expires > Date.now()) {
					return Promise.resolve(data);
				}
			}
		}

		// If not in localStorage, check memory cache
		let cachedData = this.cache.get(apiQueryString);
		let data;
		if (cachedData && cachedData.expires > Date.now()) {
			data = cachedData.data;
		} else {
			data = this.getData(apiQueryString);
			this.cache.set(apiQueryString, { expires: Date.now() + duration, data });

			if (useLocalStorage) {
				// Store in localStorage
				data.then((result) => {
					localStorage.setItem(
						localStorageKey,
						JSON.stringify({
							expires: Date.now() + duration,
							data: result,
						})
					);
				});
			}
		}

		if (!data) return Promise.resolve({ items: [], count: 0 });

		return data;
	}
	reload(queryString: string): Promise<{ items: TModel[]; count: number }> {
		const apiQueryString = `${this.apiUrl}?${queryString}`;
		if (this.cache.has(apiQueryString)) {
			this.cache.delete(apiQueryString);
		}
		return this.loadData(queryString);
	}
	private async getData(apiQueryString: string): Promise<{ items: TModel[]; count: number }> {
		const response = await fetch(apiQueryString, { method: "GET" });
		const data: Promise<{ items: TModel[]; count: number }> = await response.json();
		return data;
	}
	invalidate(queryString: string) {
		this.cache.delete(queryString);
		const localStorageKey = `asyncStore_${queryString}`;
		localStorage.removeItem(localStorageKey);
	}
	invalidateAll(queryMatch?: string) {
		if (queryMatch) {
			for (const [key, value] of this.cache) {
				if (key.includes(queryMatch)) {
					this.cache.delete(key);
					const localStorageKey = `asyncStore_${key}`;
					localStorage.removeItem(localStorageKey);
				}
			}
		} else {
			this.cache.clear();
			localStorage.clear();
		}
	}
	async invalidateById(id: string | number) {
		for (const [key, { data }] of this.cache) {
			console.log("awaiting promise");
			const { items } = await data;
			console.log("promise resolved");
			if (items.some((item) => item.id === id)) {
				this.cache.delete(key);
				const localStorageKey = `asyncStore_${key}`;
				localStorage.removeItem(localStorageKey);
			}
		}
	}
}
