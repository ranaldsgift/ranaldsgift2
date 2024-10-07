<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import BuildTable from "$lib/components/buildtable/BuildTable.svelte";
	import PageContainer from "$lib/components/containers/PageContainer.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
	import ContentHeader from "$lib/components/ContentHeader.svelte";
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import { ROOT_API_URL } from "$lib/data/constants/constants.js";
	import { getUserState } from "$lib/state/UserState.svelte.js";
	import { type SubmitFunction } from "@sveltejs/kit";
	import { toast } from "svelte-sonner";

	const { data } = $props();

	let userState = getUserState();

	let hasInfo = $derived(data.userData.steam || data.userData.discord || data.userData.twitch || data.userData.youtube);
	let isSelf = $derived(userState.user?.id === data.userData.id);
	let pageTitle = $derived(data.userData.name ? data.userData.name + "'s Profile" : isSelf ? "Your Profile" : "User Profile");
	let pageDescription = $derived(
		data.userData.name
			? `${data.userData.name}'s Profile. Contains a list of ${data.userData.name}'s authored builds.`
			: isSelf
				? "Your Profile. Contains a list of your favorite and rated builds."
				: `This user has not created a profile yet.`
	);

	let favoriteFilter = $state({ favoriteByUserId: data.userData.id, limit: 3, offset: 0 });
	let ratedFilter = $state({ ratedByUserId: data.userData.id, limit: 3, offset: 0 });
	let authoredFilter = $state({ userId: data.userData.id, limit: 10, offset: 0 });

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

<Seo title={pageTitle} description={pageDescription} />

<Breadcrumb links={[{ href: "/", text: "Home" }]}>{pageTitle}</Breadcrumb>

{#if data.sessionUser?.id === data.userData.id}
	<PageButtonContainer>
		<a class="button-02" href={`/user/${data.userData.id}/edit`}>Edit</a>
		<form action={`${ROOT_API_URL}/user?/logout`} method="POST" use:enhance={logoutHandler}>
			<button type="submit" class="button-02">Logout</button>
		</form>
	</PageButtonContainer>
{/if}

<PageContainer class="flex flex-col gap-2">
	{#if data.userData && data.userData.name}
		<div>
			<ContentHeader>
				{data.userData.name}'s Profile
			</ContentHeader>
			{#if hasInfo}
				<ContentContainer>
					<div class="user-info-container">
						{#if data.userData.steam}
							<span>Steam Friend Code</span>
							<span>{data.userData.steam}</span>
						{/if}
						{#if data.userData.discord}
							<span>Discord</span>
							<span>{data.userData.discord}</span>
						{/if}
						{#if data.userData.twitch}
							<span>Twitch</span>
							<a href={`https://twitch.tv/${data.userData.twitch}`}>{data.userData.twitch}</a>
						{/if}
						{#if data.userData.youtube}
							<span>Youtube</span>
							<a href={`https://youtube.com/${data.userData.youtube}`}>{data.userData.youtube}</a>
						{/if}
					</div>
				</ContentContainer>
			{/if}
		</div>
		{#if data.sessionUser?.id === data.userData.id}
			{#if data.userData.favoriteBuildsCount > 0}
				<BuildTable class="top-left-shadow" title="My Favorite Builds" filter={favoriteFilter}></BuildTable>
			{/if}
			{#if data.userData.ratedBuildsCount > 0}
				<BuildTable class="top-left-shadow" title="My Rated Builds" filter={ratedFilter}></BuildTable>
			{/if}
		{/if}
		{#if data.userData.authoredBuildsCount > 0}
			<BuildTable class="top-left-shadow" title={data.userData.name + "'s Builds"} filter={authoredFilter}></BuildTable>
		{:else if data.userData.id === data.sessionUser?.id}
			<ContentContainer>
				<h1>You will see a list of your builds here once you <a href="/build/create">created</a> one.</h1>
			</ContentContainer>
		{:else}
			<ContentContainer>
				<h1>This user has not created any builds yet.</h1>
			</ContentContainer>
		{/if}
	{:else if data.userData && data.userData.id === data.sessionUser?.id}
		<ContentHeader>Create your user profile</ContentHeader>
		<ContentContainer>
			<h1>
				Please <a href={`/user/${data.userData.id}/edit`}>create your user profile</a>. You must have a unique username before you
				can create and share builds.
			</h1>
		</ContentContainer>
	{:else}
		<ContentHeader>User not found</ContentHeader>
		<ContentContainer>
			<h1>User not found</h1>
		</ContentContainer>
	{/if}
</PageContainer>

<style>
	.page-layout {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		gap: 10px;
	}
	.user-info-container {
		color: #8bc34a;
		font-size: 1.5rem;
		display: grid;
		grid-template-columns: 1fr;
		justify-items: left;
		text-align: left;
		grid-column-gap: 15px;
		grid-row-gap: 5px;
		position: relative;
	}

	.user-info-container > *:nth-child(2n) {
		margin-bottom: 10px;
	}

	@media (min-width: 768px) {
		.user-info-container {
			grid-template-columns: max-content 1fr;
			grid-row-gap: 10px;
		}
		.user-info-container > *:nth-child(2n) {
			margin-bottom: 0px;
		}
	}

	.user-info-container > span:nth-child(2n + 1) {
		color: #808080;
	}
	.user-info-container a {
		color: #0096fb;
	}
</style>
