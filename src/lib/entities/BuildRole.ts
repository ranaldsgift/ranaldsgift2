import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class BuildRole extends BaseEntity<IBuildRole> implements IBuildRole {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;
}

export interface IBuildRole {
	id: number;
	name: string;
}
