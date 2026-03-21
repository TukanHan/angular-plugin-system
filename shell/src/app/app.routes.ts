import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'widget',
    loadComponent: () =>
      loadRemoteModule('client', './Widget') // Nazwa z manifestu i klucz z exposes
        .then((m) => m.WidgetA), // Pobierasz konkretną klasę
  },
];
