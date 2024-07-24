import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
import type { ICareer } from "$lib/entities/career/Career";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";

class BuildHelper {
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
			}

			const talentsParam = searchParams.get("talents");
			if (talentsParam?.split("-").length !== 6) {
				return null;
			}

			const talents = talentsParam.split("-").map((talent) => parseInt(talent));
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
			}

			const powerLevel = searchParams.get("powerLevel");
			if (powerLevel) {
				build.powerLevel = parseInt(powerLevel);
			}
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

		return `?career=${build.career.id}&talents=${talentParams}
		&primary=${build.primaryWeapon.weapon.id}
			-${build.primaryWeapon.property1?.id}
			-${build.primaryWeapon.property2?.id}
			-${build.primaryWeapon.trait?.id}
		&secondary=${build.secondaryWeapon.weapon.id}
			-${build.secondaryWeapon.property1?.id}
			-${build.secondaryWeapon.property2?.id}
			-${build.secondaryWeapon.trait?.id}
		&necklace=${build.necklace.property1?.id}
			-${build.necklace.property2?.id}
			-${build.necklace.trait?.id}
		&charm=${build.charm.property1?.id}
			-${build.charm.property2?.id}
			-${build.charm.trait?.id}
		&trinket=${build.trinket.property1?.id}
			-${build.trinket.property2?.id}
			-${build.trinket.trait?.id}`;
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
}

export default BuildHelper;
