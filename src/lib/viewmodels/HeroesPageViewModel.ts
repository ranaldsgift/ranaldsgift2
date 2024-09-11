import type { ICareer } from "$lib/entities/career/Career";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import type { PageViewModel } from "./PageViewModel";

export interface HeroesPageViewModel extends PageViewModel {
	careers: ICareer[];
	selectedCareer: ICareer;
	build?: ICareerBuild;
}
