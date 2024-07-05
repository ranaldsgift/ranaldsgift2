import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { TraitCategory, type ITraitCategory } from "./TraitCategory";

@Entity()
export class Trait extends BaseEntity<ITrait> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar", { nullable: true })
	description!: string;

	@Type(() => TraitCategory)
	@ManyToOne(() => TraitCategory, (category) => category.traits)
	category!: TraitCategory;
}

export interface ITrait {
	id: number;
	name: string;
	description: string;
	category?: ITraitCategory;
}
