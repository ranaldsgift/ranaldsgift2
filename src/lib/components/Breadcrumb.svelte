<script lang="ts">
	import { getAppState } from "$lib/state/AppState.svelte";
	import type { AppLayout } from "$lib/types/AppLayout";
	import type { Snippet } from "svelte";

	type Props = {
		links?: {
			href: string;
			text: string;
		}[];
		children: Snippet;
		layout?: AppLayout;
	};

	const { links, children, layout }: Props = $props();

	let appState = getAppState();
</script>

{#if appState.layout === "emporium" || layout === "emporium"}
	{@render emporiumBreadcrumbs(children)}
{:else}
	{@render frameBreadcrumbs(children)}
{/if}

{#snippet emporiumBreadcrumbs(children: Snippet)}
	<div class="breadcrumb-container hidden relative tablet:flex mt-[1rem] left-[5rem] items-center text-[1.4rem] h-[54px]">
		<img src="/images/dividers/divider-26.png" class="emporium-separator w-[68px] h-[54px]" alt="divider" />
		{#if links}
			{#each links as link}
				<a href={link.href} class="text-[#9f9065] hover:text-[#fff] hover:no-underline">{link.text}</a>
				<img src="/images/dividers/divider-26.png" class="emporium-separator w-[68px]" alt="divider" />
			{/each}
		{/if}
		<span class="text-ellipsis">
			{@render children()}
		</span>
	</div>
{/snippet}

{#snippet frameBreadcrumbs(children: Snippet)}
	<div
		class="breadcrumb-container hidden tablet:flex fixed top-0 left-[70px] desktop:max-w-[calc(50%-460px)] whitespace-nowrap overflow-hidden"
	>
		{#each links as link}
			<a href={link.href} class="text-[#fae031]">{link.text}</a>
			<span class="px-2">/</span>
		{/each}
		<span class="text-ellipsis">
			{@render children()}
		</span>
	</div>
{/snippet}

<style>
	.breadcrumb-container {
		z-index: 101;
	}
	.emporium-separator {
		margin-right: 5px;
	}
</style>
