import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {Enigm1Component} from './enigms/enigm1/enigm1.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataScrollerModule} from 'primeng/components/datascroller/datascroller';
import {EnigmsService} from './enigms/shared/service/enigms.service';
import {ChildrenOutletContexts, RouterModule, Routes} from '@angular/router';
import {ScrollPanelModule} from 'primeng/components/scrollpanel/scrollpanel';
import {CarouselModule} from 'primeng/components/carousel/carousel';
import {GrowlModule} from 'primeng/components/growl/growl';
import {ButtonModule} from 'primeng/components/button/button';
import {DataGridModule} from 'primeng/components/datagrid/datagrid';
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {BasicAuthInterceptor} from './enigms/shared/interceptor/basic-auth.interceptor';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Enigm2Component} from './enigms/enigm2/enigm2.component';
import {Enigm3Component} from './enigms/enigm3/enigm3.component';
import {MenuComponent} from './menu/menu.component';

const appRoutes: Routes = [
  {path: 'enigm1', component: Enigm1Component},
  {path: 'enigm2', component: Enigm2Component},
  {path: 'enigm3', component: Enigm3Component}
];

@NgModule({
  declarations: [
    AppComponent,
    Enigm1Component,
    Enigm2Component,
    Enigm3Component,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(
      appRoutes
    ),
    GrowlModule,
    ScrollPanelModule,
    CarouselModule,
    ButtonModule,
    DataGridModule,
    DataScrollerModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    BrowserModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  exports: [
    MenuComponent,
    Enigm1Component,
    Enigm2Component,
    Enigm3Component
  ],
  providers: [EnigmsService, ChildrenOutletContexts,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

}
