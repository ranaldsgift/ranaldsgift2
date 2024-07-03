import type { ICareer } from "$lib/entities/career/Career";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

export class HeroesPageViewModel {
	public pageTitle: string = "Heroes";
	public careers: ICareer[] = [];
	public selectedCareer: ICareer | null = $state(null);
	public build: ICareerBuild | null = $state(null);
}
