import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PieceListComponent} from "./piece-list/piece-list.component";


const routes: Routes = [
    { path: 'list', component: PieceListComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PiecesRoutingModule { }
