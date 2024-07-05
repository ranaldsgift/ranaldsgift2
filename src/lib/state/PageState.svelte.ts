export abstract class PageState {
    pageTitle: string = $state("");
    pageDescription: string = $state("");
    abstract reset(): void;
}