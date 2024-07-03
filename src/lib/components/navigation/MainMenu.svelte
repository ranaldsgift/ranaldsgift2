<script>
	import ButtonLink from "$lib/components/ButtonLink.svelte";
</script>

<style>
    li {
        list-style: none;
        width: 300px;
        height: 60px;
    }
    :global(a) {
        text-decoration: none;
        color: #928962;
    }
    ul {
        margin: 0;
        padding: 0 0 20px 0;
        display: grid;
        justify-content: center;
        row-gap: 7px;
        position: relative;
    }
    .menu-title-divider {
        height: 50px;
        z-index: 2;
        position: relative;
    }
    .menu-title-divider-bottom {
        height: 50px;
        z-index: 2;
        position: relative;
    }
    .menu-title-label {
        text-transform: uppercase;
        position: relative;
        top: 0;
        color: #c15b24;
        font-size: 3em;
        letter-spacing: 5px;
        text-shadow: 1px 1px #000;
    }
    nav {
        width: fit-content;
    }
</style>

<nav>
    <div class="menu-title-label">Ranald's Gift</div>
    <div class="menu-title-divider divider-12 mb-4"></div>    
    <ul>
        <div class="chain-decoration left scroll-10"></div>
        <div class="chain-decoration right scroll-10"></div>
        <li><ButtonLink url='/'>Home</ButtonLink></li>
        <li><ButtonLink url="/builds">Builds</ButtonLink></li>
        <li><ButtonLink url="/heroes">Heroes</ButtonLink></li>
        <li><ButtonLink url="/weapons">Weapons</ButtonLink></li>
<!--         <li><ButtonLink url="/fight-the-tide">Fight The Tide</ButtonLink></li>
        <li><ButtonLink url="/breakpoints">Breakpoints</ButtonLink></li>
        <li><ButtonLink url="/wastes">Chaos Wastes</ButtonLink></li>
        <li><ButtonLink url="/versus">Versus</ButtonLink></li>
        <li><ButtonLink url="/weaves">Weaves</ButtonLink></li> -->
        <li><ButtonLink url="/resources">Resources</ButtonLink></li>
        <li><ButtonLink url="/about">About</ButtonLink></li>
    </ul>
    <div class="menu-title-divider-bottom divider-19"></div>  
    <a class="discord-button" href="https://discord.gg/ZQrEeE69EF">&nbsp;</a>
</nav>