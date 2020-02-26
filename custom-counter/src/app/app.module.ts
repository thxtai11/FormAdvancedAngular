import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectComponent, SingleSelectComponent, TagsComponent } from './searchable-select/components';
import { MdePopoverModule } from '@material-extended/mde';
import { MatFormFieldModule, ErrorStateMatcher, MatInputModule, MatSelectModule, MatChipsModule, MatAutocompleteModule, MatIconModule, MatTable, MatTableModule, MatCardModule, MatProgressBar, MatProgressBarModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PhoneTableComponent, PhoneTableInputComponent } from './phone-table/components';
import { ParserError } from '@angular/compiler';
import { MapViewComponent, LocationSelectComponent } from './google-wrapper/components';
import { AgmMap, AgmMarker, AgmCoreModule } from "agm-core";
import { AgmGeocoder } from '@agm/core';
import { GoogleMapUtility } from './google-wrapper/utilities';
import { environment as env } from ".././environments/environment.prod";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService, TranslateStore, TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    MultiSelectComponent,
    SingleSelectComponent,
    TagsComponent,
    PhoneTableComponent,
    PhoneTableInputComponent,
    MapViewComponent,
    LocationSelectComponent,
   

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MdePopoverModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatProgressBarModule,
    AgmCoreModule.forRoot({ apiKey: env.googleKey }),
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClientModule],
        
      }
    }),
    
  ],
  providers: [
    GoogleMapUtility,
    TranslateService,
    TranslateStore,
   
],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) { 
  return new TranslateHttpLoader(http, './assets/my-other-path/i18n/', '.json'); 
} 

