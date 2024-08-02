<script>
	import { page } from "$app/stores";

	export let title = "Holy Sigmar, Bless This Ravaged Website";
	export let description = "Your Resource for Vermintide 2 Builds, Mechanics and Gameplay Information";
	export let image = "/meta-image.png";
</script>

<svelte:head>
	<title>{title} | ranalds.gift</title>
	<meta name="description" content={description} />
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
