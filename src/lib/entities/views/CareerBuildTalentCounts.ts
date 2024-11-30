import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
	expression: `
    SELECT 
      career_build."careerId",
      career."heroId",
      talent."talentNumber",
      talent.id as "talentId",
      talent.name as "talentName",
      talent.description as "talentDescription",
      COUNT(*) as "count"
    FROM career_build
    JOIN career ON career_build."careerId" = career.id
    JOIN career_talent talent ON (
      talent.id = career_build."level5TalentId" OR
      talent.id = career_build."level10TalentId" OR
      talent.id = career_build."level15TalentId" OR
      talent.id = career_build."level20TalentId" OR
      talent.id = career_build."level25TalentId" OR
      talent.id = career_build."level30TalentId"
    )
    GROUP BY 
      career_build."careerId", 
      career."heroId", 
      talent."talentNumber", 
      talent.id,
      talent.name,
      talent.description
    ORDER BY career_build."careerId", talent."talentNumber", talent.id
  `,
})
export class CareerBuildTalentCounts {
	@ViewColumn()
	careerId!: number;

	@ViewColumn()
	heroId!: number;

	@ViewColumn()
	talentNumber!: number;

	@ViewColumn()
	talentId!: number;

	@ViewColumn()
	talentName!: string;

	@ViewColumn()
	talentDescription!: string;

	@ViewColumn()
	count!: number;
}
