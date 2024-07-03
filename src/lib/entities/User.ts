import { Type } from "class-transformer";
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { TimestampedEntity } from "./TimestampedEntity";
import { UserRole, type IUserRole } from "./UserRole";
import { CareerBuild, type ICareerBuild } from "./builds/CareerBuild";

@Entity()
export class User extends TimestampedEntity<IUser> {
	@PrimaryColumn("uuid")
	id!: string;

	@Column("varchar", { unique: true, nullable: true })
	firebaseId!: string;

	@Column("varchar", { unique: true, nullable: true })
	name!: string;

	@Type(() => UserRole)
	@ManyToMany(() => UserRole, (role) => role.users, { eager: true })
	@JoinTable()
	roles!: UserRole[];

	@Column("varchar", { nullable: true })
	avatar!: string;

	@Column("varchar", { nullable: true })
	discord!: string;

	@Column("varchar", { nullable: true })
	steam!: string;

	@Column("varchar", { nullable: true })
	twitch!: string;

	@Column("varchar", { nullable: true })
	youtube!: string;

	@Column("boolean", { default: false })
	showVideo!: boolean;

	@Type(() => CareerBuild)
	@OneToMany(() => CareerBuild, (favorite) => favorite.user)
	authoredBuilds!: CareerBuild[];

	@Type(() => CareerBuild)
	@ManyToMany(() => CareerBuild)
	@JoinTable()
	favoriteBuilds!: CareerBuild[];

	@Type(() => CareerBuild)
	@ManyToMany(() => CareerBuild)
	@JoinTable()
	ratedBuilds!: CareerBuild[];

	/*    getBadges(): { icon: string, text: string }[] {
        const badges = [];

    } */
}

export interface IUser {
	id: string;
	firebaseId: string;
	name: string;
	roles: IUserRole[];
	avatar: string;
	discord: string;
	steam: string;
	twitch: string;
	youtube: string;
	showVideo: boolean;
	authoredBuilds: ICareerBuild[];
	favoriteBuilds: ICareerBuild[];
	ratedBuilds: ICareerBuild[];
}
