import type { IEvent } from "$lib/entities/Event";
import type { IUser } from "$lib/entities/User";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			supabase: import("@supabase/supabase-js").SupabaseClient;
			supabaseServiceClient: import("@supabase/supabase-js").SupabaseClient;
			session: import("@supabase/supabase-js").Session | null;
			sessionUser: User | null;
			sessionUserProfile: IUser | null;
		}
		interface PageData {
			session: import("@supabase/supabase-js").Session | null;
			supabase: SupabaseClient;
			sessionUser: User | null;
			sessionUserProfile: IUser | null;
		}
		interface LayoutData {
			sessionUserProfile: string | null;
			events: IEvent[];
		}
		interface PageState {
			search: string;
		}
		// interface Platform {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
