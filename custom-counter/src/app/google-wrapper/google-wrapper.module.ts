 import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { ReactiveFormsModule } from '@angular/forms';
 import { TranslateModule } from '@ngx-translate/core';
 import { AgmCoreModule, AgmMap } from 'agm-core'

 import { MatButtonModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressBarModule, MatProgressBar } from '@angular/material';

 import { GoogleMapUtility } from '../google-wrapper/utilities/google-map.utility';

 import { LocationSelectComponent, MapViewComponent } from './components';

 import { environment as env } from "../../environments/environment.prod";

 //import { PartialsModule } from '../../partials/partials.module';

 @NgModule({
     declarations: [
         LocationSelectComponent,
         MapViewComponent,
         
     ],
     imports: [
         CommonModule,
         ReactiveFormsModule,

         MatButtonModule,
        MatTabsModule,
         MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatProgressBarModule,
         TranslateModule,
         AgmCoreModule.forRoot({ apiKey: env.googleKey }),
    
        MatProgressBarModule

  //       PartialsModule,
     ],
     exports: [
         LocationSelectComponent,
         MapViewComponent,
     ],
     providers: [
         GoogleMapUtility
     ],
 })
 export class GoogleWrapperModuleModule {
 }