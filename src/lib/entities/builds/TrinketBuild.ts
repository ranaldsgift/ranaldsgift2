import { Type } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property, type IProperty } from "../Property";
import { Trait, type ITrait } from "../Trait";
import { ItemRarityEnum } from "$lib/enums/ItemRarityEnum";
import { AuthoredEntity } from "../AuthoredEntity";
import type { IUser } from "../User";

@Entity()
export class TrinketBuild extends AuthoredEntity<ITrinketBuild> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: "enum",
		enum: ItemRarityEnum,
		default: ItemRarityEnum.Orange,
	})
	rarity!: ItemRarityEnum;

	@Column("smallint", { default: 300 })
	powerLevel!: number;

	@Type(() => Property)
	@ManyToOne(() => Property, { eager: true, nullable: true })
	property1!: Property;

	@Column("double precision", { nullable: true })
	property1Value!: number;

	@Type(() => Property)
	@ManyToOne(() => Property, { eager: true, nullable: true })
	property2!: Property;

	@Column("double precision", { nullable: true })
	property2Value!: number;

	@Type(() => Trait)
	@ManyToOne(() => Trait, { eager: true, nullable: true })
	trait!: Trait;
}

export interface ITrinketBuild {
	id?: number;
	user?: IUser;
	rarity?: ItemRarityEnum;
	powerLevel?: number;
	property1?: IProperty;
	property1Value?: number;
	property2?: IProperty;
	property2Value?: number;
	trait?: ITrait;
}
