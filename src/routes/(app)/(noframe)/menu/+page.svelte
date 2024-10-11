<script lang="ts">
	import MainMenu from "$lib/components/navigation/MainMenu.svelte";
	import Seo from "$lib/components/SEO.svelte";
	import { META_IMAGE_URL, ROOT_PAGE_DESCRIPTION } from "$lib/data/constants/constants";
</script>

<Seo title="Menu" description={ROOT_PAGE_DESCRIPTION} image={META_IMAGE_URL} />

<MainMenu></MainMenu>
