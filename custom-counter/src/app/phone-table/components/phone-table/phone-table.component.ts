import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DictionaryType } from '../dictionary-type';


@Component({
    selector: 'phone-table',
    templateUrl: './phone-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneTableComponent implements OnInit {
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
