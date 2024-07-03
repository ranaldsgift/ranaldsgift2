import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Career, type ICareer } from "./Career";

@Entity()
export class CareerTalent extends BaseEntity<ICareerTalent> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	description!: string;

	@Column("smallint")
	talentNumber!: number;

	@Type(() => Career)
	@ManyToOne(() => Career, (career) => career.talents)
	career!: Career;
}

export interface ICareerTalent {
	id: number;
	name: string;
	description: string;
	talentNumber: number;
	career: ICareer;
}
