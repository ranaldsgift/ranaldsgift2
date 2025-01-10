import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthoredEntity } from "./AuthoredEntity";
import { CareerBuild, type ICareerBuild } from "./builds/CareerBuild";

@Entity()
export class Team extends AuthoredEntity<ITeam> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name?: string;

	@Column("varchar", { nullable: true })
	description?: string;

	@Column("varchar", { array: true, nullable: true })
	videos?: string[];

	@ManyToMany(() => CareerBuild)
	@JoinTable()
	builds?: CareerBuild[];
}

export interface ITeam {
	id?: number;
	name?: string;
	description?: string;
	videos?: string[];
	builds?: ICareerBuild[];
}
