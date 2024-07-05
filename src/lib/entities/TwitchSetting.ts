import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class TwitchSetting extends BaseEntity<ITwitchSetting> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;
}

export interface ITwitchSetting {
	id: number;
	name: string;
}
