import { User } from '$lib/entities/User';
import { DataHelper } from '$lib/helpers/DataHelper';

export const load = (async (event) => {
    const { id } = event.params;

    let user: User | null = null;

    // If the ID is a UUID, this is the new supabase user ID
    if (id.includes('-')) {
        user = await User.findOne({ where: { id }});
    }
    // Otherwise, it's the old firebase user ID
    else {
        user = await User.findOne({ where: { firebaseId: id }});
    }    

    const serializedUser = DataHelper.serialize(user);

    return {
        userData: serializedUser,
    };
});