import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon, type IWeapon } from "./Weapon";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class WeaponSkin extends BaseEntity<IWeaponSkin> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	image!: string;

	@Column("varchar", { nullable: true })
	description!: string;

	@Type(() => Weapon)
	@ManyToOne(() => Weapon)
	weapon!: Weapon;
}

export interface IWeaponSkin {
	id: number;
	name: string;
	image: string;
	description: string;
	weapon: IWeapon;
}
