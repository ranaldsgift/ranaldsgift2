import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property, type IProperty } from "../Property";
import { Trait, type ITrait } from "../Trait";
import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";
import { Weapon, type IWeapon } from "../Weapon";
import type { IItemBuild } from "./CareerBuild";
import { Illusion, type IIllusion } from "../ItemIllusion";
import { BaseEntity } from "../BaseEntity";

@Entity()
export class WeaponBuild extends BaseEntity<IWeaponBuild> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: "enum",
		enum: ItemRarityEnum,
		default: ItemRarityEnum.Red,
	})
	rarity!: ItemRarityEnum;

	@Column("number", { nullable: true })
	weaponId?: number;

	@Type(() => Weapon)
	@ManyToOne(() => Weapon)
	weapon!: Weapon;

	@Column("smallint", { default: 300 })
	powerLevel!: number;

	@Type(() => Property)
	@ManyToOne(() => Property, { eager: true, nullable: true })
	property1!: Property;

	@Column("double precision", { nullable: true })
	property1Value!: number;

	@Type(() => Property)
	@ManyToOne(() => Property, { eager: true, nullable: true })
	property2!: Property;

	@Column("double precision", { nullable: true })
	property2Value!: number;

	@Type(() => Trait)
	@ManyToOne(() => Trait, { eager: true, nullable: true })
	trait!: Trait;

	@Type(() => Illusion)
	@ManyToOne(() => Illusion, { nullable: true })
	illusion!: Illusion;
}

export interface IWeaponBuild extends IItemBuild {
	id?: number;
	rarity?: ItemRarityEnum;
	weaponId?: number;
	weapon?: IWeapon;
	powerLevel?: number;
	property1?: IProperty;
	property1Value?: number;
	property2?: IProperty;
	property2Value?: number;
	trait?: ITrait;
	illusion?: IIllusion;
}
