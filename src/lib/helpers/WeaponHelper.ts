import { WeaponsCache } from "$lib/cache/RedisCache";
import type { IWeapon } from "$lib/entities/Weapon";

class WeaponHelper {
	static async findByCodename(codename: string): Promise<IWeapon | undefined> {
		return await WeaponsCache.findBy("codename", codename);
	}
}

export default WeaponHelper;
