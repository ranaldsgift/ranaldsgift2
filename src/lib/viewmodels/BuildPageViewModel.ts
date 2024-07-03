import type { CareerBuild } from "$lib/entities/builds/CareerBuild";

export class BuildPageViewModel {
    public build: CareerBuild | null = null;
    public ratings: number = 0;
    public favorites: number = 0;
    public similarBuilds: CareerBuild[] = [];
    public similarBuildsFromAuthor: CareerBuild[] = [];
    public ratedByUser: boolean = false;
    public favoritedByUser: boolean = false;
}