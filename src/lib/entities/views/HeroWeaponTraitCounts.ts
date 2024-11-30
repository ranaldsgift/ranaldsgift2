import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      c."heroId",
      wb."weaponId",
      wb."traitId",
      t.name as "traitName",
      t.description as "traitDescription",
      t.category as "traitCategory",
      COUNT(*) as "count"
    FROM weapon_build wb
    JOIN trait t ON wb."traitId" = t.id
    JOIN career_build cb ON (wb.id = cb."primaryWeaponId" OR wb.id = cb."secondaryWeaponId")
    JOIN career c ON cb."careerId" = c.id
    WHERE wb."traitId" IS NOT NULL
    GROUP BY c."heroId", wb."weaponId", wb."traitId", t.name, t.description, t.category
    ORDER BY c."heroId", wb."weaponId", wb."traitId"
  `,
})
export class HeroWeaponTraitCounts {
	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	traitId!: number;

	@ViewColumn()
	traitName!: string;

	@ViewColumn()
	traitDescription!: string;

	@ViewColumn()
	traitCategory!: string;

	@ViewColumn()
	count!: number;
}
