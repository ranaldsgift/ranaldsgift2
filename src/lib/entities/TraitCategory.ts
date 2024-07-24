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
	name:
		| "deus_melee"
		| "deus_ranged_energy"
		| "deus_ranged_heat"
		| "melee"
		| "defence_accessory"
		| "deus_ranged"
		| "deus_ranged_ammo"
		| "ranged_ammo"
		| "deus_shield_melee"
		| "ranged_heat"
		| "ranged_energy"
		| "deus_heavy_melee"
		| "utility_accessory"
		| "offence_accessory";
	traits?: ITrait[];
	weapons?: IWeapon[];
}
