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
}

export const MissionCache = new RedisCache<Mission, IMission>(Mission, "missions");
export const DifficultyCache = new RedisCache<Difficulty, IDifficulty>(Difficulty, "difficulties");
export const DifficultyModifierCache = new RedisCache<DifficultyModifier, IDifficultyModifier>(DifficultyModifier, "difficulty-modifiers");
export const PotionCache = new RedisCache<Potion, IPotion>(Potion, "potions");
export const BookSettingCache = new RedisCache<BookSetting, IBookSetting>(BookSetting, "book-settings");
export const TwitchSettingCache = new RedisCache<TwitchSetting, ITwitchSetting>(TwitchSetting, "twitch-settings");
export const BuildRoleCache = new RedisCache<BuildRole, IBuildRole>(BuildRole, "build-roles");
export const EventCache = new RedisCache<Event, IEvent>(Event, "events");
