<script lang="ts">
	import { page } from "$app/stores";

	type Props = {
		title?: string;
		description?: string;
		image?: string;
	};

	let { title, description, image }: Props = $props();
</script>

<svelte:head>
	<title>{title} | ranalds.gift</title>
	<meta name="description" content={description} />
	<meta name="image" content={image} />
	<meta property="og_site_name" content="ranalds.gift" />
	<meta property="og:url" content="https://ranalds.gift{$page.url.pathname.toString()}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="ranalds.gift" />
	<meta property="twitter:url" content="https://ranalds.gift{$page.url.pathname.toString()}" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	{@html `  <script type="application/ld+json">{
     "@context": "https://schema.org",
     "@type": "Website",
     "name": "${title} | ranalds.gift,
     "url": "https//ranalds.gift${$page.url.pathname}",
     "logo": ${image}  }</script>`}
</svelte:head>
