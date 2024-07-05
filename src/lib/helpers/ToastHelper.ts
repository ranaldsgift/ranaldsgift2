/* import { Toast, getToastStore } from '@skeletonlabs/skeleton';
import type { ToastStore, ToastSettings } from '@skeletonlabs/skeleton';

export class ToastHelper {
    public static create(message: string, preset: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'success' | 'error' = 'success', timeout = 1000, autohide = true) {
        const toastStore: ToastStore = getToastStore();
        const t: ToastSettings = {
            message: message,
            background: preset ? `bg-${preset}-50-900-token` : 'bg-primary-50-900-token',
            timeout: timeout,
            autohide: autohide,
            classes: autohide ? 'autohide ' : undefined
        };
        toastStore.trigger(t);
    }
} */