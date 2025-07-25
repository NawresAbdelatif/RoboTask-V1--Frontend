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
import {MatPaginatorModule} from "@angular/material/paginator";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {OutilsRoutingModule} from "./outils.routing";


@NgModule({
    declarations: [

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
        OutilsRoutingModule,
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
        MatAutocompleteModule

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
})
export class OutilsModule { }
