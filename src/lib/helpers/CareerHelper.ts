import type { ICareer } from "$lib/entities/career/Career";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";

class CareerHelper {
	static getNewCareerBuildForCareer(career: ICareer): Partial<ICareerBuild> {
		let buildPojo: Partial<ICareerBuild> = {
			career: career,
			primaryWeapon: {
				weapon: career.primaryWeapons[0],
				property1: career.primaryWeapons[0].properties[0],
				property2: career.primaryWeapons[0].properties[1],
				trait: career.primaryWeapons[0].traits[0],
			},
			secondaryWeapon: {
				weapon: career.secondaryWeapons[0],
				property1: career.secondaryWeapons[0].properties[0],
				property2: career.secondaryWeapons[0].properties[1],
				trait: career.secondaryWeapons[0].traits[0],
			},
		};
		return buildPojo;
	}
}

export default CareerHelper;
