import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	expression: `
    SELECT c."heroId", COUNT(*) as "count"
    FROM career_build cb
    JOIN career c ON c."id" = cb."careerId"
    GROUP BY c."heroId"
    ORDER BY c."heroId"
  `,
})
export class CareerBuildHeroes {
	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	count!: number;
}

export interface ICareerBuildHeroes {
	heroId: number;
	count: number;
}
