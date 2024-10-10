import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT "careerId", COUNT(*) as "count"
    FROM career_build
    GROUP BY "careerId"
    ORDER BY "careerId"
  `,
})
export class CareerBuildCareers {
	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	count!: number;
}
