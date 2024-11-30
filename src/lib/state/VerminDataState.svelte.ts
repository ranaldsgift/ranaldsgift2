import { browser } from "$app/environment";
import type { ICareer } from "$lib/entities/career/Career";
import type { IHero } from "$lib/entities/Hero";
import type { IProperty } from "$lib/entities/Property";
import type { ITrait } from "$lib/entities/Trait";
import type { IWeapon } from "$lib/entities/Weapon";
import { CareersStore, HeroesStore, PropertiesStore, TraitsStore, WeaponsStore } from "$lib/stores/DataStores";
import { getContext, setContext } from "svelte";

class VerminDataState {
	weapons: IWeapon[] = $state([]);
	traits: ITrait[] = $state([]);
	properties: IProperty[] = $state([]);
	heroes: IHero[] = $state([]);
	careers: ICareer[] = $state([]);

	constructor() {
		$effect(() => {
			if (browser) {
				this.loadTraitData();
				this.loadPropertyData();
				this.loadWeaponData();
				this.loadCareerData();
				this.loadHeroData();
			}
		});
	}

	async loadCareerData() {
		this.careers = (await CareersStore.loadData()).items;
	}

	async loadHeroData() {
		this.heroes = (await HeroesStore.loadData()).items;
	}

	async loadWeaponData() {
		this.weapons = (await WeaponsStore.loadData()).items;
	}

	async loadTraitData() {
		this.traits = (await TraitsStore.loadData()).items;
	}

	async loadPropertyData() {
		this.properties = (await PropertiesStore.loadData()).items;
	}

	getTrait(traitId: number) {
		return this.traits.find((t) => t.id === traitId);
	}

	getProperty(propertyId: number) {
		return this.properties.find((p) => p.id === propertyId);
	}

	getWeapon(weaponId: number) {
		return this.weapons.find((w) => w.id === weaponId);
	}
}

const CONTEXT_KEY = Symbol("CONTEXT_KEY");

export function initializeVerminDataState() {
	const state = new VerminDataState();
	setContext(CONTEXT_KEY, state);
	return state;
}

export function getVerminDataState() {
	return getContext<VerminDataState>(CONTEXT_KEY);
}
