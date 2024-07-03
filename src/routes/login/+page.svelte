<script lang="ts">
	import { enhance } from "$app/forms";
	//import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";	
    import { page } from '$app/stores';

	let email = "";
</script>

<form
	method="POST"
	action="/api/user?/login&redirectTo={$page.url.href}"
	class="grid grid-flow-row m-auto max-w-xl gap-5 mt-10"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === "success") {
				/* ToastHelper.create(
					"Check your email for a magic link to login!",
					"success",
					3000
				); */
			}
			if (result.type === "error") {
				/* ToastHelper.create(result.error.message, "error", 5000); */
			}
		};
	}}
>
	<p class="text-center">Enter your e-mail to sign in with a Magic Link.</p>
	<p class="text-center italic">
		You will be sent a link to authenticate yourself.
	</p>
	<label class="">
		<span>E-Mail</span>
		<input name="email" type="email" bind:value={email} />
	</label>
	<div class="m-auto">
		<Button>Sign In</Button>
	</div>
</form>
