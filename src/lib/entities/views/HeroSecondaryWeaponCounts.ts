import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      wb."weaponId",
      c."heroId",
      h.name as "heroName",
      COUNT(*) as "count"
    FROM career_build cb
    JOIN weapon_build wb ON cb."secondaryWeaponId" = wb.id
    JOIN career c ON cb."careerId" = c.id
    JOIN hero h ON c."heroId" = h.id
    GROUP BY wb."weaponId", c."heroId", h.name
    ORDER BY wb."weaponId", c."heroId"
  `,
})
export class HeroSecondaryWeaponCounts {
	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	heroName!: string;

	@ViewColumn()
	count!: number;
}
