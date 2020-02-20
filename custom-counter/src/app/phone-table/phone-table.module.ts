import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule
} from '@angular/material';

//import { TranslateModule } from '@ngx-translate/core';
import { MdePopoverModule } from '@material-extended/mde';

import { PhoneTableInputComponent, PhoneTableComponent } from './components';
import { ParserError } from '@angular/compiler';

//import { PartialsModule } from '../../partials/partials.module';

@NgModule({
    declarations: [
        PhoneTableInputComponent,
        PhoneTableComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

      //  PartialsModule,

        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatTableModule,
        MatCardModule,

        MdePopoverModule,
        ParserError

   //     TranslateModule,
    ],
    exports: [
        PhoneTableInputComponent,
        PhoneTableComponent,
    ],
    providers: [],
})
export class PhoneTableModule { }