import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Injector, Input, Output, EventEmitter, } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroupDirective, NgForm, FormControl, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

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

@Component({
    selector: 'rbp-images-select',
    templateUrl: './images-select.component.html',
    styleUrls: ["./images-select.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImagesSelectComponent),
            multi: true
        }
    ]
})
export class ImagesSelectComponent implements OnInit, ControlValueAccessor {
    @Input() showUpload: boolean = true;
    @Input() limitted: number = -1;

    @Output() onRemoveClick: EventEmitter<number> = new EventEmitter<number>();
    @Output() onUploadClick: EventEmitter<string> = new EventEmitter<string>();

    private _obsers: any[] = [];
    private _onChangeCallback: (_: any) => void = () => { };

    ngControl: NgControl;

    matcher: MatSelectErrorStateMatcher;

    data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    totalItems: number = 0;

    constructor(
        private _injector: Injector, ) {
    }

    ngOnInit(): void {
        this.bindSubscribes();
    }

    ngAfterViewInit(): void {
        this.initFormControl();
    }

    writeValue(obj: any): void {
        if (obj) {
            this.data$.next(obj);
        }
    }

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState?(isDisabled: boolean): void {
    }

    upload(): void {
        this.onUploadClick.emit("0");
    }

    remove(index: number): void {
        this.onRemoveClick.emit(index);
    }

    zoom(): void {
        alert("Zoom click here !!");
    }

    private bindSubscribes(): void {
        this._obsers.push(
            this.data$.subscribe(res => {
                this.totalItems = res.length;
            })
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
