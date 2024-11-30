import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      wb."weaponId",
      wb."traitId",
      t.name as "traitName",
      t.description as "traitDescription",
      t.category as "traitCategory",
      COUNT(*) as "count"
    FROM weapon_build wb
    JOIN trait t ON wb."traitId" = t.id
    WHERE wb."traitId" IS NOT NULL
    GROUP BY wb."weaponId", wb."traitId", t.name, t.description, t.category
    ORDER BY wb."weaponId", wb."traitId"
  `,
})
export class WeaponTraitCounts {
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
