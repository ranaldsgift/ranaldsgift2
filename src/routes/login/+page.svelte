<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/Button.svelte";
	import { page } from "$app/stores";
	import { toast } from "svelte-sonner";
	import Header from "$lib/components/Header.svelte";

	let email = "";
</script>

<form
	method="POST"
	action="/api/user?/login&redirectTo={$page.url.href}"
	class="m-auto max-w-xl relative mt-10"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === "success") {
				toast("Click the magic link in the e-mail to login...", {
					position: "bottom-center",
					duration: 4000,
				});
			}
			if (result.type === "error") {
				toast.error(`There was a problem logging you in... \n${result.error.message}`, {
					position: "bottom-center",
					duration: 4000,
				});
			}
		};
	}}
>
	<Header>Login</Header>
	<div class="border-01 background-40 p-5 login-container mt-[42px] flex flex-col gap-5">
		<p class="text-center">Enter your e-mail to sign in with a Magic Link.</p>
		<p class="text-center italic">A link will be sent to your e-mail to authenticate yourself.</p>
		<input class="border-13 py-2 px-4 bg-neutral-900 text-center" name="email" type="email" bind:value={email} placeholder="E-mail" />
		<div class="m-auto">
			<Button>Login</Button>
		</div>
	</div>
</form>

<style>
	input:focus {
		outline: none;
	}
	.login-container {
		min-height: 400px;
	}
</style>
