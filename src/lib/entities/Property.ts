import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import PropertyCategoryEnum from "$lib/enums/PropertyCategoryEnum";

@Entity()
export class Property extends BaseEntity<IProperty> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar", { nullable: true })
	description!: string;

	@Column("double precision")
	minimumValue!: number;

	@Column("double precision")
	maximumValue!: number;

	@Column("double precision")
	step!: number;

	@Column({
		type: "enum",
		enum: PropertyCategoryEnum,
	})
	category!: PropertyCategoryEnum;
}

export interface IProperty {
	id?: number;
	name?: string;
	description?: string | null;
	minimumValue?: number;
	maximumValue?: number;
	step?: number;
	category?: PropertyCategoryEnum;
}
