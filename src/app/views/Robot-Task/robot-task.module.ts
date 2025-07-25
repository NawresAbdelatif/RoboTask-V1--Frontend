import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {NgModule} from "@angular/core";
import { SignUpComponent } from './Components/signup/signup.component';
import {MatCardModule} from "@angular/material/card";
import {CommonModule, NgIf} from "@angular/common";
import {RouterLinkWithHref} from "@angular/router";
import { ProjectListComponent } from './Components/Project/project-list/project-list.component';
import { ProjectCreateComponent } from './Components/Project/project-create/project-create.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../../shared/interceptors/token.interceptor";
import { LogsComponent } from './Components/profiles/logs/logs.component';
import { VerifyEmailComponent } from './Components/verify-email/verify-email.component';
import {MatIconModule} from "@angular/material/icon";
import { ActivateComponent } from './Components/activate/activate.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { PieceListComponent } from './Components/pieces/piece-list/piece-list.component';
import { ImagePreviewDialogComponent } from './Components/shared/image-preview-dialog/image-preview-dialog.component';
import { OutilListComponent } from './Components/outils/outil-list/outil-list.component';
import { OutilDialogComponent } from './Components/outils/outil-dialog/outil-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        NgIf,
        CommonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCardModule,
        RouterLinkWithHref,
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,


    ],

    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    declarations: [
      SignUpComponent,
      VerifyEmailComponent,
      ActivateComponent,
      ForgotPasswordComponent,
      ResetPasswordComponent,
      ImagePreviewDialogComponent,
      OutilListComponent,
      OutilDialogComponent,

    ]
})
export class RobotTaskModule { }
