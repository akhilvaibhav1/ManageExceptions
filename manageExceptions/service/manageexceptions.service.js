var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var ManageExceptionService = (function () {
    function ManageExceptionService(http) {
        this.http = http;
        this.url = 'http://localhost:8080/';
    }
    ManageExceptionService.prototype.getExceptionEquipments = function () {
        var endpoint = this.url + 'manageException';
        return this.http.get(endpoint).toPromise().then(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageExceptionService.prototype.getExceptionEquipmentDropdownData = function () {
        var endpoint = this.url + 'notlinkedFilter';
        return this.http.get(endpoint).toPromise().then(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageExceptionService.prototype.getSuggestions = function (spireSerialNumber, aaStsId, type, nucSwapStatus) {
        var endpoint = this.url + 'manageExceptionSuggestion';
        var params = new URLSearchParams();
        params.set("spireSerialNumber", spireSerialNumber);
        params.set("aaStsId", aaStsId);
        params.set("type", type);
        params.set("nucSwapStatus", nucSwapStatus);
        return this.http.get(endpoint, { search: params }).toPromise().then(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageExceptionService.prototype.unreconcileAARecord = function (aaStsId) {
        var endpoint = this.url + 'invalidate';
        var body = new URLSearchParams();
        body.set('aaStsId', aaStsId);
        return this.http.post(endpoint, body).toPromise().then(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageExceptionService.prototype.manageExceptionSearch = function (searchRequest) {
        var endpoint = this.url + 'manageExcptionSearch';
        var seacrhRequestParams = new URLSearchParams();
        Object.keys(searchRequest).forEach(function (paramName) {
            if (searchRequest[paramName]) {
                seacrhRequestParams.set(paramName, searchRequest[paramName]);
            }
        });
        return this.http.get(endpoint, { search: seacrhRequestParams }).toPromise().then(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageExceptionService.prototype.reconcileEquipmentOrNucSwap = function (aaStsId, equipmentId) {
        var endpoint = this.url + 'manageExceptionReconcile';
        var requestHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        };
        var requestOptions = {
            headers: new Headers(requestHeaders)
        };
        return this.http.post(endpoint, JSON.stringify({ "aaStsId": aaStsId, "equipmentId": equipmentId }), requestOptions).toPromise().then(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageExceptionService.prototype.unreconcileEquipment = function (aaStsId, equipmentId, installType) {
        var endpoint = this.url + 'manageExceptionUnReconcile';
        var body = new URLSearchParams();
        body.set('aaStsId', aaStsId);
        body.set('eqptOrCustEqptFormId', equipmentId);
        body.set('installType', installType);
        return this.http.post(endpoint, body).toPromise().then(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageExceptionService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return ManageExceptionService;
}());
ManageExceptionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ManageExceptionService);
export { ManageExceptionService };
//# sourceMappingURL=manageexceptions.service.js.map