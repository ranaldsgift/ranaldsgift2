import { correctedPassivesData } from "$lib/data/legacy/CorrectedPassives";
import { correctedPerksData } from "$lib/data/legacy/CorrectedPerks";
import { correctedSkillsData } from "$lib/data/legacy/CorrectedSkills";
import { correctedTalentsData } from "$lib/data/legacy/CorrectedTalents";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import type { ICareer } from "$lib/entities/career/Career";
import type { ICareerPassive } from "$lib/entities/career/CareerPassive";
import type { ICareerPerk } from "$lib/entities/career/CareerPerk";
import type { ICareerSkill } from "$lib/entities/career/CareerSkill";
import type { ICareerTalent } from "$lib/entities/career/CareerTalent";
import type { IPatch } from "$lib/entities/Patch";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";
import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";

class BuildHelper {
	static isValid(build: ICareerBuild): boolean {
		if (!build.career || !build.primaryWeapon || !build.secondaryWeapon || !build.necklace || !build.charm || !build.trinket) {
			return false;
		}
		if (build.level) {
			if (build.level < 30 && build.level30Talent) {
				return false;
			}
			if (build.level < 25 && build.level25Talent) {
				return false;
			}
			if (build.level < 20 && build.level20Talent) {
				return false;
			}
			if (build.level < 15 && build.level15Talent) {
				return false;
			}
			if (build.level < 10 && build.level10Talent) {
				return false;
			}
			if (build.level < 5 && build.level5Talent) {
				return false;
			}
		}

		if (!build.name) {
			return false;
		}

		return true;
	}

	static getMissingFields(build: ICareerBuild): string[] {
		const missingFields: string[] = [];

		if (!build.career) {
			missingFields.push("Career");
		}

		if (!build.primaryWeapon) {
			missingFields.push("Primary Weapon");
		}

		if (!build.secondaryWeapon) {
			missingFields.push("Secondary Weapon");
		}

		if (!build.necklace) {
			missingFields.push("Necklace");
		}

		if (!build.charm) {
			missingFields.push("Charm");
		}

		if (!build.trinket) {
			missingFields.push("Trinket");
		}

		if (!build.name) {
			missingFields.push("Build Name");
		}

		return missingFields;
	}

	static getCorrectedTalents(talents: ICareerTalent[], careerId: number): ICareerTalent[] {
		let list = talents.map((talent) => {
			const tieredTalentNumber = talent.talentNumber % 3 === 0 ? 3 : talent.talentNumber % 3;
			const tier = Math.ceil(talent.talentNumber / 3);
			const correctedTalent = correctedTalentsData.find(
				(t) => t.talent === tieredTalentNumber && t.tier === tier && t.careerId === careerId
			);
			if (correctedTalent) {
				return { ...talent, description: correctedTalent.description };
			}
			return talent;
		});
		return list;
	}

	static getCorrectedSkill(career: ICareer): ICareerSkill {
		const correctedSkill = correctedSkillsData.find((s) => s.careerId === career.id);
		if (correctedSkill) {
			return { ...career.skill, description: correctedSkill.description };
		}
		return career.skill;
	}

	static getCorrectedPassive(career: ICareer): ICareerPassive {
		const correctedPassive = correctedPassivesData.find((p) => p.careerId === career.id);
		if (correctedPassive) {
			return { ...career.passive, description: correctedPassive.description };
		}
		return career.passive;
	}

	static getCorrectedPerks(career: ICareer): ICareerPerk[] {
		const correctedPerks = career.perks.map((perk) => {
			const correctedPerk = correctedPerksData.find((p) => p.careerId === career.id && p.name === perk.name);
			if (correctedPerk) {
				return { ...perk, description: correctedPerk.description };
			}
			return perk;
		});
		return correctedPerks;
	}

	static getTalents(build: ICareerBuild): (ICareerTalent | null | undefined)[] {
		return [
			build.level5Talent,
			build.level10Talent,
			build.level15Talent,
			build.level20Talent,
			build.level25Talent,
			build.level30Talent,
		];
	}

	static isTalentSelected(talent: ICareerTalent | null | undefined, build: ICareerBuild): boolean {
		if (!talent) {
			return false;
		}
		return this.getTalents(build).filter((t) => t?.talentNumber === talent.talentNumber).length > 0;
	}

