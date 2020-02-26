import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DictionaryType } from '../dictionary-type';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'phone-table',
    templateUrl: './phone-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneTableComponent implements OnInit {

    Index= new FormControl('');
    PhoneNumber= new FormControl('');
    Type=new FormControl('');
    Description=new FormControl('');





    @Input() lang: string = "vi";
    @Input("data") data: any[] = [];

    displayedColumns = ["PhoneNumber", "Type", "Description"];
    //  phoneTypeArray: DictionaryType = {
    //      Phone: 1,
    //      Mobile: 2,
    //      Uri: 3
    //  }

    constructor() {
    }

    ngOnInit(): void { }
}
