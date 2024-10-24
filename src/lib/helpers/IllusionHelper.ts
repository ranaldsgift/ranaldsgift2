import type { IItemBuild } from "$lib/entities/builds/CareerBuild";
import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";

class IllusionHelper {
	public static getIllusionUrl(itemBuild: IItemBuild, itemType: ItemTypeEnum): string {
		const illusionsDirectory = this.getIllusionsDirectory(itemBuild, itemType);
		let url = itemBuild.illusion ? `/images/illusions/${illusionsDirectory}/${itemBuild.illusion?.image?.replace("'", "\\'")}` : "";

		if (url === "") {
			if (itemType === ItemTypeEnum.Weapon) {
				url = `/images/weapons/${itemBuild.weapon?.codename}.png`;
			} else {
				url = `/images/illusions/default/${itemType.toLowerCase()}.png`;
			}
		}

		return url;
	}

	private static getIllusionsDirectory(itemBuild: IItemBuild, itemType: ItemTypeEnum): string {
		return itemType === ItemTypeEnum.Weapon ? `weapons/${itemBuild.weapon?.codename}` : `${itemType.toLowerCase()}`;
	}
}

export default IllusionHelper;
