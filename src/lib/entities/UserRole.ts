import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { User, type IUser } from "./User";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class UserRole extends BaseEntity<IUser> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar", { nullable: true })
	color!: string;

	@Type(() => User)
	@ManyToMany(() => User, (user) => user.roles)
	users!: User[];
}

export interface IUserRole {
	id: number;
	name: string;
	color: string;
	users: IUser[];
}
