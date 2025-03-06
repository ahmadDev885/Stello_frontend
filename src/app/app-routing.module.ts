import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { ClientParentComponent } from './components/client/client-parent/client-parent.component';
import { CanDeactivateGuard } from './guards/canDeactivateGuard';
import { AuthGuard } from './guards/authGuard';
import { CampaignListComponent } from './components/client/campaign-list/campaign-list.component';
import { HasRoleGuard } from './services/shared.service';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',component: AdminComponent,canActivate:[AuthGuard,HasRoleGuard],
    data:{
      "role":'superuser'
    },
    children: [
      { path: 'user-list', component: UserListComponent },
      { path: '**', redirectTo: 'user-list' },

    ],
  },
  {
    path: 'client',component: ClientComponent, canActivate:[AuthGuard],
    children: [
      { path: 'new', component: ClientParentComponent},
      { path: 'campaign', component: CampaignListComponent, },
      { path: '**', redirectTo: '' },

    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
