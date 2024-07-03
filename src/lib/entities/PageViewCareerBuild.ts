import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CareerBuild, type ICareerBuild } from "./builds/CareerBuild";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class PageViewsCareerBuild extends BaseEntity<IPageViewsCareerBuild> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Type(() => CareerBuild)
	@OneToOne(() => CareerBuild)
	@JoinColumn()
	careerBuild!: CareerBuild;

	@Column("int")
	views!: number;

	@Column("timestamptz")
	lastViewed!: Date;
}

export interface IPageViewsCareerBuild {
	id: number;
	careerBuild: ICareerBuild;
	views: number;
	lastViewed: Date;
}
