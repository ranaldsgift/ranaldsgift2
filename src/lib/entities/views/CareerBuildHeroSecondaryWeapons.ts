import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT career."heroId", weapon_build."weaponId", COUNT(*) as "count"
    FROM career_build
    JOIN career ON career_build."careerId" = career.id
    JOIN weapon_build ON career_build."secondaryWeaponId" = weapon_build.id
    JOIN weapon ON weapon_build."weaponId" = weapon.id
    GROUP BY career."heroId", weapon_build."weaponId"
    ORDER BY career."heroId", weapon_build."weaponId"
  `,
})
export class CareerBuildHeroSecondaryWeapons {
	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	count!: number;
}
