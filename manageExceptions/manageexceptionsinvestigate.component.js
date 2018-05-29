var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { BlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import { NotLinkedSuggestionComponent } from '../notLinkedToEquipment/notlinkedsuggestion.component';
import { InvestigateComponent } from '../unReconciledEquipment/unreconciledinvestigate.component';
import { NotLinkedInvestigateComponent } from '../notLinkedToEquipment/notlinkedinvestigate.component';
import { ManageExceptionService } from '../manageExceptions/service/manageexceptions.service';
import { ManageExceptions } from '../manageExceptions/manageexceptions.component';
import { ReconciliationService } from '../../services/reconciliation.service';
import { ReconciliationComponent } from '../reconciliation.component';
import { jqxDropDownListComponent } from '../../../jqwidgets-ts/angular_jqxdropdownlist';
import { jqxGridComponent } from '../../../jqwidgets-ts/angular_jqxgrid';
import { jqxTabsComponent } from '../../../jqwidgets-ts/angular_jqxtabs';
import { jqxButtonComponent } from '../../../jqwidgets-ts/angular_jqxbuttons';
var ManageExceptionInvestigate = (function () {
    function ManageExceptionInvestigate(notlinkedSuggestion, unreconciledComponent, notLinkedComponent, manageExceptionService, reconService, manageExceptions, reconComponent, datePipe) {
        var _this = this;
        this.notlinkedSuggestion = notlinkedSuggestion;
        this.unreconciledComponent = unreconciledComponent;
        this.notLinkedComponent = notLinkedComponent;
        this.manageExceptionService = manageExceptionService;
        this.reconService = reconService;
        this.manageExceptions = manageExceptions;
        this.reconComponent = reconComponent;
        this.datePipe = datePipe;
        this.investigatedSpireEquipmentDetail = {};
        this.archiveRecord = {};
        this.confirmExceptionPage = false;
        this.searchRequest = {};
        this.mneSearchSuggestions = {};
        this.mneSearchResults = {};
        this.unReconcileClicked = false;
        this.nucSwapClicked = false;
        this.investigateClicked = false;
        this.reconcileClicked = false;
        this.actionBtnTxt = "";
        this.warningTabSelected = true;
        this.suggestionTabSelected = false;
        this.showIdentItemId = false;
        this.showRegion = false;
        this.formUpdatedSuccess = false;
        this.formUpdatedFail = false;
        this.displayActionColumn = true;
        this.aaInvalidConfirmationPage = false;
        this.num = 100;
        this.getExceptionEquipmentDataSource = function () {
            if (_this.investigatedSpireEquipmentDetail != undefined) {
                _this.spireSerialNumber = _this.investigatedSpireEquipmentDetail.spireSerialNumber;
                _this.aaStsId = _this.investigatedSpireEquipmentDetail.aaStsId;
                _this.type = _this.investigatedSpireEquipmentDetail.type;
            }
            var source = {
                localdata: _this.investigatedSpireEquipmentDetail,
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
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.columnsrenderer = function (value) {
            return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;">' + value + '</div>';
        };
        this.getDisplayValue = function (currentValue) {
            return this.datePipe.transform(currentValue, 'MM-dd-yyyy h:mm:ss a');
        };
        this.getBottlingPartnerListDataSource = function () {
            var source = {
                localdata: _this.bottlingPartnerList,
                datatype: 'json',
                datafields: [
                    { name: 'bottlingPartnerName' },
                    { name: 'bottlingPartnerValue' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getModemModelListDataSource = function (res) {
            var source = {
                localdata: res,
                datatype: 'json',
                datafields: [
                    { name: 'key' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getStateListDataSource = function () {
            var source = {
                localdata: _this.stateList,
                datatype: 'json',
                datafields: [
                    { name: 'stateName' },
                    { name: 'stateValue' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getSearchResults = function () {
            _this.mneSearchResultsFound = true;
            var source = {
                localdata: _this.mneSearchSuggestions,
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
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.cellbuttonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            if (rowdata.investigateFlag === "FALSE") {
                return ' Reconcile ';
            }
            else {
                return ' Investigate ';
            }
        };
        this.initrowdetails = function (index, parentElement, gridElement, datarecord) {
            if (parentElement != undefined) {
                var information = parentElement.children[0];
                if (information != null) {
                    var container = document.createElement('div');
                    information.appendChild(container);
                    var leftcolumn = document.createElement('div');
                    var rightcolumn = document.createElement('div');
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
                    var zipCode = '<div style="font-size:12px; margin-left: 10px; margin-top: 5px;"><b>Zip Code:</b> ' + postalCodeVal + '</div>';
                    var equipAssetNo = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Equipment Asset#:</b> ' + assetNumberVal + '</div>';
                    var spireType = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Spire Type:</b> ' + spireTypeVal + '</div>';
                    var equipLoc = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Equipment Location:</b> ' + locationVal + '</div>';
                    var nucSerialNo = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>NUC Serial#:</b> ' + nucSerialNumVal + '</div>';
                    var modemCarrier = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Carrier:</b> ' + modemCarrierVal + '</div>';
                    var modemSNo = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Serial#:</b> ' + modemSNoVal + '</div>';
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
                    var modemMake = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Make:</b> ' + modemMakeVal + '</div>';
                    var modemModel = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Model:</b> ' + modemModelVal + '</div>';
                    var modemLocation = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Modem Location:</b> ' + modemLocationVal + '</div>';
                    var senUploadDt = '<div style="font-size:12px; margin-left: 10px; margin-top: 5px;"><b>Last SEN Data Upload:</b> ' + lastSenDataUploadVal + '</div>';
                    var heartbeatTm = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Last Heartbeat Time:</b> ' + lastHeartBeatTimeVal + '</div>';
                    var timeZone = '<div style="font-size:12px; margin-left: 10px; margin-top: 3px;"><b>Time Zone:</b> ' + timeZoneVal + '</div>';
                    rightcolumn.insertAdjacentHTML('beforeend', modemMake);
                    rightcolumn.insertAdjacentHTML('beforeend', modemModel);
                    rightcolumn.insertAdjacentHTML('beforeend', modemLocation);
                    rightcolumn.insertAdjacentHTML('beforeend', senUploadDt);
                    rightcolumn.insertAdjacentHTML('beforeend', heartbeatTm);
                    rightcolumn.insertAdjacentHTML('beforeend', timeZone);
                }
            }
        };
        this.nucSwapCellButtonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            return 'NUC Swap';
        };
        this.unreconciledCellButtonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            return 'Unreconcile';
        };
        this.investigateCellButtonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            return 'Investigate';
        };
        this.reconcileCellButtonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            return 'Reconcile';
        };
        this.rowdetailstemplate = {
            rowdetails: '<div></div>',
            rowdetailsheight: 122
        };
    }
    ManageExceptionInvestigate.prototype.ngOnInit = function () {
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
    };
    ManageExceptionInvestigate.prototype.displayInvestigatedRecord = function () {
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
    };
    ManageExceptionInvestigate.prototype.ngAfterViewInit = function () {
        this.countryListDataSource = this.manageExceptions.getCountryListDataSource();
        this.bottlingPartnerListDataSource = this.manageExceptions.bottlingPartnerList;
        this.modemCarrierListDataSource = this.manageExceptions.getModemCarrierListDataSource;
        this.modemMakeListDataSource = this.manageExceptions.getModemMakeListDataSource();
    };
    ManageExceptionInvestigate.prototype.getButtonName = function () {
        if (this.investigatedSpireEquipmentDetail.type.toUpperCase() === "AA REQUEST") {
            return " Invalid ";
        }
        else if (this.investigatedSpireEquipmentDetail.type.toUpperCase() === "IBI FORM" || this.investigatedSpireEquipmentDetail.type.toUpperCase() === "FORM INSTALL"
            || this.investigatedSpireEquipmentDetail.type.toUpperCase() === "INSTALL/FORM") {
            return " Edit ";
        }
    };
    ManageExceptionInvestigate.prototype.getStatus = function (investigatedRecord) {
        if (investigatedRecord.status) {
            if (investigatedRecord.status.toUpperCase() === "RECONCILED") {
                return "app/images/reconciledSmall.png";
            }
            else {
                return "app/images/unreconciledSmall.png";
            }
        }
    };
    ManageExceptionInvestigate.prototype.navigate = function (investigatedRecord) {
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
    };
    ManageExceptionInvestigate.prototype.createEditFormData = function (investigatedRecord) {
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
    };
    ManageExceptionInvestigate.prototype.getColumnHeader = function (type) {
        if (type) {
            if (type.toUpperCase() === "AA REQUEST") {
                return "Auto Activation Time";
            }
            else {
                return "Install Completion Date";
            }
        }
    };
    ManageExceptionInvestigate.prototype.onCountrySelect = function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                var value = item.value;
                for (var i = 0; i < this.countryListDataSource.length; i++) {
                    var country = this.countryListDataSource[i];
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
    };
    ManageExceptionInvestigate.prototype.onModemMakeChange = function (event) {
        var _this = this;
        if (event.args) {
            var item = event.args.item;
            if (item) {
                var value = item.value;
                var temp = this.modemMakeListDataSource;
                var newTemp = {};
                for (var t in temp) {
                    newTemp[temp[t]["key"]] = temp[t]["value"];
                }
                this.reconService.getModelByPartManufacturer(newTemp[value], value).then(function (res) {
                    _this.modemModelListDataSource = _this.getModemModelListDataSource(res);
                });
                this.modemModelDropdown.disabled(false);
            }
        }
    };
    ManageExceptionInvestigate.prototype.backToManageExceptions = function () {
        this.reconComponent.formUpdatedSuccess = false;
        this.reconComponent.formUpdatedFail = false;
        this.reconComponent.showManageException = true;
        this.reconComponent.showInvestigate = false;
        document.documentElement.scrollTop = 0;
    };
    ManageExceptionInvestigate.prototype.backToUnreconciledEquipment = function () {
        this.reconComponent.showInvestigate = false;
        document.documentElement.scrollTop = 0;
        this.reconComponent.reconTabsReference.selectedItem(0);
    };
    ManageExceptionInvestigate.prototype.backToNotLinked = function () {
        this.reconComponent.showInvestigate = false;
        document.documentElement.scrollTop = 0;
        this.reconComponent.reconTabsReference.selectedItem(1);
    };
    ManageExceptionInvestigate.prototype.manageExceptionSearch = function () {
        var _this = this;
        this.manageExceptionInvestigatePage.start('Loading...');
        this.manageExceptionService.manageExceptionSearch(this.searchRequest).then(function (res) {
            _this.mneSearchSuggestions = res;
            _this.mneSearchResults = _this.getSearchResults();
            if (_this.searchGrid != undefined) {
                _this.searchGrid.source(_this.mneSearchResults);
                _this.searchGrid.refresh();
            }
            _this.displaySearchDetails();
            _this.scroll.nativeElement.scrollIntoView();
            _this.manageExceptionInvestigatePage.stop();
        }).catch(function (err) {
            console.log("Error Processing getUnreconciledEquipmentData" + err);
            _this.manageExceptionInvestigatePage.stop();
        });
    };
    ManageExceptionInvestigate.prototype.displaySearchDetails = function () {
        var _this = this;
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
                    buttonclick: function (row, event) {
                        _this.reconComponent.formUpdatedSuccess = false;
                        _this.reconComponent.formUpdatedFail = false;
                        _this.suggestionData = _this.searchGrid.getrowdata(row);
                        if (event.currentTarget.value.trim() == 'Un-Reconcile') {
                            _this.unReconcileClicked = true;
                            _this.confirmExceptionPage = true;
                        }
                        else if (event.currentTarget.value.trim() == 'NUC Swap') {
                            _this.nucSwapClicked = true;
                            _this.confirmExceptionPage = true;
                        }
                        else if (event.currentTarget.value.trim() == 'Reconcile') {
                            _this.reconcileClicked = true;
                            _this.confirmExceptionPage = true;
                        }
                        else {
                            _this.investigateClicked = true;
                            _this.confirmExceptionPage = false;
                            _this.reconComponent.showInvestigate = true;
                            _this.investigatedSpireEquipmentDetail = _this.suggestionData;
                            _this.investigatedSpireEquipmentDetail.aaStsId = _this.suggestionData.equipmentId;
                            _this.getExceptionEquipmentDataSource();
                            _this.displayInvestigatedRecord();
                            if (_this.investigatedSpireEquipmentDetail.type === "AA Request") {
                                _this.actionBtnTxt = "Invalid";
                            }
                            else if (_this.investigatedSpireEquipmentDetail.type.toUpperCase() === "IBI FORM") {
                                _this.actionBtnTxt = "Edit";
                            }
                            _this.ngAfterViewInit();
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
    };
    ManageExceptionInvestigate.prototype.getSelectedTab = function (event) {
        if ((event.args.item) == 0) {
            this.warningTabSelected = true;
            this.suggestionTabSelected = false;
        }
        else if ((event.args.item) == 1) {
            this.suggestionTabSelected = true;
            this.warningTabSelected = false;
        }
    };
    ;
    ManageExceptionInvestigate.prototype.showClearButton = function (value) {
        if (value) {
            this.searchTextEntered = true;
        }
        else {
            this.searchTextEntered = false;
        }
    };
    ManageExceptionInvestigate.prototype.dropDownSelect = function (event) {
        var args = event.args;
        if (args.item.value == null || args.item.value != 'Select') {
            this.searchTextEntered = true;
        }
        else {
            this.searchTextEntered = false;
        }
    };
    ManageExceptionInvestigate.prototype.checkDateEntered = function (event) {
        var date = event.args.date;
        if (date) {
            this.searchTextEntered = true;
        }
        else {
            this.searchTextEntered = false;
        }
    };
    ManageExceptionInvestigate.prototype.clearSearch = function () {
        this.searchRequest = {};
        this.mneSearchResultsFound = false;
        this.resetFilters();
    };
    ManageExceptionInvestigate.prototype.resetFilters = function () {
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
    };
    return ManageExceptionInvestigate;
}());
__decorate([
    BlockUI('manageExceptionInvestigatePage'),
    __metadata("design:type", Object)
], ManageExceptionInvestigate.prototype, "manageExceptionInvestigatePage", void 0);
__decorate([
    ViewChild('investigateGridRef'),
    __metadata("design:type", jqxGridComponent)
], ManageExceptionInvestigate.prototype, "spireEquipmentGrid", void 0);
__decorate([
    ViewChild('countryRef'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptionInvestigate.prototype, "countryDropdown", void 0);
__decorate([
    ViewChild('bottlingPartnerRef'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptionInvestigate.prototype, "bottlingPartnerFilter", void 0);
__decorate([
    ViewChild('stateRef'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptionInvestigate.prototype, "stateDropdown", void 0);
__decorate([
    ViewChild('spireUnitRef'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptionInvestigate.prototype, "spireUnitDropdown", void 0);
__decorate([
    ViewChild('modemCarrierRef'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptionInvestigate.prototype, "modemCarrierDropdown", void 0);
__decorate([
    ViewChild('modemMakeRef'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptionInvestigate.prototype, "modemMakeDropdown", void 0);
__decorate([
    ViewChild('modemModelRef'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptionInvestigate.prototype, "modemModelDropdown", void 0);
__decorate([
    ViewChild('suggestionSearchButton'),
    __metadata("design:type", jqxButtonComponent)
], ManageExceptionInvestigate.prototype, "suggestionSearchButton", void 0);
__decorate([
    ViewChild('mnesearchGridRef'),
    __metadata("design:type", jqxGridComponent)
], ManageExceptionInvestigate.prototype, "searchGrid", void 0);
__decorate([
    ViewChild('mneInvestigateTab'),
    __metadata("design:type", jqxTabsComponent)
], ManageExceptionInvestigate.prototype, "mneInvestigateTab", void 0);
__decorate([
    ViewChild('clearForm'),
    __metadata("design:type", jqxButtonComponent)
], ManageExceptionInvestigate.prototype, "clearButton", void 0);
__decorate([
    ViewChild('scroll'),
    __metadata("design:type", ElementRef)
], ManageExceptionInvestigate.prototype, "scroll", void 0);
ManageExceptionInvestigate = __decorate([
    Component({
        selector: 'manageExceptionInvestigate',
        templateUrl: 'app/reconciliation/manageExceptions/manageexceptionsinvestigate.component.html',
        styleUrls: ['app/reconciliation/reconciliation.component.css'],
    }),
    __metadata("design:paramtypes", [NotLinkedSuggestionComponent,
        InvestigateComponent,
        NotLinkedInvestigateComponent,
        ManageExceptionService,
        ReconciliationService,
        ManageExceptions,
        ReconciliationComponent,
        DatePipe])
], ManageExceptionInvestigate);
export { ManageExceptionInvestigate };
//# sourceMappingURL=manageexceptionsinvestigate.component.js.map