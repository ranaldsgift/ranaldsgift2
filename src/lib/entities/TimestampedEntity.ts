import { Type } from "class-transformer";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export abstract class TimestampedEntity<TModel> extends BaseEntity<TModel> {
	@Type(() => Date)
	@CreateDateColumn({ type: "timestamptz" })
	dateCreated!: Date;

	@Type(() => Date)
	@UpdateDateColumn({ type: "timestamptz" })
	dateModified!: Date;
}
