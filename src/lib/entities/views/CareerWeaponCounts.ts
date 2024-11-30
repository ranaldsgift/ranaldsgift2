import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      w."weaponId",
      cb."careerId",
      c.name as "careerName",
      COUNT(*) as "count"
    FROM career_build cb
    JOIN (
      SELECT id, "weaponId" FROM weapon_build
      UNION ALL
      SELECT id, "weaponId" FROM weapon_build
    ) w ON cb."primaryWeaponId" = w.id OR cb."secondaryWeaponId" = w.id
    JOIN career c ON cb."careerId" = c.id
    GROUP BY w."weaponId", cb."careerId", c.name
    ORDER BY w."weaponId", cb."careerId"
  `,
})
export class CareerWeaponCounts {
	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	careerName!: string;

	@ViewColumn()
	count!: number;
}
