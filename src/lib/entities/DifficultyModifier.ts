import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class DifficultyModifier extends BaseEntity<IDifficultyModifier> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;
}

export interface IDifficultyModifier {
	id: number;
	name: string;
}
