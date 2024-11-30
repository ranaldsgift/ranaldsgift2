import { env } from "$env/dynamic/private";
import type { Session } from "@supabase/supabase-js";
import { EventSubscriber, type EntitySubscriberInterface, type UpdateEvent } from "typeorm";

@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {
	/**
	 * Called before post insertion.
	 */
	beforeUpdate(event: UpdateEvent<any>) {
		const authorizationBypassKey = event.queryRunner.data.authorizationBypassKey as string;

		if (authorizationBypassKey && authorizationBypassKey !== env.PRIVATE_DATABASE_AUTHORIZATION_BYPASS_KEY) {
			throw new Error(`The authorization bypass key provided is invalid!`);
		}

		// Bypass authentication check if the authorization bypass key is correct.
		if (authorizationBypassKey === env.PRIVATE_DATABASE_AUTHORIZATION_BYPASS_KEY) {
			return;
		}

		// Check if the user is authenticated.
		// Only save() calls with the authenticated user's session will be allowed.
		const session = event.queryRunner.data.session as Session;

		if (!session) {
			throw new Error(`You must be authenticated to save items!`);
		}
	}
}
