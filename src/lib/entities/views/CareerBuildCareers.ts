import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      cb."careerId",
      c."heroId",
      c."name" as "careerName",
      h."name" as "heroName",
      COUNT(*) as "count"
    FROM career_build cb
    JOIN career c ON c."id" = cb."careerId"
    JOIN hero h ON h."id" = c."heroId"
    GROUP BY cb."careerId", c."heroId", c."name", h."name"
    ORDER BY cb."careerId"
  `,
})
export class CareerBuildCareers {
	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	careerName!: string;

	@ViewColumn()
	heroName!: string;

	@ViewColumn()
	count!: number;
}
