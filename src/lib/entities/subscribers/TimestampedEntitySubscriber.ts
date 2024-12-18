import type { Session } from "@supabase/supabase-js";
import { EventSubscriber, type EntitySubscriberInterface, type InsertEvent, type LoadEvent, type UpdateEvent } from "typeorm";
import { DataHelper } from "$lib/helpers/DataHelper";
import { env } from "$env/dynamic/private";
import { TimestampedEntity } from "../TimestampedEntity";
import { LogHelper } from "$lib/helpers/LogHelper";

@EventSubscriber()
export class TimestampedEntitySubscriber implements EntitySubscriberInterface {
	/**
	 * Indicates that this subscriber only listen to Post events.
	 */
	listenTo() {
		return TimestampedEntity;
	}

	/**
	 * Called before post insertion.
	 */
	beforeInsert(event: InsertEvent<any>) {
		LogHelper.info("TimestampedEntitySubscriber.beforeInsert");
		const entity = event.entity as TimestampedEntity<any>;
		const manualInsert = event.queryRunner.data.manualInsert as boolean;

		if (!manualInsert) {
			entity.dateCreated = new Date();
			entity.dateModified = new Date();
		}
	}

	/**
	 * Called before post insertion.
	 */
	beforeUpdate(event: UpdateEvent<any>) {
		LogHelper.info("TimestampedEntitySubscriber.beforeUpdate");
		const entity = event.entity as TimestampedEntity<any>;

		const manualInsert = event.queryRunner.data.manualInsert as boolean;

		if (!manualInsert) {
			entity.dateModified = new Date();
		}
	}
}
