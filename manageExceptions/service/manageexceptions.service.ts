import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ManageExceptionService {

    //public url = 'rest/';
    public url = 'http://localhost:8080/';
    public constructor(private http: Http) {

    }

    getExceptionEquipments() {
        let endpoint = this.url + 'manageException';
        return this.http.get(endpoint).toPromise().then(res => res.json()).catch(this.handleError);
    }

    getExceptionEquipmentDropdownData(): Promise<any> {
        let endpoint = this.url + 'notlinkedFilter';
        return this.http.get(endpoint).toPromise().then(res => res.json()).catch(this.handleError);
    }

    getSuggestions(spireSerialNumber: any, aaStsId: any, type: string, nucSwapStatus: string): Promise<any> {
        let endpoint = this.url + 'manageExceptionSuggestion';
        let params: URLSearchParams = new URLSearchParams();
        params.set("spireSerialNumber", spireSerialNumber);
        params.set("aaStsId", aaStsId);
        params.set("type", type);
        params.set("nucSwapStatus", nucSwapStatus);
        return this.http.get(endpoint, { search: params }).toPromise().then(res => res.json()).catch(this.handleError);
    }

    unreconcileAARecord(aaStsId: string): Promise<any> {
        let endpoint = this.url + 'invalidate';
        let body = new URLSearchParams();
        body.set('aaStsId', aaStsId);
        return this.http.post(endpoint, body).toPromise().then(res => res.json()).catch(this.handleError);
    }

    manageExceptionSearch(searchRequest: any): Promise<any> {
        let endpoint = this.url + 'manageExcptionSearch';
        let seacrhRequestParams = new URLSearchParams();
        Object.keys(searchRequest).forEach(paramName => {
            if (searchRequest[paramName]) {
                seacrhRequestParams.set(paramName, searchRequest[paramName]);
            }
        });
        return this.http.get(endpoint, { search: seacrhRequestParams }).toPromise().then(res => res.json()).catch(this.handleError);
    }

    reconcileEquipmentOrNucSwap(aaStsId: any, equipmentId: any): Promise<any> {
        let endpoint = this.url + 'manageExceptionReconcile';
        const requestHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        };
        let requestOptions = {
            headers: new Headers(requestHeaders)
        };
        return this.http.post(endpoint, JSON.stringify({ "aaStsId": aaStsId, "equipmentId": equipmentId }), requestOptions).toPromise().then(res => res.json()).catch(this.handleError);
    }

    unreconcileEquipment(aaStsId: any, equipmentId: any, installType: any): Promise<any> {
        let endpoint = this.url + 'manageExceptionUnReconcile';
        let body = new URLSearchParams();
        body.set('aaStsId', aaStsId);
        body.set('eqptOrCustEqptFormId', equipmentId);
        body.set('installType', installType);
        return this.http.post(endpoint, body).toPromise().then(res => res.json()).catch(this.handleError);
    }

   private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}