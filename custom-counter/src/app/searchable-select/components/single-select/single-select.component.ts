

import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    OnDestroy,
    ViewChild,
    AfterViewInit,
    forwardRef,
    ElementRef,
    Renderer,
    Injector,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, NgControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { FormControl } from '@angular/forms';

import { ReplaySubject, Subject, Observable } from 'rxjs';

import { MatSelect, ErrorStateMatcher } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';
import { MatSelectSearchComponent } from 'ngx-mat-select-search';

class MatSelectErrorStateMatcher implements ErrorStateMatcher {
    constructor(
        private required: boolean,
    ) { }

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;

        if (this.required) {
            return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
        }
        return false;
    }
}
interface BANK {
    name: string;
    id: string;
}
export const BANKSS: BANK[] = [
    { name: 'Bank A (Switzerland)', id: 'A' },
    { name: 'Bank B (Switzerland)', id: 'B' },
    { name: 'Bank C (France)', id: 'C' },
    { name: 'Bank D (France)', id: 'D' },
    { name: 'Bank E (France)', id: 'E' },
    { name: 'Bank F (Italy)', id: 'F' },
    { name: 'Bank G (Italy)', id: 'G' },
    { name: 'Bank H (Italy)', id: 'H' },
    { name: 'Bank I (Italy)', id: 'I' },
    { name: 'Bank J (Italy)', id: 'J' },
    { name: 'Bank Kolombia (United States of America)', id: 'K' },
    { name: 'Bank L (Germany)', id: 'L' },
    { name: 'Bank M (Germany)', id: 'M' },
    { name: 'Bank N (Germany)', id: 'N' },
    { name: 'Bank O (Germany)', id: 'O' },
    { name: 'Bank P (Germany)', id: 'P' },
    { name: 'Bank Q (Germany)', id: 'Q' },
    { name: 'Bank R (Germany)', id: 'R' }
];
@Component({
    selector: 'single-select',
    templateUrl: './single-select.component.html',
   // changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SingleSelectComponent),
            multi: true
        }
    ]
})



export class SingleSelectComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
    @Input() data$: Observable<any[]> = new Observable<any[]>();
    @Input() required: boolean = false;
    @Input() hasNullOption: boolean = false;

    @Input() set touched(value: boolean) {
        if (value)
            this.bankForm.markAsTouched();
        else
            this.bankForm.markAsUntouched();
    }

    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    @ViewChild('search', { static: true }) search: MatSelectSearchComponent;


    public _data: BANK[] = BANKSS;



    private _onChangeCallback: (_: BANK) => void = () => { };

    protected _onDestroy = new Subject<void>();

    matcher: MatSelectErrorStateMatcher;

    // bankForm: FormControl = new FormControl('', [Validators.required]);
    filterCtrl: FormControl = new FormControl();

    filteredData: ReplaySubject<BANK[]> = new ReplaySubject<BANK[]>(1);

    defaultValue: any;

    ngControl: NgControl;

    bankForm: FormGroup;



    constructor(
        private _injector: Injector,
        private _element: ElementRef,
        private _renderer: Renderer,
        private fb: FormBuilder) {

    }

    ngOnInit(): void {

        // set default value
        //  this.bankForm.setValue(this._data[0]);

        // load the initial bank list
        // this.filteredData.next(this._data.slice());
        this.data$.pipe(takeUntil(this._onDestroy))
            .subscribe(value => {
                this._data = value;

                this.filterData();
            //    this.triggerSelectDefault();
            });

        this.filterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterData();
            });
        this.matcher = new MatSelectErrorStateMatcher(this.required);

        this.initFormControl();
    }



    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    ngAfterViewInit(): void {
        this.setInitialValue();
    }

    writeValue(obj: string): void {
        if (this.defaultValue !== obj) {
            this.defaultValue = obj;
      //      this.triggerSelectDefault();
        }
    }

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {

    }

    setDisabledState?(isDisabled: boolean): void {

    }

    private setInitialValue(): void {
        this.filteredData
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(() => {
                this.singleSelect.compareWith = (a: BANK, b: BANK) => {
                    return a && b && a.id === b.id;
                };
            });
    }



    private filterData(): void {
        if (!this._data) {
            return;
        }

        let search = this.filterCtrl.value;

        if (!search) {
            this.filteredData.next(this._data.slice());
            return;
        } else {
            search = search.toLowerCase();
        }

        this.filteredData.next(
            this._data.filter(entity => entity.name.toLowerCase().indexOf(search) > -1 || entity.id.toString().toLowerCase().indexOf(search) > -1)
        );
    }


    private initFormControl(): void {
        try {
            const ngControl = this._injector.get(NgControl);

            if (ngControl) {
                this.ngControl = ngControl;
            }
        } catch (error) {
            console.log("FormControl or ngModel required");
        }
    }

    // onFormSubmit(): void {
    //     console.log('ID:' + this.bankForm.get('id').value);
    // }
}
