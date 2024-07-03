import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class BookSetting extends BaseEntity<IBookSetting> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;
}

export interface IBookSetting {
	id: number;
	name: string;
}
