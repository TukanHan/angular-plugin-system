import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { appRoutes } from './app.routes';

const MyPreset = definePreset(Aura, {
    components: {
        floatlabel: {
            over: {
                active: {
                    top: '-1rem',
                },
            },
        },
    },
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        providePrimeNG({
            theme: {
                preset: MyPreset,
            },
        }),
    ],
};
