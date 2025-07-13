import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogsComponent} from "./logs/logs.component";
import {AdminUserListComponent} from "./admin-user-list/admin-user-list.component";

const routes: Routes = [
    { path: 'logs', component: LogsComponent },
    { path: 'users', component: AdminUserListComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfilsRoutingModule { }
