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
import type {
	TwitchBlessingType,
	TwitchVoteCooldownType,
	TwitchVoteTimeType,
	TwitchWeeklyEventEffectDurationType,
} from "$lib/data/constants/constants";

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

	@Column("smallint", { nullable: true })
	portraitFrameId?: number;

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
	@ManyToOne(() => CareerTalent, { eager: true, nullable: true })
	level5Talent!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true, nullable: true })
	level10Talent!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true, nullable: true })
	level15Talent!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true, nullable: true })
	level20Talent!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true, nullable: true })
	level25Talent!: CareerTalent;

	@Type(() => CareerTalent)
	@ManyToOne(() => CareerTalent, { eager: true, nullable: true })
	level30Talent!: CareerTalent;

	@Column("boolean", { default: false })
	isBot!: boolean;

	@Type(() => Difficulty)
	@ManyToOne(() => Difficulty, { eager: true, nullable: true })
	difficulty!: Difficulty;

	@Type(() => DifficultyModifier)
	@ManyToOne(() => DifficultyModifier, { eager: true, nullable: true })
	difficultyModifier!: DifficultyModifier;

	@Column("boolean", { default: false })
	isDeathwish!: boolean;

	@Type(() => Mission)
	@ManyToOne(() => Mission, { eager: true, nullable: true })
	mission!: Mission;

	@Type(() => Potion)
	@ManyToOne(() => Potion, { eager: true, nullable: true })
	potion!: Potion;

	@Type(() => BookSetting)
	@ManyToOne(() => BookSetting, { eager: true, nullable: true })
	book!: BookSetting;

	@Column("boolean", { default: false })
	isTwitch!: boolean;

	@Column("smallint", { nullable: true })
	twitchSpawnSize!: number;

	@Column("smallint", { nullable: true })
	twitchVoteTimer!: TwitchVoteTimeType;

	@Column("smallint", { nullable: true })
	twitchVoteCooldown!: TwitchVoteCooldownType;

	@Column("varchar", { nullable: true })
	twitchBlessing!: TwitchBlessingType;

	@Column("boolean", { nullable: true })
	twitchDisableWeeklyEvents!: boolean;

	@Column("smallint", { nullable: true })
	twitchWeeklyEventEffectDuration!: TwitchWeeklyEventEffectDurationType;

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
	portraitFrameId?: number;
	primaryWeapon: IWeaponBuild;
	secondaryWeapon: IWeaponBuild;
	powerLevel?: number;
	level5Talent?: ICareerTalent | null;
	level10Talent?: ICareerTalent | null;
	level15Talent?: ICareerTalent | null;
	level20Talent?: ICareerTalent | null;
	level25Talent?: ICareerTalent | null;
	level30Talent?: ICareerTalent | null;
	isBot?: boolean;
	difficulty?: IDifficulty | null;
	difficultyModifier?: IDifficultyModifier | null;
	isDeathwish?: boolean;
	mission?: IMission | null;
	potion?: IPotion | null;
	book?: IBookSetting | null;
	isTwitch?: boolean;
	twitchSpawnSize?: number;
	twitchVoteTimer?: TwitchVoteTimeType | null;
	twitchVoteCooldown?: TwitchVoteCooldownType | null;
	twitchBlessing?: TwitchBlessingType | null;
	twitchDisableWeeklyEvents?: boolean;
	twitchWeeklyEventEffectDuration?: TwitchWeeklyEventEffectDurationType | null;
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
