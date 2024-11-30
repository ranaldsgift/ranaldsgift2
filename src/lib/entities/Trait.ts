import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import TraitCategoryEnum from "$lib/enums/TraitCategoryEnum";

@Entity()
export class Trait extends BaseEntity<ITrait> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar", { nullable: true })
	description!: string;

	@Column({
		type: "enum",
		enum: TraitCategoryEnum,
	})
	category!: TraitCategoryEnum;
}

export interface ITrait {
	id?: number;
	name?: string;
	description?: string;
	category?: TraitCategoryEnum;
}
