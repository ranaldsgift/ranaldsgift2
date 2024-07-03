import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";

@Entity()
export class CareerSkill extends BaseEntity<ICareerSkill> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	description!: string;

	@Column("smallint")
	cooldown!: number;
}

export interface ICareerSkill {
	id: number;
	name: string;
	description: string;
	cooldown: number;
}
