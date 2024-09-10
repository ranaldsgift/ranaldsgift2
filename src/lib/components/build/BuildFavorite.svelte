<script lang="ts">
	import type { ICareerBuild } from "$lib/entities/builds/CareerBuild";
	import { getUserState } from "$lib/state/UserState.svelte";
	import { toast } from "svelte-sonner";

	type Props = {
		build: ICareerBuild;
	};

	const { build }: Props = $props();

	const userState = getUserState();

	let favoritedByUser = $derived(userState.user?.favoriteBuilds?.map((favorite) => favorite.id).includes(build.id) ?? false);

	const handleFavorite = async () => {
		if (userState.user) {
			const response = await fetch(`/api/build/${build.id}/favorite`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
			});

			const json = await response.json();

			if (response.ok) {
				if (json.favorited) {
					userState.addFavorite(build);
				} else {
					userState.removeFavorite(build);
				}

				toast(json.message, {
					position: "bottom-center",
				});
			} else {
				toast(json.error, {
					position: "bottom-center",
				});
			}
		}
	};
</script>

<button
	data-favorite={`${favoritedByUser ? "true" : "false"}`}
	type="submit"
	class="favorite-icon"
	title="Favorite"
	onclick={handleFavorite}
></button>

<style>
	.favorite-icon[data-favorite="false"] {
		filter: grayscale(1);
	}
	.favorite-icon {
		background: url("/images/icons/favorite.png") no-repeat center;
		width: 22px;
		height: 51px;
	}
</style>
