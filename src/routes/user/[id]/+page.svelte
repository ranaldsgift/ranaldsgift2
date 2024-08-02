<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import { type IUser } from "$lib/entities/User";
	import type { PageData } from "./$types";

	const { data }: { data: PageData } = $props();
	const userData = JSON.parse(data.userData) as IUser;
</script>

<Seo
	title={`${userData.name}'s Profile'`}
	description={`${userData.name}'s Profile. Contains a list of ${userData.name}'s authored builds.`}
/>

<div>
	{#if userData}
		{#if data.sessionUser?.id === userData.id}
			<PageButtonContainer>
				<a class="button-02" href={`/user/${userData.id}/edit`}>Edit</a>
			</PageButtonContainer>
		{/if}
		<div>
			<div class="user-info-container background-14 border-08">
				<span>Username</span>
				<span>{userData.name}</span>
				<span>Steam Friend Code</span>
				<span>{userData.steam}</span>
				<span>Discord</span>
				<span>{userData.discord}</span>
				<span>Twitch</span>
				<a href={`https://twitch.tv/${userData.twitch}`}>{userData.twitch}</a>
				<span>Youtube</span>
				<a href={`https://youtube.com/${userData.youtube}`}>{userData.youtube}</a>
			</div>
		</div>
	{:else}
		<div>
			<h1>User not found</h1>
		</div>
	{/if}
</div>

<style>
	.user-info-container {
		color: #8bc34a;
		font-size: 1.5em;
		display: grid;
		grid-template-columns: max-content 1fr;
		justify-items: left;
		text-align: left;
		grid-column-gap: 15px;
		grid-row-gap: 5px;
		padding: 20px;
		position: relative;
		grid-row-gap: 10px;
	}
	.user-info-container > span:nth-child(2n + 1) {
		color: #808080;
	}
	.user-info-container a {
		color: #0096fb;
	}
</style>
