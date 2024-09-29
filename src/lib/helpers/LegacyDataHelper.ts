import { heroesData } from "$lib/data/legacy/Heroes";
import { heroesDataMap } from "$lib/data/legacy/HeroesDataMap";
import { weaponsData } from "$lib/data/legacy/Weapons";
import { twitchData } from "$lib/data/legacy/Twitch";
import { weaponsDataMap } from "$lib/data/legacy/WeaponsDataMap";
import { traitsData } from "$lib/data/legacy/Traits";
import { propertiesData } from "$lib/data/legacy/Properties";
import { patchList } from "$lib/data/legacy/PatchList";
import { missionData } from "$lib/data/legacy/Missions";
import { sortByData } from "$lib/data/legacy/BuildSortOptions";
import { difficultyData } from "$lib/data/legacy/Difficulties";
import { potionData } from "$lib/data/legacy/Potions";
import { roleData } from "$lib/data/legacy/Roles";
import { bookData } from "$lib/data/legacy/Books";
import { correctedTalentsData } from "$lib/data/legacy/CorrectedTalents";
import { correctedPerksData } from "$lib/data/legacy/CorrectedPerks";
import { correctedPassivesData } from "$lib/data/legacy/CorrectedPassives";
import { correctedSkillsData } from "$lib/data/legacy/CorrectedSkills";
import { unlistedPerksData } from "$lib/data/legacy/UnlistedPerks";
import { traitsDataMap } from "$lib/data/legacy/TraitsDataMap";
import { meleeWeaponsData } from "$lib/data/legacy/MeleeWeapons";
import { rangeWeaponsData } from "$lib/data/legacy/RangeWeapons";
import type TraitCategoryEnum from "$lib/enums/TraitCategoryEnum";

let weapons: any = null;

export type LegacyTraitCategory =
	| "melee"
	| "ranged_ammo"
	| "ranged_energy"
	| "ranged_heat"
	| "defence_accessory"
	| "offence_accessory"
	| "utility_accessory";

export type LegacyPropertyCategory = "melee" | "range" | "necklace" | "charm" | "trinket";

// TODO - When we can fully migrate all firebase data to Supabase, we can trim all the useless functions and data from this file
export class LegacyDataHelper {
	static getCareers = () => {
		var values = Object.values(heroesData);
		var keys = Object.keys(heroesData);
		var valueMap = values.map((obj: any, index) => {
			obj.codeName = keys[index];
			var careerMap = heroesDataMap.find((career) => {
				return career.codeName === keys[index];
			});
			if (careerMap) {
				obj.id = careerMap.id;
				obj.sortOrder = careerMap.sortOrder;
				obj.heroId = careerMap.heroId;
			}
			return obj;
		});
		return valueMap.sort((a, b) => {
			return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
		});
	};
	static getCareer = (careerId: string) => {
		return this.getCareers().find((career) => {
			return career.id === parseInt(careerId);
		});
	};

	static getCareerTalents = (careerId: string) => {
		var career = this.getCareer(careerId);
		return career ? career.talents : null;
	};

	static getWeapon = (weaponId: string) => {
		var weapon = this.getWeapons().find((weapon: any) => {
			return weapon.id === parseInt(weaponId);
		});

		if (!weapon) {
			return null;
		}

		return weapon;
	};

	static getWeaponCodename = (weaponId: string) => {
		var weapon = this.getWeapons().find((weapon: any) => {
			return weapon.id === parseInt(weaponId);
		});
		return weapon ? weapon.codeName : null;
	};

	static getWeapons = () => {
		if (!weapons) {
			var values = Object.values(weaponsData);
			var keys = Object.keys(weaponsData);
			weapons = values.map((obj: any, index) => {
				obj.codeName = keys[index];
				var weaponMap: any = weaponsDataMap.find((weapon) => {
					return weapon.codeName === keys[index];
				});
				if (weaponMap) {
					obj.id = parseInt(weaponMap.id);
				}
				return obj;
			});
		}
		return weapons;
	};

	static getProperties = () => {
		var values = Object.values(propertiesData);
		var keys = Object.keys(propertiesData);
		var properties = values.map((obj: any, index) => {
			return {
				name: keys[index],
				properties: obj,
			};
		});
		return properties;
	};

	static getPropertyName = (category: LegacyPropertyCategory, propertyId: number) => {
		return propertiesData[category].find((property) => {
			return parseInt(property.id) === propertyId;
		})?.name;
	};

