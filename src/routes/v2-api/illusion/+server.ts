import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import { IllusionsCache } from "$lib/cache/RedisCache";
import { Illusion, type IIllusion } from "$lib/entities/ItemIllusion.js";
import { plainToInstance } from "class-transformer";
import { ItemTypeEnum } from "$lib/enums/ItemTypeEnum.js";

export const GET: RequestHandler = async ({ url }) => {
	const weaponId = url.searchParams.get("weaponId");
	const itemTypeParam = url.searchParams.get("itemType");
	const itemType = itemTypeParam ? ItemTypeEnum[itemTypeParam as keyof typeof ItemTypeEnum] : undefined;

	let data = null;
	try {
		if (weaponId) {
			data = await IllusionsCache.findAllBy("weaponId", Number(weaponId));
		} else if (itemType) {
			data = await IllusionsCache.findAllBy("itemType", itemType);
		} else {
			data = await IllusionsCache.getAll();
		}
	} catch (err) {
		console.error(err);
		error(500, "Internal Server Error");
	}

	const response = JSON.stringify({
		items: data,
		count: data.length,
	});

	return new Response(response);
};

export async function POST({ request, locals }) {
	const { session, user, userProfile } = { session: locals.session, user: locals.sessionUser, userProfile: locals.sessionUserProfile };

	if (!user || !userProfile) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	if (userProfile.role !== "Admin" && userProfile.role !== "Moderator") {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	const pojo: IIllusion = await request.json();

	if (!pojo) {
		return json({ error: "Event data not found" }, { status: 400 });
	}

	let entity = plainToInstance(Illusion, pojo);

	if (!entity) {
		return json({ error: "Unable to parse event data" }, { status: 400 });
	}

	entity = await entity.save({ data: { session } });
	IllusionsCache.update(entity.id, entity.toObject());

	return json({ message: "Event data saved" });
}
