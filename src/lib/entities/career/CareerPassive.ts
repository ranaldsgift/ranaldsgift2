import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";

@Entity()
export class CareerPassive extends BaseEntity<ICareerPassive> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	description!: string;
}

export interface ICareerPassive {
	id: number;
	name: string;
	description: string;
}
