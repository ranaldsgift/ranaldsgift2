import { CareerCache, IllusionsCache, PropertiesCache, TraitsCache } from "$lib/cache/RedisCache";
import type { ICareerBuild } from "$lib/entities/builds/CareerBuild.js";
import redis from "$lib/server/redis.js";
import { json, type RequestHandler } from "@sveltejs/kit";

export async function POST({ request, locals }) {
	const data = await request.json();

	if (!data.buildHash || !data.build) {
		return json({ error: "Invalid request" }, { status: 400 });
	}

	const build: ICareerBuild = data.build;

	if (!build.primaryWeapon.weapon?.id) {
		return json({ error: "Invalid build" }, { status: 400 });
	}

	if (!build.secondaryWeapon.weapon?.id) {
		return json({ error: "Invalid build" }, { status: 400 });
	}

	const redisBuild: ICareerBuild = {
		careerId: build.career?.id,
		primaryWeapon: {
			powerLevel: build.primaryWeapon.powerLevel,
			rarity: build.primaryWeapon.rarity,
			property1Value: build.primaryWeapon.property1Value,
			property2Value: build.primaryWeapon.property2Value,
			weapon: {
				id: build.primaryWeapon.weapon?.id,
			},
			property1: {
				id: build.primaryWeapon.property1?.id,
			},
			property2: {
				id: build.primaryWeapon.property2?.id,
			},
			trait: {
				id: build.primaryWeapon.trait?.id,
			},
		},
		secondaryWeapon: {
			powerLevel: build.secondaryWeapon.powerLevel,
			rarity: build.secondaryWeapon.rarity,
			property1Value: build.secondaryWeapon.property1Value,
			property2Value: build.secondaryWeapon.property2Value,
			weapon: {
				id: build.secondaryWeapon.weapon?.id,
			},
			property1: {
				id: build.secondaryWeapon.property1?.id,
			},
			property2: {
				id: build.secondaryWeapon.property2?.id,
			},
			trait: {
				id: build.secondaryWeapon.trait?.id,
			},
		},
		necklace: {
			powerLevel: build.necklace.powerLevel,
			rarity: build.necklace.rarity,
			property1Value: build.necklace.property1Value,
			property2Value: build.necklace.property2Value,
			property1: {
				id: build.necklace.property1?.id,
			},
			property2: {
				id: build.necklace.property2?.id,
			},
			trait: {
				id: build.necklace.trait?.id,
			},
		},
		charm: {
			powerLevel: build.charm.powerLevel,
			rarity: build.charm.rarity,
			property1Value: build.charm.property1Value,
			property2Value: build.charm.property2Value,
			property1: {
				id: build.charm.property1?.id,
			},
			property2: {
				id: build.charm.property2?.id,
			},
			trait: {
				id: build.charm.trait?.id,
			},
		},
		trinket: {
			powerLevel: build.trinket.powerLevel,
			rarity: build.trinket.rarity,
			property1Value: build.trinket.property1Value,
			property2Value: build.trinket.property2Value,
			property1: {
				id: build.trinket.property1?.id,
			},
			property2: {
				id: build.trinket.property2?.id,
			},
			trait: {
				id: build.trinket.trait?.id,
			},
		},
	};

	if (build.level5Talent) {
		redisBuild.level5Talent = {
			id: build.level5Talent?.id,
		};
	}

	if (build.level10Talent) {
		redisBuild.level10Talent = {
			id: build.level10Talent?.id,
		};
	}

	if (build.level15Talent) {
		redisBuild.level15Talent = {
			id: build.level15Talent?.id,
		};
	}

	if (build.level20Talent) {
		redisBuild.level20Talent = {
			id: build.level20Talent?.id,
		};
	}

	if (build.level25Talent) {
		redisBuild.level25Talent = {
			id: build.level25Talent?.id,
		};
	}

	if (build.level30Talent) {
		redisBuild.level30Talent = {
			id: build.level30Talent?.id,
		};
	}

	if (build.primaryWeapon.illusion) {
		redisBuild.primaryWeapon.illusion = {
			id: build.primaryWeapon.illusion?.id,
		};
	}

	if (build.secondaryWeapon.illusion) {
		redisBuild.secondaryWeapon.illusion = {
			id: build.secondaryWeapon.illusion?.id,
		};
	}

	if (build.necklace.illusion) {
		redisBuild.necklace.illusion = {
			id: build.necklace.illusion?.id,
		};
	}

	if (build.charm.illusion) {
		redisBuild.charm.illusion = {
			id: build.charm.illusion?.id,
		};
	}

	if (build.trinket.illusion) {
		redisBuild.trinket.illusion = {
			id: build.trinket.illusion?.id,
		};
	}

	redis.set(`zbuildhash-${data.buildHash}`, redisBuild);

	return json({});
}

