import { Type } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Weapon, type IWeapon } from "./Weapon";
import { BaseEntity } from "./BaseEntity";
import { Trait, type ITrait } from "./Trait";

@Entity()
export class TraitCategory extends BaseEntity<ITraitCategory> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Type(() => Trait)
	@OneToMany(() => Trait, (trait) => trait.category)
	traits!: Trait[];

	@Type(() => Weapon)
	@OneToMany(() => Weapon, (weapon) => weapon.traitCategory)
	weapons!: Weapon[];
}

export interface ITraitCategory {
	id: number;
	name: string;
	traits: ITrait[];
	weapons: IWeapon[];
}
