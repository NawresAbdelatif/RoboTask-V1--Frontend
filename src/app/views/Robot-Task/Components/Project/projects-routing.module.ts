import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectCreateComponent} from "./project-create/project-create.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";

const routes: Routes = [
    { path: 'list', component: ProjectListComponent },
    { path: 'create', component: ProjectCreateComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: ':id', component: ProjectDetailComponent }, // <-- ici

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
