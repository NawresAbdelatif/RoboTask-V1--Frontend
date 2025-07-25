import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OutilListComponent} from "./outil-list/outil-list.component";


const routes: Routes = [
    { path: 'list', component: OutilListComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OutilsRoutingModule { }
