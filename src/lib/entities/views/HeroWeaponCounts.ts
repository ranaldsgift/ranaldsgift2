import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      wb."weaponId",
      c."heroId",
      h.name as "heroName",
      COUNT(*) as "count"
    FROM (
      SELECT "primaryWeaponId" as weapon_build_id, "careerId"
      FROM career_build
      UNION ALL
      SELECT "secondaryWeaponId" as weapon_build_id, "careerId"
      FROM career_build
    ) combined_weapons
    JOIN weapon_build wb ON combined_weapons.weapon_build_id = wb.id
    JOIN career c ON combined_weapons."careerId" = c.id
    JOIN hero h ON c."heroId" = h.id
    GROUP BY wb."weaponId", c."heroId", h.name
    ORDER BY wb."weaponId", c."heroId"
  `,
})
export class HeroWeaponCounts {
	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	heroName!: string;

	@ViewColumn()
	count!: number;
}
