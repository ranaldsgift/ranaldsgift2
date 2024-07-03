class MenuPageState {
    isOpen: boolean = $state(false);

    toggle() {
        this.isOpen = !this.isOpen;
    }
}

export const MenuState = $state(new MenuPageState());