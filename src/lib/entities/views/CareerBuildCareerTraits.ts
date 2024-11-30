import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    WITH combined_traits AS (
      -- Primary weapon traits
      SELECT 
        cb."careerId",
        wb."traitId",
        COUNT(*) as trait_count
      FROM career_build cb
      JOIN weapon_build wb ON cb."primaryWeaponId" = wb.id
      WHERE wb."traitId" IS NOT NULL
      GROUP BY cb."careerId", wb."traitId"
      
      UNION ALL
      
      -- Secondary weapon traits
      SELECT 
        cb."careerId",
        wb."traitId",
        COUNT(*) as trait_count
      FROM career_build cb
      JOIN weapon_build wb ON cb."secondaryWeaponId" = wb.id
      WHERE wb."traitId" IS NOT NULL
      GROUP BY cb."careerId", wb."traitId"

      UNION ALL

      -- Necklace traits
      SELECT 
        cb."careerId",
        nb."traitId",
        COUNT(*) as trait_count
      FROM career_build cb
      JOIN necklace_build nb ON cb."necklaceId" = nb.id
      WHERE nb."traitId" IS NOT NULL
      GROUP BY cb."careerId", nb."traitId"

      UNION ALL

      -- Charm traits
      SELECT 
        cb."careerId",
        chb."traitId",
        COUNT(*) as trait_count
      FROM career_build cb
      JOIN charm_build chb ON cb."charmId" = chb.id
      WHERE chb."traitId" IS NOT NULL
      GROUP BY cb."careerId", chb."traitId"

      UNION ALL

      -- Trinket traits
      SELECT 
        cb."careerId",
        tb."traitId",
        COUNT(*) as trait_count
      FROM career_build cb
      JOIN trinket_build tb ON cb."trinketId" = tb.id
      WHERE tb."traitId" IS NOT NULL
      GROUP BY cb."careerId", tb."traitId"
    )
    SELECT 
      ct."careerId",
      ct."traitId",
      t.name as "traitName",
      t.description as "traitDescription",
      t.category as "traitCategory",
      SUM(ct.trait_count) as "count"
    FROM combined_traits ct
    JOIN trait t ON ct."traitId" = t.id
    GROUP BY ct."careerId", ct."traitId", t.name, t.description, t.category
    ORDER BY ct."careerId", ct."traitId"
  `,
})
export class CareerBuildCareerTraits {
	@ViewColumn()
	careerId!: number;

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
