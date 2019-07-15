import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpConfigInterceptor } from './httpconfig.interceptor';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CustomTypeaheadDirective } from './directives/custom-typeahead.directive';
import { SearchFeedComponent } from './components/search-feed/search-feed.component';
import { FlightComponent } from './components/flight/flight.component';
import { StateService } from './services/state.service';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CustomTypeaheadDirective,
    SearchFeedComponent,
    FlightComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent, pathMatch: 'full' },
      {path:'search',component:SearchFeedComponent},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
   
    BrowserAnimationsModule,
   
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    
    
   
   
    

   
    
   
  ],
  providers: [
    DatePipe,
    StateService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpConfigInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
