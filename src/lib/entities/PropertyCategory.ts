import { Type } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Weapon, type IWeapon } from "./Weapon";
import { BaseEntity } from "./BaseEntity";
import { Property, type IProperty } from "./Property";

@Entity()
export class PropertyCategory extends BaseEntity<IPropertyCategory> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Type(() => Property)
	@OneToMany(() => Property, (property) => property.category)
	properties!: Property[];

	@Type(() => Weapon)
	@OneToMany(() => Weapon, (weapon) => weapon.propertyCategory)
	weapons!: Weapon[];
}

export interface IPropertyCategory {
	id: number;
	name: "melee" | "range" | "necklace" | "charm" | "trinket";
	properties?: IProperty[];
	weapons?: IWeapon[];
}
