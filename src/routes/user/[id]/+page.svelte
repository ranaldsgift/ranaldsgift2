<script lang="ts">
	import { User } from '$lib/entities/User';
	import { DataHelper } from '$lib/helpers/DataHelper';
    import type { PageData } from './$types';
    
    export let data: PageData;
    const userData = DataHelper.deserialize(User, data.userData);
</script>

<div id="page">
    {#if userData}
    <div>
        <h1>User Profile</h1>
        <span>{userData.id}</span>
        <span>{userData.name}</span>
    </div>
    {:else}
    <div>
        <h1>User not found</h1>
    </div>
    {/if}
</div>