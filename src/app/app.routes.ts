import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/travel-planner/travel-planner').then((m) => m.TravelPlannerComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
