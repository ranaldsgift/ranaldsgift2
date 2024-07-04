import { StaticData } from "$lib/data/HeroData";
import { ROOT_PAGE_TITLE } from "$lib/data/constants/constants";
import { test, expect } from "@playwright/test";

test("Root Page Title is Correct", async ({ page }) => {
	await page.goto("/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(ROOT_PAGE_TITLE);
});

test("Static Career data matches data from /api/careers", async ({ request }) => {
	const response = await request.get("/api/careers");
	const json = (await response.json()) as { items: any[] };

	expect(response.status()).toBe(200);
	expect(json.items.length).toEqual(StaticData.careers.length);

	for (let i = 0; i < StaticData.careers.length; i++) {
		expect(json.items[i].id).toEqual(StaticData.careers[i].id);
		expect(JSON.stringify(Object.entries(json.items[i]).sort())).toEqual(JSON.stringify(Object.entries(StaticData.careers[i]).sort()));
	}
});
