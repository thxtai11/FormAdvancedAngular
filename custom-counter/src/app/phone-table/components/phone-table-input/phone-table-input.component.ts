import { Component, OnInit, forwardRef, Input, ViewChildren, QueryList, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators, NgControl } from '@angular/forms';

// import {
//     PhoneModel,
//     //  DictionaryType,
// } from 'gn-core-central';

//  import { LanguagePipe } from '../../../../../core/core.module';

import { MdePopoverTrigger } from '@material-extended/mde';
import { of } from 'rxjs';

export interface PhoneModel {
    PhoneNumber: string;
    Description: string;
    Type: string;
}

export interface DictionaryType {
    id: number;
    select: string;
}
@Component({
    selector: 'phone-table-input',
    templateUrl: './phone-table-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PhoneTableInputComponent),
            multi: true,
        }
    ]
})
export class PhoneTableInputComponent implements OnInit, ControlValueAccessor {
    @Input() lang: string = "vi";

    @ViewChildren(MdePopoverTrigger) formPopover: QueryList<MdePopoverTrigger>;

    private _onChangeCallback: (_: any) => void = () => { };

    curValue: PhoneModel[] = [];
    phones: any[] = [];
    ngControl: FormControl;
    displayedColumns = ["PhoneNumber", "Type", "Description", "Actions"];

    phoneTypeArray = [
        { 'id': '1', 'name': 'Phone' },
        { 'id': '2', 'name': 'Mobile' },
        { 'id': '3', 'name': 'Uri' }
    ];

    form: FormGroup;

    constructor(public injector: Injector) {
        this.form = this.generateForm();
    }

    ngOnInit(): void {
        this.initFormControl();
     }

    writeValue(obj: any): void {
        if (obj) {
            this.curValue = obj as PhoneModel[];

            this.phones = this.parsePhoneModel(this.curValue);
        }
    }

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void { }

    delete(index: number): void {
        this.curValue.splice(index, 1);

        this.triggerControlOnChange();
    }

    close(): void {
        this.clearForm();
    }

    update(phone: any, index: number): void {
        this.setForm(phone, index);
    }

    submit(method: string): void {


        const controls = this.form.controls;

        if (this.form.invalid || this.form.value.index > 5) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );

            return;
        }

        let phone = this.parseForm();

        if (method === 'insert') {
            if (this.form.value.Index > -1 && this.form.value.Index < 5) {
                this.curValue.push(phone);

            }
            else {
                console.log('failed');
            }

            this.closePopover(0);

        }
        // else {
        //     this.curValue[phone.Index] = phone;

        //     this.closePopover(1);
        // }


        this.triggerControlOnChange();
        this.clearForm();

        this.form.patchValue(
            {
                Index: ++phone.Index,
                PhoneNumber: phone.PhoneNumber,
                Type: phone.Type,
                Description: phone.Description
            }
        );

        console.log(this.form.value);

    }

    private triggerControlOnChange(): void {
        this._onChangeCallback(this.curValue);
        this.phones = this.parsePhoneModel(this.curValue);
    }

    private closePopover(index: number) {
        let pop = this.formPopover.toArray()[index];

        if (pop)
            pop.closePopover();
    }

    private parsePhoneModel(phones: PhoneModel[]): any[] {
        return phones.map(x => {
            return {
                PhoneNumber: x.PhoneNumber,
                Description: x.Description,
                Type: x.Type
            }
        });
    }

    private clearForm(): void {
        this.form.reset();
    }

    private setForm(phone: any, index: number): void {
        this.form.controls["Index"].setValue(index);
        this.form.controls["PhoneNumber"].setValue(phone.PhoneNumber);
        this.form.controls["Type"].setValue(phone.Type);
        this.form.controls["Description"].setValue(phone.Description);
    }

    private parseForm(): any {
        let phone: any = {};

        phone.Index = this.form.controls["Index"].value;
        phone.PhoneNumber = this.form.controls["PhoneNumber"].value;
        phone.Type = this.form.controls["Type"].value;
        phone.Description = this.form.controls["Description"].value;


        return phone;
    }

    private generateForm(): FormGroup {
        return new FormGroup({
            Index: new FormControl('0'),
            PhoneNumber: new FormControl("", [<any>Validators.required, Validators.maxLength(10)]),
            Type: new FormControl("", [<any>Validators.required]),
            Description: new FormControl(""),

        });




    }

    private initFormControl(): void {
        try {
            const ngControl = this.injector.get(NgControl);

            if (ngControl) {
                this.ngControl = ngControl;
            }
        } catch (error) {
            console.log("FormControl or ngModel required");
        }
    }

    //#region Form

    get PhoneNumber() { return this.form.get('PhoneNumber'); }

    get Type() { return this.form.get('Type'); }

    get Description() { return this.form.get('Description'); }

    //#endregion
}
