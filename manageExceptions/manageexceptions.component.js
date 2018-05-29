var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { BlockUI } from 'ng-block-ui';
import { Util } from '../../util/util.service';
import { ManageExceptionService } from '../manageExceptions/service/manageexceptions.service';
import { ReconciliationService } from '../../services/reconciliation.service';
import { InvestigateComponent } from '../unReconciledEquipment/unreconciledinvestigate.component';
import { ReconciliationComponent } from '../reconciliation.component';
import { jqxGridComponent } from '../../../jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from '../../../jqwidgets-ts/angular_jqxbuttons';
import { jqxInputComponent } from '../../../jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from '../../../jqwidgets-ts/angular_jqxdropdownlist';
import { jqxDateTimeInputComponent } from '../../../jqwidgets-ts/angular_jqxdatetimeinput';
var ManageExceptions = (function () {
    function ManageExceptions(manageExceptionService, reconService, unreconciledComponent, reconComponent, util) {
        var _this = this;
        this.manageExceptionService = manageExceptionService;
        this.reconService = reconService;
        this.unreconciledComponent = unreconciledComponent;
        this.reconComponent = reconComponent;
        this.util = util;
        this.toggleBasicAdv = true;
        this.totalExceptions = 0;
        this.aaExceptions = 0;
        this.installConfExceptions = 0;
        this.initialLoad = true;
        this.searchRequest = {};
        this.isNucSwap = false;
        this.columnsrenderer = function (value) {
            return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;">' + value + '</div>';
        };
        this.statusCellsRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            if (rowdata.status.toUpperCase() === "RECONCILED") {
                return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;"><img src="app/images/reconciledSmall.png" /></div>';
            }
            else {
                return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;"><img src="app/images/unreconciledSmall.png" /></div>';
            }
        };
        this.exceptionEquipmentColumns = [
            { text: 'Type', datafield: 'type', width: '9%', renderer: this.columnsrenderer },
            { text: 'Spire Serial#', datafield: 'spireSerialNumber', width: '9%', renderer: this.columnsrenderer },
            { text: 'Date Time Stamp', datafield: 'date', width: '12%', renderer: this.columnsrenderer },
            { text: 'Country', datafield: 'country', width: '6%', renderer: this.columnsrenderer },
            { text: 'Bottling Partner', datafield: 'bottlingPartner', width: '8%', renderer: this.columnsrenderer },
            { text: 'COF#/Cust ID', datafield: 'customerId', width: '8%', renderer: this.columnsrenderer },
            { text: 'Customer Name', datafield: 'customerName', width: '12%', renderer: this.columnsrenderer },
            { text: 'Street Address', datafield: 'streetAddress', width: '12%', renderer: this.columnsrenderer },
            { text: 'City', datafield: 'city', width: '8%', renderer: this.columnsrenderer },
            { text: 'State', datafield: 'state', width: '4%', renderer: this.columnsrenderer },
            { text: 'Status', datafield: 'status', width: '4%', renderer: this.columnsrenderer, cellsrenderer: this.statusCellsRenderer },
            {
                text: 'Action', datafield: 'actions', width: '8%', renderer: this.columnsrenderer,
                columntype: 'button',
                cellsrenderer: function (value) {
                    return ' Investigate ';
                },
                buttonclick: function (row) {
                    _this.manageExceptionReconSuccess = false;
                    _this.manageExceptionReconFailed = false;
                    _this.aaRequestInvalidSuccess = false;
                    _this.aaRequestInvalidFailed = false;
                    _this.nucSwapSuccess = false;
                    _this.nucSwapFailed = false;
                    _this.reconComponent.formUpdatedSuccess = false;
                    _this.reconComponent.formUpdatedFail = false;
                    _this.reconComponent.showInvestigate = true;
                    _this.reconComponent.showManageException = false;
                    _this.selectedRow = _this.manageExceptionGrid.getrowdata(_this.manageExceptionGrid.selectedrowindex());
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
            { text: 'Form Received Date', datafield: 'formReceivedDate', width: '14%', hidden: 'true' },
            { text: 'Last SEN Data Upload Time', datafield: 'lastSenDataUpload', width: '14%', hidden: 'true' },
            { text: 'Last Heartbeat Time', datafield: 'lastHeartBeatTime', width: '14%', hidden: 'true' },
            { text: 'Time Zone', datafield: 'timeZone', width: '5%', hidden: 'true' },
            { text: 'Ident Item ID', datafield: 'identItemId', width: '8%', hidden: 'true' },
            { text: 'Region', datafield: 'region', width: '8%', hidden: 'true' },
            { text: 'NUC Swap', datafield: 'nucSwapFlag', width: '8%', hidden: 'true' }
        ];
        this.rowdetailstemplate = {
            rowdetails: '<div></div>',
            rowdetailsheight: 122
        };
        this.initrowdetails = function (index, parentElement, gridElement, datarecord) {
            if (parentElement != null) {
                var information = parentElement.children[0];
                if (information != null) {
                    var container = document.createElement('div');
                    information.appendChild(container);
                    var leftcolumn = document.createElement('div');
                    var rightcolumn = document.createElement('div');
                    var childTable = document.createElement('table');
                    childTable.width = '100%';
                    var innerHtml = '';
                    leftcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';
                    rightcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';
                    innerHtml = '';
                    var rows1 = document.createElement('tr');
                    innerHtml += (_this.rowDetail('Zip/Postal Code', datarecord.postalCode));
                    innerHtml += (_this.rowDetail('Modem Make:', datarecord.modemMake));
                    rows1.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows1);
                    innerHtml = '';
                    var rows2 = document.createElement('tr');
                    innerHtml += (_this.rowDetail('Spire Unit Asset #', datarecord.assetNumber));
                    innerHtml += (_this.rowDetail('Modem Model', datarecord.modemModel));
                    rows2.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows2);
                    innerHtml = '';
                    var rows3 = document.createElement('tr');
                    innerHtml += (_this.rowDetail('Spire Unit Type', datarecord.spireType));
                    innerHtml += (_this.rowDetail('Modem Location', datarecord.modemLocation));
                    rows3.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows3);
                    innerHtml = '';
                    var rows4 = document.createElement('tr');
                    innerHtml += (_this.rowDetail('Spire Unit Location', datarecord.location));
                    if (datarecord.type !== 'CETS Install' && datarecord.type !== 'AA Request' && datarecord.type !== 'Install/Form') {
                        innerHtml += (_this.rowDetail('Form Received Date', datarecord.formReceivedDate));
                    }
                    else {
                        innerHtml += (_this.rowDetail('Last SEN Data Upload', datarecord.lastSenDataUpload));
                    }
                    rows4.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows4);
                    innerHtml = '';
                    var rows5 = document.createElement('tr');
                    innerHtml += (_this.rowDetail('NUC Serial#', datarecord.nucSerialNumber));
                    if (datarecord.type === 'AA Request') {
                        innerHtml += (_this.rowDetail('Last Heartbeat Time', datarecord.lastHeartBeatTime));
                    }
                    else {
                        innerHtml += (_this.rowDetail('Region', datarecord.region));
                    }
                    rows5.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows5);
                    innerHtml = '';
                    var rows6 = document.createElement('tr');
                    innerHtml += (_this.rowDetail('Modem Carrier', datarecord.modemCarrier));
                    if (datarecord.type === 'AA Request') {
                        innerHtml += (_this.rowDetail('Time Zone', datarecord.timeZone));
                    }
                    else {
                        innerHtml += (_this.rowDetail('Region', datarecord.region));
                    }
                    rows6.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows6);
                    innerHtml = '';
                    var rows7 = document.createElement('tr');
                    innerHtml += (_this.rowDetail('Modem Serial #', datarecord.modemSNo));
                    rows7.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows7);
                    innerHtml = '';
                    container.appendChild(leftcolumn);
                    container.appendChild(rightcolumn);
                    container.appendChild(childTable);
                    information.appendChild(container);
                }
            }
        };
        this.rowDetail = function (itemName, itemvalue) {
            var childtdSuggestionsCSS = "font-family:12px;text-align:left;margin:2px;padding-left:90px;font-weight:bold;widht:200px";
            var tdHtml = '<td style="' + childtdSuggestionsCSS + '">' + itemName + '</td><td style="width:200px">';
            if (itemvalue == null || itemvalue == "") {
                tdHtml += ' - ';
            }
            else {
                tdHtml += '' + itemvalue + '';
            }
            tdHtml += '</td>';
            return tdHtml;
        };
        this.getExceptionEquipmentDatasource = function () {
            var source = {
                localdata: _this.exceptionEquipments,
                datatype: 'json',
                datafields: [
                    { name: 'type', type: 'string' },
                    { name: 'spireSerialNumber', type: 'string' },
                    { name: 'date', type: 'string' },
                    { name: 'country', type: 'string' },
                    { name: 'bottlingPartner', type: 'string' },
                    { name: 'customerId', type: 'string' },
                    { name: 'customerName', type: 'string' },
                    { name: 'streetAddress', type: 'string' },
                    { name: 'city', type: 'string' },
                    { name: 'state', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'actions', type: 'string' },
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
                    { name: 'formReceivedDate', type: 'string' },
                    { name: 'lastSenDataUpload', type: 'string' },
                    { name: 'lastHeartBeatTime', type: 'string' },
                    { name: 'timeZone', type: 'string' },
                    { name: 'identItemId', type: 'string' },
                    { name: 'region', type: 'string' },
                    { name: 'aaStsId', type: 'string' },
                    { name: 'nucSwapFlag', type: 'string' }
                ],
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getRegionFilterDataSource = function () {
            var source = {
                localdata: _this.regionFilterList,
                datatype: 'json',
                datafields: [
                    { name: 'regionName' },
                    { name: 'regionValue' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getCountryFilterDataSource = function () {
            var source = {
                localdata: _this.countryFilterList,
                datatype: 'json',
                datafields: [
                    { name: 'countryName' },
                    { name: 'countryValue' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getSpireTypeDataSource = function () {
            var source = {
                localdata: _this.spireTypeList,
                datatype: 'json',
                datafields: [
                    { name: 'spireName' },
                    { name: 'spireValue' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getBottlingPartnerFilterDataSource = function () {
            var source = {
                localdata: _this.bottlingPartnerFilterList,
                datatype: 'json',
                datafields: [
                    { name: 'bottlingPartnerName' },
                    { name: 'bottlingPartnerValue' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getCountryListDataSource = function () {
            var source = {
                localdata: _this.countryList,
                datatype: 'json',
                datafields: [
                    { name: 'countryName' },
                    { name: 'countryValue' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
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
        this.getModemCarrierListDataSource = function () {
            var source = {
                localdata: _this.modemCarrierList,
                datatype: 'json',
                datafields: [
                    { name: 'key' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getModemMakeListDataSource = function () {
            var source = {
                localdata: _this.modemMakeList,
                datatype: 'json',
                datafields: [
                    { name: 'key' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.getModemModelListDataSource = function () {
            var source = {
                localdata: _this.modemModelList,
                datatype: 'json',
                datafields: [
                    { name: 'key' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.manageExceptionColumns = [
            { text: 'Type', datafield: 'type', width: '7%', renderer: this.columnsrenderer },
            { text: 'Spire Unit<br />Serial #', datafield: 'spireSerialNumber', width: '11%', renderer: this.columnsrenderer },
            { text: 'Install<br />Completion Date', datafield: 'date', width: '14%', renderer: this.columnsrenderer },
            { text: 'Country', datafield: 'country', width: '8%', renderer: this.columnsrenderer },
            { text: 'Bottling<br />Partner', datafield: 'bottlingPartner', width: '9%', renderer: this.columnsrenderer },
            { text: 'COF /<br /> Customer ID', datafield: 'customerId', width: '8%', renderer: this.columnsrenderer },
            { text: 'Customer Name', datafield: 'customerName', width: '10%', renderer: this.columnsrenderer },
            { text: 'Street<br />Address', datafield: 'streetAddress', width: '12%', renderer: this.columnsrenderer },
            { text: 'City', datafield: 'city', width: '8%', renderer: this.columnsrenderer },
            { text: 'State', datafield: 'state', width: '5%', renderer: this.columnsrenderer },
            {
                text: 'Action', datafield: 'actions', width: '8%', renderer: this.columnsrenderer,
                columntype: 'button',
                cellsrenderer: function (value) {
                    return ' Investigate ';
                },
                buttonclick: function (row) {
                    _this.reconComponent.showInvestigate = true;
                    _this.reconComponent.showManageException = false;
                    _this.reconComponent.formUpdatedSuccess = false;
                    _this.reconComponent.formUpdatedFail = false;
                    _this.selectedRow = _this.manageExceptionGrid.getrowdata(_this.manageExceptionGrid.selectedrowindex());
                    _this.spireSerialNumber = _this.selectedRow.spireSerialNumber;
                    if (_this.selectedRow.type.toUpperCase() === "FORM INSTALL") {
                        _this.selectedRow.type = 'IB/International Form';
                    }
                }
            },
            { text: 'Zip/Postal Code', datafield: 'postalCode', width: '5%', hidden: 'true' },
            { text: 'Spire Unit Asset #', datafield: 'assetNumber', width: '8%', hidden: 'true' },
            { text: 'Spire Unit Type', datafield: 'spireType', width: '14%', hidden: 'true' },
            { text: 'Spire Unit Location', datafield: 'location', width: '10%', hidden: 'true' },
            { text: 'NUC Serial #', datafield: 'nucSerialNumber', width: '10%', hidden: 'true' },
            { text: 'Modem Carrier', datafield: 'modemCarrier', width: '5%', hidden: 'true' },
            { text: 'Modem Serial #', datafield: 'modemSNo', width: '10%', hidden: 'true' },
            { text: 'Modem Make', datafield: 'modemMake', width: '14%', hidden: 'true' },
            { text: 'Modem Model', datafield: 'modemModel', width: '14%', hidden: 'true' },
            { text: 'Modem Location', datafield: 'modemLocation', width: '14%', hidden: 'true' },
            { text: 'Form Received Date', datafield: 'formReceivedDate', width: '14%', hidden: 'true' },
            { text: 'Ident Item Id', datafield: 'identItemId', width: '8%', hidden: 'true' },
            { text: 'Region', datafield: 'region', width: '8%', hidden: 'true' },
            { text: 'Form ID', datafield: 'formId', width: '8%', hidden: 'true' },
            { text: 'AA Status ID', datafield: 'aaStsId', width: '8%', hidden: 'true' }
        ];
        this.getManageExceptionDataSource = function () {
            var source = {
                localdata: _this.exceptionEquipments,
                datatype: 'json',
                datafields: [
                    { name: 'type', type: 'string' },
                    { name: 'spireSerialNumber', type: 'string' },
                    { name: 'date', type: 'string' },
                    { name: 'country', type: 'string' },
                    { name: 'bottlingPartner', type: 'string' },
                    { name: 'customerId', type: 'string' },
                    { name: 'customerName', type: 'string' },
                    { name: 'streetAddress', type: 'string' },
                    { name: 'city', type: 'string' },
                    { name: 'state', type: 'string' },
                    { name: 'actions', type: 'string' },
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
                    { name: 'formReceivedDate', type: 'string' },
                    { name: 'identItemId', type: 'string' },
                    { name: 'region', type: 'string' },
                    { name: 'formId', type: 'string' }
                ],
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.searchTextEntered = false;
    }
    ManageExceptions.prototype.ngOnInit = function () {
        if (this.unreconciledComponent.manageExceptionInvestigatePage == true) {
            this.reconComponent.showInvestigate = true;
        }
    };
    ManageExceptions.prototype.reloadManageExceptions = function () {
        var _this = this;
        this.reconComponent.showManageException = true;
        this.reconComponent.showInvestigate = false;
        this.toggleBasicAdv = true;
        this.exceptionEquipmentDataSource = null;
        this.manageExceptionPage.start('Loading..');
        this.manageExceptionService.getExceptionEquipments().then(function (res) {
            var equipmentData = res;
            _this.exceptionEquipments = equipmentData.exceptionEquipments;
            _this.exceptionEquipmentDataSource = _this.getExceptionEquipmentDatasource();
            _this.totalExceptions = equipmentData.totalExceptions;
            _this.aaExceptions = equipmentData.aaExceptions;
            _this.installConfExceptions = equipmentData.installConfExceptions;
            _this.bottlingPartnerFilter.disabled(true);
            _this.regionFilter.disabled(true);
            _this.manageExceptionPage.stop();
        }).catch(function (err) {
            console.log("Error Processing getExceptionEquipments", err);
            _this.manageExceptionPage.stop();
        });
    };
    ManageExceptions.prototype.resetAllImages = function () {
        document.getElementById('i1').src = "app/images/unreconciled.png";
        document.getElementById('i2').src = "app/images/notLinked.png";
        document.getElementById('i3').src = "app/images/manageExceptions.png";
        document.getElementById('i4').src = "app/images/summaryreport.png";
        document.getElementById('i5').src = "app/images/forms.png";
        document.getElementById('i6').src = "app/images/search.png";
    };
    ManageExceptions.prototype.onTabClick = function () {
        var _this = this;
        this.resetAllImages();
        document.getElementById('i3').src = "app/images/manageExceptions-i.png";
        if (this.initialLoad) {
            this.manageExceptionPage.start('Loading..');
            var equipmentData = { "totalExceptions": 4, "aaExceptions": 2, "installConfExceptions": 2, "exceptionEquipments": [{ "equipmentId": null, "aaStsId": "467", "formId": null, "spireSerialNumber": "6211717PT030", "type": "AA Request", "date": "04/05/2018 11:21 PM", "country": "Canada", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "12233", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "GEGK3220030F33", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": null, "autoActivationTime": "04/05/2018 11:21 PM", "suggestionMsg": null, "suggestionCode": null, "warningMsg": null, "investigateFlag": "FALSE", "nucSwapFlag": "TRUE", "status": "Unreconciled" }, { "equipmentId": null, "aaStsId": "467", "formId": null, "spireSerialNumber": "6211717PT030", "type": "AA Request", "date": "04/05/2018 11:21 PM", "country": "Canada", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "12233", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "GEGK3220030F33", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": null, "autoActivationTime": "04/05/2018 11:21 PM", "suggestionMsg": null, "suggestionCode": null, "warningMsg": null, "investigateFlag": "FALSE", "nucSwapFlag": "TRUE", "status": "Unreconciled" }, { "equipmentId": null, "aaStsId": "467", "formId": null, "spireSerialNumber": "6211717PT030", "type": "AA Request", "date": "04/05/2018 11:21 PM", "country": "Canada", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "12233", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "GEGK3220030F33", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": null, "autoActivationTime": "04/05/2018 11:21 PM", "suggestionMsg": null, "suggestionCode": null, "warningMsg": null, "investigateFlag": "FALSE", "nucSwapFlag": "TRUE", "status": "Unreconciled" }, { "equipmentId": null, "aaStsId": "467", "formId": null, "spireSerialNumber": "6211717PT030", "type": "AA Request", "date": "04/05/2018 11:21 PM", "country": "Canada", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "12233", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "GEGK3220030F33", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": null, "autoActivationTime": "04/05/2018 11:21 PM", "suggestionMsg": null, "suggestionCode": null, "warningMsg": null, "investigateFlag": "FALSE", "nucSwapFlag": "TRUE", "status": "Unreconciled" }, { "equipmentId": null, "aaStsId": "48634173", "formId": null, "spireSerialNumber": "6211717PT030", "type": "Install/Form", "date": "07/21/2017 12:34 AM", "country": "United States", "bottlingPartner": "PBC", "customerId": "7360331", "customerName": "CHARTWELLS@UOFU FOOD COURT V#651757", "streetAddress": "200 S CENTRAL CAMPUS DR", "city": "SALT LAKE CITY", "state": "Utah", "postalCode": "841129149", "assetNumber": "10393800", "spireType": "SPIRE 5.0 PEDESTAL ASSEMBLY, MIDNIG", "location": "BLDG 53 F1 Spire 1", "nucSerialNumber": "GEGK531001W7", "lastSenDataUpload": null, "lastHeartBeatTime": "2018-04-10 23:40:39", "formReceivedDate": null, "modemCarrier": null, "modemSNo": null, "modemMake": null, "modemModel": null, "modemLocation": "BLDG 53 F1 Spire 1", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": null, "autoActivationTime": "07/21/2017 12:34 AM", "suggestionMsg": null, "suggestionCode": null, "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }, { "equipmentId": null, "aaStsId": "521", "formId": null, "spireSerialNumber": "510510", "type": "AA Request", "date": "04/09/2018 12:23 AM", "country": "Poland", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "102", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "GEGK54400762", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": null, "modemSNo": null, "modemMake": null, "modemModel": "NA", "modemLocation": "First Floor", "timeZone": "Eastern Standard Time", "identItemId": null, "region": null, "countryShortName": null, "autoActivationTime": "04/09/2018 12:23 AM", "suggestionMsg": null, "suggestionCode": null, "warningMsg": null, "investigateFlag": "FALSE", "nucSwapFlag": "TRUE", "status": "Unreconciled" }, { "equipmentId": null, "aaStsId": "201", "formId": null, "spireSerialNumber": "510510", "type": "IBI Form", "date": "12/19/2017 02:40 AM", "country": "Canada", "bottlingPartner": "IBI", "customerId": null, "customerName": "Testdata1", "streetAddress": null, "city": null, "state": null, "postalCode": "1235566", "assetNumber": null, "spireType": "SPIRE 1.1", "location": "Subway GF", "nucSerialNumber": "GEGK33332323", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": null, "modemSNo": "12345", "modemMake": null, "modemModel": null, "modemLocation": "Subway GF", "timeZone": null, "identItemId": null, "region": null, "countryShortName": null, "autoActivationTime": "12/19/2017 02:40 AM", "suggestionMsg": null, "suggestionCode": null, "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }] };
            this.exceptionEquipments = equipmentData.exceptionEquipments;
            this.exceptionEquipmentDataSource = this.getExceptionEquipmentDatasource();
            this.totalExceptions = equipmentData.totalExceptions;
            this.aaExceptions = equipmentData.aaExceptions;
            this.installConfExceptions = equipmentData.installConfExceptions;
            this.manageExceptionPage.stop();
            this.manageExceptionService.getExceptionEquipmentDropdownData().then(function (res) {
                var dropdownData = res;
                _this.countryFilterList = dropdownData.countries;
                _this.spireTypeList = dropdownData.spireUnitTypes;
                _this.countryList = dropdownData.countries;
                _this.bottlingPartnerFilter.disabled(true);
                _this.regionFilter.disabled(true);
                _this.countryFilterDataSource = _this.getCountryFilterDataSource();
                _this.spireTypeDataSource = _this.getSpireTypeDataSource();
                _this.countryListDataSource = _this.getCountryListDataSource();
            }).catch(function (err) {
                console.log("Error Processing getExceptionEquipmentDropdownData");
                _this.manageExceptionPage.stop();
            });
            this.reconService.loadFormDetails().then(function (res) {
                _this.modemMakeList = res.modemMake;
                _this.modemMakeListDataSource = _this.getModemMakeListDataSource();
                _this.modemCarrierList = res.modemCarrier;
                _this.modemCarrierListDataSource = _this.getModemCarrierListDataSource();
            }).catch(function (err) {
                console.log("Error Processing loadFormDetails" + err);
                _this.manageExceptionPage.stop();
            });
            this.modemModelDropdown.createComponent();
            this.modemModelDropdown.disabled(true);
            this.initialLoad = false;
        }
    };
    ManageExceptions.prototype.exportExceptionEquipments = function (fileName) {
        var col = this.exceptionEquipmentColumns;
        var filteredData = this.util.filterData(this.manageExceptionGrid.getrows());
        var csv = this.util.ConvertToReconciliationCSV(col, filteredData);
        var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName);
        }
        else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    ManageExceptions.prototype.clearSearchInput = function () {
        this.searchInput.val('');
        this.resetFilters();
    };
    ManageExceptions.prototype.clearAdvancedSearchForm = function () {
        this.stateDropdown.clearSelection();
        this.countryDropdown.selectIndex(0);
        this.bottlingPrtnrDropdown.clearSelection();
        this.spireUnitDropdown.clearSelection();
        this.modemCarrierDropdown.clearSelection();
        this.modemMakeDropdown.clearSelection();
        this.modemModelDropdown.clearSelection();
        this.fromDateInput.val('');
        this.toDateInput.val('');
        this.spireNumInput.val('');
        this.zipcodeInput.val('');
        this.equipAssetInput.val('');
        this.cofInput.val('');
        this.equipLocInput.val('');
        this.customerNameInput.val('');
        this.nucSerialInput.val('');
        this.streetAddInput.val('');
        this.cityInput.val('');
        this.modemSerialInput.val('');
        this.modemLocationInput.val('');
        this.identItemIdInput.val('');
        this.resetFilters();
    };
    ManageExceptions.prototype.addSearchFilter = function () {
        if (this.searchTextEntered) {
            this.manageExceptionReconSuccess = false;
            this.manageExceptionReconFailed = false;
            this.aaRequestInvalidSuccess = false;
            this.aaRequestInvalidFailed = false;
            this.nucSwapSuccess = false;
            this.nucSwapFailed = false;
            this.manageExceptionUnReconcileSuccess = false;
            this.manageExceptionUnReconcileFailed = false;
            var refreshGrid = false;
            var filtergroup = new $.jqx.filter();
            filtergroup.operator = 'or';
            var filter_or_operator = 1;
            var filtervalue = this.searchInput.val();
            var filtercondition = 'contains';
            var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.clearfilters();
            this.manageExceptionGrid.addfilter('type', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('spireSerialNumber', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('country', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('bottlingPartner', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('customerId', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('customerName', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('streetAddress', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('city', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('state', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('postalCode', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('assetNumber', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('spireType', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('location', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('nucSerialNumber', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('modemCarrier', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('modemSNo', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('modemMake', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('modemModel', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('modemLocation', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('region', filtergroup, refreshGrid);
            this.manageExceptionGrid.addfilter('identItemId', filtergroup, refreshGrid);
            this.manageExceptionGrid.applyfilters();
            this.countryFilter.clearSelection();
            this.bottlingPartnerFilter.clearSelection();
            this.regionFilter.clearSelection();
            this.regionFilter.disabled(true);
            this.countryFilter.disabled(true);
            this.bottlingPartnerFilter.disabled(true);
            this.updateStatusbarResults();
        }
    };
    ManageExceptions.prototype.addAdvancedSearchFilter = function () {
        var refreshGrid = false;
        var filtergroup = new $.jqx.filter();
        filtergroup.operator = 'and';
        var filter_or_operator = 1;
        var filtercondition = 'contains';
        var spireNum = this.spireNumInput.val();
        var state = this.stateDropdown.val();
        var fromDate = this.fromDateInput.getRange(null);
        var toDate = this.toDateInput.getRange(null);
        var zipCode = this.zipcodeInput.val();
        var country = this.countryDropdown.val();
        var equipAsset = this.equipAssetInput.val();
        var bottlingPartner = this.bottlingPrtnrDropdown.val();
        var spireUnit = this.spireUnitDropdown.val();
        var cof = this.cofInput.val();
        var equipLoc = this.equipLocInput.val();
        var custName = this.customerNameInput.val();
        var nucSerialNo = this.nucSerialInput.val();
        var streetAdd = this.streetAddInput.val();
        var city = this.cityInput.val();
        var modemCarrier = this.modemCarrierDropdown.val();
        var modemSNo = this.modemSerialInput.val();
        var modemMake = this.modemMakeDropdown.val();
        var modemModel = this.modemModelDropdown.val();
        var modemLocation = this.modemLocationInput.val();
        var identItemId = this.identItemIdInput.val();
        this.manageExceptionGrid.clearfilters();
        if (spireNum) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', spireNum, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('spireSerialNumber', filtergroup, refreshGrid);
        }
        if (this.stateDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', state, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('state', filtergroup, refreshGrid);
        }
        if (fromDate && toDate) {
            filtergroup = new $.jqx.filter();
            filtergroup.operatotor = 'and';
            var filter_or_operator_date = 0;
            var filter1 = filtergroup.createfilter('datefilter', fromDate, 'GREATER_THAN_OR_EQUAL');
            filtergroup.addfilter(filter_or_operator_date, filter1);
            var filter2 = filtergroup.createfilter('datefilter', toDate, 'LESS_THAN_OR_EQUAL');
            filtergroup.addfilter(filter_or_operator_date, filter2);
            this.manageExceptionGrid.addfilter('date', filtergroup, refreshGrid);
        }
        if (zipCode) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', zipCode, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('postalCode', filtergroup, refreshGrid);
        }
        if (this.countryDropdown.selectedIndex() !== -1 && country !== 'All Countries') {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', country, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('country', filtergroup, refreshGrid);
        }
        if (equipAsset) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', equipAsset, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('assetNumber', filtergroup, refreshGrid);
        }
        if (this.bottlingPrtnrDropdown.selectedIndex() !== -1 && bottlingPartner !== 'All') {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', bottlingPartner, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('bottlingPartner', filtergroup, refreshGrid);
        }
        if (this.spireUnitDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', spireUnit, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('spireType', filtergroup, refreshGrid);
        }
        if (cof) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', cof, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('customerId', filtergroup, refreshGrid);
        }
        if (equipLoc) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', equipLoc, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('location', filtergroup, refreshGrid);
        }
        if (custName) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', custName, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('customerName', filtergroup, refreshGrid);
        }
        if (nucSerialNo) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', nucSerialNo, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('nucSerialNumber', filtergroup, refreshGrid);
        }
        if (modemSNo) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', modemSNo, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemSNo', filtergroup, refreshGrid);
        }
        if (this.modemCarrierDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', modemCarrier, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemCarrier', filtergroup, refreshGrid);
        }
        if (this.modemMakeDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', modemMake, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemMake', filtergroup, refreshGrid);
        }
        if (this.modemModelDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', modemModel, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemModel', filtergroup, refreshGrid);
        }
        if (modemLocation) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', modemLocation, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemLocation', filtergroup, refreshGrid);
        }
        if (streetAdd) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', streetAdd, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('streetAddress', filtergroup, refreshGrid);
        }
        if (city) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', city, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('city', filtergroup, refreshGrid);
        }
        if (identItemId) {
            filtergroup = new $.jqx.filter();
            var filter = filtergroup.createfilter('stringfilter', identItemId, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('identItemId', filtergroup, refreshGrid);
        }
        this.manageExceptionGrid.applyfilters();
        this.countryFilter.clearSelection();
        this.bottlingPartnerFilter.clearSelection();
        this.regionFilter.clearSelection();
        this.countryFilter.disabled(true);
        this.bottlingPartnerFilter.disabled(true);
        this.regionFilter.disabled(true);
        this.updateStatusbarResults();
    };
    ManageExceptions.prototype.addCountryFilter = function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                var value = item.value;
                this.showClearButtonMne(value);
                for (var i = 0; i < this.countryFilterList.length; i++) {
                    var country = this.countryFilterList[i];
                    if (country.countryName === value) {
                        this.bottlingPartnerFilterList = country.bottlingPartners;
                        this.bottlingPartnerFilterDataSource = this.getBottlingPartnerFilterDataSource();
                    }
                }
                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter_or_operator = 0;
                var filtervalue = value;
                var filtercondition = 'contains';
                if (value !== 'All Countries') {
                    this.bottlingPartnerFilter.disabled(false);
                    this.bottlingPartnerFilter.selectedIndex(0);
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    this.manageExceptionGrid.removefilter('country', false);
                    this.manageExceptionGrid.addfilter('country', filtergroup, true);
                }
                else {
                    this.regionFilter.disabled(true);
                    this.regionFilter.clearSelection();
                    this.bottlingPartnerFilter.disabled(false);
                    this.bottlingPartnerFilter.clearSelection();
                    this.manageExceptionGrid.removefilter('country', true);
                    this.manageExceptionGrid.removefilter('bottlingPartner', true);
                    this.manageExceptionGrid.removefilter('region', true);
                }
                this.updateStatusbarResults();
            }
        }
    };
    ManageExceptions.prototype.addBottlingPartnerFilter = function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                var value = item.value;
                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter_or_operator = 0;
                var filtervalue = value;
                var filtercondition = 'contains';
                if (value !== 'All') {
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    this.manageExceptionGrid.removefilter('bottlingPartner', false);
                    this.manageExceptionGrid.addfilter('bottlingPartner', filtergroup, true);
                    if (value === 'PBC') {
                        var countryDropdownVal = this.countryFilter.val();
                        for (var i = 0; i < this.countryFilterList.length; i++) {
                            var country = this.countryFilterList[i];
                            if (country.countryName === countryDropdownVal) {
                                this.regionFilterList = country.regions;
                                this.regionFilterDataSource = this.getRegionFilterDataSource();
                            }
                        }
                        this.regionFilter.disabled(false);
                    }
                    else {
                        this.manageExceptionGrid.removefilter('region', true);
                        this.regionFilter.disabled(true);
                        this.regionFilter.clearSelection();
                    }
                }
                else {
                    this.manageExceptionGrid.removefilter('bottlingPartner', true);
                }
                this.updateStatusbarResults();
            }
        }
    };
    ManageExceptions.prototype.addRegionFilter = function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                var value = item.value;
                var filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                var filter_or_operator = 0;
                var filtervalue = value;
                var filtercondition = 'contains';
                if (value !== 'All Regions') {
                    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    this.manageExceptionGrid.removefilter('region', false);
                    this.manageExceptionGrid.addfilter('region', filtergroup, true);
                }
                else {
                    this.manageExceptionGrid.removefilter('region', true);
                }
                this.updateStatusbarResults();
            }
        }
    };
    ManageExceptions.prototype.updateStatusbarResults = function () {
        var manageExceptionGridRows = this.manageExceptionGrid.getrows();
        this.totalExceptions = manageExceptionGridRows.length;
        var aaExcptns = 0;
        var installConfExcptns = 0;
        $.each(manageExceptionGridRows, function (index, value) {
            var recordType = value.type;
            if (recordType.indexOf('CETS') >= 0 || recordType.indexOf('IB') >= 0) {
                installConfExcptns++;
            }
            if (recordType.indexOf('AA')) {
                aaExcptns++;
            }
        });
        this.installConfExceptions = installConfExcptns;
        this.aaExceptions = aaExcptns;
    };
    ManageExceptions.prototype.resetFilters = function () {
        this.manageExceptionGrid.clearfilters();
        this.countryFilter.disabled(false);
        this.countryFilter.clearSelection();
        this.bottlingPartnerFilter.disabled(true);
        this.bottlingPartnerFilter.clearSelection();
        this.regionFilter.disabled(true);
        this.regionFilter.clearSelection();
        this.stateDropdown.disabled(true);
        this.bottlingPrtnrDropdown.disabled(true);
        this.updateStatusbarResults();
        this.showClearButtonMne(null);
    };
    ManageExceptions.prototype.onCountrySelect = function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                var value = item.value;
                this.showClearButtonMne(value);
                for (var i = 0; i < this.countryList.length; i++) {
                    var country = this.countryList[i];
                    if (country.countryName === value) {
                        this.stateList = country.states;
                        this.stateListDataSource = this.getStateListDataSource();
                        this.bottlingPartnerList = country.bottlingPartners;
                        this.bottlingPartnerListDataSource = this.getBottlingPartnerListDataSource();
                    }
                }
                if (value !== 'All Countries') {
                    this.bottlingPrtnrDropdown.disabled(false);
                    this.stateDropdown.disabled(false);
                }
                else {
                    this.bottlingPrtnrDropdown.disabled(true);
                    this.stateDropdown.disabled(true);
                }
            }
        }
    };
    ManageExceptions.prototype.toggleSearch = function () {
        this.manageExceptionReconSuccess = false;
        this.manageExceptionReconFailed = false;
        this.aaRequestInvalidSuccess = false;
        this.aaRequestInvalidFailed = false;
        this.nucSwapSuccess = false;
        this.nucSwapFailed = false;
        this.manageExceptionUnReconcileSuccess = false;
        this.manageExceptionUnReconcileFailed = false;
        this.toggleBasicAdv = !this.toggleBasicAdv;
        this.resetFilters();
    };
    ManageExceptions.prototype.showClearButtonMne = function (value) {
        if (!!value && value !== "All") {
            this.searchTextEntered = true;
        }
        else {
            this.searchTextEntered = false;
        }
    };
    ManageExceptions.prototype.showClearButtonDropDown = function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item.value) {
                this.searchTextEntered = true;
            }
            else {
                this.searchTextEntered = false;
            }
        }
    };
    return ManageExceptions;
}());
__decorate([
    BlockUI('manageExceptionPage'),
    __metadata("design:type", Object)
], ManageExceptions.prototype, "manageExceptionPage", void 0);
__decorate([
    ViewChild('manageExceptionsRef'),
    __metadata("design:type", jqxGridComponent)
], ManageExceptions.prototype, "manageExceptionGrid", void 0);
__decorate([
    ViewChild('countryFilterRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "countryFilter", void 0);
__decorate([
    ViewChild('bottlingPartnersFilterRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "bottlingPartnerFilter", void 0);
__decorate([
    ViewChild('regionRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "regionFilter", void 0);
__decorate([
    ViewChild('exportButtonMNE'),
    __metadata("design:type", jqxButtonComponent)
], ManageExceptions.prototype, "exportButtonNLE", void 0);
__decorate([
    ViewChild('searchInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "searchInput", void 0);
__decorate([
    ViewChild('stateRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "stateDropdown", void 0);
__decorate([
    ViewChild('countryRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "countryDropdown", void 0);
__decorate([
    ViewChild('bottlingPartnerRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "bottlingPrtnrDropdown", void 0);
__decorate([
    ViewChild('spireUnitRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "spireUnitDropdown", void 0);
__decorate([
    ViewChild('modemCarrierRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "modemCarrierDropdown", void 0);
__decorate([
    ViewChild('modemMakeRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "modemMakeDropdown", void 0);
__decorate([
    ViewChild('modemModelRefMNE'),
    __metadata("design:type", jqxDropDownListComponent)
], ManageExceptions.prototype, "modemModelDropdown", void 0);
__decorate([
    ViewChild('fromDateInputMNE'),
    __metadata("design:type", jqxDateTimeInputComponent)
], ManageExceptions.prototype, "fromDateInput", void 0);
__decorate([
    ViewChild('toDateInputMNE'),
    __metadata("design:type", jqxDateTimeInputComponent)
], ManageExceptions.prototype, "toDateInput", void 0);
__decorate([
    ViewChild('spireNumInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "spireNumInput", void 0);
__decorate([
    ViewChild('zipcodeInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "zipcodeInput", void 0);
__decorate([
    ViewChild('equipAssetInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "equipAssetInput", void 0);
__decorate([
    ViewChild('cofInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "cofInput", void 0);
__decorate([
    ViewChild('equipLocInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "equipLocInput", void 0);
__decorate([
    ViewChild('customerNameInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "customerNameInput", void 0);
__decorate([
    ViewChild('nucSerialInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "nucSerialInput", void 0);
__decorate([
    ViewChild('streetAddInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "streetAddInput", void 0);
__decorate([
    ViewChild('cityInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "cityInput", void 0);
__decorate([
    ViewChild('modemSerialInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "modemSerialInput", void 0);
__decorate([
    ViewChild('modemLocationInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "modemLocationInput", void 0);
__decorate([
    ViewChild('identItemIdInputMNE'),
    __metadata("design:type", jqxInputComponent)
], ManageExceptions.prototype, "identItemIdInput", void 0);
ManageExceptions = __decorate([
    Component({
        selector: 'manageExceptions',
        templateUrl: 'app/reconciliation/manageExceptions/manageexceptions.component.html',
        styleUrls: ['app/reconciliation/reconciliation.component.css']
    }),
    __metadata("design:paramtypes", [ManageExceptionService,
        ReconciliationService,
        InvestigateComponent,
        ReconciliationComponent,
        Util])
], ManageExceptions);
export { ManageExceptions };
//# sourceMappingURL=manageexceptions.component.js.map