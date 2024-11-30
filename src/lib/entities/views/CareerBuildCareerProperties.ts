import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    WITH combined_properties AS (
      -- Primary weapon property1
      SELECT 
        cb."careerId",
        wb."property1Id" as "propertyId",
        COUNT(*) as property_count
      FROM career_build cb
      JOIN weapon_build wb ON cb."primaryWeaponId" = wb.id
      WHERE wb."property1Id" IS NOT NULL
      GROUP BY cb."careerId", wb."property1Id"
      
      UNION ALL
      
      -- Primary weapon property2
      SELECT 
        cb."careerId",
        wb."property2Id" as "propertyId",
        COUNT(*) as property_count
      FROM career_build cb
      JOIN weapon_build wb ON cb."primaryWeaponId" = wb.id
      WHERE wb."property2Id" IS NOT NULL
      GROUP BY cb."careerId", wb."property2Id"

      UNION ALL

      -- Secondary weapon property1
      SELECT 
        cb."careerId",
        wb."property1Id" as "propertyId",
        COUNT(*) as property_count
      FROM career_build cb
      JOIN weapon_build wb ON cb."secondaryWeaponId" = wb.id
      WHERE wb."property1Id" IS NOT NULL
      GROUP BY cb."careerId", wb."property1Id"
      
      UNION ALL
      
      -- Secondary weapon property2
      SELECT 
        cb."careerId",
        wb."property2Id" as "propertyId",
        COUNT(*) as property_count
      FROM career_build cb
      JOIN weapon_build wb ON cb."secondaryWeaponId" = wb.id
      WHERE wb."property2Id" IS NOT NULL
      GROUP BY cb."careerId", wb."property2Id"
    )
    SELECT 
      "careerId",
      "propertyId",
      SUM(property_count) as "count"
    FROM combined_properties
    GROUP BY "careerId", "propertyId"
    ORDER BY "careerId", "propertyId"
  `,
})
export class CareerBuildCareerProperties {
	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	propertyId!: number;

	@ViewColumn()
	count!: number;
}
