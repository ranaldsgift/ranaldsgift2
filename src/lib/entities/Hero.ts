import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Career, type ICareer } from "./career/Career";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Hero extends BaseEntity<IHero> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Type(() => Career)
	@OneToMany(() => Career, (career) => career.hero)
	careers!: string;
}

export interface IHero {
	id: number;
	name: string;
	careers: ICareer[];
}
