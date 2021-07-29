import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@/_modules/material.module';
import { NotificationModule } from '@_components/notification/notification.module';
import { ConfirmModalModule } from '@_components/confirm-modal/confirm-modal.module';
import { AlertModule } from '@_components/alert/alert.module';
import { BreadcrumbModule } from '@_components/breadcrumb/breadcrumb.module';

import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { HeaderInterceptor } from './_helpers/headers.interceptor';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DirectionsMapDirective } from './_helpers/directions-map.directive';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG  } from 'ng2-currency-mask/src/currency-mask.config';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { IndexComponent } from './layouts/customer/index/index.component';
import { ProductComponent } from './layouts/customer/manager/product/product.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: " đ",
  thousands: "."
};

export function createTranslateLoader(http: HttpClient) {
  // return new TranslateHttpLoader(http, './assets/i18n/example/', '.json');
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/app/', suffix: '.json' },
    { prefix: './assets/i18n/example/', suffix: '.json' },
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DirectionsMapDirective,
    AdminComponent,
    IndexComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NotificationModule,
    ConfirmModalModule,
    AlertModule,
    HttpClientModule,
    BreadcrumbModule,
    //Ng2SearchPipeModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: true } },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
