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
import { BuildRole, type IBuildRole } from "../BuildRole";
import { AuthoredEntity } from "../AuthoredEntity";
import { CareerTalent, type ICareerTalent } from "../career/CareerTalent";
import { User, type IUser } from "../User";
import { DifficultyModifier, type IDifficultyModifier } from "../DifficultyModifier";
import { GameModeEnum } from "$lib/enums/GameModeEnum";
import type { TwitchVoteCooldownType, TwitchVoteTimeType, TwitchWeeklyEventDurationType } from "$lib/data/constants/constants";

@Entity({})
export class CareerBuild extends AuthoredEntity<ICareerBuild> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar", { unique: true, nullable: true })
	firebaseId!: string;

	@Column("varchar")
	name!: string;

	@Column("varchar", { nullable: true })
	summary!: string;

	@Column("varchar", { nullable: true })
	description!: string;

	@Column("number", { nullable: true })
	careerId?: number;

	@Type(() => Career)
	@ManyToOne(() => Career)
	career!: Career;

	@Type(() => WeaponBuild)
	@OneToOne(() => WeaponBuild, { eager: true, cascade: true })
	@JoinColumn()
	primaryWeapon!: WeaponBuild;

	@Type(() => WeaponBuild)
	@OneToOne(() => WeaponBuild, { eager: true, cascade: true })
	@JoinColumn()
	secondaryWeapon!: WeaponBuild;

	@Type(() => CharmBuild)
	@OneToOne(() => CharmBuild, { eager: true, cascade: true })
	@JoinColumn()
	charm!: CharmBuild;

	@Type(() => NecklaceBuild)
	@OneToOne(() => NecklaceBuild, { eager: true, cascade: true })
	@JoinColumn()
	necklace!: NecklaceBuild;

	@Type(() => TrinketBuild)
	@OneToOne(() => TrinketBuild, { eager: true, cascade: true })
	@JoinColumn()
	trinket!: TrinketBuild;

	@Column("smallint", { default: 350 })
	powerLevel!: number;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true })
	talent1!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true })
	talent2!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true })
	talent3!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true })
	talent4!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true })
	talent5!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true })
	talent6!: CareerTalent;

	@Column("boolean", { default: false })
	isBot!: boolean;

	@Type(() => Difficulty)
	@ManyToOne(() => Difficulty, { eager: true })
	difficulty!: Difficulty;

	@Type(() => DifficultyModifier)
	@ManyToOne(() => DifficultyModifier, { eager: true })
	difficultyModifier!: DifficultyModifier;

	@Column("boolean", { default: false })
	isDeathwish!: boolean;

	@Type(() => Mission)
	@ManyToOne(() => Mission, { eager: true })
	mission!: Mission;

	@Type(() => Potion)
	@ManyToOne(() => Potion, { eager: true })
	potion!: Potion;

	@Type(() => BookSetting)
	@ManyToOne(() => BookSetting, { eager: true })
	book!: BookSetting;

	@Column("boolean", { default: false })
	isTwitch!: boolean;

	@Column("smallint", { nullable: true })
	twitchSpawnSize!: number;

	@Column("smallint", { nullable: true })
	voteTimer!: TwitchVoteTimeType;

	@Column("smallint", { nullable: true })
	voteCooldown!: TwitchVoteCooldownType;

	@Column("boolean", { nullable: true })
	isTwitchWeeklyEvent!: boolean;

	@Column("smallint", { nullable: true })
	twitchWeeklyEventDuration!: TwitchWeeklyEventDurationType;

	@Type(() => BuildRole)
	@ManyToMany(() => BuildRole)
	@JoinTable()
	roles!: BuildRole[];

	@Column("varchar", { array: true, nullable: true })
	videos!: string[];

	@Column({
		type: "enum",
		enum: GameModeEnum,
		default: GameModeEnum.Adventure,
	})
	gamemode!: GameModeEnum;

	/* 	@Type()
	@OneToOne(() => PageViewsCareerBuild)
	pageView!: PageViewsCareerBuild; */

	@Type(() => User)
	@ManyToMany(() => User, (user) => user.ratedBuilds)
	userRatings!: User[];

	ratingsCount!: number;

	@Type(() => User)
	@ManyToMany(() => User, (user) => user.favoriteBuilds)
	userFavorites!: User[];

	favoritesCount!: number;
}

export interface ICareerBuild {
	id?: number;
	user?: IUser;
	firebaseId?: string;
	name?: string;
	summary?: string;
	description?: string;
	careerId?: number;
	career: ICareer;
	primaryWeapon: IWeaponBuild;
	secondaryWeapon: IWeaponBuild;
	powerLevel?: number;
	talent1?: ICareerTalent | null;
	talent2?: ICareerTalent | null;
	talent3?: ICareerTalent | null;
	talent4?: ICareerTalent | null;
	talent5?: ICareerTalent | null;
	talent6?: ICareerTalent | null;
	isBot?: boolean;
	difficulty?: IDifficulty | null;
	difficultyModifier?: IDifficultyModifier | null;
	isDeathwish?: boolean;
	mission?: IMission | null;
	potion?: IPotion | null;
	book?: IBookSetting | null;
	isTwitch?: boolean;
	twitchSpawnSize?: number;
	voteTimer?: TwitchVoteTimeType;
	voteCooldown?: TwitchVoteCooldownType;
	isTwitchWeeklyEvent?: boolean;
	twitchWeeklyEventDuration?: TwitchWeeklyEventDurationType;
	roles?: IBuildRole[] | null;
	videos?: string[];
	//pageView?: IPageViewsCareerBuild;
	necklace: INecklaceBuild;
	charm: ICharmBuild;
	trinket: ITrinketBuild;
	gamemode?: GameModeEnum;
	userRatings?: IUser[];
	userFavorites?: IUser[];
	ratingsCount?: number;
	favoritesCount?: number;
	dateModified?: Date;
	dateCreated?: Date;
	patchNumber?: string;
}
