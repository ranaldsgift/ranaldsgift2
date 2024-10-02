import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import type { ICareer } from "$lib/entities/career/Career";
import type { ICareerTalent } from "$lib/entities/career/CareerTalent";
import type { IPatch } from "$lib/entities/Patch";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";

class BuildHelper {
	static isValid(build: ICareerBuild): boolean {
		if (!build.career || !build.primaryWeapon || !build.secondaryWeapon || !build.necklace || !build.charm || !build.trinket) {
			return false;
		}

		if (!build.talent1 || !build.talent2 || !build.talent3 || !build.talent4 || !build.talent5 || !build.talent6) {
			return false;
		}

		if (!build.name) {
			return false;
		}

		return true;
	}

	static getMissingFields(build: ICareerBuild): string[] {
		const missingFields: string[] = [];

		if (!build.career) {
			missingFields.push("career");
		}

		if (!build.primaryWeapon) {
			missingFields.push("primaryWeapon");
		}

		if (!build.secondaryWeapon) {
			missingFields.push("secondaryWeapon");
		}

		if (!build.necklace) {
			missingFields.push("necklace");
		}

		if (!build.charm) {
			missingFields.push("charm");
		}

		if (!build.trinket) {
			missingFields.push("trinket");
		}

		if (!build.talent1) {
			missingFields.push("talent1");
		}

		if (!build.talent2) {
			missingFields.push("talent2");
		}

		if (!build.talent3) {
			missingFields.push("talent3");
		}

		if (!build.talent4) {
			missingFields.push("talent4");
		}

		if (!build.talent5) {
			missingFields.push("talent5");
		}

		if (!build.talent6) {
			missingFields.push("talent6");
		}

		if (!build.name) {
			missingFields.push("name");
		}

		return missingFields;
	}

	static getTalents(build: ICareerBuild): (ICareerTalent | null | undefined)[] {
		return [build.talent1, build.talent2, build.talent3, build.talent4, build.talent5, build.talent6];
	}

	static isTalentSelected(talent: ICareerTalent | null | undefined, build: ICareerBuild): boolean {
		if (!talent) {
			return false;
		}
		return this.getTalents(build).filter((t) => t?.talentNumber === talent.talentNumber).length > 0;
	}