export const GET: RequestHandler = async ({ url, params }) => {
	const id = url.searchParams.get("id");

	if (!id) {
		return new Response(null, { status: 400 });
	}

	let build = {} as ICareerBuild;

	const data = (await redis.get(`zbuildhash-${id}`)) as ICareerBuild;

	if (data && data.careerId) {
		const career = await CareerCache.get(data.careerId);
		build.career = career;

		if (data.level5Talent) {
			const level5Talent = career.talents.find((talent) => talent.id === data.level5Talent?.id);
			if (level5Talent) {
				build.level5Talent = level5Talent;
			}
		}

		if (data.level10Talent) {
			const level10Talent = career.talents.find((talent) => talent.id === data.level10Talent?.id);
			if (level10Talent) {
				build.level10Talent = level10Talent;
			}
		}

		if (data.level15Talent) {
			const level15Talent = career.talents.find((talent) => talent.id === data.level15Talent?.id);
			if (level15Talent) {
				build.level15Talent = level15Talent;
			}
		}

		if (data.level20Talent) {
			const level20Talent = career.talents.find((talent) => talent.id === data.level20Talent?.id);
			if (level20Talent) {
				build.level20Talent = level20Talent;
			}
		}

		if (data.level25Talent) {
			const level25Talent = career.talents.find((talent) => talent.id === data.level25Talent?.id);
			if (level25Talent) {
				build.level25Talent = level25Talent;
			}
		}

		if (data.level30Talent) {
			const level30Talent = career.talents.find((talent) => talent.id === data.level30Talent?.id);
			if (level30Talent) {
				build.level30Talent = level30Talent;
			}
		}

		if (data.primaryWeapon) {
			const primaryWeaponId = data.primaryWeapon.weapon?.id;

			const primaryWeapon = career.primaryWeapons.find((weapon) => weapon.id === primaryWeaponId);

			if (primaryWeapon) {
				build.primaryWeapon = {
					weapon: primaryWeapon,
					powerLevel: data.primaryWeapon.powerLevel,
					rarity: data.primaryWeapon.rarity,
				};

				const primaryWeaponProperty1Id = data.primaryWeapon.property1?.id;
				if (primaryWeaponProperty1Id) {
					const property1 = await PropertiesCache.get(primaryWeaponProperty1Id);
					if (property1) {
						build.primaryWeapon.property1 = property1;
					}
				}

				const primaryWeaponProperty2Id = data.primaryWeapon.property2?.id;
				if (primaryWeaponProperty2Id) {
					const property2 = await PropertiesCache.get(primaryWeaponProperty2Id);
					if (property2) {
						build.primaryWeapon.property2 = property2;
					}
				}

				const primaryWeaponTraitId = data.primaryWeapon.trait?.id;
				if (primaryWeaponTraitId) {
					const trait = await TraitsCache.get(primaryWeaponTraitId);
					if (trait) {
						build.primaryWeapon.trait = trait;
					}
				}

				if (data.primaryWeapon.illusion && data.primaryWeapon.illusion.id) {
					const illusion = await IllusionsCache.get(data.primaryWeapon.illusion.id);
					if (illusion) {
						build.primaryWeapon.illusion = illusion;
					}
				}
			}
		}

		if (data.secondaryWeapon) {
			const secondaryWeaponId = data.secondaryWeapon.weapon?.id;

			const secondaryWeapon = career.secondaryWeapons.find((weapon) => weapon.id === secondaryWeaponId);

			if (secondaryWeapon) {
				build.secondaryWeapon = {
					weapon: secondaryWeapon,
					powerLevel: data.secondaryWeapon.powerLevel,
					rarity: data.secondaryWeapon.rarity,
				};

				const secondaryWeaponProperty1Id = data.secondaryWeapon.property1?.id;
				if (secondaryWeaponProperty1Id) {
					const property1 = await PropertiesCache.get(secondaryWeaponProperty1Id);
					if (property1) {
						build.secondaryWeapon.property1 = property1;
					}
				}

				const secondaryWeaponProperty2Id = data.secondaryWeapon.property2?.id;
				if (secondaryWeaponProperty2Id) {
					const property2 = await PropertiesCache.get(secondaryWeaponProperty2Id);
					if (property2) {
						build.secondaryWeapon.property2 = property2;
					}
				}

				const secondaryWeaponTraitId = data.secondaryWeapon.trait?.id;
				if (secondaryWeaponTraitId) {
					const trait = await TraitsCache.get(secondaryWeaponTraitId);
					if (trait) {
						build.secondaryWeapon.trait = trait;
					}
				}

				if (data.secondaryWeapon.illusion && data.secondaryWeapon.illusion.id) {
					const illusion = await IllusionsCache.get(data.secondaryWeapon.illusion.id);
					if (illusion) {
						build.secondaryWeapon.illusion = illusion;
					}
				}
			}
		}

		if (data.necklace) {
			build.necklace = {
				powerLevel: data.necklace.powerLevel,
				rarity: data.necklace.rarity,
			};

			const necklaceProperty1Id = data.necklace.property1?.id;
			if (necklaceProperty1Id) {
				const property1 = await PropertiesCache.get(necklaceProperty1Id);
				if (property1) {
					build.necklace.property1 = property1;
				}
			}

			const necklaceProperty2Id = data.necklace.property2?.id;
			if (necklaceProperty2Id) {
				const property2 = await PropertiesCache.get(necklaceProperty2Id);
				if (property2) {
					build.necklace.property2 = property2;
				}
			}

			const necklaceTraitId = data.necklace.trait?.id;
			if (necklaceTraitId) {
				const trait = await TraitsCache.get(necklaceTraitId);
				if (trait) {
					build.necklace.trait = trait;
				}
			}

			if (data.necklace.illusion && data.necklace.illusion.id) {
				const illusion = await IllusionsCache.get(data.necklace.illusion.id);
				if (illusion) {
					build.necklace.illusion = illusion;
				}
			}
		}

		if (data.charm) {
			build.charm = {
				powerLevel: data.charm.powerLevel,
				rarity: data.charm.rarity,
			};

			const charmProperty1Id = data.charm.property1?.id;
			if (charmProperty1Id) {
				const property1 = await PropertiesCache.get(charmProperty1Id);
				if (property1) {
					build.charm.property1 = property1;
				}
			}

			const charmProperty2Id = data.charm.property2?.id;
			if (charmProperty2Id) {
				const property2 = await PropertiesCache.get(charmProperty2Id);
				if (property2) {
					build.charm.property2 = property2;
				}
			}

			const charmTraitId = data.charm.trait?.id;
			if (charmTraitId) {
				const trait = await TraitsCache.get(charmTraitId);
				if (trait) {
					build.charm.trait = trait;
				}
			}

			if (data.charm.illusion && data.charm.illusion.id) {
				const illusion = await IllusionsCache.get(data.charm.illusion.id);
				if (illusion) {
					build.charm.illusion = illusion;
				}
			}
		}

		if (data.trinket) {
			build.trinket = {
				powerLevel: data.trinket.powerLevel,
				rarity: data.trinket.rarity,
			};

			const trinketProperty1Id = data.trinket.property1?.id;
			if (trinketProperty1Id) {
				const property1 = await PropertiesCache.get(trinketProperty1Id);
				if (property1) {
					build.trinket.property1 = property1;
				}
			}

			const trinketProperty2Id = data.trinket.property2?.id;
			if (trinketProperty2Id) {
				const property2 = await PropertiesCache.get(trinketProperty2Id);
				if (property2) {
					build.trinket.property2 = property2;
				}
			}

			const trinketTraitId = data.trinket.trait?.id;
			if (trinketTraitId) {
				const trait = await TraitsCache.get(trinketTraitId);
				if (trait) {
					build.trinket.trait = trait;
				}
			}

			if (data.trinket.illusion && data.trinket.illusion.id) {
				const illusion = await IllusionsCache.get(data.trinket.illusion.id);
				if (illusion) {
					build.trinket.illusion = illusion;
				}
			}
		}
	}

	return new Response(JSON.stringify(build));
};
