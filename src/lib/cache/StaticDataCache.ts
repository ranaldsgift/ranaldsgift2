class StaticDataCache<TModel> {
    cachedData: Map<number, TModel> = new Map();

    get(key: number): TModel {
        return this.cachedData.get(key)!;
    }

    getAll(): TModel[] {
        return Array.from(this.cachedData.values());
    }

    set(key: number, value: TModel): void {
        this.cachedData.set(key, value);
    }

    delete(key: number): void {
        this.cachedData.delete(key);
    }

    clear(): void {
        this.cachedData.clear();
    }
}

export default StaticDataCache;