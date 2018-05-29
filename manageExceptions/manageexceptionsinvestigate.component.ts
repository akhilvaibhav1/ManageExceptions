import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UnReconciledEquipmentComponent } from '../unReconciledEquipment/unreconciledequipment.component';
import { NotLinkedSuggestionComponent } from '../notLinkedToEquipment/notlinkedsuggestion.component';
import { InvestigateComponent } from '../unReconciledEquipment/unreconciledinvestigate.component';
import { NotLinkedInvestigateComponent } from '../notLinkedToEquipment/notlinkedinvestigate.component';
import { ManageExceptionService } from '../manageExceptions/service/manageexceptions.service';
import { ManageExceptions } from '../manageExceptions/manageexceptions.component';
import { ManageExceptionSuggestionComponent } from '../manageExceptions/manageexceptionssuggestion.component';
import { ReconciliationService } from '../../services/reconciliation.service';
import { ReconciliationComponent } from '../reconciliation.component';

import { jqxDropDownListComponent } from '../../../jqwidgets-ts/angular_jqxdropdownlist';
import { jqxDataTableComponent } from '../../../jqwidgets-ts/angular_jqxdatatable';
import { jqxGridComponent } from '../../../jqwidgets-ts/angular_jqxgrid';
import { jqxDateTimeInputComponent } from '../../../jqwidgets-ts/angular_jqxdatetimeinput';
import { jqxInputComponent } from '../../../jqwidgets-ts/angular_jqxinput';
import { jqxTabsComponent } from '../../../jqwidgets-ts/angular_jqxtabs';
import { jqxButtonComponent } from '../../../jqwidgets-ts/angular_jqxbuttons';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'manageExceptionInvestigate',
    templateUrl: 'app/reconciliation/manageExceptions/manageexceptionsinvestigate.component.html',
    styleUrls: ['app/reconciliation/reconciliation.component.css'],
})

export class ManageExceptionInvestigate implements OnInit, AfterViewInit {

    investigatedSpireEquipmentDetail: any = {};

    @BlockUI('manageExceptionInvestigatePage') manageExceptionInvestigatePage: NgBlockUI;
    countryListDataSource: any;
    stateListDataSource: any;
    bottlingPartnerList: any;
    bottlingPartnerListDataSource: any;
    spireTypeDataSource: any;
    modemCarrierListDataSource: any;
    modemMakeListDataSource: any;
    modemModelListDataSource: any;
    stateList: any;
    @ViewChild('investigateGridRef') spireEquipmentGrid: jqxGridComponent;
    @ViewChild('countryRef') countryDropdown: jqxDropDownListComponent;
    @ViewChild('bottlingPartnerRef') bottlingPartnerFilter: jqxDropDownListComponent;
    @ViewChild('stateRef') stateDropdown: jqxDropDownListComponent;
    @ViewChild('spireUnitRef') spireUnitDropdown: jqxDropDownListComponent;
    @ViewChild('modemCarrierRef') modemCarrierDropdown: jqxDropDownListComponent;
    @ViewChild('modemMakeRef') modemMakeDropdown: jqxDropDownListComponent;
    @ViewChild('modemModelRef') modemModelDropdown: jqxDropDownListComponent;
    @ViewChild('suggestionSearchButton') suggestionSearchButton: jqxButtonComponent;
    @ViewChild('mnesearchGridRef') searchGrid: jqxGridComponent;
    @ViewChild('mneInvestigateTab') mneInvestigateTab: jqxTabsComponent;
    @ViewChild('clearForm') clearButton: jqxButtonComponent;
    @ViewChild('scroll') scroll: ElementRef;

