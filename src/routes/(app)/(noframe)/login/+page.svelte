<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/Button.svelte";
	import { page } from "$app/stores";
	import { toast } from "svelte-sonner";
	import Header from "$lib/components/Header.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { ROOT_API_URL } from "$lib/data/constants/constants";
	import Seo from "$lib/components/SEO.svelte";

	let email = $state("");
	let isEmailValid = $derived(email.length > 0 && email.includes("@"));
	let isSubmittingLogin = $state(false);

	const submitLogin: SubmitFunction = () => {
		if (isSubmittingLogin) return;
		isSubmittingLogin = true;
		const loadingToast = toast.loading("Logging in...", { position: "bottom-center" });
		return async ({ update }) => {
			try {
				await update();
				toast.dismiss(loadingToast);
				toast.success("Click the magic link in your inbox to login.", { position: "bottom-center" });
			} catch (error) {
				toast.dismiss(loadingToast);
				toast.error("Error logging in", { position: "bottom-center" });
			} finally {
				isSubmittingLogin = false;
			}
		};
	};
</script>

<Seo title="Login" description="Login to or register your Ranald's Gift account" />

<form
	method="POST"
	action={`${ROOT_API_URL}/user?/login&redirectTo=${$page.url.href}`}
	class="m-auto max-w-xl relative mt-10"
	use:enhance={submitLogin}
>
	<Header>Login</Header>
	<div class="border-01 background-40 p-5 login-container mt-[42px] flex flex-col gap-5">
		<p class="text-center">Enter your e-mail to sign in with a Magic Link.</p>
		<p class="text-center">If this is your first time logging in, your account will be created.</p>
		<p class="text-center italic">A link will be sent to your e-mail to authenticate yourself.</p>
		<input class="border-13 py-2 px-4 bg-neutral-900 text-center" name="email" type="email" bind:value={email} placeholder="E-mail" />
		<div class="m-auto">
			<Button disabled={isSubmittingLogin || !isEmailValid}>Login</Button>
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
