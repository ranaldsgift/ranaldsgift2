import type { IEntity } from "$lib/entities/BaseEntity";
import type { FindOneOptions, ObjectLiteral, Repository } from "typeorm";
import StaticDataCache from "./StaticDataCache";
import redis from "$lib/server/redis";
import { Mission, type IMission } from "$lib/entities/Mission";
import { DifficultyModifier, type IDifficultyModifier } from "$lib/entities/DifficultyModifier";
import { BuildRole, type IBuildRole } from "$lib/entities/BuildRole";
import { TwitchSetting, type ITwitchSetting } from "$lib/entities/TwitchSetting";
import { BookSetting, type IBookSetting } from "$lib/entities/BookSetting";
import { Potion, type IPotion } from "$lib/entities/Potion";
import { Difficulty, type IDifficulty } from "$lib/entities/Difficulty";
import { Event, type IEvent } from "$lib/entities/Event";
import { Career, type ICareer } from "$lib/entities/career/Career";
import { Weapon, type IWeapon } from "$lib/entities/Weapon";
import { Trait, type ITrait } from "$lib/entities/Trait";
import { Property, type IProperty } from "$lib/entities/Property";
import { Patch, type IPatch } from "$lib/entities/Patch";

class RedisCache<TEntity extends ObjectLiteral, TInterface extends IEntity> {
	private instance: StaticDataCache<TInterface> | null = null;
	private repository: Repository<TEntity> | null = null;

	constructor(private entityClass: new () => TEntity, private redisKey: string, private findOptions?: FindOneOptions<TEntity>) {}

	private async getRepository(): Promise<Repository<TEntity>> {
		if (!this.repository) {
			this.repository = (this.entityClass as any).getRepository();
		}
		return this.repository as Repository<TEntity>;
	}

	private async getInstance(): Promise<StaticDataCache<TInterface>> {
		if (!this.instance) {
			this.instance = new StaticDataCache<TInterface>();

			let redisData = await redis.get<TInterface[]>(this.redisKey);

			if (!redisData) {
				const repository = await this.getRepository();
				const data = await repository.find(this.findOptions);
				redisData = data.map((item) => item.toObject());
			}
			for (const item of redisData) {
				if (!item.id) continue;
				this.instance.set(item.id, item);
			}
			redis.set(this.redisKey, redisData);
		}

		return this.instance;
	}

	public async getAll(): Promise<TInterface[]> {
		const instance = await this.getInstance();
		return instance.getAll();
	}

	public async get(id: number): Promise<TInterface> {
		const instance = await this.getInstance();
		return instance.get(id);
	}

	public async update(id: number, data: TInterface): Promise<void> {
		const instance = await this.getInstance();
		instance.set(id, data);
		redis.set(this.redisKey, instance.getAll());
	}

	public async invalidate(): Promise<void> {
		const instance = await this.getInstance();
		instance.clear();
		redis.del(this.redisKey);
	}

	// the code below is not good but its an idea of what i actually want.
	// i want to create a function here that finds data by a generic keystring that is a keyof the TEntity usimg getAll and filtering the results
	/* 	findByCodename(codename: string): Promise<IWeapon | null> {
		const instance = await WeaponCache.getInstance();
		return instance.getAll().find((weapon) => weapon.codename === codename) ?? null;
	} */

	public async findBy<K extends keyof TInterface>(key: K, value: TInterface[K]): Promise<TInterface | undefined> {
		const instance = await this.getInstance();
		return instance.getAll().find((item) => item[key] === value);
	}

	public async findAllBy<K extends keyof TInterface>(key: K, value: TInterface[K]): Promise<TInterface[]> {
		const instance = await this.getInstance();
		return instance.getAll().filter((item) => item[key] === value);
	}
}

export const PropertiesCache = new RedisCache<Property, IProperty>(Property, "properties");
export const TraitsCache = new RedisCache<Trait, ITrait>(Trait, "traits");
export const WeaponsCache = new RedisCache<Weapon, IWeapon>(Weapon, "weapons", {
	relations: {
		properties: true,
		traits: true,
		tooltips: true,
	},
	relationLoadStrategy: "query",
	order: {
		id: "ASC",
	},
});
export const PatchesCache = new RedisCache<Patch, IPatch>(Patch, "patches");
export const MissionCache = new RedisCache<Mission, IMission>(Mission, "missions");
export const DifficultyCache = new RedisCache<Difficulty, IDifficulty>(Difficulty, "difficulties");
export const DifficultyModifierCache = new RedisCache<DifficultyModifier, IDifficultyModifier>(DifficultyModifier, "difficulty-modifiers");
export const PotionCache = new RedisCache<Potion, IPotion>(Potion, "potions");
export const BookSettingCache = new RedisCache<BookSetting, IBookSetting>(BookSetting, "book-settings");
export const TwitchSettingCache = new RedisCache<TwitchSetting, ITwitchSetting>(TwitchSetting, "twitch-settings");
export const BuildRoleCache = new RedisCache<BuildRole, IBuildRole>(BuildRole, "build-roles");
export const EventCache = new RedisCache<Event, IEvent>(Event, "events", {
	select: {
		id: true,
		name: true,
		description: false,
		startDate: true,
		endDate: true,
		isActive: true,
	},
});
export const CareerCache = new RedisCache<Career, ICareer>(Career, "careers", {
	relations: {
		passive: true,
		skill: true,
		perks: true,
		talents: true,
		hero: true,
		primaryWeapons: { properties: true, traits: true, tooltips: true },
		secondaryWeapons: { properties: true, traits: true, tooltips: true },
	},
	relationLoadStrategy: "query",
	order: {
		talents: {
			id: "ASC",
		},
	},
});
