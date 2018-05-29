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
import { BlockUI } from 'ng-block-ui';
import { ReconciliationComponent } from '../reconciliation.component';
import { ReconciliationService } from '../../services/reconciliation.service';
import { ManageExceptionInvestigate } from './manageexceptionsinvestigate.component';
var ManageExceptionEditForm = (function () {
    function ManageExceptionEditForm(reconComponent, manageExpectionInvestigate, reconService) {
        this.reconComponent = reconComponent;
        this.manageExpectionInvestigate = manageExpectionInvestigate;
        this.reconService = reconService;
        this.disableNUCModel = true;
        this.disableEqpmtModel = true;
        this.disableModemModel = true;
        this.updated = false;
        this.updateError = false;
        this.disableFields = false;
        this.viewOnlyData = {};
        this.viewMode = false;
    }
    ManageExceptionEditForm.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.reconService.loadCtryStateBottler().then(function (res) {
            _this.countryListResponse = res.countries;
            _this.spireTypeList = res.spireUnitTypes;
        }).catch(function (err) {
            console.log("Error Processing loadFormDetails" + err);
        });
    };
    ManageExceptionEditForm.prototype.onNUCMakeChange = function () {
        var _this = this;
        var temp = this.nucManufacturerListResponse;
        var newTemp = {};
        for (var t in temp) {
            newTemp[temp[t]["key"]] = temp[t]["value"];
        }
        JSON.stringify(newTemp);
        this.reconService.getModelByPartManufacturer(this.editData.nucMake, newTemp[this.editData.nucMake]).then(function (res) {
            _this.nucModelResponse = res;
        });
        if (this.editData.nucMake != null && this.editData.nucMake != "") {
            this.disableNUCModel = false;
        }
        else {
            this.disableNUCModel = true;
        }
    };
    ManageExceptionEditForm.prototype.onEquipMakeChange = function () {
        var _this = this;
        var temp = this.manufacturerListResponse;
        var newTemp = {};
        for (var t in temp) {
            newTemp[temp[t]["key"]] = temp[t]["value"];
        }
        JSON.stringify(newTemp);
        this.reconService.getModelByEquipManufacturer(newTemp[this.editData.eqpmtMfgr], this.editData.eqpmtMfgr).then(function (res) {
            _this.equipModelResponse = res;
        });
        if (this.editData.eqpmtMfgr != null && this.editData.eqpmtMfgr != "") {
            this.disableEqpmtModel = false;
        }
        else {
            this.disableEqpmtModel = true;
        }
    };
    ManageExceptionEditForm.prototype.onModemMakeChange = function () {
        var _this = this;
        var temp = this.modemManufacturerListResponse;
        var newTemp = {};
        for (var t in temp) {
            newTemp[temp[t]["key"]] = temp[t]["value"];
        }
        JSON.stringify(newTemp);
        this.reconService.getModelByPartManufacturer(this.editData.modemMake, newTemp[this.editData.modemMake]).then(function (res) {
            _this.modemModelResponse = res;
        });
        if (this.editData.modemMake != null && this.editData.modemMake != "") {
            this.disableModemModel = false;
        }
        else {
            this.disableModemModel = true;
        }
    };
    ManageExceptionEditForm.prototype.backToManageExceptions = function () {
        this.reconComponent.reconTabsReference.selectedItem(2);
        document.documentElement.scrollTop = 0;
    };
    ManageExceptionEditForm.prototype.onCountryChange = function () {
        if (this.countryListResponse != undefined) {
            for (var i = 0; i < this.countryListResponse.length; i++) {
                var country = this.countryListResponse[i];
                if (country.countryName === this.reconComponent.editData.country) {
                    this.stateListResponse = country.states;
                    this.bottlerListResponse = country.bottlingPartners;
                }
            }
        }
        this.disableFields = false;
    };
    ManageExceptionEditForm.prototype.updateForm = function () {
        var _this = this;
        this.updated = false;
        this.updateError = false;
        this.clearData();
        if (this.reconComponent.editData.btlrNm != null && this.reconComponent.editData.btlrNm != ""
            && this.reconComponent.editData.country != null && this.reconComponent.editData.country != ""
            && this.reconComponent.editData.custNm != null && this.reconComponent.editData.custNm != ""
            && this.reconComponent.editData.eqpmtLocDsc != null && this.reconComponent.editData.eqpmtLocDsc != ""
            && this.reconComponent.editData.eqpmtSrlNum != null && this.reconComponent.editData.eqpmtSrlNum != ""
            && this.reconComponent.editData.eqpmtType != null && this.reconComponent.editData.eqpmtType != ""
            && this.reconComponent.editData.nucSerialNum != null && this.reconComponent.editData.nucSerialNum != ""
            && this.reconComponent.editData.modemSerialNum != null && this.reconComponent.editData.modemSerialNum != "") {
            this.editFormPageBlock.start('Loading...');
            var temp = this.countryListResponse;
            var newTemp = {};
            for (var t in temp) {
                newTemp[temp[t]["countryName"]] = temp[t]["countryValue"];
            }
            this.reconComponent.editData.country = newTemp[this.reconComponent.editData.country];
            this.reconService.editForm(this.reconComponent.editData)
                .then(function (res) {
                document.documentElement.scrollTop = 0;
                if (res) {
                    _this.reconComponent.formUpdatedSuccess = true;
                    _this.reconComponent.formUpdatedFail = false;
                    _this.reconComponent.reconTabsReference.selectedItem(2);
                }
                else {
                    _this.reconComponent.formUpdatedFail = true;
                    _this.reconComponent.formUpdatedSuccess = false;
                    _this.reconComponent.reconTabsReference.selectedItem(2);
                }
                _this.editFormPageBlock.stop();
            }).catch(function (err) {
                console.log("Error Processing updateForm" + err);
                _this.updateError = true;
                _this.viewMode = true;
                _this.editFormPageBlock.stop();
            });
        }
        else {
            alert('Please enter all the mandatory fields');
        }
    };
    ManageExceptionEditForm.prototype.setDefaultValueToDisplay = function (input) {
        return (input != null && input != "") ? input : " - ";
    };
    ManageExceptionEditForm.prototype.clearData = function () {
    };
    return ManageExceptionEditForm;
}());
__decorate([
    BlockUI('editFormPage'),
    __metadata("design:type", Object)
], ManageExceptionEditForm.prototype, "editFormPageBlock", void 0);
ManageExceptionEditForm = __decorate([
    Component({
        selector: 'manageExceptionEditForm',
        templateUrl: 'app/reconciliation/manageExceptions/manageexceptioneditform.component.html',
        styleUrls: ['app/reconciliation/reconciliation.component.css']
    }),
    __metadata("design:paramtypes", [ReconciliationComponent,
        ManageExceptionInvestigate,
        ReconciliationService])
], ManageExceptionEditForm);
export { ManageExceptionEditForm };
//# sourceMappingURL=manageexceptioneditform.component.js.map