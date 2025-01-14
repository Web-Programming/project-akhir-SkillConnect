import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  // {
  //   path: 'materi',
  //   loadComponent: () =>
  //     import('./materi/materi.component').then((m) => m.MateriComponent),
  // },
  // {
  //   path: 'kursus',
  //   loadComponent: () =>
  //     import('./kursus/kursus.component').then((m) => m.KursusComponent),
  // },
  // {
  //   path: 'kursus-guru',
  //   loadComponent: () =>
  //     import('./kursus-guru/kursus-guru.component').then(
  //       (m) => m.KursusGuruComponent
  //     ),
  // },
  // {
  //   path: 'absen',
  //   loadComponent: () =>
  //     import('./absen/absen.component').then((m) => m.AbsenComponent),
  // },
  // {
  //   path: 'materi-guru',
  //   loadComponent: () =>
  //     import('./materi-guru/materi-guru.component').then(
  //       (m) => m.MateriGuruComponent
  //     ),
  // },
  // {
  //   path: 'guru',
  //   loadComponent: () =>
  //     import('./guru/guru.component').then((m) => m.GuruComponent),
  // },
];
