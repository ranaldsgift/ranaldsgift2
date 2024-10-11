import { browser } from "$app/environment";
import type { IAuthoredEntity, IEntity } from "$lib/entities/BaseEntity";

export class AsyncStore<TModel extends IEntity> {
	/**
	 * @param rootApiUrl The base URL for API requests.
	 * @param cacheDuration Optional. The duration in milliseconds for which data is cached. Defaults to 1 minute.
	 */
	constructor(rootApiUrl: string, cacheDuration?: number, lastUpdatedServer?: number) {
		this.lastUpdatedServer = lastUpdatedServer;
		this.apiUrl = rootApiUrl;
		this.storageKeyPrefix = "asyncStore_" + rootApiUrl;
		this.lastUpdatedStorageKey = "asyncStore_lastUpdated_" + rootApiUrl;
		if (cacheDuration) {
			this.cacheDuration = cacheDuration;
		}

		// Initialize cache with items from localStorage
		if (browser) {
			this.initializeCache();
		}
	}

	private getLastUpdatedClient(): number {
		const lastUpdatedLocalStorage = localStorage.getItem(this.lastUpdatedStorageKey);
		return lastUpdatedLocalStorage ? Number(lastUpdatedLocalStorage) : 0;
	}

	private isClientOutdated(): boolean {
		if (!this.lastUpdatedServer) return false;
		return this.lastUpdatedServer > this.getLastUpdatedClient();
	}

	private initializeCache() {
		if (this.isClientOutdated()) {
			this.invalidateAll();
			return;
		}

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith(this.storageKeyPrefix)) {
				const value = localStorage.getItem(key);
				if (value) {
					const { expires, data } = JSON.parse(value);
					if (expires > Date.now()) {
						const cacheKey = key.replace("asyncStore_", "");
						this.cache.set(cacheKey, {
							expires,
							data: Promise.resolve(data),
						});
					} else {
						// Remove expired items from localStorage
						localStorage.removeItem(key);
					}
				}
			}
		}
	}

	protected lastUpdatedServer?: number;
	protected lastUpdatedStorageKey: string;
	protected apiUrl: string;
	protected storageKeyPrefix: string;
	// Default duration is 1 minute
	protected cacheDuration: number = 60 * 1000;
	protected cache = new Map<string, { expires: number; data: Promise<{ items: TModel[]; count: number }> }>();

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
					if (this.lastUpdatedServer) {
						localStorage.setItem(this.lastUpdatedStorageKey, this.lastUpdatedServer.toString());
					}
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
			const { items } = await data;
			if (items.some((item) => item.id === id)) {
				this.cache.delete(key);
				const localStorageKey = `asyncStore_${key}`;
				localStorage.removeItem(localStorageKey);
			}
		}
	}
}

export class AuthoredAsyncStore<TModel extends IAuthoredEntity> extends AsyncStore<TModel> {
	async invalidateByUserId(userId: string) {
		for (const [key, { data }] of this.cache) {
			const { items } = await data;
			if (items.some((item) => item.user?.id === userId)) {
				this.cache.delete(key);
				const localStorageKey = `asyncStore_${key}`;
				localStorage.removeItem(localStorageKey);
			}
		}
	}
}
