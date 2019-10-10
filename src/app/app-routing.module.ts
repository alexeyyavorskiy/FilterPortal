import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {EditNetworkComponent} from "./pages/edit-network/edit-network.component";
import {EventHistoryComponent} from "./pages/event-history/event-history.component";
import {ParameterListComponent} from "./pages/parameter-list/parameter-list.component";
import {LoginFormComponent} from './pages/login/login-form/login-form.component';
import {ErrorComponent} from './pages/error/error.component';
import {AuthGuard, LoginGuard} from './auth.guard';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginFormComponent , canActivate: [LoginGuard]},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'edit-network', component: EditNetworkComponent, canActivate: [AuthGuard]},
  {path: 'event-history', component: EventHistoryComponent, canActivate: [AuthGuard]},
  {path: 'parameter-list', component: ParameterListComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

