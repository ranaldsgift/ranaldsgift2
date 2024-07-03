<script lang="ts">
	import {  enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { MenuState } from "$lib/state/MenuState.svelte";
	import { getUserState } from "$lib/state/UserState.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";

    const clickHandler = (event: MouseEvent) => {
        event.preventDefault();
        MenuState.toggle();
    };

    const logoutHandler: SubmitFunction = async () => {
        return async ({ result, update}) => {
            const { error } = await $page.data.supabase.auth.signOut();

            if (!error) {                
                userState.reset();
            }
        }
    }

    const userState = getUserState();
</script>

<style>
    a, button {
        position: relative;
        display: block;
        cursor: pointer;
    }
    .menu-icon {
        height: 50px;
        width: 90px;
    }
    .menu-icon {
        background: url('/images/icons/menu.png') no-repeat;
        background-size: contain;
    }
    .menu-icon:hover .overlay {
        cursor: pointer;
        background: url('/images/icons/menu_active.png') no-repeat;
        background-size: contain;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
    }
	a.user-icon {
        width: 25px;
        height: 25px;
		background-image: url("/images/icons/user-icon.png");
	}
	a.user-icon:hover {
		background-image: url("/images/icons/user-icon-hover.png");
	}
</style>

<div class="relative flex">
    <button class="ml-4 menu-icon" onclick={clickHandler}>
        <div class="overlay"></div>
    </button>
    <!-- User icon -->
    <div class="flex-end ml-auto mr-4 flex gap-4 mt-2">
    <a href={userState.user?.id ? `/user/${userState.user.id}` : '/login' } class="user-icon">
    </a>
    {#if userState.user}
    <form action="/api/user?/logout" method="POST" use:enhance={logoutHandler}>
        <button type="submit">Logout</button>
    </form>
    {/if}
    </div>
</div>