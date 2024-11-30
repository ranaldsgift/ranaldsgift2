import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    WITH combined_properties AS (
      SELECT 
        c."heroId",
        wb."weaponId",
        wb."property1Id" as "propertyId"
      FROM weapon_build wb
      JOIN career_build cb ON (wb.id = cb."primaryWeaponId" OR wb.id = cb."secondaryWeaponId")
      JOIN career c ON cb."careerId" = c.id
      WHERE wb."property1Id" IS NOT NULL
      
      UNION ALL
      
      SELECT 
        c."heroId",
        wb."weaponId",
        wb."property2Id" as "propertyId"
      FROM weapon_build wb
      JOIN career_build cb ON (wb.id = cb."primaryWeaponId" OR wb.id = cb."secondaryWeaponId")
      JOIN career c ON cb."careerId" = c.id
      WHERE wb."property2Id" IS NOT NULL
    )
    SELECT 
      cp."heroId",
      cp."weaponId",
      cp."propertyId",
      p.name as "propertyName",
      p.description as "propertyDescription",
      COUNT(*) as "count"
    FROM combined_properties cp
    JOIN property p ON cp."propertyId" = p.id
    GROUP BY cp."heroId", cp."weaponId", cp."propertyId", p.name, p.description
    ORDER BY cp."heroId", cp."weaponId", cp."propertyId"
  `,
})
export class HeroWeaponPropertyCounts {
	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	propertyId!: number;

	@ViewColumn()
	propertyName!: string;

	@ViewColumn()
	propertyDescription!: string;

	@ViewColumn()
	count!: number;
}
