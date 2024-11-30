import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
      WITH combined_weapons AS (
        -- Primary weapons
        SELECT 
          wb."weaponId",
          COUNT(*) as weapon_count
        FROM career_build cb
        JOIN weapon_build wb ON cb."primaryWeaponId" = wb.id
        GROUP BY wb."weaponId"
        
        UNION ALL
        
        -- Secondary weapons
        SELECT 
          wb."weaponId",
          COUNT(*) as weapon_count
        FROM career_build cb
        JOIN weapon_build wb ON cb."secondaryWeaponId" = wb.id
        GROUP BY wb."weaponId"
      )
      SELECT 
        cw."weaponId",
        SUM(cw.weapon_count) as "count"
      FROM combined_weapons cw
      GROUP BY cw."weaponId"
      ORDER BY cw."weaponId"
    `,
})
export class WeaponCounts {
	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	count!: number;
}
