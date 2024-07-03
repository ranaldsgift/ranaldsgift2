import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Mission extends BaseEntity<IMission> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;
}

export interface IMission {
	id: number;
	name: string;
}
