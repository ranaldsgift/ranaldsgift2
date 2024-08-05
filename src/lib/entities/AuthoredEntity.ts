import { DataHelper } from "$lib/helpers/DataHelper";
import { Exclude, Type } from "class-transformer";
import { Column, JoinColumn, ManyToOne } from "typeorm";
import { TimestampedEntity } from "./TimestampedEntity";
import { User } from "./User";
import type { Session } from "@supabase/supabase-js";
import type { SaveOptions } from "typeorm/browser";

export abstract class AuthoredEntity<TModel> extends TimestampedEntity<TModel> {
	@Type(() => User)
	@ManyToOne((type) => User, { nullable: false })
	user!: User;

	@Column("boolean", { default: false })
	public isDeleted!: boolean;

	@Exclude()
	public serializedSavedEntity: string | undefined;

	public isDirty() {
		return this.serializedSavedEntity !== DataHelper.serialize(this);
	}

	public persist(session: Session) {
		return this.save({ data: { session } });
	}

	public override save(options?: SaveOptions | undefined): Promise<this> {
		if (options?.data?.session || options?.data?.authorizationBypassKey) {
			return super.save(options);
		}
		throw new Error("You must provide a session to save an AuthoredEntity");
	}

	public override remove(options?: SaveOptions | undefined): Promise<this> {
		if (options?.data?.session) {
			this.isDeleted = true;
			return super.save(options);
		}
		throw new Error("You must provide a session to remove an AuthoredEntity");
	}
}
