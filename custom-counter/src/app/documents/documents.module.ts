import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import {
    ImagesSelectComponent, ImagesListComponent, ImageComponent,
} from "./components/index";

@NgModule({
    declarations: [
        ImagesSelectComponent,
        ImagesListComponent,
        ImageComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    exports: [
        ImagesSelectComponent,
        ImagesListComponent,
        ImageComponent,
    ],
    providers: [

    ],
})
export class DocumentsModule { }