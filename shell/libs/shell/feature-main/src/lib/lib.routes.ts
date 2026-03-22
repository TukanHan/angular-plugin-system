import { Route } from '@angular/router';
import { FeatureMain } from './feature-main/feature-main';

export const featureMainRoutes: Route[] = [
    {
        path: '',
        component: FeatureMain,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('@shell/dashboard').then((m) => m.Dashboard),
            },
            {
                path: 'invoices/form',
                loadComponent: () =>
                    import('@shell/invoices-form').then((m) => m.InvoicesForm),
            },
            {
                path: 'invoices/list',
                loadComponent: () =>
                    import('@shell/invoices-list').then((m) => m.InvoicesList),
            },
        ],
    },
];
