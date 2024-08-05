import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import type { PageViewModel } from "./PageViewModel";

export interface EditBuildPageViewModel extends PageViewModel {
	build: ICareerBuild;
}

export interface BuildPageViewModel extends PageViewModel {
	build: ICareerBuild;
	ratings?: number;
	favorites?: number;
	similarBuilds?: ICareerBuild[];
	similarBuildsFromAuthor?: ICareerBuild[];
	ratedByUser?: boolean;
	favoritedByUser?: boolean;
}
