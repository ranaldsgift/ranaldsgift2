import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    WITH combined_properties AS (
      -- Property 1
      SELECT 
        wb."weaponId",
        wb."property1Id" as "propertyId",
        COUNT(*) as prop_count
      FROM weapon_build wb
      WHERE wb."property1Id" IS NOT NULL
      GROUP BY wb."weaponId", wb."property1Id"
      
      UNION ALL
      
      -- Property 2
      SELECT 
        wb."weaponId",
        wb."property2Id" as "propertyId",
        COUNT(*) as prop_count
      FROM weapon_build wb
      WHERE wb."property2Id" IS NOT NULL
      GROUP BY wb."weaponId", wb."property2Id"
    )
    SELECT 
      cp."weaponId",
      cp."propertyId",
      p.name as "propertyName",
      SUM(cp.prop_count) as "count"
    FROM combined_properties cp
    JOIN property p ON cp."propertyId" = p.id
    GROUP BY cp."weaponId", cp."propertyId", p.name
    ORDER BY cp."weaponId", cp."propertyId"
  `,
})
export class WeaponPropertyCounts {
	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	propertyId!: number;

	@ViewColumn()
	propertyName!: string;

	@ViewColumn()
	count!: number;
}
