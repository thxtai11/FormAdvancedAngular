import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  bankModel: { name: string, id: string };
  formGroup: FormGroup;
  bankControl = new FormControl();



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      bank: [null]
    })
  }



  getControl(key: string): AbstractControl {
    return this.formGroup.get(key);
  }
  title = 'custom-counter';

}
