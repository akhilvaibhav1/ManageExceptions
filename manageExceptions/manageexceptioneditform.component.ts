import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ReconciliationComponent } from '../reconciliation.component';
import { ReconciliationService } from '../../services/reconciliation.service';
import { ManageExceptionInvestigate } from './manageexceptionsinvestigate.component';


@Component({
    selector: 'manageExceptionEditForm',
    templateUrl: 'app/reconciliation/manageExceptions/manageexceptioneditform.component.html',
    styleUrls: ['app/reconciliation/reconciliation.component.css']
})

export class ManageExceptionEditForm implements AfterViewInit {

    @BlockUI('editFormPage') editFormPageBlock: NgBlockUI;
    editData: any;
    bottlerListResponse: any;
    countryListResponse: any;
    stateListResponse: any;
    nucManufacturerListResponse: any;
    modemManufacturerListResponse: any;
    manufacturerListResponse: any;
    modemCarrierResponse: any;
    disableNUCModel: boolean = true;
    disableEqpmtModel: boolean = true;
    nucModelResponse: any;
    equipModelResponse: any;
    modemModelResponse: any;
    spireTypeList: any;
    disableModemModel: boolean = true;
    updated: boolean = false;
    updateError: boolean = false;
    disableFields: boolean = false;
    viewOnlyData: any = {};
    viewMode: boolean = false;

    constructor(private reconComponent: ReconciliationComponent,
        private manageExpectionInvestigate: ManageExceptionInvestigate,
        private reconService: ReconciliationService) {

    }

    ngAfterViewInit() {
        //this.disableFields = true;
        this.reconService.loadCtryStateBottler().then(res => {
            this.countryListResponse = res.countries;
            this.spireTypeList = res.spireUnitTypes;
        }).catch((err) => {
            console.log("Error Processing loadFormDetails" + err);
        });
    }

    onNUCMakeChange() {
        var temp = this.nucManufacturerListResponse;
        var newTemp = {};
        for (var t in temp) {
            newTemp[temp[t]["key"]] = temp[t]["value"]
        }
        JSON.stringify(newTemp);
        this.reconService.getModelByPartManufacturer(this.editData.nucMake, newTemp[this.editData.nucMake]).then(res => {
            this.nucModelResponse = res;
        });
        if (this.editData.nucMake != null && this.editData.nucMake != "") {
            this.disableNUCModel = false;
        }
        else {
            this.disableNUCModel = true;
        }
    }

    onEquipMakeChange() {
        var temp = this.manufacturerListResponse;
        var newTemp = {};
        for (var t in temp) {
            newTemp[temp[t]["key"]] = temp[t]["value"]
        }
        JSON.stringify(newTemp);
        this.reconService.getModelByEquipManufacturer(newTemp[this.editData.eqpmtMfgr],
            this.editData.eqpmtMfgr).then(res => {
                this.equipModelResponse = res;
            });
        if (this.editData.eqpmtMfgr != null && this.editData.eqpmtMfgr != "") {
            this.disableEqpmtModel = false;
        }
        else {
            this.disableEqpmtModel = true;
        }
    }

    onModemMakeChange() {
        var temp = this.modemManufacturerListResponse;
        var newTemp = {};
        for (var t in temp) {
            newTemp[temp[t]["key"]] = temp[t]["value"]
        }
        JSON.stringify(newTemp);
        this.reconService.getModelByPartManufacturer(this.editData.modemMake, newTemp[this.editData.modemMake]).then(res => {
            this.modemModelResponse = res;
        });
        if (this.editData.modemMake != null && this.editData.modemMake != "") {
            this.disableModemModel = false;
        }
        else {
            this.disableModemModel = true;
        }
    }

    backToManageExceptions() {
        this.reconComponent.reconTabsReference.selectedItem(2);
        document.documentElement.scrollTop = 0;
    }

    onCountryChange() {
        if (this.countryListResponse != undefined) {
            for (let i = 0; i < this.countryListResponse.length; i++) {
                let country = this.countryListResponse[i];
                if (country.countryName === this.reconComponent.editData.country) {
                    this.stateListResponse = country.states;
                    this.bottlerListResponse = country.bottlingPartners;
                }
            }
        }
        this.disableFields = false;
    }

    updateForm() {
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
            //this.blockUI.start('Loading...');
            this.editFormPageBlock.start('Loading...');
            var temp = this.countryListResponse;
            var newTemp = {};
            for (var t in temp) {
                newTemp[temp[t]["countryName"]] = temp[t]["countryValue"]
            }
            //JSON.stringify(newTemp);
            this.reconComponent.editData.country = newTemp[this.reconComponent.editData.country];
            this.reconService.editForm(this.reconComponent.editData)
                .then(res => {
                    document.documentElement.scrollTop = 0;
                    if (res) {
                        this.reconComponent.formUpdatedSuccess = true;
                        this.reconComponent.formUpdatedFail = false;
                        this.reconComponent.reconTabsReference.selectedItem(2);
                    }
                    else {
                        this.reconComponent.formUpdatedFail = true;
                        this.reconComponent.formUpdatedSuccess = false;
                        this.reconComponent.reconTabsReference.selectedItem(2);
                    }
                    //this.blockUI.stop();
                    this.editFormPageBlock.stop();
                }).catch((err) => {
                    console.log("Error Processing updateForm" + err);
                    this.updateError = true;
                    this.viewMode = true;
                    //this.blockUI.stop();
                    this.editFormPageBlock.stop();
                });
        } else {
            alert('Please enter all the mandatory fields')
        }
    }

    setDefaultValueToDisplay(input) {
        return (input != null && input != "") ? input : " - ";
    }

    clearData() {

    }


}