import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

import {
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
  
    
} from '@angular/material';

//import { TranslateModule } from '@ngx-translate/core';

import { MultiSelectComponent, SingleSelectComponent, TagsComponent } from './components';
import { ParserError } from '@angular/compiler';

@NgModule({
    declarations: [
        MultiSelectComponent,
        SingleSelectComponent,
        TagsComponent,
       
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatIconModule,
     
        NgxMatSelectSearchModule,
        ParserError

    //    TranslateModule,
    ],
    exports: [
        MultiSelectComponent,
        SingleSelectComponent,
        TagsComponent,
    ],
})
export class SearchableSelectModule {

}

export * from "./components";