    investigateColumns: any;
    spireSerialNumber: any;
    type: string;
    aaStsId: number;
    nucSwapFlag: string;
    suggestionCount: number;
    warningCount: number;
    suggestionData: any;
    archiveRecord: any = {};
    confirmExceptionPage: boolean = false;
    searchRequest: any = {};
    mneSearchSuggestions: any = {};
    mneSearchResults: any = {};
    mneSearchResultsFound: boolean;
    mneSearchColumns: any;
    unReconcileClicked: boolean = false;
    nucSwapClicked: boolean = false;
    investigateClicked: boolean = false;
    reconcileClicked: boolean = false;
    actionBtnTxt: string = "";
    warningTabSelected: boolean = true;
    suggestionTabSelected: boolean = false;
    searchResultRecord: any;
    searchTextEntered: boolean;
    searchResultsFound: boolean;
    showIdentItemId: boolean = false;
    showRegion: boolean = false;
    formUpdatedSuccess: boolean = false;
    formUpdatedFail: boolean = false;
    displayActionColumn: boolean = true;
    aaInvalidConfirmationPage: boolean = false;
     num : number = 100;


    constructor(private notlinkedSuggestion: NotLinkedSuggestionComponent,
        private unreconciledComponent: InvestigateComponent,
        private notLinkedComponent: NotLinkedInvestigateComponent,
        private manageExceptionService: ManageExceptionService,
        private reconService: ReconciliationService,
        private manageExceptions: ManageExceptions,
        private reconComponent: ReconciliationComponent,
        private datePipe: DatePipe) {
    }

    ngOnInit() {
        if (this.reconComponent.tabNavigated) {
            this.manageExceptions.initialLoad = true;
            this.investigatedSpireEquipmentDetail = this.reconComponent.investigatedSpireEquipmentDetail;
            if (this.investigatedSpireEquipmentDetail.suggestionCode === "NUCSWAP001") {
                this.nucSwapFlag = this.investigatedSpireEquipmentDetail.nucSwapFlag;
            }
            else {
                this.nucSwapFlag = "FALSE";
            }
        }
        else if (this.investigateClicked) {
            this.investigatedSpireEquipmentDetail = this.suggestionData;
            this.nucSwapFlag = this.investigatedSpireEquipmentDetail.nucSwapFlag;
        }
        else {
            this.investigatedSpireEquipmentDetail = this.manageExceptions.selectedRow;
            this.nucSwapFlag = this.investigatedSpireEquipmentDetail.nucSwapFlag;
        }
        this.spireSerialNumber = this.investigatedSpireEquipmentDetail.spireSerialNumber;
        this.manageExceptions.spireSerialNumber = this.investigatedSpireEquipmentDetail.spireSerialNumber;
        if (this.investigatedSpireEquipmentDetail.aaStsId != null) {
            this.aaStsId = this.investigatedSpireEquipmentDetail.aaStsId;
        }
        if (this.investigatedSpireEquipmentDetail.equipmentId != null) {
            this.aaStsId = this.investigatedSpireEquipmentDetail.equipmentId;
        }
        this.type = this.investigatedSpireEquipmentDetail.type;
        if (this.type != undefined) {
            if (this.type === "AA Request") {
                this.actionBtnTxt = "Invalid";
            }
            else if (this.type.toUpperCase() === "IBI FORM" || this.type.toUpperCase() === "FORM INSTALL") {
                this.actionBtnTxt = "Edit";
            }
            if (this.type.toUpperCase() === "CETS INSTALL" || this.type.toUpperCase() === "INSTALL/FORM") {
                this.showIdentItemId = true;
                this.showRegion = true;
                this.displayActionColumn = false;
            }
        }
    }

