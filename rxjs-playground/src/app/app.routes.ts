import { Routes } from '@angular/router';
import { exercisesRoutes } from './exercises/exercises.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'exercises', pathMatch: 'full' },
  ...exercisesRoutes
];
