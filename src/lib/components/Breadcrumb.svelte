<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		links: {
			href: string;
			text: string;
		}[];
		children: Snippet;
	};

	const { links, children }: Props = $props();
</script>

<div class="hidden tablet:flex fixed top-0 left-[70px] z-[100001] desktop:max-w-[calc(50%-460px)] whitespace-nowrap overflow-hidden">
	{#each links as link}
		<a href={link.href} class="text-[#fae031]">{link.text}</a>
		<span class="px-2">/</span>
	{/each}
	<span class="text-ellipsis">
		{@render children()}
	</span>
</div>
