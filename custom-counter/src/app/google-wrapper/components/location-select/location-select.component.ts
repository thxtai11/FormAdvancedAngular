import { Component, OnInit, Input, forwardRef, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

 import { GoogleMapUtility } from '../../utilities/google-map.utility';

//TechDebt: Implement overlay

@Component({
    selector: 'location-select',
    templateUrl: './location-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LocationSelectComponent),
            multi: true,
        }
    ],
})
export class LocationSelectComponent implements OnInit {
    @Input() lang: string = "vi";

    @Input()
    set address(value) {
        this._address$.next(value);
    };

    get address() {
        return this._address$.getValue();
    }

    private _address$: BehaviorSubject<string> = new BehaviorSubject<string>("");
    private _obsers: any[] = [];
    private _onChangeCallback = (value: any) => { };

    form: FormGroup;

    inputLat: number = 0;
    inputLong: number = 0;

    mapLat: number = 0;
    mapLong: number = 0;

    ngControl: NgControl;

    viewControl: any = {
        loading$: new BehaviorSubject<boolean>(false)
    }

    constructor(
        private _googleMapUtil: GoogleMapUtility,
        private _injector: Injector,
    ) {
        this.form = this.generateForm();
    }

    ngOnInit(): void {
        this.bindSubscribes();

        this.initFormControl();
    }

    ngOnDestroy(): void {
        for (let obs of this._obsers) {
            obs.unsubscribe();
        }
    }

    get addressCtrl() { return this.form.get("Address"); }

    writeValue(obj: any): void {
        if (obj) {
            this.onLocationChange(obj);
        }
    }

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void { }

    setDisabledState?(isDisabled: boolean): void { }

    submit(): void {
        this.findByAddress();
    }

    onLocationChange(event) {
        this.mapLat = event.Latitude;
        this.mapLong = event.Longitude;

        this.inputLat = event.Latitude;
        this.inputLong = event.Longitude;

        let location: any = {
            Latitude: event.Latitude,
            Longitude: event.Longitude
        };

        this._onChangeCallback(location);
    }

    private findByAddress() {
        const controls = this.form.controls;

        if (this.form.invalid) {
            Object.keys(controls).forEach(controlName => {
                controls[controlName].markAsTouched();
                controls[controlName].markAsDirty();
            });

            return;
        }

        this.viewControl.loading$.next(true);

         this._googleMapUtil.getLatLngByAddress(this.addressCtrl.value).then(value => {
             this.mapLat = value.Latitude;
             this.mapLong = value.Longitude;
             this.inputLat = value.Latitude;
             this.inputLong = value.Longitude;

             this._onChangeCallback(value);

         }).finally(() => {
             this.viewControl.loading$.next(false);
         });
    }

    private bindSubscribes(): void {
        this._obsers.push(
            this._address$.subscribe(value => {
                this.addressCtrl.setValue(value);
            })
        );
    }

    private generateForm(): FormGroup {
        return new FormGroup({
            Address: new FormControl("", [<any>Validators.required])
        })
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