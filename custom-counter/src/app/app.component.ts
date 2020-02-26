import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    form: FormGroup = new FormGroup({
        Type: new FormControl([], [<any>Validators.required]),
        Single: new FormControl([], [<any>Validators.required]),
        Tag: new FormControl("", [<any>Validators.required]),
        PhoneList: new FormControl([], [<any>Validators.required]),
        Location: new FormControl([], [<any>Validators.required])
    });



    constructor() { }

    ngOnInit(): void {
    }

    onClick(): void {
        const controls = this.form.controls;

        console.log("alert")
        
        if (this.form.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
           
            return;
        }
        else{
            alert("OK");
        }

        let model: any = {
            Type: this.ctrlType.value,
            Single: this.ctrlSingle.value,
            Tag: this.ctrTag.value,
            PhoneList: this.ctrPhoneList.value,
            Location: this.ctrLocation.value
        }


    }

    get ctrlType() { return this.form.get("Type"); }
    get ctrlSingle() { return this.form.get("Single"); }
    get ctrTag() { return this.form.get("Tag"); }
    get ctrPhoneList() { return this.form.get("PhoneList"); }
    get ctrLocation() { return this.form.get("Location"); }
}