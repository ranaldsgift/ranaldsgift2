import { ROOT_PAGE_TITLE } from "$lib/data/constants/constants";
import { test, expect } from "@playwright/test";

test("Root Page Title is Correct", async ({ page }) => {
	await page.goto("/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(ROOT_PAGE_TITLE);
});

function deepEqual(x: any, y: any): boolean {
	return x && y && typeof x === "object" && typeof y === "object"
		? Object.keys(x).length === Object.keys(y).length &&
				Object.keys(x).reduce(function (isEqual, key) {
					return isEqual && deepEqual(x[key], y[key]);
				}, true)
		: x === y;
}
