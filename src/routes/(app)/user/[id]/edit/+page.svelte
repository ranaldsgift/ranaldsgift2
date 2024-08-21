<script lang="ts">
	import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
	import { type IUser } from "$lib/entities/User";

	const { data } = $props();
	const user = $state<IUser>(JSON.parse(data.userData) as IUser);

	const saveUserHandler = async () => {
		const response = await fetch("/api/user/save", {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"content-type": "application/json",
			},
		});

		if (response.ok) {
			alert("User saved");
		} else {
			alert("Failed to save user");
		}
	};
</script>

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
	.user-info-container a {
		color: #0096fb;
	}
</style>
