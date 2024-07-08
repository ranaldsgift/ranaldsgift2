import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property, type IProperty } from "../Property";
import { Trait, type ITrait } from "../Trait";
import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";
import { WeaponSkin, type IWeaponSkin } from "../WeaponSkin";
import { AuthoredEntity } from "../AuthoredEntity";
import { Weapon, type IWeapon } from "../Weapon";

@Entity()
export class WeaponBuild extends AuthoredEntity<IWeaponBuild> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: "enum",
		enum: ItemRarityEnum,
		default: ItemRarityEnum.Orange,
	})
	rarity!: ItemRarityEnum;

	@Type(() => Weapon)
	@ManyToOne(() => Weapon)
	weapon!: Weapon;

	@Column("smallint", { default: 300 })
	powerLevel!: number;

	@Type(() => Property)
	@ManyToOne(() => Property, { nullable: true })
	property1!: Property;

	@Column("double precision", { nullable: true })
	property1Value!: number;

	@Type(() => Property)
	@ManyToOne(() => Property, { nullable: true })
	property2!: Property;

	@Column("double precision", { nullable: true })
	property2Value!: number;

	@Type(() => Trait)
	@ManyToOne(() => Trait, { nullable: true })
	trait!: Trait;

	@Type(() => WeaponSkin)
	@ManyToOne(() => WeaponSkin, { nullable: true })
	skin!: WeaponSkin;
}

export interface IWeaponBuild {
	rarity?: ItemRarityEnum;
	weapon: IWeapon;
	powerLevel?: number;
	property1?: IProperty;
	property1Value?: number;
	property2?: IProperty;
	property2Value?: number;
	trait?: ITrait;
	skin?: IWeaponSkin;
}
