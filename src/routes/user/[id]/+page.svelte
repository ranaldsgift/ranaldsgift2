<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import { type IUser } from "$lib/entities/User";

	const { data } = $props();
	const user = JSON.parse(data.userData) as IUser;
</script>

<Seo title={`${user.name}'s Profile'`} description={`${user.name}'s Profile. Contains a list of ${user.name}'s authored builds.`} />

<div>
	{#if user}
		{#if data.sessionUser?.id === user.id}
			<PageButtonContainer>
				<a class="button-02" href={`/user/${user.id}/edit`}>Edit</a>
			</PageButtonContainer>
		{/if}
		<div>
			<div class="user-info-container background-14 border-08">
				<span>Username</span>
				<span>{user.name}</span>
				<span>Steam Friend Code</span>
				<span>{user.steam}</span>
				<span>Discord</span>
				<span>{user.discord}</span>
				<span>Twitch</span>
				<a href={`https://twitch.tv/${user.twitch}`}>{user.twitch}</a>
				<span>Youtube</span>
				<a href={`https://youtube.com/${user.youtube}`}>{user.youtube}</a>
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
