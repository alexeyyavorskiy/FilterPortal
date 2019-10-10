import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {NgbDateParserFormatter, NgbDatepickerI18n, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './pages/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatSliderModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';
import {DataService} from "./share/data.service";
import {HttpModule} from "@angular/http";
import {GlobalService} from "./core/global.service";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {EditNetworkComponent} from './pages/edit-network/edit-network.component';
import {EventHistoryComponent} from './pages/event-history/event-history.component';
import {ParameterListComponent} from './pages/parameter-list/parameter-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsideComponent} from './components/aside/aside.component';
import {LoginFormComponent} from './pages/login/login-form/login-form.component';
import {LocalizationService} from "./share/localization.service";
import {TranslateModule, TranslateService} from "ng2-translate";
import {ContactComponent} from './pages/contact/contact.component';
import {AsideNavComponent} from './components/aside/aside-nav/aside-nav.component';
import {PageWrapperComponent} from './components/page-wrapper/page-wrapper.component';
import {PageContentComponent} from './components/page-content/page-content.component';
import {NgbdModalContentComponent} from './components/modal/modal.component';
import {ObjectValueComponent} from './components/object-value/object-value.component';
import {ObjectListComponent} from './components/object-list/object-list.component';
import {FilterComponent} from './components/filter/filter.component';
import {AuthService} from "./share/auth.service";
import {GasFilterComponent} from './components/gas-filter/gas-filter.component';
import {AuthGuard, LoginGuard} from './auth.guard';
import {DashboardBlockComponent} from './components/dashboard-block/dashboard-block.component';
import {TitleComponentComponent} from './components/title-component/title-component.component';
import {StatusComponent} from './components/status/status.component';
import {DiagramBlockComponent} from './components/diagram-block/diagram-block.component';
import {RangeComponent} from './components/range/range.component';
import {ErrorComponent} from './pages/error/error.component';
import {CustomDateParserFormatter} from './components/i18-datepicker/dateFormater';
import 'hammerjs';
import {EmitterService} from "./share/emitter.service";
import {ParameterListBlockComponent} from './components/parameter-list-block/parameter-list-block.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ChartComponent} from './components/chart/chart.component';
import {SqueezeBoxModule} from 'squeezebox';
import {EventItemComponent} from './components/event-item/event-item.component';
import {configServiceFactory} from "./share/config.service.factory";
import {I18DatepickerComponent} from './components/i18-datepicker/i18-datepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    EditNetworkComponent,
    EventHistoryComponent,
    ParameterListComponent,
    AsideComponent,
    LoginFormComponent,
    AsideNavComponent,
    LoginFormComponent,
    ContactComponent,
    PageWrapperComponent,
    PageContentComponent,
    ContactComponent,
    NgbdModalContentComponent,
    ObjectValueComponent,
    ObjectListComponent,
    FilterComponent,
    DashboardBlockComponent,
    TitleComponentComponent,
    GasFilterComponent,
    StatusComponent,
    DiagramBlockComponent,
    RangeComponent,
    ErrorComponent,
    ParameterListBlockComponent,
    ChartComponent,
    EventItemComponent,
    I18DatepickerComponent,

  ],

  entryComponents: [
    NgbdModalContentComponent
  ],

  imports: [
    NgxChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    NgbModule.forRoot(),
    SqueezeBoxModule
  ],
  providers: [DataService, GlobalService, EmitterService, TranslateService, LocalizationService, AuthService, LoginGuard, AuthGuard, {
    provide: NgbDateParserFormatter,
    useClass: CustomDateParserFormatter
  },
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [DataService],
      multi: true
    },
    {
      provide: NgbDatepickerI18n,
      useClass: I18DatepickerComponent
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
