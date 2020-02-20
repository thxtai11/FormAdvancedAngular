import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, ViewChild, ElementRef, Renderer, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor, FormGroupDirective, NgForm, Validators, NgControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import{ ErrorStateMatcher} from '@angular/material/core'
import { MatSelectSearchComponent } from 'ngx-mat-select-search';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

class MatSelectErrorStateMatcher {
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

export interface Bank {
    id: string;
    name: string;
  }
  
  export interface BankGroup {
    name: string;
    banks: Bank[];
  }
  
  
  /** list of banks */
  export const BANKS: Bank[] = [
    {name: 'Bank A (Switzerland)', id: 'A'},
    {name: 'Bank B (Switzerland)', id: 'B'},
    {name: 'Bank C (France)', id: 'C'},
    {name: 'Bank D (France)', id: 'D'},
    {name: 'Bank E (France)', id: 'E'},
    {name: 'Bank F (Italy)', id: 'F'},
    {name: 'Bank G (Italy)', id: 'G'},
    {name: 'Bank H (Italy)', id: 'H'},
    {name: 'Bank I (Italy)', id: 'I'},
    {name: 'Bank J (Italy)', id: 'J'},
    {name: 'Bank Kolombia (United States of America)', id: 'K'},
    {name: 'Bank L (Germany)', id: 'L'},
    {name: 'Bank M (Germany)', id: 'M'},
    {name: 'Bank N (Germany)', id: 'N'},
    {name: 'Bank O (Germany)', id: 'O'},
    {name: 'Bank P (Germany)', id: 'P'},
    {name: 'Bank Q (Germany)', id: 'Q'},
    {name: 'Bank R (Germany)', id: 'R'}
  ];
  
  /** list of bank groups */
  export const BANKGROUPS: BankGroup[] = [
    {
      name: 'Switzerland',
      banks: [
        {name: 'Bank A', id: 'A'},
        {name: 'Bank B', id: 'B'}
      ]
    },
    {
      name: 'France',
      banks: [
        {name: 'Bank C', id: 'C'},
        {name: 'Bank D', id: 'D'},
        {name: 'Bank E', id: 'E'},
      ]
    },
    {
      name: 'Italy',
      banks: [
        {name: 'Bank F', id: 'F'},
        {name: 'Bank G', id: 'G'},
        {name: 'Bank H', id: 'H'},
        {name: 'Bank I', id: 'I'},
        {name: 'Bank J', id: 'J'},
      ]
    },
    {
      name: 'United States of America',
      banks: [
        {name: 'Bank Kolombia', id: 'K'},
      ]
    },
    {
      name: 'Germany',
      banks: [
        {name: 'Bank L', id: 'L'},
        {name: 'Bank M', id: 'M'},
        {name: 'Bank N', id: 'N'},
        {name: 'Bank O', id: 'O'},
        {name: 'Bank P', id: 'P'},
        {name: 'Bank Q', id: 'Q'},
        {name: 'Bank R', id: 'R'}
      ]
    }
  ];
  
@Component({
    selector: 'multi-select',
    templateUrl: './multi-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent),
            multi: true
        }
    ]
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
    @Input() data$: Observable<any[]> = new Observable<any[]>();

    @Input() required: boolean = false;

    @ViewChild('multiSelect', { static: true }) mutilSelect: MatSelect;
    @ViewChild('search', { static: true }) search: MatSelectSearchComponent;

    private _data: Bank[] = BANKS;

    private _onChangeCallback: (_: any) => void = () => { };

    protected _onDestroy = new Subject<void>();

    selectCtrl: FormControl = new FormControl('', [Validators.required]);
    filterCtrl: FormControl = new FormControl();

    matcher: MatSelectErrorStateMatcher;

    filteredData: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

    defaultValue: string[] = [];

    ngControl: NgControl;

    constructor(
        private _injector: Injector,
        private _element: ElementRef,
        private _renderer: Renderer) {
    }

    ngOnInit(): void {
        this.selectCtrl.setValue([this._data[0], this._data[2], this._data[12]]);

        // load the initial bank list
        this.filteredData.next(this._data.slice());
    
        this.data$.pipe(takeUntil(this._onDestroy))
            .subscribe(value => {
                this._data = value;

                this.filterData();

                var selected = this._data.filter(x => this.defaultValue.includes(x.id));

                if (selected.length > 0) {
                    this.selectCtrl.setValue(selected);
                    this.setInitialValue();
                }
            });

        this.filterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterData();
            });

        this.selectCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(value => {
                this.defaultValue = value.map(x => x.id);
                this._onChangeCallback(value.map(x => x.id));
                let event = new CustomEvent('change', { bubbles: true });
                this._renderer.invokeElementMethod(this._element.nativeElement, 'dispatchEvent', [event]);
            });

        this.matcher = new MatSelectErrorStateMatcher(this.required);

        this.initFormControl();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    writeValue(obj: string[]): void {
        if (obj && obj.length > 0) {
            this.defaultValue = obj;

            var selected = this._data.filter(x => this.defaultValue.includes(x.id));

            if (selected.length > 0) {
                this.selectCtrl.setValue(selected);
                this.setInitialValue();
            }
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
                this.mutilSelect.compareWith = (a: Bank, b: Bank) => {
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
}
