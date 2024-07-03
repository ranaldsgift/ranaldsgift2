import { PatchTypeEnum } from "$lib/enums/PatchTypeEnum";
import { Type } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Patch extends BaseEntity<IPatch> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar", { nullable: true })
	name!: string;

	@Column("varchar")
	number!: string;

	@Column({
		type: "enum",
		enum: PatchTypeEnum,
		default: PatchTypeEnum.Hotfix,
	})
	type!: PatchTypeEnum;

	@Type(() => Date)
	@Column("timestamptz")
	date!: Date;
}

export interface IPatch {
	id: number;
	name: string;
	number: string;
	type: PatchTypeEnum;
	date: Date;
}
