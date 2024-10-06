import { instanceToPlain, type ClassTransformOptions } from "class-transformer";
import { BaseEntity as TypeOrmBaseEntity } from "typeorm";
import type { IUser } from "./User";

export abstract class BaseEntity<TInterface extends IEntity> extends TypeOrmBaseEntity {
	toObject(options?: ClassTransformOptions): TInterface {
		return instanceToPlain(this, options) as TInterface;
	}
}

export interface IEntity {
	id?: number | string;
}

export interface IAuthoredEntity extends IEntity {
	user?: IUser;
}
