import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      cb."careerId",
      wb."weaponId",
      wb."traitId",
      t.name as "traitName",
      t.description as "traitDescription",
      t.category as "traitCategory",
      COUNT(*) as "count"
    FROM weapon_build wb
    JOIN trait t ON wb."traitId" = t.id
    JOIN career_build cb ON (wb.id = cb."primaryWeaponId" OR wb.id = cb."secondaryWeaponId")
    WHERE wb."traitId" IS NOT NULL
    GROUP BY cb."careerId", wb."weaponId", wb."traitId", t.name, t.description, t.category
    ORDER BY cb."careerId", wb."weaponId", wb."traitId"
  `,
})
export class CareerWeaponTraitCounts {
	@ViewColumn()
	careerId!: number;

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
