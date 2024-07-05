export class AsyncStore<TModel> {
    constructor(rootApiUrl: string, cacheDuration?: number) {
        this.apiUrl = rootApiUrl;
        if (cacheDuration) {
            this.cacheDuration = cacheDuration;
        }
    }
    private apiUrl: string;
    // Default duration is 1 minute
    private cacheDuration: number = 60 * 1000;
    private cache = new Map<string, { expires: number, data: Promise<{ items: TModel[], count: number }> }>()

    /**
     * Load data from the API using the provided query string, if any.
     * Data is cached on the client side for 60 seconds by default.
     * @param queryString Additional query parameters to be appended to the API URL.
     * @param cacheDuration In milliseconds. Default is 60 seconds.
     * @returns 
     */
    loadData(queryString?: string, cacheDuration?: number): Promise<{ items: TModel[], count: number }> {
        const apiQueryString = `${this.apiUrl}?${queryString}`;
        let cachedData = this.cache.get(apiQueryString);
        let duration = cacheDuration ?? this.cacheDuration;
        let data;
        if (!cachedData) {
            data = this.getData(apiQueryString)
            this.cache.set(apiQueryString, { expires: Date.now() + duration, data });
        }
        else {
            if (cachedData.expires < Date.now()) {
                data = this.getData(apiQueryString)
                this.cache.set(apiQueryString, { expires: Date.now() + duration, data });
            }
            else {
                data = cachedData.data;
            }
        }

        if (!data)
            return Promise.resolve({ items: [], count: 0 });

        return data;
    }
    reload(queryString: string): Promise<{ items: TModel[], count: number }> {
        const apiQueryString = `${this.apiUrl}?${queryString}`;
        if (this.cache.has(apiQueryString)) {
            this.cache.delete(apiQueryString);
        }
        return this.loadData(queryString);
    }
    private async getData(apiQueryString: string): Promise<{ items: TModel[], count: number }> {
        const response = await fetch(apiQueryString, { method: 'GET' });
        const data: Promise<{ items: TModel[], count: number }> = await response.json();
        return data;
    }
    invalidate(queryString: string) {
        this.cache.delete(queryString);
    }
    invalidateAll(queryMatch?: string) {
        if (queryMatch) {
            for (const [key, value] of this.cache) {    
                if (key.includes(queryMatch)) {
                    this.cache.delete(key);
                }
            }
        }
        else {
            this.cache.clear();
        }
    }
}