import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Event extends BaseEntity<IEvent> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	description!: string;

	@Column("timestamptz")
	startDate!: Date;

	@Column("timestamptz")
	endDate!: Date;

	@Column("boolean", { default: false })
	isActive!: boolean;
}

export interface IEvent {
	id: number;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	isActive: boolean;
}
