import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {RouterLinkWithHref} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatPaginatorModule } from '@angular/material/paginator';
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
import {LogsComponent} from "./logs/logs.component";
import {ProfilsRoutingModule} from "./profils-routing.module";
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
@NgModule({
    declarations: [
        LogsComponent,
        AdminUserListComponent,
        EditProfileComponent
    ],
    imports: [
        MatSnackBarModule,
        MatSlideToggleModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        MatTableModule,
        MatMenuModule,
        MatChipsModule,
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
        ProfilsRoutingModule,
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


    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
})
export class ProfilsModule { }