	static getTraitName = (category: LegacyTraitCategory, traitId: number) => {
		return traitsDataMap[category].find((trait) => {
			return parseInt(trait.id) === traitId;
		})?.name;
	};

	static getOldWeaponCodename(id: number, type: "melee" | "range") {
		// If it's a Slayer or Grail Knight, just use the old melee weapons
		if (type === "melee") {
			return meleeWeaponsData.find((weapon) => {
				return weapon.id === id;
			})?.codeName;
		}
		return rangeWeaponsData.find((weapon) => {
			return weapon.id === id;
		})?.codeName;
	}

	static getTraitFromCategory = (category: string, traitId: number) => {
		return this.getTraits()
			.find((traitCategory) => {
				return traitCategory.name === category;
			})
			?.traits.find((trait) => {
				parseInt(trait.id) === traitId;
			});
	};

	static getTraitMapById = (category: LegacyTraitCategory, id: number) => {
		var categoryTraits = traitsDataMap[category];

		if (!categoryTraits) {
			return null;
		}
		return Object.values(categoryTraits).find((trait) => {
			return parseInt(trait.id) === id;
		});
	};

	static getTraits = () => {
		var values = Object.values(traitsData);
		var keys = Object.keys(traitsData);
		var traits = values.map((obj: any, index) => {
			var oldTraitValues = Object.values(obj);
			var oldTraitsKeys = Object.keys(obj);
			var oldTraits = oldTraitValues.map((trait: any) => {
				trait.codeName = oldTraitsKeys[index];
				return trait;
			});
			return {
				name: keys[index],
				traits: oldTraits,
			};
		});
		return traits;
	};

	static getPropertyFromCategory = (category: string, propertyId: number) => {
		switch (category) {
			case "melee":
				return propertiesData.melee.find((property) => {
					return parseInt(property.id) === propertyId;
				});
			case "range":
				return propertiesData.range.find((property) => {
					return parseInt(property.id) === propertyId;
				});
			case "necklace":
				return propertiesData.necklace.find((property) => {
					return parseInt(property.id) === propertyId;
				});
			case "charm":
				return propertiesData.charm.find((property) => {
					return parseInt(property.id) === propertyId;
				});
			case "trinket":
				return propertiesData.trinket.find((property) => {
					return parseInt(property.id) === propertyId;
				});
			default:
				return null;
		}
	};

