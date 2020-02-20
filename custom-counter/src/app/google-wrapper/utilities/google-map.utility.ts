import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from "../../../environments/environment.prod";

import { TranslateService } from '@ngx-translate/core';

declare var google: any;

@Injectable()
export class GoogleMapUtility {
    private geocoder: any;

    constructor(
        private _http: HttpClient,
        private _translate: TranslateService,
    ) {
    }

    public async getLatLngByAddress(address: string): Promise<any> {
        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }

        return new Promise<any>((resolve, reject) => {
            this.geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    let location: any = {};

                    location.Latitude = results[0].geometry.location.lat();
                    location.Longitude = results[0].geometry.location.lng();
                    resolve(location);
                } else {
                    alert(this._translate.instant("GOOGLE_MAP.FAIL_TO_FIND_ADDRESS"));

                    reject();
                }
            });
        });
    }

    public async getAddressByLatlng(lat: number, lng: number) {
        if (lat !== undefined && lng !== undefined) {
            let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${env.googleKey}`;
            var result = await this._http.get(url).toPromise();

            console.log(result);

            let json = JSON.parse(result.toString());

            if (json.status === "OK" && json.results.length > 0) {
                return json.results[0].formatted_address;
            }
        }

        return "";
    }
}