import { Type } from "class-transformer";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Career, type ICareer } from "../career/Career";
import { WeaponBuild, type IWeaponBuild } from "./WeaponBuild";
import { CharmBuild, type ICharmBuild } from "./CharmBuild";
import { NecklaceBuild, type INecklaceBuild } from "./NecklaceBuild";
import { TrinketBuild, type ITrinketBuild } from "./TrinketBuild";
import { Difficulty, type IDifficulty } from "../Difficulty";
import { Mission, type IMission } from "../Mission";
import { Potion, type IPotion } from "../Potion";
import { BookSetting, type IBookSetting } from "../BookSetting";
import { TwitchSetting, type ITwitchSetting } from "../TwitchSetting";
import { BuildRole, type IBuildRole } from "../BuildRole";
import { AuthoredEntity } from "../AuthoredEntity";
import { PageViewsCareerBuild, type IPageViewsCareerBuild } from "../PageViewCareerBuild";

@Entity({})
export class CareerBuild extends AuthoredEntity<ICareerBuild> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar", { unique: true, nullable: true })
	firebaseId!: string;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	description!: string;

	@Type(() => Career)
	@ManyToOne(() => Career)
	career!: Career;

	@Type(() => WeaponBuild)
	@OneToOne(() => WeaponBuild, { cascade: true })
	@JoinColumn()
	primaryWeapon!: WeaponBuild;

	@Type(() => WeaponBuild)
	@OneToOne(() => WeaponBuild, { cascade: true })
	@JoinColumn()
	secondaryWeapon!: WeaponBuild;

	@Type(() => CharmBuild)
	@OneToOne(() => CharmBuild, { cascade: true })
	@JoinColumn()
	charm!: CharmBuild;

	@Type(() => NecklaceBuild)
	@OneToOne(() => NecklaceBuild, { cascade: true })
	@JoinColumn()
	necklace!: NecklaceBuild;

	@Type(() => TrinketBuild)
	@OneToOne(() => TrinketBuild, { cascade: true })
	@JoinColumn()
	trinket!: TrinketBuild;

	@Column("smallint", { default: 300 })
	powerLevel!: number;

	@Column("smallint")
	talent1!: number;

	@Column("smallint")
	talent2!: number;

	@Column("smallint")
	talent3!: number;

	@Column("smallint")
	talent4!: number;

	@Column("smallint")
	talent5!: number;

	@Column("smallint")
	talent6!: number;

	@Type(() => Difficulty)
	@ManyToOne(() => Difficulty, { eager: true })
	difficulty!: Difficulty;

	@Type(() => Mission)
	@ManyToOne(() => Mission, { eager: true })
	mission!: Mission;

	@Type(() => Potion)
	@ManyToOne(() => Potion, { eager: true })
	potion!: Potion;

	@Type(() => BookSetting)
	@ManyToOne(() => BookSetting, { eager: true })
	book!: BookSetting;

	@Type(() => TwitchSetting)
	@ManyToOne(() => TwitchSetting, { eager: true })
	twitch!: TwitchSetting;

	@Type(() => BuildRole)
	@ManyToMany(() => BuildRole)
	@JoinTable()
	roles!: BuildRole[];

	@Column("varchar", { array: true })
	videos!: string[];

	@Type()
	@OneToOne(() => PageViewsCareerBuild)
	pageView!: PageViewsCareerBuild;
}

export interface ICareerBuild {
	firebaseId?: string;
	name?: string;
	description?: string;
	career: ICareer;
	primaryWeapon: IWeaponBuild;
	secondaryWeapon: IWeaponBuild;
	powerLevel?: number;
	talent1: number;
	talent2: number;
	talent3: number;
	talent4: number;
	talent5: number;
	talent6: number;
	difficulty?: IDifficulty;
	mission?: IMission;
	potion?: IPotion;
	book?: IBookSetting;
	twitch?: ITwitchSetting;
	roles?: IBuildRole[];
	videos?: string[];
	pageView?: IPageViewsCareerBuild;
	necklace: INecklaceBuild;
	charm: ICharmBuild;
	trinket: ITrinketBuild;
}
