import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectCreateComponent} from "./project-create/project-create.component";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {RouterLinkWithHref} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../../../../shared/shared.module";
import {PerfectScrollbarModule} from "../../../../shared/components/perfect-scrollbar";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "../../../../shared/interceptors/token.interceptor";
import {MatTooltipModule} from "@angular/material/tooltip";
import { MatMenuModule } from '@angular/material/menu';
import {MatDialogModule} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ProjectEditDialogComponent } from './project-edit-dialog/project-edit-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectAddCollaboratorDialogComponent } from './project-add-collaborator-dialog/project-add-collaborator-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProjectArchivedListComponent } from './project-archived-list/project-archived-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AssemblageListComponent } from './assemblage-list/assemblage-list.component';
import { MatTableModule } from '@angular/material/table';
import { AssemblageDialogComponent } from './assemblage-dialog/assemblage-dialog.component';


@NgModule({
    declarations: [
        ProjectListComponent,
        ProjectCreateComponent,
        ProjectEditDialogComponent,
        ConfirmDialogComponent,
        ProjectDetailComponent,
        ProjectAddCollaboratorDialogComponent,
        ProjectArchivedListComponent,
        AssemblageListComponent,
        AssemblageDialogComponent
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        MatSnackBarModule,
        MatCardModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCardModule,
        NgIf,
        RouterLinkWithHref,
        FlexModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        SharedModule,
        PerfectScrollbarModule,
        MatIconModule,
        HttpClientModule,
        ProjectsRoutingModule,
        MatTooltipModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatTableModule



    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
})
export class ProjectsModule { }
