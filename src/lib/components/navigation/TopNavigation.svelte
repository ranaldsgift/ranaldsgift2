<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { getUserState } from "$lib/state/UserState.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";

	type Props = {
		showAboutButton?: boolean;
	};

	const { showAboutButton = true }: Props = $props();

	const userState = getUserState();

	const backgroundToggleClickHandler = async (event: Event) => {
		localStorage.setItem("showVideo", userState.showVideo.value.toString());

		if (userState.user) {
			const response = await fetch("/api/user/background", {
				method: "POST",
				body: JSON.stringify({ showVideo: userState.showVideo.value }),
				headers: {
					"content-type": "application/json",
				},
			});

			await response.json();
		}
	};

	const logoutHandler: SubmitFunction = async () => {
		return async ({ result, update }) => {
			const { error } = await $page.data.supabase.auth.signOut();

			if (!error) {
				userState.reset();
				toast("You have been logged out.", {
					position: "bottom-center",
				});
			}
		};
	};
</script>

<div class="top-navigation">
	<a href="/menu" class="ml-4 menu-icon">
		<div class="overlay"></div>
	</a>
	<!-- User icon -->
	<div class="icon-container flex-end ml-auto mr-4 flex gap-4 relative items-center">
		{#if showAboutButton}
			<a href="/about" class="rg-icon mb-[-4px]">&nbsp;</a>
		{/if}
		<input
			type="checkbox"
			class="background-toggle"
			bind:checked={userState.showVideo.value}
			title="Toggle Background Video"
			onchange={backgroundToggleClickHandler}
		/>
		<a href={userState.user?.id ? `/user/${userState.user.id}` : "/login"} class="user-icon"> </a>
		{#if userState.user}
			<form action="/api/user?/logout" method="POST" use:enhance={logoutHandler}>
				<button type="submit">Logout</button>
			</form>
		{/if}
	</div>
</div>

<style>
	.icon-container {
		height: 40px;
	}
	.icon-container > * {
		cursor: pointer;
	}
	.top-navigation {
		display: flex;
		height: 40px;
		position: fixed;
		left: -4px;
		top: -4px;
		padding-top: 4px;
		width: calc(100% + 8px);
		z-index: 10000;
	}
	.background-toggle {
		appearance: none;
		background: url("/images/icons/background-toggle.png") no-repeat;
		width: 45px;
		height: 45px;
	}
	.background-toggle:checked,
	.background-toggle:hover {
		background: url("/images/icons/background-toggle-selected.png") no-repeat;
	}
	.rg-icon {
		cursor: pointer;
		background: url("/images/icons/rg.png") 50% / 41px 41px;
		width: 41px;
		height: 41px;
		align-self: flex-end;
		justify-self: end;
	}
	.rg-icon:hover {
		background: url("/images/icons/rg-flip.png") center / 41px 41px;
	}
	a,
	button {
		position: relative;
		display: block;
		cursor: pointer;
	}
	.menu-icon {
		height: 50px;
		width: 90px;
	}
	.menu-icon {
		background: url("/images/icons/menu.png") no-repeat;
		background-size: contain;
	}
	.menu-icon:hover .overlay {
		cursor: pointer;
		background: url("/images/icons/menu_active.png") no-repeat;
		background-size: contain;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
	}
	a.user-icon {
		width: 25px;
		height: 25px;
		background-image: url("/images/icons/user-icon.png");
	}
	a.user-icon:hover {
		background-image: url("/images/icons/user-icon-hover.png");
	}
</style>
