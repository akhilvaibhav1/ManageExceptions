var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ManageExceptionInvestigate } from './manageexceptionsinvestigate.component';
import { ManageExceptionService } from './service/manageexceptions.service';
import { ManageExceptions } from './manageexceptions.component';
import { ReconciliationComponent } from '../reconciliation.component';
import { BlockUI } from 'ng-block-ui';
var ManageExceptionsInvalidate = (function () {
    function ManageExceptionsInvalidate(mneInvestigate, manageExceptionService, manageExceptions, reconComponent) {
        this.mneInvestigate = mneInvestigate;
        this.manageExceptionService = manageExceptionService;
        this.manageExceptions = manageExceptions;
        this.reconComponent = reconComponent;
    }
    ManageExceptionsInvalidate.prototype.ngOnInit = function () {
        document.documentElement.scrollTop = 0;
        this.aaRequest = this.mneInvestigate.investigatedSpireEquipmentDetail;
    };
    ManageExceptionsInvalidate.prototype.backToInvestigate = function () {
        this.mneInvestigate.aaInvalidConfirmationPage = false;
        this.reconComponent.showInvestigate = true;
        document.documentElement.scrollTop = 0;
    };
    ManageExceptionsInvalidate.prototype.invalidateAARequest = function () {
        var _this = this;
        this.manageExceptionInvalidPage.start("Loading...");
        this.manageExceptionService.unreconcileAARecord(this.aaRequest.aaStsId).then(function (res) {
            if (res === true) {
                _this.manageExceptions.aaRequestInvalidSuccess = true;
                _this.manageExceptions.aaRequestInvalidFailed = false;
            }
            else {
                _this.manageExceptions.aaRequestInvalidSuccess = false;
                _this.manageExceptions.aaRequestInvalidFailed = true;
            }
            _this.manageExceptionInvalidPage.stop();
            _this.reconComponent.showManageException = true;
            document.documentElement.scrollTop = 0;
            _this.manageExceptions.reloadManageExceptions();
        }).catch(function (err) {
            console.log("Error Processing unreconcileAARecord" + err);
            _this.manageExceptionInvalidPage.stop();
            _this.reconComponent.showManageException = true;
            document.documentElement.scrollTop = 0;
            _this.manageExceptions.reloadManageExceptions();
        });
    };
    return ManageExceptionsInvalidate;
}());
__decorate([
    BlockUI('manageExceptionInvalidPage'),
    __metadata("design:type", Object)
], ManageExceptionsInvalidate.prototype, "manageExceptionInvalidPage", void 0);
ManageExceptionsInvalidate = __decorate([
    Component({
        selector: 'aaInvalidateConfirm',
        templateUrl: 'app/reconciliation/manageExceptions/manageexceptionsinvalidate.component.html',
        styleUrls: ['app/reconciliation/reconciliation.component.css']
    }),
    __metadata("design:paramtypes", [ManageExceptionInvestigate,
        ManageExceptionService,
        ManageExceptions,
        ReconciliationComponent])
], ManageExceptionsInvalidate);
export { ManageExceptionsInvalidate };
//# sourceMappingURL=manageexceptionsinvalidate.component.js.map