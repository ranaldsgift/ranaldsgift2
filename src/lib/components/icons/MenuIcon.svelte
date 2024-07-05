<style>
    button {
        position: relative;
        height: 50px;
        width: 90px;
        cursor: pointer;
    }
    button {
        background: url('/images/icons/menu.png') no-repeat;
        background-size: contain;
    }
    button:hover .overlay {
        background: url('/images/icons/menu_active.png') no-repeat;
        background-size: contain;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
    }
</style>

<button><div class="overlay"></div></button>