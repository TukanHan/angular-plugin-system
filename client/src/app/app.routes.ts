import { Route } from '@angular/router';
import { DashboardPlugin } from './features/dashboard-plugin/dashboard-plugin';
import { PayerDetailPluginWrapper } from './features/payer-detail-plugin/payer-detail-plugin-wrapper';

export const appRoutes: Route[] = [
    {
        path: "payer-detail-plugin",
        component: PayerDetailPluginWrapper
    },
    {
        path: "dashboard-plugin",
        component: DashboardPlugin
    }
];
