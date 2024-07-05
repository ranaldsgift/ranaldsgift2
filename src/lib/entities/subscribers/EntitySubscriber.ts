import type { Session } from "@supabase/supabase-js";
import { EventSubscriber, type EntitySubscriberInterface, type UpdateEvent } from "typeorm";

@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {
    /**
     * Called before post insertion.
     */
    beforeUpdate(event: UpdateEvent<any>) {
        // Check if the user is authenticated.
        // Only save() calls with the authenticated user's session will be allowed.
        const session = event.queryRunner.data.session as Session;

        if (!session) {
            throw new Error(`You must be authenticated to save items!`);
        }
    }
}
