import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Difficulty extends BaseEntity<IDifficulty> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;
}

export interface IDifficulty {
	id: number;
	name: string;
}
