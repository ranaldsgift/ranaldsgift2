import { Type } from "class-transformer";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hero, type IHero } from "../Hero";
import { Weapon, type IWeapon } from "../Weapon";
import { BaseEntity } from "../BaseEntity";
import { CareerPassive, type ICareerPassive } from "./CareerPassive";
import { CareerTalent, type ICareerTalent } from "./CareerTalent";
import { CareerSkill, type ICareerSkill } from "./CareerSkill";
import { CareerPerk, type ICareerPerk } from "./CareerPerk";

@Entity()
export class Career extends BaseEntity<ICareer> {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	codename!: string;

	@Column("smallint")
	health!: number;

	@Type(() => CareerPassive)
	@OneToOne(() => CareerPassive, { cascade: true })
	@JoinColumn()
	passive!: CareerPassive;

	@Type(() => CareerSkill)
	@OneToOne(() => CareerSkill, { cascade: true })
	@JoinColumn()
	skill!: CareerSkill;

	@Type(() => CareerPerk)
	@OneToMany(() => CareerPerk, (perk) => perk.career, { cascade: true })
	perks!: CareerPerk[];

	@Type(() => CareerTalent)
	@OneToMany(() => CareerTalent, (talent) => talent.career, { cascade: true })
	talents!: CareerTalent[];

	@Type(() => Hero)
	@ManyToOne(() => Hero, (hero) => hero.careers)
	hero!: Hero;

	@Type(() => Weapon)
	@ManyToMany(() => Weapon, (weapon) => weapon.canWieldPrimary)
	@JoinTable()
	primaryWeapons!: Weapon[];

	@Type(() => Weapon)
	@ManyToMany(() => Weapon, (weapon) => weapon.canWieldSecondary)
	@JoinTable()
	secondaryWeapons!: Weapon[];
}

export interface ICareer {
	id: number;
	name: string;
	codename: string;
	health: number;
	passive: ICareerPassive;
	skill: ICareerSkill;
	perks: ICareerPerk[];
	talents: ICareerTalent[];
	hero: IHero;
	primaryWeapons: IWeapon[];
	secondaryWeapons: IWeapon[];
}