	static getBuildFromHashData(data: ICareerBuild, career: ICareer, properties: IProperty[], traits: ITrait[]): ICareerBuild {
		const build = {} as ICareerBuild;
		build.career = career;

		if (data.primaryWeapon) {
			const primaryWeaponId = data.primaryWeapon.weapon?.id;
			const primaryWeaponProperty1Id = data.primaryWeapon.property1?.id;
			const primaryWeaponProperty2Id = data.primaryWeapon.property2?.id;
			const primaryWeaponTraitId = data.primaryWeapon.trait?.id;

			const primaryWeapon = career.primaryWeapons.find((weapon) => weapon.id === primaryWeaponId);

			if (primaryWeapon) {
				build.primaryWeapon = {
					weapon: primaryWeapon,
					property1: properties.find((property) => property.id === primaryWeaponProperty1Id),
					property2: properties.find((property) => property.id === primaryWeaponProperty2Id),
					trait: traits.find((trait) => trait.id === primaryWeaponTraitId),
					powerLevel: data.primaryWeapon.powerLevel,
					rarity: data.primaryWeapon.rarity,
				};

				if (data.primaryWeapon.illusion) {
					build.primaryWeapon.illusion = {
						id: data.primaryWeapon.illusion?.id,
					};
				}
			}
		}

		if (data.secondaryWeapon) {
			const secondaryWeaponId = data.secondaryWeapon.weapon?.id;
			const secondaryWeaponProperty1Id = data.secondaryWeapon.property1?.id;
			const secondaryWeaponProperty2Id = data.secondaryWeapon.property2?.id;
			const secondaryWeaponTraitId = data.secondaryWeapon.trait?.id;

			const secondaryWeapon = career.secondaryWeapons.find((weapon) => weapon.id === secondaryWeaponId);

			if (secondaryWeapon) {
				build.secondaryWeapon = {
					weapon: secondaryWeapon,
					property1: properties.find((property) => property.id === secondaryWeaponProperty1Id),
					property2: properties.find((property) => property.id === secondaryWeaponProperty2Id),
					trait: traits.find((trait) => trait.id === secondaryWeaponTraitId),
					powerLevel: data.secondaryWeapon.powerLevel,
					rarity: data.secondaryWeapon.rarity,
				};

				if (data.secondaryWeapon.illusion) {
					build.secondaryWeapon.illusion = {
						id: data.secondaryWeapon.illusion?.id,
					};
				}
			}
		}

		if (data.necklace) {
			const necklaceProperty1Id = data.necklace.property1?.id;
			const necklaceProperty2Id = data.necklace.property2?.id;
			const necklaceTraitId = data.necklace.trait?.id;

			const necklaceProperty1 = properties.find((property) => property.id === necklaceProperty1Id);
			const necklaceProperty2 = properties.find((property) => property.id === necklaceProperty2Id);
			const necklaceTrait = traits.find((trait) => trait.id === necklaceTraitId);

			build.necklace = {
				trait: necklaceTrait,
				property1: necklaceProperty1,
				property2: necklaceProperty2,
				powerLevel: data.necklace.powerLevel,
				rarity: data.necklace.rarity,
			};

			if (data.necklace.illusion) {
				build.necklace.illusion = {
					id: data.necklace.illusion?.id,
				};
			}
		}

		if (data.charm) {
			const charmProperty1Id = data.charm.property1?.id;
			const charmProperty2Id = data.charm.property2?.id;
			const charmTraitId = data.charm.trait?.id;

			const charmProperty1 = properties.find((property) => property.id === charmProperty1Id);
			const charmProperty2 = properties.find((property) => property.id === charmProperty2Id);
			const charmTrait = traits.find((trait) => trait.id === charmTraitId);

			build.charm = {
				trait: charmTrait,
				property1: charmProperty1,
				property2: charmProperty2,
				powerLevel: data.charm.powerLevel,
				rarity: data.charm.rarity,
			};

			if (data.charm.illusion) {
				build.charm.illusion = {
					id: data.charm.illusion?.id,
				};
			}
		}

		if (data.trinket) {
			const trinketProperty1Id = data.trinket.property1?.id;
			const trinketProperty2Id = data.trinket.property2?.id;
			const trinketTraitId = data.trinket.trait?.id;

			const trinketProperty1 = properties.find((property) => property.id === trinketProperty1Id);
			const trinketProperty2 = properties.find((property) => property.id === trinketProperty2Id);
			const trinketTrait = traits.find((trait) => trait.id === trinketTraitId);

			build.trinket = {
				trait: trinketTrait,
				property1: trinketProperty1,
				property2: trinketProperty2,
				powerLevel: data.trinket.powerLevel,
				rarity: data.trinket.rarity,
			};

			if (data.trinket.illusion) {
				build.trinket.illusion = {
					id: data.trinket.illusion?.id,
				};
			}
		}

		return build;
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

			const primaryWeaponProperty1 = primaryWeapon.properties?.find((property) => property.id === primaryWeaponProperty1Id);
			const primaryWeaponProperty2 = primaryWeapon.properties?.find((property) => property.id === primaryWeaponProperty2Id);
			const primaryWeaponTrait = primaryWeapon.traits?.find((trait) => trait.id === primaryWeaponTraitId);

			if (primaryWeaponProperty1 && primaryWeaponProperty2) {
				build.primaryWeapon = {
					weapon: primaryWeapon,
					property1: primaryWeaponProperty1,
					property2: primaryWeaponProperty2,
					trait: primaryWeaponTrait,
					powerLevel: 300,
					rarity: ItemRarityEnum.Red,
				};
			}
		} else {
			build.primaryWeapon = {
				weapon: career.primaryWeapons[0],
				property1: career.primaryWeapons[0].properties?.[0],
				property2: career.primaryWeapons[0].properties?.[1],
				trait: career.primaryWeapons[0].traits?.[0],
				powerLevel: 300,
				rarity: ItemRarityEnum.Red,
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

			const secondaryWeaponProperty1 = secondaryWeapon.properties?.find((property) => property.id === secondaryWeaponProperty1Id);
			const secondaryWeaponProperty2 = secondaryWeapon.properties?.find((property) => property.id === secondaryWeaponProperty2Id);
			const secondaryWeaponTrait = secondaryWeapon.traits?.find((trait) => trait.id === secondaryWeaponTraitId);

			if (secondaryWeaponProperty1 && secondaryWeaponProperty2) {
				build.secondaryWeapon = {
					weapon: secondaryWeapon,
					property1: secondaryWeaponProperty1,
					property2: secondaryWeaponProperty2,
					trait: secondaryWeaponTrait,
					powerLevel: 300,
					rarity: ItemRarityEnum.Red,
				};
			}
		} else {
			build.secondaryWeapon = {
				weapon: career.secondaryWeapons[0],
				property1: career.secondaryWeapons[0].properties?.[0],
				property2: career.secondaryWeapons[0].properties?.[1],
				trait: career.secondaryWeapons[0].traits?.[0],
				powerLevel: 300,
				rarity: ItemRarityEnum.Red,
			};
		}

		const talentsParam = searchParams.get("talents");

		const talents =
			talentsParam?.split("-").length === 6 ? talentsParam.split("-").map((talent) => parseInt(talent)) : [0, 0, 0, 0, 0, 0];
		build.level5Talent = build.career.talents.find((talent) => talent.talentNumber === talents[0]);
		build.level10Talent = build.career.talents.find((talent) => talent.talentNumber === talents[1]);
		build.level15Talent = build.career.talents.find((talent) => talent.talentNumber === talents[2]);
		build.level20Talent = build.career.talents.find((talent) => talent.talentNumber === talents[3]);
		build.level25Talent = build.career.talents.find((talent) => talent.talentNumber === talents[4]);
		build.level30Talent = build.career.talents.find((talent) => talent.talentNumber === talents[5]);

		const necklaceParams = searchParams.get("necklace");
		if (necklaceParams?.split("-").length === 3) {
			const necklaceProperty1Id = parseInt(necklaceParams.split("-")[0]);
			const necklaceProperty2Id = parseInt(necklaceParams.split("-")[1]);
			const necklaceTraitId = parseInt(necklaceParams.split("-")[2]);

			const necklaceProperty1 = properties.find((property) => property.id === necklaceProperty1Id);
			const necklaceProperty2 = properties.find((property) => property.id === necklaceProperty2Id);
			const necklaceTrait = traits.find((trait) => trait.id === necklaceTraitId);

			build.necklace = {
				trait: necklaceTrait,
				property1: necklaceProperty1,
				property2: necklaceProperty2,
				powerLevel: 300,
				rarity: !necklaceProperty1
					? ItemRarityEnum.White
					: !necklaceProperty2
					? ItemRarityEnum.Green
					: !necklaceTrait
					? ItemRarityEnum.Blue
					: ItemRarityEnum.Red,
			};
		} else {
			build.necklace = {
				trait: traits.find((trait) => trait.category === "defence_accessory"),
				property1: properties.find((property) => property.category === "necklace"),
				property2: properties.find((property) => property.category === "necklace", { skip: 1 }),
				powerLevel: 300,
				rarity: ItemRarityEnum.Red,
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

			build.charm = {
				trait: charmTrait,
				property1: charmProperty1,
				property2: charmProperty2,
				powerLevel: 300,
				rarity: !charmProperty1
					? ItemRarityEnum.White
					: !charmProperty2
					? ItemRarityEnum.Green
					: !charmTrait
					? ItemRarityEnum.Blue
					: ItemRarityEnum.Red,
			};
		} else {
			build.charm = {
				trait: traits.find((trait) => trait.category === "offence_accessory"),
				property1: properties.find((property) => property.category === "charm"),
				property2: properties.find((property) => property.category === "charm", { skip: 1 }),
				powerLevel: 300,
				rarity: ItemRarityEnum.Red,
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

			build.trinket = {
				trait: trinketTrait,
				property1: trinketProperty1,
				property2: trinketProperty2,
				powerLevel: 300,
				rarity: !trinketProperty1
					? ItemRarityEnum.White
					: !trinketProperty2
					? ItemRarityEnum.Green
					: !trinketTrait
					? ItemRarityEnum.Blue
					: ItemRarityEnum.Red,
			};
		} else {
			build.trinket = {
				trait: traits.find((trait) => trait.category === "utility_accessory"),
				property1: properties.find((property) => property.category === "trinket"),
				property2: properties.find((property) => property.category === "trinket", { skip: 1 }),
				powerLevel: 300,
				rarity: ItemRarityEnum.Red,
			};
		}

		const level = searchParams.get("level");
		if (level) {
			build.level = parseInt(level);
		}
		return build;
	}

	static getQueryStringFromBuild(build: ICareerBuild): string {
		if (!build.career) {
			return "";
		}

		let talentParams = `${build.level5Talent?.talentNumber ?? 0}-${build.level10Talent?.talentNumber ?? 0}-${
			build.level15Talent?.talentNumber ?? 0
		}-${build.level20Talent?.talentNumber ?? 0}-${build.level25Talent?.talentNumber ?? 0}-${build.level30Talent?.talentNumber ?? 0}`;

		let searchParams = "?";
		searchParams += `career=${build.career.id}`;
		searchParams += `&talents=${talentParams}`;
		if (build.primaryWeapon) {
			searchParams += `&primary=${build.primaryWeapon.weapon?.id}-${build.primaryWeapon.property1?.id ?? 0}-${
				build.primaryWeapon.property2?.id ?? 0
			}-${build.primaryWeapon.trait?.id ?? 0}`;
		}
		if (build.secondaryWeapon) {
			searchParams += `&secondary=${build.secondaryWeapon.weapon?.id}-${build.secondaryWeapon.property1?.id ?? 0}-${
				build.secondaryWeapon.property2?.id ?? 0
			}-${build.secondaryWeapon.trait?.id ?? 0}`;
		}
		searchParams += `&necklace=${build.necklace.property1?.id ?? 0}-${build.necklace.property2?.id ?? 0}-${
			build.necklace.trait?.id ?? 0
		}`;
		searchParams += `&charm=${build.charm.property1?.id ?? 0}-${build.charm.property2?.id ?? 0}-${build.charm.trait?.id ?? 0}`;
		searchParams += `&trinket=${build.trinket.property1?.id ?? 0}-${build.trinket.property2?.id ?? 0}-${build.trinket.trait?.id ?? 0}`;
		return searchParams;
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
