import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    WITH combined_properties AS (
      SELECT 
        cb."careerId",
        wb."weaponId",
        wb."property1Id" as "propertyId",
        COUNT(*) as property_count
      FROM career_build cb
      JOIN weapon_build wb ON cb."secondaryWeaponId" = wb.id
      JOIN weapon w ON wb."weaponId" = w.id
      WHERE wb."property1Id" IS NOT NULL
      GROUP BY cb."careerId", wb."weaponId", wb."property1Id"
      
      UNION ALL
      
      SELECT 
        cb."careerId",
        wb."weaponId",
        wb."property2Id" as "propertyId",
        COUNT(*) as property_count
      FROM career_build cb
      JOIN weapon_build wb ON cb."secondaryWeaponId" = wb.id
      JOIN weapon w ON wb."weaponId" = w.id
      WHERE wb."property2Id" IS NOT NULL
      GROUP BY cb."careerId", wb."weaponId", wb."property2Id"
    )
    SELECT 
      "careerId",
      "weaponId",
      "propertyId",
      SUM(property_count) as "count"
    FROM combined_properties
    GROUP BY "careerId", "weaponId", "propertyId"
    ORDER BY "careerId", "weaponId", "propertyId"
  `,
})
export class CareerBuildSecondaryWeaponProperties {
	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	propertyId!: number;

	@ViewColumn()
	count!: number;
}
