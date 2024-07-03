<script lang="ts">
	import { DataHelper } from '$lib/helpers/DataHelper';
	import { BuildPageViewModel } from '$lib/viewmodels/BuildPageViewModel';
    import type { PageData } from './$types';
    
    export let data: PageData;
    const viewModel = DataHelper.deserialize(BuildPageViewModel, data.viewModel);
</script>

<div class="build-page">
    <h1>{viewModel?.build?.name}</h1>
    <p>{viewModel?.build?.description}</p>
</div>