    getExceptionEquipmentDataSource = (): any => {
        if (this.investigatedSpireEquipmentDetail != undefined) {
            this.spireSerialNumber = this.investigatedSpireEquipmentDetail.spireSerialNumber;
            this.aaStsId = this.investigatedSpireEquipmentDetail.aaStsId;
            this.type = this.investigatedSpireEquipmentDetail.type;
        }
        let source: any =
            {
                localdata: this.investigatedSpireEquipmentDetail,
                datatype: 'json',
                datafields: [
                    { name: 'spireSerialNumber', type: 'string' },
                    { name: 'date', type: 'string' },
                    { name: 'country', type: 'string' },
                    { name: 'bottlingPartner', type: 'string' },
                    { name: 'customerId', type: 'int' },
                    { name: 'customerName', type: 'string' },
                    { name: 'streetAddress', type: 'string' },
                    { name: 'city', type: 'string' },
                    { name: 'state', type: 'string' },
                    { name: 'actions', type: 'any' },
                    { name: 'postalCode', type: 'int' },
                    { name: 'assetNumber', type: 'int' },
                    { name: 'spireType', type: 'string' },
                    { name: 'location', type: 'string' },
                    { name: 'nucSerialNumber', type: 'int' },
                    { name: 'modemCarrier', type: 'string' },
                    { name: 'modemSNo', type: 'int' },
                    { name: 'modemMake', type: 'string' },
                    { name: 'modemModel', type: 'string' },
                    { name: 'modemLocation', type: 'string' },
                    { name: 'lastSenDataUpload', type: 'string' },
                    { name: 'lastHeartBeatTime', type: 'string' },
                    { name: 'timeZone', type: 'string' },
                    { name: 'type', type: 'string' },
                    { name: 'aaStsId', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'nucSwapFlag', type: 'string' },
                    { name: 'investigateFlag', type: 'string' }
                ],
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    displayInvestigatedRecord() {
        this.investigateColumns =
            [
                { text: 'Spire Serial#', datafield: 'spireSerialNumber', width: '10%', renderer: this.columnsrenderer },
                { text: 'Install<br />Completion Date', datafield: 'date', width: '15%', renderer: this.columnsrenderer },
                { text: 'Country', datafield: 'country', width: '8%', cellsformat: 'center', renderer: this.columnsrenderer },
                { text: 'Bottling Partner', datafield: 'bottlingPartner', width: '10%', renderer: this.columnsrenderer },
                { text: 'COF#/Cust ID', datafield: 'customerId', width: '8%', renderer: this.columnsrenderer },
                { text: 'Customer Name', datafield: 'customerName', width: '14%', renderer: this.columnsrenderer },
                { text: 'Street Address', datafield: 'streetAddress', width: '21%', renderer: this.columnsrenderer },
                { text: 'City', datafield: 'city', width: '9%', renderer: this.columnsrenderer },
                { text: 'State', datafield: 'state', width: '5%', renderer: this.columnsrenderer },
                { text: 'Zip Code', datafield: 'postalCode', width: '5%', hidden: 'true' },
                { text: 'Equip Asset#', datafield: 'assetNumber', width: '8%', hidden: 'true' },
                { text: 'Spire Type', datafield: 'spireType', width: '14%', hidden: 'true' },
                { text: 'Equip Location', datafield: 'location', width: '10%', hidden: 'true' },
                { text: 'NUC Serial#', datafield: 'nucSerialNumber', width: '10%', hidden: 'true' },
                { text: 'Modem Carrier', datafield: 'modemCarrier', width: '5%', hidden: 'true' },
                { text: 'Modem Serial#', datafield: 'modemSNo', width: '10%', hidden: 'true' },
                { text: 'Modem Make', datafield: 'modemMake', width: '14%', hidden: 'true' },
                { text: 'Modem Model', datafield: 'modemModel', width: '14%', hidden: 'true' },
                { text: 'Modem Location', datafield: 'modemLocation', width: '14%', hidden: 'true' },
                { text: 'Last SEN Data Upload', datafield: 'lastSenDataUpload', width: '14%', hidden: 'true' },
                { text: 'Last Heartbeat Time', datafield: 'lastHeartBeatTime', width: '14%', hidden: 'true' },
                { text: 'Time Zone', datafield: 'timeZone', width: '5%', hidden: 'true' },
                { text: 'Type', datafield: 'type', width: '5%', hidden: 'true' },
                { text: 'AA Status ID', datafield: 'aaStsId', width: '5%', hidden: 'true' },
                { text: 'Status', datafield: 'status', width: '5%', hidden: 'true' },
                { text: 'NUC Swap Flag', datafield: 'nucSwapFlag', width: '5%', hidden: 'true' },
                { text: 'Investigate Flag', datafield: 'investigateFlag', width: '5%', hidden: 'true' },
            ];
    }

    ngAfterViewInit() {
        this.countryListDataSource = this.manageExceptions.getCountryListDataSource();
        this.bottlingPartnerListDataSource = this.manageExceptions.bottlingPartnerList;
        this.modemCarrierListDataSource = this.manageExceptions.getModemCarrierListDataSource;
        this.modemMakeListDataSource = this.manageExceptions.getModemMakeListDataSource();
    }

    getButtonName() {
        if (this.investigatedSpireEquipmentDetail.type.toUpperCase() === "AA REQUEST") {
            return " Invalid ";
        }
        else if (this.investigatedSpireEquipmentDetail.type.toUpperCase() === "IBI FORM" || this.investigatedSpireEquipmentDetail.type.toUpperCase() === "FORM INSTALL"
            || this.investigatedSpireEquipmentDetail.type.toUpperCase() === "INSTALL/FORM") {
            return " Edit ";
        }
    }

    getStatus(investigatedRecord: any) {
        if (investigatedRecord.status) {
            if (investigatedRecord.status.toUpperCase() === "RECONCILED") {
                return "app/images/reconciledSmall.png";
            }
            else {
                return "app/images/unreconciledSmall.png";
            }
        }
    }

    navigate(investigatedRecord: any): void {
        if (investigatedRecord.type.toUpperCase() === "AA REQUEST") {
            this.aaInvalidConfirmationPage = true;
            this.reconComponent.showInvestigate = true;
        }
        else if (investigatedRecord.type.toUpperCase() === "IBI FORM" || investigatedRecord.type.toUpperCase() === "FORM INSTALL") {
            this.createEditFormData(investigatedRecord);
            this.reconComponent.mneEditForm = true;
            this.reconComponent.hideSearch = true;
            this.reconComponent.hideAdd = true;
            this.reconComponent.reconTabsReference.selectedItem(4);
        }
    }

    createEditFormData(investigatedRecord: any) {
        this.reconComponent.editData.btlrNm = investigatedRecord.bottlingPartner;
        this.reconComponent.editData.country = investigatedRecord.country;
        this.reconComponent.editData.btlrCustIdVal = investigatedRecord.customerId;
        this.reconComponent.editData.custNm = investigatedRecord.customerName;
        this.reconComponent.editData.eqpmtLocDsc = investigatedRecord.location;
        this.reconComponent.editData.deploymentDt = investigatedRecord.date;
        this.reconComponent.editData.custAddrTxt1 = investigatedRecord.streetAddress;
        this.reconComponent.editData.custCity = investigatedRecord.city;
        this.reconComponent.editData.custState = investigatedRecord.state;
        this.reconComponent.editData.custPostCd = investigatedRecord.postalCode;
        this.reconComponent.editData.eqpmtSrlNum = investigatedRecord.spireSerialNumber;
        if (!!investigatedRecord.equipmentId) {
            this.reconComponent.editData.custEqpmtFormId = investigatedRecord.equipmentId;
        }
        this.reconComponent.editData.eqpmtType = investigatedRecord.spireType;
        this.reconComponent.editData.identItemId = investigatedRecord.identItemId;
        this.reconComponent.editData.thirdPartyEqpmtId = investigatedRecord.assetNumber;
        this.reconComponent.editData.nucSerialNum = investigatedRecord.nucSerialNumber;
        this.reconComponent.editData.modemSerialNum = investigatedRecord.modemSNo;
        this.reconComponent.editData.modemCarrier = investigatedRecord.modemCarrier;
        this.reconComponent.editData.modemMake = investigatedRecord.modemMake;
        this.reconComponent.editData.modemModel = investigatedRecord.modemModel;
        if (!!investigatedRecord.aaStsId) {
            this.reconComponent.editData.custEqpmtFormId = investigatedRecord.aaStsId;
        }
    }

    columnsrenderer = (value: any): any => {
        return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;">' + value + '</div>';
    };

    getColumnHeader(type: string) {
        if (type) {
            if (type.toUpperCase() === "AA REQUEST") {
                return "Auto Activation Time"
            }
            else {
                return "Install Completion Date"
            }
        }
    }

    getDisplayValue = function (currentValue) {
        return this.datePipe.transform(currentValue, 'MM-dd-yyyy h:mm:ss a');
    };

    onCountrySelect(event: any): void {
        if (event.args) {
            let item = event.args.item;
            if (item) {
                let value = item.value;
                for (let i = 0; i < this.countryListDataSource.length; i++) {
                    let country = this.countryListDataSource[i];
                    if (country.countryValue === value) {
                        this.stateList = country.states;
                        this.stateListDataSource = this.getStateListDataSource();
                        this.bottlingPartnerList = country.bottlingPartners;
                        this.bottlingPartnerListDataSource = this.getBottlingPartnerListDataSource();
                    }
                }
                if (value !== 'All Countries') {
                    this.bottlingPartnerFilter.disabled(false);
                    this.stateDropdown.disabled(false);
                }
                else {
                    this.bottlingPartnerFilter.disabled(true);
                    this.stateDropdown.disabled(true);
                }
            }
        }
    }

    getBottlingPartnerListDataSource = (): any => {
        let source: any =
            {
                localdata: this.bottlingPartnerList,
                datatype: 'json',
                datafields: [
                    { name: 'bottlingPartnerName' },
                    { name: 'bottlingPartnerValue' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    onModemMakeChange(event: any): void {
        if (event.args) {
            let item = event.args.item;
            if (item) {
                let value = item.value;
                var temp = this.modemMakeListDataSource;
                var newTemp = {};
                for (var t in temp) {
                    newTemp[temp[t]["key"]] = temp[t]["value"]
                }
                this.reconService.getModelByPartManufacturer(newTemp[value], value).then(res => {
                    this.modemModelListDataSource = this.getModemModelListDataSource(res);
                });
                this.modemModelDropdown.disabled(false);
            }
        }
    }

    getModemModelListDataSource = (res): any => {
        let source: any =
            {
                localdata: res,
                datatype: 'json',
                datafields: [
                    { name: 'key' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    getStateListDataSource = (): any => {
        let source: any =
            {
                localdata: this.stateList,
                datatype: 'json',
                datafields: [
                    { name: 'stateName' },
                    { name: 'stateValue' }
                ]
            };

        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    backToManageExceptions() {
        //this.manageExceptions.manageExceptionInvestigatePage = false;
        this.reconComponent.formUpdatedSuccess = false;
        this.reconComponent.formUpdatedFail = false;
        this.reconComponent.showManageException = true;
        this.reconComponent.showInvestigate = false;
        document.documentElement.scrollTop = 0;
    }

    backToUnreconciledEquipment() {
        this.reconComponent.showInvestigate = false;
        document.documentElement.scrollTop = 0;
        this.reconComponent.reconTabsReference.selectedItem(0);
    }

    backToNotLinked() {
        this.reconComponent.showInvestigate = false;
        document.documentElement.scrollTop = 0;
        this.reconComponent.reconTabsReference.selectedItem(1);
    }

    manageExceptionSearch() {
        this.manageExceptionInvestigatePage.start('Loading...');
        this.manageExceptionService.manageExceptionSearch(this.searchRequest).then(res => {
            this.mneSearchSuggestions = res;
            this.mneSearchResults = this.getSearchResults();
            if (this.searchGrid != undefined) {
                this.searchGrid.source(this.mneSearchResults);
                this.searchGrid.refresh();
            }
            this.displaySearchDetails();
            this.scroll.nativeElement.scrollIntoView();
            this.manageExceptionInvestigatePage.stop();
        }).catch((err) => {
            console.log("Error Processing getUnreconciledEquipmentData" + err);
            this.manageExceptionInvestigatePage.stop();
        });
    }

    getSearchResults = (): any => {
        this.mneSearchResultsFound = true;
        let source: any =
            {
                localdata: this.mneSearchSuggestions,
                datatype: 'json',
                datafields: [
                    { name: 'type', type: 'string' },
                    { name: 'spireSerialNumber', type: 'string' },
                    { name: 'date', type: 'date' },
                    { name: 'country', type: 'string' },
                    { name: 'bottlingPartner', type: 'string' },
                    { name: 'customerId', type: 'string' },
                    { name: 'customerName', type: 'string' },
                    { name: 'streetAddress', type: 'string' },
                    { name: 'city', type: 'string' },
                    { name: 'state', type: 'string' },
                    { name: 'actions', type: 'any' },
                    { name: 'postalCode', type: 'string' },
                    { name: 'assetNumber', type: 'string' },
                    { name: 'spireType', type: 'string' },
                    { name: 'location', type: 'string' },
                    { name: 'nucSerialNumber', type: 'string' },
                    { name: 'modemCarrier', type: 'string' },
                    { name: 'modemSNo', type: 'string' },
                    { name: 'modemMake', type: 'string' },
                    { name: 'modemModel', type: 'string' },
                    { name: 'modemLocation', type: 'string' },
                    { name: 'lastSenDataUpload', type: 'string' },
                    { name: 'lastHeartBeatTime', type: 'string' },
                    { name: 'timeZone', type: 'string' },
                    { name: 'investigateFlag', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'aaStsId', type: 'string' },
                    { name: 'equipmentId', type: 'string' },
                    { name: 'nucSwapFlag', type: 'string' },
                    { name: 'status', type: 'string' },
                ],
            };

        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }


    displaySearchDetails() {
        this.mneSearchColumns =
            [
                { text: 'Type', datafield: 'type', width: '9%', renderer: this.columnsrenderer },
                { text: 'Spire Serial#', datafield: 'spireSerialNumber', width: '8%', renderer: this.columnsrenderer },
                { text: 'Date Time Stamp', datafield: 'date', width: '14%', cellsformat: 'MM-dd-yyyy h:mm:ss tt', renderer: this.columnsrenderer },
                { text: 'Country', datafield: 'country', width: '7%', cellsformat: 'center', renderer: this.columnsrenderer },
                { text: 'Bottling Partner', datafield: 'bottlingPartner', width: '8%', renderer: this.columnsrenderer },
                { text: 'COF#/Cust ID', datafield: 'customerId', width: '9%', renderer: this.columnsrenderer },
                { text: 'Customer Name', datafield: 'customerName', width: '9%', renderer: this.columnsrenderer },
                { text: 'Street Address', datafield: 'streetAddress', width: '14%', renderer: this.columnsrenderer },
                { text: 'City', datafield: 'city', width: '8%', renderer: this.columnsrenderer },
                { text: 'State', datafield: 'state', width: '5%', renderer: this.columnsrenderer },
                {
                    text: 'Actions', datafield: null, width: '9%', renderer: this.columnsrenderer,
                    columntype: 'button',
                    cellsrenderer: this.cellbuttonRenderer,
                    buttonclick: (row, event): void => {
                        this.reconComponent.formUpdatedSuccess = false;
                        this.reconComponent.formUpdatedFail = false;
                        this.suggestionData = this.searchGrid.getrowdata(row);
                        if (event.currentTarget.value.trim() == 'Un-Reconcile') {
                            this.unReconcileClicked = true;
                            this.confirmExceptionPage = true;
                        }
                        else if (event.currentTarget.value.trim() == 'NUC Swap') {
                            this.nucSwapClicked = true;
                            this.confirmExceptionPage = true;
                        }
                        else if (event.currentTarget.value.trim() == 'Reconcile') {
                            this.reconcileClicked = true;
                            this.confirmExceptionPage = true;
                        }
                        else {
                            this.investigateClicked = true;
                            this.confirmExceptionPage = false;
                            this.reconComponent.showInvestigate = true;
                            this.investigatedSpireEquipmentDetail = this.suggestionData;
                            this.investigatedSpireEquipmentDetail.aaStsId = this.suggestionData.equipmentId;
                            this.getExceptionEquipmentDataSource();
                            this.displayInvestigatedRecord();
                            if (this.investigatedSpireEquipmentDetail.type === "AA Request") {
                                this.actionBtnTxt = "Invalid";
                            }
                            else if (this.investigatedSpireEquipmentDetail.type.toUpperCase() === "IBI FORM") {
                                this.actionBtnTxt = "Edit";
                            }
                            this.ngAfterViewInit();
                        }
                    }
                },
                { text: 'Zip Code', datafield: 'postalCode', width: '5%', hidden: 'true' },
                { text: 'Equip Asset#', datafield: 'assetNumber', width: '8%', hidden: 'true' },
                { text: 'Spire Type', datafield: 'spireType', width: '14%', hidden: 'true' },
                { text: 'Equip Location', datafield: 'location', width: '10%', hidden: 'true' },
                { text: 'NUC Serial#', datafield: 'nucSerialNumber', width: '10%', hidden: 'true' },
                { text: 'Modem Carrier', datafield: 'modemCarrier', width: '5%', hidden: 'true' },
                { text: 'Modem Serial#', datafield: 'modemSNo', width: '10%', hidden: 'true' },
                { text: 'Modem Make', datafield: 'modemMake', width: '14%', hidden: 'true' },
                { text: 'Modem Model', datafield: 'modemModel', width: '14%', hidden: 'true' },
                { text: 'Modem Location', datafield: 'modemLocation', width: '14%', hidden: 'true' },
                { text: 'Last SEN Data Upload', datafield: 'lastSenDataUpload', width: '14%', hidden: 'true' },
                { text: 'Last Heartbeat Time', datafield: 'lastHeartBeatTime', width: '14%', hidden: 'true' },
                { text: 'Time Zone', datafield: 'timeZone', width: '5%', hidden: 'true' },
                { text: 'AA Status ID', datafield: 'aaStsId', hidden: 'true' },
                { text: 'Equipment ID', datafield: 'equipmentId', hidden: 'true' },
                { text: 'NUC Swap Flag', datafield: 'nucSwapFlag', hidden: 'true' },
                { text: 'Status', datafield: 'status', hidden: 'true' },
            ];
    }

    cellbuttonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        if (rowdata.investigateFlag === "FALSE") {
            return ' Reconcile ';
        }
        else {
            return ' Investigate ';
        }
    }

    initrowdetails = (index: any, parentElement: any, gridElement: any, datarecord: any): void => {
        if (parentElement != undefined) {
            let information = parentElement.children[0];
            if (information != null) {

                let container = document.createElement('div');
                information.appendChild(container);

                let leftcolumn = document.createElement('div');
                let rightcolumn = document.createElement('div');

                //leftcolumn.style.cssText = 'float: left; width: 45%';
                //rightcolumn.style.cssText = 'float: left; width: 45%';
                leftcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';
                rightcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';

                container.appendChild(leftcolumn);
                container.appendChild(rightcolumn);

                var postalCodeVal = (datarecord.postalCode != null && datarecord.postalCode != "") ? datarecord.postalCode : " - ";
                var assetNumberVal = (datarecord.assetNumber != null && datarecord.assetNumber != "") ? datarecord.assetNumber : " - ";
                var modemSNoVal = (datarecord.modemSNo != null && datarecord.modemSNo != "") ? datarecord.modemSNo : " - ";
                var spireTypeVal = (datarecord.spireType != null && datarecord.spireType != "") ? datarecord.spireType : " - ";
                var locationVal = (datarecord.location != null && datarecord.location != "") ? datarecord.location : " - ";
                var nucSerialNumVal = (datarecord.nucSerialNumber != null && datarecord.nucSerialNumber != "") ? datarecord.nucSerialNumber : " - ";
                var modemCarrierVal = (datarecord.modemCarrier != null && datarecord.modemCarrier != "") ? datarecord.modemCarrier : " - ";

                let zipCode = '<div style="font-size:12px; margin-left: 10px; margin-top: 5px;"><b>Zip Code:</b> ' + postalCodeVal + '</div>';
                let equipAssetNo = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Equipment Asset#:</b> ' + assetNumberVal + '</div>';
                let spireType = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Spire Type:</b> ' + spireTypeVal + '</div>';
                let equipLoc = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Equipment Location:</b> ' + locationVal + '</div>';
                let nucSerialNo = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>NUC Serial#:</b> ' + nucSerialNumVal + '</div>';
                let modemCarrier = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Carrier:</b> ' + modemCarrierVal + '</div>';
                let modemSNo = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Serial#:</b> ' + modemSNoVal + '</div>';

                leftcolumn.insertAdjacentHTML('beforeend', zipCode);
                leftcolumn.insertAdjacentHTML('beforeend', equipAssetNo);
                leftcolumn.insertAdjacentHTML('beforeend', spireType);
                leftcolumn.insertAdjacentHTML('beforeend', equipLoc);
                leftcolumn.insertAdjacentHTML('beforeend', nucSerialNo);
                leftcolumn.insertAdjacentHTML('beforeend', modemCarrier);
                leftcolumn.insertAdjacentHTML('beforeend', modemSNo);

                var modemMakeVal = (datarecord.modemMake != null && datarecord.modemMake != "") ? datarecord.modemMake : " - ";
                var modemModelVal = (datarecord.modemModel != null && datarecord.modemModel != "") ? datarecord.modemModel : " - ";
                var modemLocationVal = (datarecord.modemLocation != null && datarecord.modemLocation != "") ? datarecord.modemLocation : " - ";
                var lastSenDataUploadVal = (datarecord.lastSenDataUpload != null && datarecord.lastSenDataUpload != "") ? datarecord.lastSenDataUpload : " - ";
                var lastHeartBeatTimeVal = (datarecord.lastHeartBeatTime != null && datarecord.lastHeartBeatTime != "") ? datarecord.lastHeartBeatTime : " - ";
                var timeZoneVal = (datarecord.timeZone != null && datarecord.timeZone != "") ? datarecord.timeZone : " - ";

                let modemMake = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Make:</b> ' + modemMakeVal + '</div>';
                let modemModel = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Model:</b> ' + modemModelVal + '</div>';
                let modemLocation = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Location:</b> ' + modemLocationVal + '</div>';
                let senUploadDt = '<div style="font-size:12px; margin-left: 10px; margin-top: 5px;"><b>Last SEN Data Upload:</b> ' + lastSenDataUploadVal + '</div>';
                let heartbeatTm = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Last Heartbeat Time:</b> ' + lastHeartBeatTimeVal + '</div>';
                let timeZone = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Time Zone:</b> ' + timeZoneVal + '</div>';

                rightcolumn.insertAdjacentHTML('beforeend', modemMake);
                rightcolumn.insertAdjacentHTML('beforeend', modemModel);
                rightcolumn.insertAdjacentHTML('beforeend', modemLocation);
                rightcolumn.insertAdjacentHTML('beforeend', senUploadDt);
                rightcolumn.insertAdjacentHTML('beforeend', heartbeatTm);
                rightcolumn.insertAdjacentHTML('beforeend', timeZone);
            }
        }
    }

    // Selected event
    getSelectedTab(event: any): void {
        if ((event.args.item) == 0) {
            this.warningTabSelected = true;
            this.suggestionTabSelected = false;
        } else if ((event.args.item) == 1) {
            this.suggestionTabSelected = true;
            this.warningTabSelected = false;
        }
    };

    searchText: any;
    showClearButton(value: any): void {
        if (value) {
            this.searchTextEntered = true;
        }
        else {
            this.searchTextEntered = false;
        }
    }

    dropDownSelect(event: any): void {
        let args = event.args;
        if (args.item.value == null || args.item.value != 'Select') {
            this.searchTextEntered = true;
        }
        else {
            this.searchTextEntered = false;
        }
    }

    checkDateEntered(event: any): void {
        let date = event.args.date;
        if (date) {
            this.searchTextEntered = true;
        }
        else {
            this.searchTextEntered = false;
        }
    }

    clearSearch() {
        this.searchRequest = {};
        this.mneSearchResultsFound = false;
        this.resetFilters();
    }

    resetFilters() {
        this.countryDropdown.disabled(false);
        this.countryDropdown.clearSelection();
        this.bottlingPartnerFilter.disabled(true);
        this.bottlingPartnerFilter.clearSelection();
        this.spireUnitDropdown.clearSelection();
        this.modemCarrierDropdown.clearSelection();
        this.modemMakeDropdown.clearSelection();
        this.modemModelDropdown.clearSelection();
        this.modemModelDropdown.disabled(true);
        this.stateDropdown.disabled(true);
        this.stateDropdown.clearSelection();
        this.bottlingPartnerFilter.disabled(true);
        this.showClearButton(null);
        this.reconComponent.formUpdatedSuccess = false;
        this.reconComponent.formUpdatedFail = false;
    }

    nucSwapCellButtonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        return 'NUC Swap';
    }

    unreconciledCellButtonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        return 'Unreconcile';
    }

    investigateCellButtonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        return 'Investigate';
    }

    reconcileCellButtonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        return 'Reconcile';
    }

    rowdetailstemplate: any = {
        rowdetails: '<div></div>',
        rowdetailsheight: 122
    }

}