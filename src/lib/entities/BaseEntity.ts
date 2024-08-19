import { instanceToPlain, type ClassTransformOptions } from "class-transformer";
import { BaseEntity as TypeOrmBaseEntity } from "typeorm";

export abstract class BaseEntity<TInterface> extends TypeOrmBaseEntity {
	toObject(options?: ClassTransformOptions): TInterface {
		return instanceToPlain(this, options) as TInterface;
	}
}
