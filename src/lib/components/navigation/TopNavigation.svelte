<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { getUserState } from "$lib/state/UserState.svelte";
	import { previousPage } from "$lib/stores/PageStores.svelte";

	const userState = getUserState();

	let isMenuOpen = $derived($page.url.pathname === "/menu");

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

	let isAppPath = $derived($page.route.id?.includes("(app)"));

	const handleMenuClick = () => {
		if (isMenuOpen) {
			goto(previousPage.url);
		} else {
			goto("/menu");
		}
	};
</script>

<div class="top-navigation tablet:!bg-none tablet:!h-[45px]">
	<button class="hamburger-menu-icon {isMenuOpen ? 'active' : ''}" onclick={() => handleMenuClick()}>
		<span class="hamburger-line"></span>
		<span class="hamburger-line"></span>
		<span class="hamburger-line"></span>
	</button>
	<!-- User icon -->
	<div class="icon-container flex-end ml-auto mr-8 flex gap-4 relative items-center">
		{#if isAppPath}
			<a href="/about" class="hidden tablet:block rg-icon mb-[-4px] hover:!no-underline">&nbsp;</a>
		{/if}
		<input
			type="checkbox"
			class="background-toggle"
			bind:checked={userState.showVideo.value}
			title="Toggle Background Video"
			onchange={backgroundToggleClickHandler}
		/>
		<a href={userState.user?.id ? `/user/${userState.user.id}` : "/login"} class="user-icon"> </a>
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
		position: fixed;
		left: -4px;
		top: -4px;
		padding-top: 4px;
		width: calc(100% + 8px);
		z-index: 10000;
		height: 50px;
		background:
			linear-gradient(45deg, #222222bd, #1616169e),
			url("/images/backgrounds/background30.png") center / cover;
		box-shadow:
			inset 0 -4px 6px -1px rgba(255, 255, 255, 0.1),
			inset 0 -2px 4px -1px rgba(255, 255, 255, 0.06);
	}

	@media (min-width: 768px) {
		.top-navigation {
			box-shadow: none;
		}
	}

	.background-toggle {
		appearance: none;
		background: url("/images/icons/background-toggle.png") no-repeat;
		width: 45px;
		height: 45px;
		transition: background 0.3s ease;
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
		cursor: pointer;
	}
	.menu-icon {
		height: 40px;
		width: 90px;
	}
	.menu-icon {
		background: url("/images/icons/menu.png") no-repeat;
		background-size: contain;
	}
	.menu-icon {
		position: relative;
	}
	.menu-icon::after,
	.menu-icon.active::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("/images/icons/menu_active.png") no-repeat;
		background-size: contain;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.menu-icon.active::after,
	.menu-icon:hover::after {
		opacity: 1;
	}
	a.user-icon {
		width: 25px;
		height: 25px;
		background-image: url("/images/icons/user-icon.png");
		transition: background-image 0.3s ease;
	}
	a.user-icon:hover {
		background-image: url("/images/icons/user-icon-hover.png");
	}

	.hamburger-menu-icon {
		width: 25px;
		height: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		cursor: pointer;
		background: transparent;
		border: none;
		left: 30px;
		top: 10px;
	}

	.hamburger-line {
		width: 100%;
		height: 4px;
		background-color: #fff;
		transition: background-color 0.3s ease;
	}

	.hamburger-menu-icon.active .hamburger-line,
	.hamburger-menu-icon:hover .hamburger-line {
		background-color: #ff3e00;
	}
</style>