	static getBuildFromSearchParams(
		searchParams: URLSearchParams,
		career: ICareer,
		properties: IProperty[],
		traits: ITrait[]
	): ICareerBuild | null {
		const build: ICareerBuild = {} as ICareerBuild;
		build.career = career;

		const primaryWeaponParams = searchParams.get("primary");
		if (primaryWeaponParams?.split("-").length === 4) {
			const primaryWeaponId = parseInt(primaryWeaponParams.split("-")[0]);
			const primaryWeaponProperty1Id = parseInt(primaryWeaponParams.split("-")[1]);
			const primaryWeaponProperty2Id = parseInt(primaryWeaponParams.split("-")[2]);
			const primaryWeaponTraitId = parseInt(primaryWeaponParams.split("-")[3]);

			const primaryWeapon = career.primaryWeapons.find((weapon) => weapon.id === primaryWeaponId);

			if (!primaryWeapon) {
				return null;
			}

			const primaryWeaponProperty1 = primaryWeapon.properties.find((property) => property.id === primaryWeaponProperty1Id);
			const primaryWeaponProperty2 = primaryWeapon.properties.find((property) => property.id === primaryWeaponProperty2Id);
			const primaryWeaponTrait = primaryWeapon.traits.find((trait) => trait.id === primaryWeaponTraitId);

			if (primaryWeaponProperty1 && primaryWeaponProperty2) {
				build.primaryWeapon = {
					weapon: primaryWeapon,
					property1: primaryWeaponProperty1,
					property2: primaryWeaponProperty2,
					trait: primaryWeaponTrait,
				};
			}
		} else {
			build.primaryWeapon = {
				weapon: career.primaryWeapons[0],
				property1: career.primaryWeapons[0].properties[0],
				property2: career.primaryWeapons[0].properties[1],
				trait: career.primaryWeapons[0].traits[0],
			};
		}

		const secondaryWeaponParams = searchParams.get("secondary");
		if (secondaryWeaponParams?.split("-").length === 4) {
			const secondaryWeaponId = parseInt(secondaryWeaponParams.split("-")[0]);
			const secondaryWeaponProperty1Id = parseInt(secondaryWeaponParams.split("-")[1]);
			const secondaryWeaponProperty2Id = parseInt(secondaryWeaponParams.split("-")[2]);
			const secondaryWeaponTraitId = parseInt(secondaryWeaponParams.split("-")[3]);

			const secondaryWeapon = career.secondaryWeapons.find((weapon) => weapon.id === secondaryWeaponId);

			if (!secondaryWeapon) {
				return null;
			}

			const secondaryWeaponProperty1 = secondaryWeapon.properties.find((property) => property.id === secondaryWeaponProperty1Id);
			const secondaryWeaponProperty2 = secondaryWeapon.properties.find((property) => property.id === secondaryWeaponProperty2Id);
			const secondaryWeaponTrait = secondaryWeapon.traits.find((trait) => trait.id === secondaryWeaponTraitId);

			if (secondaryWeaponProperty1 && secondaryWeaponProperty2) {
				build.secondaryWeapon = {
					weapon: secondaryWeapon,
					property1: secondaryWeaponProperty1,
					property2: secondaryWeaponProperty2,
					trait: secondaryWeaponTrait,
				};
			}
		} else {
			build.secondaryWeapon = {
				weapon: career.secondaryWeapons[0],
				property1: career.secondaryWeapons[0].properties[0],
				property2: career.secondaryWeapons[0].properties[1],
				trait: career.secondaryWeapons[0].traits[0],
			};
		}

		const talentsParam = searchParams.get("talents");

		const talents =
			talentsParam?.split("-").length === 6 ? talentsParam.split("-").map((talent) => parseInt(talent)) : [0, 0, 0, 0, 0, 0];
		build.talent1 = build.career.talents.find((talent) => talent.talentNumber === talents[0]);
		build.talent2 = build.career.talents.find((talent) => talent.talentNumber === talents[1]);
		build.talent3 = build.career.talents.find((talent) => talent.talentNumber === talents[2]);
		build.talent4 = build.career.talents.find((talent) => talent.talentNumber === talents[3]);
		build.talent5 = build.career.talents.find((talent) => talent.talentNumber === talents[4]);
		build.talent6 = build.career.talents.find((talent) => talent.talentNumber === talents[5]);

		const necklaceParams = searchParams.get("necklace");
		if (necklaceParams?.split("-").length === 3) {
			const necklaceProperty1Id = parseInt(necklaceParams.split("-")[0]);
			const necklaceProperty2Id = parseInt(necklaceParams.split("-")[1]);
			const necklaceTraitId = parseInt(necklaceParams.split("-")[2]);

			const necklaceProperty1 = properties.find((property) => property.id === necklaceProperty1Id);
			const necklaceProperty2 = properties.find((property) => property.id === necklaceProperty2Id);
			const necklaceTrait = traits.find((trait) => trait.id === necklaceTraitId);

			if (necklaceTrait && necklaceProperty1 && necklaceProperty2) {
				build.necklace = {
					trait: necklaceTrait,
					property1: necklaceProperty1,
					property2: necklaceProperty2,
				};
			}
		} else {
			build.necklace = {
				trait: traits.find((trait) => trait.category === "defence_accessory"),
				property1: properties.find((property) => property.category === "necklace"),
				property2: properties.find((property) => property.category === "necklace", { skip: 1 }),
			};
		}

		const charmParams = searchParams.get("charm");
		if (charmParams?.split("-").length === 3) {
			const charmProperty1Id = parseInt(charmParams.split("-")[0]);
			const charmProperty2Id = parseInt(charmParams.split("-")[1]);
			const charmTraitId = parseInt(charmParams.split("-")[2]);

			const charmProperty1 = properties.find((property) => property.id === charmProperty1Id);
			const charmProperty2 = properties.find((property) => property.id === charmProperty2Id);
			const charmTrait = traits.find((trait) => trait.id === charmTraitId);

			if (charmTrait && charmProperty1 && charmProperty2) {
				build.charm = {
					trait: charmTrait,
					property1: charmProperty1,
					property2: charmProperty2,
				};
			}
		} else {
			build.charm = {
				trait: traits.find((trait) => trait.category === "offence_accessory"),
				property1: properties.find((property) => property.category === "charm"),
				property2: properties.find((property) => property.category === "charm", { skip: 1 }),
			};
		}

		const trinketParams = searchParams.get("trinket");
		if (trinketParams?.split("-").length === 3) {
			const trinketProperty1Id = parseInt(trinketParams.split("-")[0]);
			const trinketProperty2Id = parseInt(trinketParams.split("-")[1]);
			const trinketTraitId = parseInt(trinketParams.split("-")[2]);

			const trinketProperty1 = properties.find((property) => property.id === trinketProperty1Id);
			const trinketProperty2 = properties.find((property) => property.id === trinketProperty2Id);
			const trinketTrait = traits.find((trait) => trait.id === trinketTraitId);

			if (trinketTrait && trinketProperty1 && trinketProperty2) {
				build.trinket = {
					trait: trinketTrait,
					property1: trinketProperty1,
					property2: trinketProperty2,
				};
			}
		} else {
			build.trinket = {
				trait: traits.find((trait) => trait.category === "utility_accessory"),
				property1: properties.find((property) => property.category === "trinket"),
				property2: properties.find((property) => property.category === "trinket", { skip: 1 }),
			};
		}

		const powerLevel = searchParams.get("powerLevel");
		if (powerLevel) {
			build.powerLevel = parseInt(powerLevel);
		}
		return build;
	}

