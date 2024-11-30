import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT "careerId", career."heroId", weapon_build."weaponId", COUNT(*) as "count"
    FROM career_build
    JOIN career ON career_build."careerId" = career.id
    JOIN weapon_build ON career_build."secondaryWeaponId" = weapon_build.id
    JOIN weapon ON weapon_build."weaponId" = weapon.id
    GROUP BY "careerId", career."heroId", weapon_build."weaponId"
    ORDER BY "careerId", weapon_build."weaponId"
  `,
})
export class CareerBuildCareerSecondaryWeapons {
	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	count!: number;
}
