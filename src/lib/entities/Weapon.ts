import { Type } from "class-transformer";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Career, type ICareer } from "./career/Career";
import { Trait, type ITrait } from "./Trait";
import { Property, type IProperty } from "./Property";
import { BaseEntity } from "./BaseEntity";
import TraitCategoryEnum from "$lib/enums/TraitCategoryEnum";
import PropertyCategoryEnum from "$lib/enums/PropertyCategoryEnum";

@Entity()
export class Weapon extends BaseEntity<IWeapon> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	codename!: string;

	@Column("varchar", { nullable: true })
	description!: string;

	@Type(() => WeaponTooltip)
	@ManyToMany(() => WeaponTooltip, { cascade: true })
	@JoinTable()
	tooltips!: WeaponTooltip[];

	@Column("double precision")
	dodgeDistance!: number;

	@Column("double precision")
	dodgeSpeed!: number;

	@Column("smallint", { nullable: true })
	dodgeCount!: number;

	@Column("smallint", { nullable: true })
	stamina!: number;

	@Column("double precision", { nullable: true })
	blockInnerCost!: number;

	@Column("double precision", { nullable: true })
	blockOuterCost!: number;

	@Column("smallint", { nullable: true })
	blockAngle!: number;

	@Column("double precision", { nullable: true })
	rightClickMovementModifier!: number;

	@Type(() => Career)
	@ManyToMany(() => Career, (career) => career.primaryWeapons, { nullable: true })
	canWieldPrimary!: Career[];

	@Type(() => Career)
	@ManyToMany(() => Career, (career) => career.secondaryWeapons, { nullable: true })
	canWieldSecondary!: Career[];

	@Column({
		type: "enum",
		enum: TraitCategoryEnum,
	})
	traitCategory!: TraitCategoryEnum;

	@Column({
		type: "enum",
		enum: PropertyCategoryEnum,
	})
	propertyCategory!: PropertyCategoryEnum;

	@Type(() => Property)
	@ManyToMany(() => Property)
	@JoinTable()
	properties!: Property[];

	@Type(() => Trait)
	@ManyToMany(() => Trait)
	@JoinTable()
	traits!: Trait[];
}

@Entity()
export class WeaponTooltip extends BaseEntity<IWeaponTooltip> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	codename!: string;

	@Column("varchar", { nullable: true })
	description!: string;
}

export interface IWeapon {
	id: number;
	name: string;
	codename: string;
	description: string;
	dodgeDistance: number | null;
	dodgeSpeed: number | null;
	dodgeCount: number | null;
	stamina: number | null;
	blockInnerCost: number | null;
	blockOuterCost: number | null;
	blockAngle: number | null;
	rightClickMovementModifier: number | null;
	canWieldPrimary?: ICareer[];
	canWieldSecondary?: ICareer[];
	traitCategory?: TraitCategoryEnum;
	propertyCategory?: PropertyCategoryEnum;
	properties: IProperty[];
	traits: ITrait[];
	tooltips: IWeaponTooltip[];
}

export interface IWeaponTooltip {
	id: number;
	name: string;
	codename: string;
	description?: string | null;
}
