import type { Session } from "@supabase/supabase-js";
import { EventSubscriber, type EntitySubscriberInterface, type InsertEvent, type LoadEvent, type UpdateEvent } from "typeorm";
import { AuthoredEntity } from "../AuthoredEntity";
import { DataHelper } from "$lib/helpers/DataHelper";
import { env } from "$env/dynamic/private";
import { LogHelper } from "$lib/helpers/LogHelper";

@EventSubscriber()
export class AuthoredEntitySubscriber implements EntitySubscriberInterface<AuthoredEntity<any>> {
	/**
	 * Indicates that this subscriber only listen to Post events.
	 */
	listenTo() {
		return AuthoredEntity;
	}

	afterLoad(entity: AuthoredEntity<any>, event?: LoadEvent<AuthoredEntity<any>> | undefined): void | Promise<any> {
		// Check if the entity is valid.
		/* 		if (!entity) {
			return;
		}

		entity.serializedSavedEntity = DataHelper.serialize(entity); */
	}

	/**
	 * Called before post insertion.
	 */
	/* 	beforeInsert(event: InsertEvent<AuthoredEntity<any>>): void | Promise<any> {
		LogHelper.info("AuthoredEntitySubscriber.beforeInsert");
		// Check if the entity is valid.
		if (!event.entity) {
			return;
		}

		const authorizationBypassKey = event.queryRunner.data.authorizationBypassKey as string;

		if (authorizationBypassKey && authorizationBypassKey !== env.PRIVATE_DATABASE_AUTHORIZATION_BYPASS_KEY) {
			throw new Error(`The authorization bypass key provided is invalid!`);
		}

		// Bypass authentication check if the authorization bypass key is correct.
		if (authorizationBypassKey === env.PRIVATE_DATABASE_AUTHORIZATION_BYPASS_KEY) {
			return;
		}

		const session = event.queryRunner.data.session as Session;

		if (!session || !session.user) {
			throw new Error(`You must be authenticated to save items!`);
		}
	} */

	/**
	 * Called before post insertion.
	 */
	beforeUpdate(event: UpdateEvent<AuthoredEntity<any>>) {
		LogHelper.info("AuthoredEntitySubscriber.beforeUpdate");
		// Check if the entity is valid.
		if (!event.entity) {
			return;
		}

		const session = event.queryRunner.data.session as Session;

		if (!session || !session.user) {
			throw new Error(`You must be authenticated to save items!`);
		}

		const authUserId = session.user.id;

		// Check if the authenticated user is the same as the user who created the entity.
		if (!authUserId || authUserId !== event.databaseEntity.user.id) {
			throw new Error(`Only the original designer may edit this item.`);
		}

		// Check if User has been modified. Authored items should not be modified by other users.
		if (event.entity && event.entity.user.id !== event.databaseEntity.user.id) {
			throw new Error(`Authored items should only be modified by the original designer.`);
		}
	}
}
