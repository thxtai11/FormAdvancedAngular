import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// import { ResourceModel } from 'gn-core-central';

@Component({
    selector: 'rbp-images-list',
    templateUrl: './images-list.component.html',
    styleUrls: ['./images-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesListComponent implements OnInit {
    // @Input()
    // set data(value) {
    //     this._data$.next(value);
    // };

    // get data() {
    //     return this._data$.getValue();
    // }

   // private _data$: BehaviorSubject<ResourceModel[]> = new BehaviorSubject<ResourceModel[]>([]);

    constructor() { }

    ngOnInit(): void { }

    zoom(): void {
        alert("Zoom click here!!!");
    }
}
