<script>
	import ButtonLink from "$lib/components/ButtonLink.svelte";
	import { getUserState } from "$lib/state/UserState.svelte";

	const userState = getUserState();
</script>

<nav>
	<div class="menu-title-divider divider-12 mb-4"></div>
	<ul>
		<div class="chain-decoration left scroll-10"></div>
		<div class="chain-decoration right scroll-10"></div>
		<!-- <li><ButtonLink url='/'>Home</ButtonLink></li> -->
		<li><ButtonLink url="/builds">Builds</ButtonLink></li>
		<li><ButtonLink url="/heroes">Heroes</ButtonLink></li>
		<li><ButtonLink url="/careers">Careers</ButtonLink></li>
		<!--<li><ButtonLink url="/weapons">Weapons</ButtonLink></li>
        <li><ButtonLink url="/missions">Missions</ButtonLink></li>
        <li><ButtonLink url="/enemies">Enemies</ButtonLink></li>
		<li><ButtonLink url="/fight-the-tide">Fight The Tide</ButtonLink></li>
        <li><ButtonLink url="/breakpoints">Breakpoints</ButtonLink></li>
        <li><ButtonLink url="/deeds">Deeds</ButtonLink></li>
        <li><ButtonLink url="/wastes">Chaos Wastes</ButtonLink></li>
        <li><ButtonLink url="/versus">Versus</ButtonLink></li>
        <li><ButtonLink url="/weaves">Weaves</ButtonLink></li> -->
		<li><ButtonLink url="/events">Events</ButtonLink></li>
		<li><ButtonLink url="/onslaught-series">Onslaught Series</ButtonLink></li>
		<li><ButtonLink url="/modded-difficulties">Modded Difficulties</ButtonLink></li>
		<li><ButtonLink url="/resources">Resources</ButtonLink></li>
		<li><ButtonLink url="/about">About</ButtonLink></li>
		{#if userState.isPrivileged}
			<li><ButtonLink url="/admin">Admin</ButtonLink></li>
		{/if}
	</ul>
	<div class="menu-title-divider-bottom divider-19"></div>
	<a class="discord-button" href="https://discord.gg/ZQrEeE69EF">&nbsp;</a>
</nav>

<style>
	li {
		list-style: none;
		width: 300px;
		height: 60px;
	}
	ul {
		margin: 0;
		padding: 0 0 20px 0;
		display: grid;
		justify-content: center;
		row-gap: 7px;
		position: relative;
	}
	.menu-title-divider {
		height: 50px;
		z-index: 2;
		position: relative;
	}
	.menu-title-divider-bottom {
		height: 50px;
		z-index: 2;
		position: relative;
	}
	nav {
		width: fit-content;
	}
</style>
