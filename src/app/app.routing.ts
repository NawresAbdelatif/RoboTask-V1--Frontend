import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import {UserComponent} from "./views/Robot-Task/Components/signin/signin.component";
import {SignUpComponent} from "./views/Robot-Task/Components/signup/signup.component";
import {LogsComponent} from "./views/Robot-Task/Components/profiles/logs/logs.component";
import {VerifyEmailComponent} from "./views/Robot-Task/Components/verify-email/verify-email.component";
import {ActivateComponent} from "./views/Robot-Task/Components/activate/activate.component";
import {ForgotPasswordComponent} from "./views/Robot-Task/Components/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./views/Robot-Task/Components/reset-password/reset-password.component";

export const rootRouterConfig: Routes = [


  {
    path: '',
    component: UserComponent,
  },

  {
    path: 'pages/signin',
    component: UserComponent,
  },

  {
    path: 'pages/signup',
    component: SignUpComponent,
  },

  {
    path: 'activate',
    component: ActivateComponent,
  },

  {
    path: 'pages/forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'pages/reset-password',
    component: ResetPasswordComponent,
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard/analytics',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'projets',
        loadChildren: () => import('./views/Robot-Task/Components/Project/projects.module').then(m => m.ProjectsModule),
        data: { title: 'Projets', breadcrumb: 'PROJETS' }
      },

      {
        path: 'pieces',
        loadChildren: () => import('./views/Robot-Task/Components/pieces/pieces.module').then(m => m.PiecesModule),
        data: { title: 'Pieces', breadcrumb: 'PIÈCES' }
      },

      // { path: 'profils/logs', component: LogsComponent },

      {
        path: 'profils',
        loadChildren: () => import('./views/Robot-Task/Components/profiles/profils.module').then(m => m.ProfilsModule),
        data: { title: 'Profils', breadcrumb: 'PROFILS' }
      },

      { path: 'verify-email', component: VerifyEmailComponent },


      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: { title: 'Others', breadcrumb: 'OTHERS'}
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule),
        data: { title: 'Forms', breadcrumb: 'FORMS'}
      },
      
      {
        path: 'search',
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      },
      
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }

];

