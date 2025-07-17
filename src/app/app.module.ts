import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// import { GestureConfig } from '@angular/material/core';
import { 
  PerfectScrollbarModule, 
  PERFECT_SCROLLBAR_CONFIG, 
  PerfectScrollbarConfigInterface
} from './shared/components/perfect-scrollbar';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';

import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { RobotTaskComponent } from './views/Robot-Task/robot-task.component';
import { UserComponent } from './views/Robot-Task/Components/signin/signin.component';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SignUpComponent} from "./views/Robot-Task/Components/signup/signup.component";
import {ProjectListComponent} from "./views/Robot-Task/Components/Project/project-list/project-list.component";

import { MatTooltipModule } from '@angular/material/tooltip';
import {CommonModule} from "@angular/common";
import {ActivateComponent} from "./views/Robot-Task/Components/activate/activate.component";
import {ForgotPasswordComponent} from "./views/Robot-Task/Components/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./views/Robot-Task/Components/reset-password/reset-password.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        HttpClientModule,
        MatTooltipModule,
    PerfectScrollbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
        RouterModule.forRoot(rootRouterConfig, {useHash: false, relativeLinkResolution: 'legacy'}),
        FlexModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        CommonModule,
        MatIconModule,
        MatSnackBarModule,
],
  declarations: [AppComponent, RobotTaskComponent, UserComponent,SignUpComponent,ActivateComponent,ForgotPasswordComponent,ResetPasswordComponent],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    // { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    // REQUIRED IF YOU USE JWT AUTHENTICATION

    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
