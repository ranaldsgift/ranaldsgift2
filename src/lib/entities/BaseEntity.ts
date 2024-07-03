import { instanceToPlain } from "class-transformer";
import { BaseEntity as TypeOrmBaseEntity } from "typeorm";

export abstract class BaseEntity<TInterface> extends TypeOrmBaseEntity {
	toObject(): TInterface {
		return instanceToPlain(this) as TInterface;
	}
}
