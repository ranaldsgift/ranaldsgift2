import { User } from "$lib/entities/User";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	const { id } = event.params;

	let user: User | null = null;

	// If the ID is a UUID, this is the new supabase user ID
	if (id.includes("-")) {
		user = await User.findOne({ where: { id } });
	}
	// Otherwise, it's the old firebase user ID
	else {
		user = await User.findOne({ where: { firebaseId: id } });
	}

	if (!user) {
		error(404, "User not found");
	}

	return {
		userData: user.toObject(),
	};
};
