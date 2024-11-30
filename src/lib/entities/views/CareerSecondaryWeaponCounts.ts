import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      wb."weaponId",
      cb."careerId",
      c.name as "careerName",
      COUNT(*) as "count"
    FROM career_build cb
    JOIN weapon_build wb ON cb."secondaryWeaponId" = wb.id
    JOIN career c ON cb."careerId" = c.id
    GROUP BY wb."weaponId", cb."careerId", c.name
    ORDER BY wb."weaponId", cb."careerId"
  `,
})
export class CareerSecondaryWeaponCounts {
	@ViewColumn()
	weaponId!: number;

	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	careerName!: string;

	@ViewColumn()
	count!: number;
}
