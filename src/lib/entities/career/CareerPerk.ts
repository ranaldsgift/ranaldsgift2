import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Career, type ICareer } from "./Career";

@Entity()
export class CareerPerk extends BaseEntity<ICareerPerk> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	description!: string;

	@Type(() => Career)
	@ManyToOne(() => Career, (career) => career.perks)
	career!: Career;
}

export interface ICareerPerk {
	id: number;
	name: string;
	description: string;
	career: ICareer | Career;
}
