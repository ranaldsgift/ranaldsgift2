<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";

	const { data } = $props();
</script>

<Seo
	title={`${data.userData.name}'s Profile`}
	description={`${data.userData.name}'s Profile. Contains a list of ${data.userData.name}'s authored builds.`}
/>

<Breadcrumb links={[{ href: "/", text: "Home" }]}>{data.userData.name}'s Profile</Breadcrumb>

<div class="page-layout">
	{#if data.userData}
		{#if data.sessionUser?.id === data.userData.id}
			<PageButtonContainer>
				<a class="button-02" href={`/user/${data.userData.id}/edit`}>Edit</a>
			</PageButtonContainer>
		{/if}
		<div>
			<div class="user-info-container background-14 border-08">
				<span>Username</span>
				<span>{data.userData.name}</span>
				<span>Steam Friend Code</span>
				<span>{data.userData.steam}</span>
				<span>Discord</span>
				<span>{data.userData.discord}</span>
				<span>Twitch</span>
				<a href={`https://twitch.tv/${data.userData.twitch}`}>{data.userData.twitch}</a>
				<span>Youtube</span>
				<a href={`https://youtube.com/${data.userData.youtube}`}>{data.userData.youtube}</a>
			</div>
		</div>
		{#if data.sessionUser?.id === data.userData.id}
			<BuildTable filter={{ favoriteByUserId: data.userData.id, limit: 3 }}></BuildTable>
			<BuildTable filter={{ ratedByUserId: data.userData.id, limit: 3 }}></BuildTable>
		{/if}
		<BuildTable filter={{ userId: data.userData.id, limit: 10 }}></BuildTable>
	{:else}
		<div>
			<h1>User not found</h1>
		</div>
	{/if}
</div>

<style>
	.page-layout {
		max-width: 1200px;
		margin: 0 auto;
	}
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
