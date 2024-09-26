<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { type IUser } from "$lib/entities/User";
	import * as api from "$lib/api.js";
	import Seo from "$lib/components/SEO.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";

	const { data } = $props();
	const user = $state<IUser>(data.userData);

	const saveUserHandler = async () => {
		const response = await api.post("/api/user/save", user);

		if (response.ok) {
			alert("User saved");
		} else {
			alert("Failed to save user");
		}
	};
</script>

<Seo title="Edit Profile" description="Edit your profile." />

<Breadcrumb
	links={[
		{ href: "/", text: "Home" },
		{ href: `/user/${user.id}`, text: user.name },
	]}>Edit Profile</Breadcrumb
>

<div class="page-layout">
	{#if user && data.sessionUser?.id === user.id}
		<PageButtonContainer>
			<button class="button-02" onclick={saveUserHandler}>Save</button>
		</PageButtonContainer>
		<div>
			<div class="user-info-container background-14 border-08">
				<span>Username</span>
				<input bind:value={user.name} />
				<span>Steam Friend Code</span>
				<input bind:value={user.steam} />
				<span>Discord</span>
				<input bind:value={user.discord} />
				<span>Twitch</span>
				<input bind:value={user.twitch} />
				<span>Youtube</span>
				<input bind:value={user.youtube} />
			</div>
		</div>
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
</style>
