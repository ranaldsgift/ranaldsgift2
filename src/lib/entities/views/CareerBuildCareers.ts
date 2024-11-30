import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT cb."careerId", c."heroId", COUNT(*) as "count"
    FROM career_build cb
    JOIN career c ON c."id" = cb."careerId"
    GROUP BY cb."careerId", c."heroId"
    ORDER BY cb."careerId"
  `,
})
export class CareerBuildCareers {
	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	count!: number;
}

export interface ICareerBuildCareers {
	careerId: number;
	heroId: number;
	count: number;
}
