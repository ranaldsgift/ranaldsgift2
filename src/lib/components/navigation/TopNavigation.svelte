<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { MenuState } from "$lib/state/MenuState.svelte";
	import { getUserState } from "$lib/state/UserState.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";

	const userState = getUserState();

	const menuClickHandler = (event: MouseEvent) => {
		event.preventDefault();
		MenuState.toggle();
	};

	const backgroundToggleClickHandler = (event: MouseEvent) => {
		userState.showVideo = !userState.showVideo;
		localStorage.setItem("showVideo", userState.showVideo.toString());
	};

	const logoutHandler: SubmitFunction = async () => {
		return async ({ result, update }) => {
			const { error } = await $page.data.supabase.auth.signOut();

			if (!error) {
				userState.reset();
			}
		};
	};
</script>

<div class="top-navigation">
	<div class="top-navigation-background background-35 border-11 collapsed">
		<a href="/">Ranald's Gift</a>
	</div>
	<button class="ml-4 menu-icon" onclick={menuClickHandler}>
		<div class="overlay"></div>
	</button>
	<!-- User icon -->
	<div class="icon-container flex-end ml-auto mr-4 flex gap-4 relative items-center">
		{#if !MenuState.isOpen}
			<a href="/about" class="rg-icon main-logo">&nbsp;</a>
		{/if}
		<button class="background-toggle" title="Toggle Background Video" onclick={backgroundToggleClickHandler}></button>
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
		height: 50px;
	}
	.icon-container > * {
		cursor: pointer;
	}
	.top-navigation {
		display: flex;
		height: 50px;
		position: fixed;
		left: -4px;
		top: -4px;
		padding-top: 4px;
		width: calc(100% + 8px);
		z-index: 999;
	}
	.top-navigation-background {
		display: grid;
		justify-content: center;
		align-content: center;
		position: absolute;
		background-position: center;
		top: 0;
		height: 0px;
		width: 100%;
		overflow: hidden;
		transition: height 0.3s;
		font-size: 1.4rem;
		color: #c15b24;
		line-height: 66px;
		text-transform: uppercase;
		font-family: "caslon-antique-bold";
	}
	:global(.top-navigation-background:not(.collapsed)) {
		height: 58px;
	}

	.background-toggle {
		background: url("/images/icons/background-toggle.png") no-repeat;
		width: 45px;
		height: 45px;
	}
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
