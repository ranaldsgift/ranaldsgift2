import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Potion extends BaseEntity<IPotion> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;
}

export interface IPotion {
	id: number;
	name: string;
}
