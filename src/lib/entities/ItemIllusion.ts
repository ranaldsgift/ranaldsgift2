import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon, type IWeapon } from "./Weapon";
import { BaseEntity } from "./BaseEntity";
import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum";

@Entity()
export class Illusion extends BaseEntity<IIllusion> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar", { nullable: true })
	image!: string;

	@Column("varchar", { nullable: true })
	description!: string;

	@Column("smallint", { nullable: true })
	weaponId!: number;

	@Type(() => Weapon)
	@ManyToOne(() => Weapon, { nullable: true })
	weapon!: Weapon;

	@Column({
		type: "enum",
		enum: ItemTypeEnum,
	})
	itemType!: ItemTypeEnum;
}

export interface IIllusion {
	id?: number;
	name?: string;
	image?: string;
	description?: string;
	weaponId?: number;
	weapon?: IWeapon;
	itemType?: ItemTypeEnum;
}
