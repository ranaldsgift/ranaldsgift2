<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { type IUser } from "$lib/entities/User";
	import Seo from "$lib/components/SEO.svelte";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import PageContainer from "$lib/components/containers/PageContainer.svelte";
	import ContentContainer from "$lib/components/ContentContainer.svelte";
	import ContentHeader from "$lib/components/ContentHeader.svelte";
	import TextInput from "$lib/components/input/TextInput.svelte";
	import { toast } from "svelte-sonner";
	import { getUserState } from "$lib/state/UserState.svelte.js";
	import { invalidate } from "$app/navigation";
	import { CareerBuildsStore } from "$lib/stores/DataStores.js";
	import { ROOT_API_URL } from "$lib/data/constants/constants.js";

	const { data } = $props();
	const userState = getUserState();
	const user = $state<IUser>(data.userData);
	let serializedUser = $state(JSON.stringify(data.userData));
	let isDirty = $derived.by(() => serializedUser !== JSON.stringify(user));

	const saveUserHandler = async () => {
		try {
			const response = await fetch(`${ROOT_API_URL}/user/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			if (response.ok) {
				toast.success("User saved", { position: "bottom-center" });
				userState.updateUser(user);
				serializedUser = JSON.stringify(user);
				invalidate(`user:${user.id}`);
				CareerBuildsStore.invalidateByUserId(user.id);
			} else {
				const json = await response.json();
				toast.error(json.error, { position: "bottom-center" });
			}
		} catch (error) {
			console.error("Error saving user:", error);
			toast.error("Failed to save user. Please try again.", { position: "bottom-center" });
		}
	};
</script>

<Seo title="Edit Profile" description="Edit your profile." />

<Breadcrumb
	links={[
		{ href: "/", text: "Home" },
		{ href: `/user/${user.id}`, text: user.name || "Your Profile" },
	]}>Edit</Breadcrumb
>

<PageButtonContainer>
	<button class="button-02" onclick={saveUserHandler} disabled={!isDirty}>Save</button>
	<a href={`/user/${user.id}`} class="button-02">Cancel</a>
</PageButtonContainer>

<PageContainer>
	<ContentHeader>Edit Profile</ContentHeader>
	<ContentContainer>
		{#if user && data.sessionUser?.id === user.id}
			<div class="user-info-container">
				<span>Username</span>
				<TextInput bind:value={user.name} placeholder="Username..." />
				<span>Steam Friend Code</span>
				<TextInput bind:value={user.steam} placeholder="Steam Friend Code..." />
				<span>Discord</span>
				<TextInput bind:value={user.discord} placeholder="Discord..." />
				<span>Twitch</span>
				<TextInput bind:value={user.twitch} placeholder="Twitch..." />
				<span>Youtube</span>
				<TextInput bind:value={user.youtube} placeholder="Youtube..." />
			</div>
		{:else}
			<h1>User not found</h1>
		{/if}
	</ContentContainer>
</PageContainer>

<style>
	.user-info-container {
		color: #8bc34a;
		font-size: 1.5rem;
		display: grid;
		grid-template-columns: max-content 1fr;
		justify-items: left;
		text-align: left;
		grid-column-gap: 15px;
		grid-row-gap: 5px;
		position: relative;
		grid-row-gap: 10px;
	}
	.user-info-container > span:nth-child(2n + 1) {
		color: #808080;
	}
</style>