	static getQueryStringFromBuild(build: ICareerBuild): string {
		if (!build.career) {
			return "";
		}

		let talentParams = `${build.talent1?.talentNumber ?? 0}-${build.talent2?.talentNumber ?? 0}-${build.talent3?.talentNumber ?? 0}-${
			build.talent4?.talentNumber ?? 0
		}-${build.talent5?.talentNumber ?? 0}-${build.talent6?.talentNumber ?? 0}`;

		let searchParams = "?";
		searchParams += `career=${build.career.id}`;
		searchParams += `&talents=${talentParams}`;
		searchParams += `&primary=${build.primaryWeapon.weapon.id}-${build.primaryWeapon.property1?.id}-${build.primaryWeapon.property2?.id}-${build.primaryWeapon.trait?.id}`;
		searchParams += `&secondary=${build.secondaryWeapon.weapon.id}-${build.secondaryWeapon.property1?.id}-${build.secondaryWeapon.property2?.id}-${build.secondaryWeapon.trait?.id}`;
		searchParams += `&necklace=${build.necklace.property1?.id}-${build.necklace.property2?.id}-${build.necklace.trait?.id}`;
		searchParams += `&charm=${build.charm.property1?.id}-${build.charm.property2?.id}-${build.charm.trait?.id}`;
		searchParams += `&trinket=${build.trinket.property1?.id}-${build.trinket.property2?.id}-${build.trinket.trait?.id}`;
		return searchParams;
	}

	static getSearchParamsFromBuild(build: ICareerBuild): { key: string; value: string }[] {
		let talentParams = `${build.talent1?.talentNumber ?? 0}-${build.talent2?.talentNumber ?? 0}-${build.talent3?.talentNumber ?? 0}-${
			build.talent4?.talentNumber ?? 0
		}-${build.talent5?.talentNumber ?? 0}-${build.talent6?.talentNumber ?? 0}`;

		return [
			{ key: "career", value: build.career.id.toString() },
			{ key: "talents", value: talentParams },
			{
				key: "primary",
				value: `${build.primaryWeapon.weapon.id}-${build.primaryWeapon.property1?.id}-${build.primaryWeapon.property2?.id}-${build.primaryWeapon.trait?.id}`,
			},
			{
				key: "secondary",
				value: `${build.secondaryWeapon.weapon.id}-${build.secondaryWeapon.property1?.id}-${build.secondaryWeapon.property2?.id}-${build.secondaryWeapon.trait?.id}`,
			},
			{ key: "necklace", value: `${build.necklace.property1?.id}-${build.necklace.property2?.id}-${build.necklace.trait?.id}` },
			{ key: "charm", value: `${build.charm.property1?.id}-${build.charm.property2?.id}-${build.charm.trait?.id}` },
			{ key: "trinket", value: `${build.trinket.property1?.id}-${build.trinket.property2?.id}-${build.trinket.trait?.id}` },
		];
	}

	static getPatch(build: ICareerBuild, patches: IPatch[]): IPatch | undefined {
		if (!build.dateModified) {
			return undefined;
		}

		return patches
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.find((p) => new Date(p.date).getTime() <= new Date(build.dateModified!).getTime());
	}
}

export default BuildHelper;
