

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

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, NgControl, Validators } from '@angular/forms';

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
interface BANK{
    name: string;
    id: string;
}
@Component({
    selector: 'single-select',
    templateUrl: './single-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
            this.selectCtrl.markAsTouched();
        else
            this.selectCtrl.markAsUntouched();
    }

    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    @ViewChild('search', { static: true }) search: MatSelectSearchComponent;

    

    protected _data: BANK[] =
    [
        { name: 'Bank A', id: 'A' },
        { name: 'Bank B', id: 'B' },
        { name: 'Bank C', id: 'C' },
        { name: 'Bank D', id: 'D' },
        { name: 'Bank E', id: 'E' },
        { name: 'Bank F', id: 'F' },
        { name: 'Bank G', id: 'G' },
        { name: 'Bank H', id: 'H' },
    
    ];

    private _onChangeCallback: (_: BANK) => void = () => { };

    protected _onDestroy = new Subject<void>();

    matcher: MatSelectErrorStateMatcher;

    selectCtrl: FormControl = new FormControl('', [Validators.required]);
    filterCtrl: FormControl = new FormControl();

    filteredData: ReplaySubject<BANK[]> = new ReplaySubject<BANK[]>(1);

    defaultValue: string;

    ngControl: NgControl;

    constructor(
        private _injector: Injector,
        private _element: ElementRef,
        private _renderer: Renderer) {
    }

    ngOnInit(): void {
       
        // set default value
        this.selectCtrl.setValue(this._data[0]);

        // load the initial bank list
        this.filteredData.next(this._data.slice());
        this.data$.pipe(takeUntil(this._onDestroy))
            .subscribe(value => {
                this._data = value;

                this.filterData();
                this.triggerSelectDefault();
            });

        this.filterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterData();
            });

        this.selectCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(value => {
                if (typeof (value) === 'object') {
                    if (value && this.defaultValue !== value.id) {
                        this.defaultValue = value.id;
                        this._onChangeCallback(value.id);
                        let event = new CustomEvent('change', { bubbles: true });
                        this._renderer.invokeElementMethod(this._element.nativeElement, 'dispatchEvent', [event]);
                    }
                } else {
                    if (value && this.defaultValue !== value) {
                        this.defaultValue = value;
                        this._onChangeCallback(value);
                        let event = new CustomEvent('change', { bubbles: true });
                        this._renderer.invokeElementMethod(this._element.nativeElement, 'dispatchEvent', [event]);
                    }
                }
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
            this.triggerSelectDefault();
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
                this.singleSelect.compareWith = (a: any, b: any) => {
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

    private triggerSelectDefault(): void {
        var selected = this._data.find(x => x.id === this.defaultValue);

        if (selected) {
            this.selectCtrl.setValue(selected);
            this.setInitialValue();
        }
        else {
            this.selectCtrl.setValue(this.defaultValue);
        }
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
}
