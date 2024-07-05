import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { PropertyCategory, type IPropertyCategory } from "./PropertyCategory";

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

	@Type(() => PropertyCategory)
	@ManyToOne(() => PropertyCategory, (category) => category.properties)
	category!: PropertyCategory;
}

export interface IProperty {
	id: number;
	name: string;
	description?: string | null;
	minimumValue: number;
	maximumValue: number;
	step: number;
	category?: IPropertyCategory;
}
