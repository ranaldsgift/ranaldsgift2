import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	expression: `
    WITH combined_properties AS (
      -- Property 1
      SELECT 
        wb."weaponId",
        cb."careerId",
        wb."property1Id" as "propertyId",
        COUNT(*) as prop_count
      FROM weapon_build wb
      JOIN career_build cb ON (wb.id = cb."primaryWeaponId" OR wb.id = cb."secondaryWeaponId")
      WHERE wb."property1Id" IS NOT NULL
      GROUP BY wb."weaponId", cb."careerId", wb."property1Id"
      
      UNION ALL
      
      -- Property 2
      SELECT 
        wb."weaponId",
        cb."careerId",
        wb."property2Id" as "propertyId",
        COUNT(*) as prop_count
      FROM weapon_build wb
      JOIN career_build cb ON (wb.id = cb."primaryWeaponId" OR wb.id = cb."secondaryWeaponId")
      WHERE wb."property2Id" IS NOT NULL
      GROUP BY wb."weaponId", cb."careerId", wb."property2Id"
    )
    SELECT 
      cp."weaponId",
      cp."careerId",
      cp."propertyId",
      p.name as "propertyName",
      SUM(cp.prop_count) as "count"
    FROM combined_properties cp
    JOIN property p ON cp."propertyId" = p.id
    GROUP BY cp."weaponId", cp."careerId", cp."propertyId", p.name
    ORDER BY cp."weaponId", cp."careerId", cp."propertyId"
  `,
})
export class CareerWeaponPropertyCounts {
	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	propertyId!: number;

	@ViewColumn()
	propertyName!: string;

	@ViewColumn()
	count!: number;
}
