import { Component, OnInit, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { ResourceModel } from 'gn-core-central';

@Component({
    selector: 'rbp-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
   // @Input()
    // set model(value) {
    //     if (value)
    //    //     this._model$.next(value);
    // }

    // get model() {
    //     //return this._model$.getValue();
    // }

 //   private _model$: BehaviorSubject<ResourceModel> = new BehaviorSubject<ResourceModel>(null);

    constructor() { }

    ngOnInit(): void { }
}
