import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@shell/feature-main').then(m => m.featureMainRoutes)
  }
];