	static getTimeSinceText = (date: Date) => {
		const now = new Date();
		const diff = now.getTime() - new Date(date).getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		if (days > 0) {
			return `${days} day${days > 1 ? "s ago" : " ago"}`;
		}
		const hours = Math.floor(diff / (1000 * 60 * 60));
		if (hours > 0) {
			return `${hours} hour${hours > 1 ? "s ago" : " ago"}`;
		}
		const minutes = Math.floor(diff / (1000 * 60));
		if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? "s ago" : " ago"}`;
		}
		const seconds = Math.floor(diff / 1000);
		return seconds > 0 ? `${seconds} second${seconds > 1 ? "s ago" : " ago"}` : "just now";
	};

	/*     static getCorrectedTalent = (careerId, tierNumber, talentNumber) => {
      return correctedTalentsData.find((talent) => {return talent.careerId === parseInt(careerId) && talent.tier === parseInt(tierNumber) && talent.talent === parseInt(talentNumber)});
    }

    static getCorrectedPerk = (careerId, perkName) => {
      return correctedPerksData.find((perk) => {return perk.careerId === parseInt(careerId) && perk.name.toLowerCase() === perkName.toLowerCase()});
    }

    static getCorrectedPassive = (careerId) => {
      return correctedPassivesData.find((passive) => {return passive.careerId === parseInt(careerId)});
    }

    static getCorrectedSkill = (careerId) => {
      return correctedSkillsData.find((skill) => {return skill.careerId === parseInt(careerId)});
    }

    static getUnlistedPerks = (careerId) => {
      return unlistedPerksData.filter((perk) => { return perk.careerId === parseInt(careerId); });
    }

    static getTraitData = (id, type) => {
      switch (type) {
        case 'melee':
          return traitsData.melee.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'range':
          return traitsData.range.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'necklace':
          return traitsData.necklace.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'charm':
          return traitsData.charm.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        case 'trinket':
          return traitsData.trinket.find((trait) => { return parseInt(trait.id) === parseInt(id); });
        default:
          return null;
      }
    }
    static getPropertyData = (id, type) => {
      return propertiesData.find((trait) => { return parseInt(trait.id) === parseInt(id); });
    }
    static getPatchFromDate = (date) => {
      var filteredPatchList = PatchList.filter((patch) => {
          return patch.date < date;
      });

      return filteredPatchList[filteredPatchList.length - 1];
    }
    
    static getPatchFromDateForType = (date, updateType) => {
      var filteredPatchList = PatchList.filter((patch) => {
          return patch.date < date && patch.type === updateType;
      });

      return filteredPatchList[filteredPatchList.length - 1];
    }

    static getDataByIds = (data, ids) => {
      return data.filter((item) => { return ids.includes(item.id); });
    }

    static getDataById = (data, id) => {
      return data.find((item) => { return item.id === id; });
    }

    static getDifficultyById = (id) => {
      return this.getDataById(difficultyData, id);
    }

    static getDifficultiesByIds = (ids) => {
      return this.getDataByIds(difficultyData, ids);
    }

    static getMissionById = (id) => {
      return this.getDataById(missionData, id);
    }

    static getMissionsByIds = (ids) => {
      return this.getDataByIds(missionData, ids);
    }

    static getPotionById = (id) => {
      return this.getDataById(potionData, id);
    }

    static getPotionsByIds = (ids) => {
      return this.getDataByIds(potionData, ids);
    }

    static getRolesByIds = (ids) => {
      return this.getDataByIds(roleData, ids);
    }

    static getBookById = (id) => {
      return this.getDataById(bookData, id);
    }

    static getTwitchById = (id) => {
      return this.getDataById(twitchData, id);
    }

    static getBooksByIds = (ids) => {
      return this.getDataByIds(bookData, ids);
    }

    static getSortByData = () => {
      return sortByData;
    }

    static getSortOrderById = (id) => {
      return sortByData.find((sortOrder) => { return sortOrder.id === id; });
    }

    static getMissionData = () => {
      return missionData;
    }
    
    static getDifficultyData = () => {
      return difficultyData;
    }
    
    static getTwitchData = () => {
      return twitchData;
    }
    
    static getPotionData = () => {
      return potionData;
    }
    
    static getRoleData = () => {
      return roleData;
    }

    static getBookData = () => {
      return bookData;
    }

    static async getUsers() {
      if (!users) {
        return await db.collection('stats').doc('users').get().then((usersDoc) => {
          if (!usersDoc) {
            return [];
          }
          users = usersDoc.data().usernames; 
          return usersDoc.data().usernames;
        });
      }
      return users;
    }

    static async getUserBuildAuthors() {
      if (!userBuildAuthors) {
        return await db.collection('stats').doc('users').get().then((usersDoc) => {
          if (!usersDoc) {
            return [];
          }
          userBuildAuthors = usersDoc.data().usernames.filter((user) => { return user.isBuildAuthor; }); 
          return userBuildAuthors;
        });
      }
      return userBuildAuthors;
    }

    static renderListOptions = (data) => {
      let html = [];
      data.forEach(item => {
          html.push(<option key={item.id} value={item.id}>{item.name}</option>);
      });
      return html;
    }

    static getPropertiesForCategory = (category) => {
      switch (category) {
        case "melee":
          return propertiesData.melee;
        case "range":
          return propertiesData.range;
        case "necklace":
          return propertiesData.necklace;
        case "charm":
          return propertiesData.charm;
        case "trinket":
          return propertiesData.trinket;
        default:
          return null;
      }
    }

    static getPropertyFromCategory = (category, propertyId) => {
      switch (category) {
        case "melee":
          return propertiesData.melee.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        case "ranged":
          return propertiesData.range.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        case "necklace":
          return propertiesData.necklace.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        case "charm":
          return propertiesData.charm.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        case "trinket":
          return propertiesData.trinket.find((property) => { return parseInt(property.id) === parseInt(propertyId); });
        default:
          return null;
      }
    }

    static getTraitMap = (category, traitId) => {
      var categoryTraits = traitsDataMap[category];

      if (!categoryTraits) {
        return null;
      }
      return categoryTraits.find((trait) => { return parseInt(trait.id) === parseInt(traitId); });
    }

    static getTraitMapByName = (category, name) => {
      var categoryTraits = traitsDataMap[category];
      
      if (!categoryTraits) {
        return null;
      }
      return Object.values(categoryTraits).find((trait) => { return trait.name.toLowerCase() === name.toLowerCase(); });
    }

    static getMappedTraits = (category) => {
      if (!traits[category]) {
        var traitKeys = Object.keys(traitsData[category]);
        var categoryTraits = Object.values(traitsData[category]).map((trait, index) => {
          var traitMap = this.getTraitMapByName(category, trait.name);
  
          if (traitMap) {
            trait.id = parseInt(traitMap.id);
            trait.codeName = traitKeys[index];
          }
          return trait;
        });

        categoryTraits = categoryTraits.sort((a, b) => { return a.id > b.id ? 1 : a.id < b.id ? -1 : 0; });

        traits[category] = categoryTraits;
      }

      return traits[category];
    }

    static getTraitFromCategory = (category, traitId) => {
      return this.getMappedTraits(category).find((trait) => { return parseInt(trait.id) === parseInt(traitId); });
    }

    static getTraitsForCategory = (category) => {
      switch (category) {
        case "melee":
          return traitsData.melee;
        case "range":
        case "ranged_ammo":
          return traitsData.ranged_ammo;
        case "magic":
        case "ranged_heat":
          return traitsData.ranged_heat;
        case "ranged_energy":
          return traitsData.ranged_energy
        case "defence_accessory":
          return traitsData.necklace;
        case "offence_accessory":
          return traitsData.charm;
        case "utility_accessory":
          return traitsData.trinket;
        default:
          return null;
      }
    }

    static getWeapon = (weaponId) => {
      var weapon  = this.getWeapons().find((weapon) => { return weapon.id === parseInt(weaponId); });

      if (!weapon) {
        return null;
      }
      
      return weapon;
    }

    static getWeaponCodename = (weaponId) => {
      var weapon = this.getWeapons().find((weapon) => { return weapon.id === parseInt(weaponId); });
      return weapon ? weapon.codeName : null;
    }

    static getWeapons = () => {
      if (!weapons) {
        var values = Object.values(weaponsData);
        var keys = Object.keys(weaponsData);
        weapons = values.map((obj, index) => {
          obj.codeName = keys[index];
          var weaponMap = weaponsDataMap.find((weapon) => { return weapon.codeName === keys[index] });
          if (weaponMap) {
            obj.id = parseInt(weaponMap.id);
          }
          return obj;
         });

      }

      return weapons;      
    }

    static getWeaponByCodename = (weaponCodename) => {
      var weapon  = this.getWeapons().find((weapon) => { return weapon.codeName === weaponCodename.toString(); });

      if (!weapon) {
        return null;
      }
      
      return weapon;
    }
    
    static arraysEqual = (a, b) => {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;
    
      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.
    
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    static getTraitFromWeapon = (weaponId, traitId) => {
      var weapon = this.getWeapon(weaponId);
      if (!weapon) {
        return;
      }
      return this.getTraitFromCategory(weapon.propertyCategory, traitId);
    }

    static getPropertyFromWeapon = (weaponId, propertyId) => {
      var weapon = this.getWeapon(weaponId);
      if (!weapon) {
        return;
      }
      return this.getPropertyFromCategory(weapon.propertyCategory, propertyId);
    }

    static getPrimaryWeaponsForCareer = (careerId) => {
      var career = this.getCareer(parseInt(careerId));
      var weapons = this.getWeapons().filter((weapon) => { return weapon.canWieldPrimary.includes(career.codeName); });
      return weapons;

      var mappedWeapons = weapons.map(weapon =>
        ({...weapon, id: this.getWeaponId(weapon.codeName)})
      );

      return mappedWeapons;
    }

    static getSecondaryWeaponsForCareer = (careerId) => {
      var career = this.getCareer(parseInt(careerId));
      var weapons = this.getWeapons().filter((weapon) => { return weapon.canWieldSecondary.includes(career.codeName); });
      return weapons;

      var mappedWeapons = weapons.map((weapon) => {
        return {...weapon, id: this.getWeaponId(weapon.codeName)}
      });

      return mappedWeapons;
    }

    static getWeaponId = (codename) => {
      var mappedWeapon =  weaponsDataMap.find((weapon) => { return weapon.codeName === codename; });
      return mappedWeapon ? mappedWeapon.id : null;
    } */
}
