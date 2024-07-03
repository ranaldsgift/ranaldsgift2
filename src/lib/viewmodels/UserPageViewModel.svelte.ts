import type { User } from "$lib/entities/User";
import type { CareerBuild } from "$lib/entities/builds/CareerBuild";

class UserPageViewModel {
    user: User | null = null;
    authoredBuilds: CareerBuild[] = [];
    favoritedBuilds: CareerBuild[] = [];
    ratedBuilds: CareerBuild[] = [];
}

export default UserPageViewModel;