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
import { ManageExceptionInvestigate } from '../manageExceptions/manageexceptionsinvestigate.component';
import { ManageExceptionService } from '../manageExceptions/service/manageexceptions.service';
import { ManageExceptions } from '../manageExceptions/manageexceptions.component';
import { jqxGridComponent } from '../../../jqwidgets-ts/angular_jqxgrid';
var ManageExceptionSuggestionComponent = (function () {
    function ManageExceptionSuggestionComponent(mneInvestigateComponent, manageExceptionService, manageExceptions) {
        var _this = this;
        this.mneInvestigateComponent = mneInvestigateComponent;
        this.manageExceptionService = manageExceptionService;
        this.manageExceptions = manageExceptions;
        this.columngroups = [
            { text: '<b>Actions</b>', align: 'center', name: 'ActionButton' }
        ];
        this.suggestionsDataSrcList = [{}];
        this.warningsDataSrcList = [{}];
        this.editrow = -1;
        this.currentGrid = null;
        this.navigateFromNotLinked = false;
        this.investigateClicked = false;
        this.num = 200;
        this.loadSuggestions = function (equipmentSuggested) {
            _this.suggestionsFound = true;
            var source = {
                localdata: equipmentSuggested,
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
                    { name: 'suggestion', type: 'string' },
                    { name: 'aaStsId', type: 'string' },
                    { name: 'equipmentId', type: 'string' },
                    { name: 'nucSwapFlag', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'identItemId', type: 'string' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.loadWarnings = function (warningEquipments) {
            _this.warningsFound = true;
            var source = {
                localdata: warningEquipments,
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
                    { name: 'suggestion', type: 'string' },
                    { name: 'aaStsId', type: 'string' },
                    { name: 'equipmentId', type: 'string' },
                    { name: 'nucSwapFlag', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'identItemId', type: 'string' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            return dataAdapter;
        };
        this.rowdetailstemplate = {
            rowdetails: '<div></div>',
            rowdetailsheight: 122
        };
        this.sugesstionDetail = function (itemName, itemvalue, investigateComponentItemValue) {
            var childtdSuggestionsCSS = "font-family: 12px;text-align: left;vertical-align: central;margin: 2px;padding-left: 10px;padding-right: 10px;";
            var childtdSuggestionsHighlightCSS = "color: red;border: 1px dashed Red;background: #ffffff;";
            var boldFontCSS = "font-weight: bold;";
            var tdHtml = '<td style="' + childtdSuggestionsCSS + ' ' + boldFontCSS + '">' + itemName + '</td><td style="' + childtdSuggestionsCSS + '';
            if (itemvalue == null || itemvalue == "") {
                tdHtml += '">';
                tdHtml += ' - ';
            }
            else {
                if (_this.checkMismatch(investigateComponentItemValue, itemvalue)) {
                    tdHtml += ' ' + childtdSuggestionsHighlightCSS + '';
                }
                tdHtml += '">';
                tdHtml += '' + itemvalue + '';
            }
            tdHtml += '</td>';
            return tdHtml;
        };
        this.initrowdetails = function (index, parentElement, gridElement, datarecord) {
            if (parentElement != undefined) {
                var information = parentElement.children[0];
                if (information != null) {
                    var container = document.createElement('div');
                    var leftcolumn = document.createElement('div');
                    var rightcolumn = document.createElement('div');
                    leftcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';
                    rightcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';
                    var childTable = document.createElement('table');
                    childTable.width = '100%';
                    var innerHtml = '';
                    var rows1 = document.createElement('tr');
                    innerHtml += (_this.sugesstionDetail('Zip/Postal Code', datarecord.postalCode, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.postalCode));
                    innerHtml += '<td style="width:50px"></td>';
                    innerHtml += (_this.sugesstionDetail('Modem Make', datarecord.modemMake, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.modemMake));
                    rows1.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows1);
                    innerHtml = '';
                    var rows2 = document.createElement('tr');
                    innerHtml += (_this.sugesstionDetail('Equipment Asset#', datarecord.assetNumber, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.assetNumber));
                    innerHtml += '<td style="width:50px"></td>';
                    innerHtml += (_this.sugesstionDetail('Modem Model', datarecord.modemModel, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.modemMake));
                    rows2.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows2);
                    innerHtml = '';
                    var rows3 = document.createElement('tr');
                    innerHtml += (_this.sugesstionDetail('Spire Type', datarecord.spireType, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.spireType));
                    innerHtml += '<td style="width:50px"></td>';
                    innerHtml += (_this.sugesstionDetail('Modem Location', datarecord.modemLocation, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.modemLocation));
                    rows3.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows3);
                    innerHtml = '';
                    var rows4 = document.createElement('tr');
                    innerHtml += (_this.sugesstionDetail('Equipment Location', datarecord.location, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.location));
                    innerHtml += '<td style="width:50px"></td>';
                    innerHtml += (_this.sugesstionDetail('Last SEN Data Upload', datarecord.lastSenDataUpload, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.lastSenDataUpload));
                    rows4.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows4);
                    innerHtml = '';
                    var rows5 = document.createElement('tr');
                    innerHtml += (_this.sugesstionDetail('NUC Serial#', datarecord.nucSerialNumber, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.nucSerialNumber));
                    innerHtml += '<td style="width:50px"></td>';
                    innerHtml += (_this.sugesstionDetail('Last Heartbeat Time', datarecord.lastHeartBeatTime, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.lastHeartBeatTime));
                    rows5.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows5);
                    innerHtml = '';
                    var rows6 = document.createElement('tr');
                    innerHtml += (_this.sugesstionDetail('Modem Carrier', datarecord.modemCarrier, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.modemCarrier));
                    innerHtml += '<td style="width:50px"></td>';
                    innerHtml += (_this.sugesstionDetail('Time Zone', datarecord.timeZone, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.timeZone));
                    rows6.insertAdjacentHTML('beforeend', innerHtml);
                    childTable.appendChild(rows6);
                    innerHtml = '';
                    var rows7 = document.createElement('tr');
                    innerHtml += (_this.sugesstionDetail('Modem Serial #', datarecord.modemSNo, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.postalCode));
                    innerHtml += '<td style="width:50px"></td>';
                    innerHtml += (_this.sugesstionDetail('Ident Item ID', datarecord.identItemId, _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.identItemId));
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
        this.columnsrenderer = function (value) {
            return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;">' + value + '</div>';
        };
        this.typeCellRenderer = function (index, datafield, value, rowdata) {
            return '<div class="jqx-grid-cell-center-align">' + value + '</div>';
        };
        this.spireSerialNumberCellRenderer = function (index, datafield, value, rowdata) {
            if (!!value && _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.spireSerialNumber !== value) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.autoActivationCellRenderer = function (index, datafield, value, rowdata) {
            if (!!value && _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.date !== value) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.countryCellRenderer = function (index, datafield, value, rowdata) {
            if (_this.checkMismatch(_this.mneInvestigateComponent.investigatedSpireEquipmentDetail.country, value)) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.bottlerRenderer = function (index, datafield, value, rowdata) {
            if (_this.checkMismatch(_this.mneInvestigateComponent.investigatedSpireEquipmentDetail.bottlingPartner, value)) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.cofIDCellRenderer = function (index, datafield, value, rowdata) {
            if (!!value && _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.customerId !== value) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.customerNameCellRenderer = function (index, datafield, value, rowdata) {
            if (_this.checkMismatch(_this.mneInvestigateComponent.investigatedSpireEquipmentDetail.customerName, value)) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.streetAddressCellRenderer = function (index, datafield, value, rowdata) {
            if (_this.checkMismatch(_this.mneInvestigateComponent.investigatedSpireEquipmentDetail.streetAddress, value)) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.cityCellRenderer = function (index, datafield, value, rowdata) {
            if (_this.checkMismatch(_this.mneInvestigateComponent.investigatedSpireEquipmentDetail.city, value)) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.stateCellRenderer = function (index, datafield, value, rowdata) {
            if (_this.checkMismatch(_this.mneInvestigateComponent.investigatedSpireEquipmentDetail.state, value)) {
                return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
            }
            else {
                return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
            }
        };
        this.nucSwapCellButtonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            return 'NUC Swap';
        };
        this.unreconciledCellButtonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            return 'Un-Reconcile';
        };
        this.investigateCellButtonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            return 'Investigate';
        };
        this.reconcileCellButtonRenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
            return 'Reconcile';
        };
        this.checkMismatch = function (investigatedRecordValue, suggestedRecordValue) {
            return !!investigatedRecordValue && !!suggestedRecordValue && investigatedRecordValue.toUpperCase() !== suggestedRecordValue.toUpperCase();
        };
    }
    ManageExceptionSuggestionComponent.prototype.displaySuggestions = function () {
        var _this = this;
        this.suggestionColumns =
            [
                { text: 'Type', datafield: 'type', width: '7%', renderer: this.columnsrenderer, cellsrenderer: this.typeCellRenderer },
                { text: 'Spire Serial #', datafield: 'spireSerialNumber', width: '13%', renderer: this.columnsrenderer, cellsrenderer: this.spireSerialNumberCellRenderer },
                { text: 'Install <br /> Completion Date', datafield: 'date', width: '14%', renderer: this.columnsrenderer, cellsrenderer: this.autoActivationCellRenderer },
                { text: 'Country', datafield: 'country', width: '6%', cellsformat: 'center', renderer: this.columnsrenderer, cellsrenderer: this.countryCellRenderer },
                { text: 'Bottling <br /> Partner', datafield: 'bottlingPartner', width: '7%', renderer: this.columnsrenderer, cellsrenderer: this.bottlerRenderer },
                { text: 'COF#/<br/>Cust ID', datafield: 'customerId', width: '8%', renderer: this.columnsrenderer, cellsrenderer: this.cofIDCellRenderer },
                { text: 'Customer <br /> Name', datafield: 'customerName', width: '10%', renderer: this.columnsrenderer, cellsrenderer: this.customerNameCellRenderer },
                { text: 'Street Address', datafield: 'streetAddress', width: '11%', renderer: this.columnsrenderer, cellsrenderer: this.streetAddressCellRenderer },
                { text: 'City', datafield: 'city', width: '9%', renderer: this.columnsrenderer, cellsrenderer: this.cityCellRenderer },
                { text: 'State', datafield: 'state', width: '5%', renderer: this.columnsrenderer, cellsrenderer: this.stateCellRenderer },
                {
                    text: '', columngroup: 'ActionButton', datafield: null, width: '10%', renderer: this.columnsrenderer,
                    cellsrenderer: this.nucSwapCellButtonRenderer,
                    columnType: "button",
                    buttonclick: function (row, event) {
                        _this.resetButtonValues();
                        _this.editrow = row;
                        var parentName = 'jqxgrid';
                        var parent = _this.getSuggestionRow(event.target, parentName);
                        var dataInfo = $(_this.currentGrid).jqxGrid('getrowdata', row);
                        if (dataInfo.nucSwapFlag == 'TRUE') {
                            _this.mneInvestigateComponent.suggestionData = dataInfo;
                            _this.mneInvestigateComponent.nucSwapClicked = true;
                            _this.mneInvestigateComponent.confirmExceptionPage = true;
                        }
                        else {
                            return;
                        }
                    }
                },
                {
                    text: '', datafield: null, width: '10%', renderer: this.columnsrenderer,
                    cellsrenderer: this.reconcileCellButtonRenderer, columngroup: 'ActionButton',
                    columnType: "button",
                    buttonclick: function (row, event) {
                        _this.resetButtonValues();
                        _this.editrow = row;
                        var parentName = 'jqxgrid';
                        var parent = _this.getSuggestionRow(event.target, parentName);
                        var dataInfo = $(_this.currentGrid).jqxGrid('getrowdata', row);
                        if (dataInfo.status.toUpperCase() == 'UNRECONCILED') {
                            _this.mneInvestigateComponent.suggestionData = dataInfo;
                            _this.mneInvestigateComponent.reconcileClicked = true;
                            _this.mneInvestigateComponent.confirmExceptionPage = true;
                        }
                        else {
                            return;
                        }
                    }
                },
                {
                    text: '', datafield: null, width: '10%', renderer: this.columnsrenderer,
                    cellsrenderer: this.unreconciledCellButtonRenderer, columngroup: 'ActionButton',
                    columnType: "button",
                    buttonclick: function (row, event) {
                        _this.resetButtonValues();
                        _this.editrow = row;
                        var parentName = 'jqxgrid';
                        var parent = _this.getSuggestionRow(event.target, parentName);
                        var dataInfo = $(_this.currentGrid).jqxGrid('getrowdata', row);
                        if (dataInfo.status.toUpperCase() == 'RECONCILED') {
                            _this.mneInvestigateComponent.suggestionData = dataInfo;
                            _this.mneInvestigateComponent.unReconcileClicked = true;
                            _this.mneInvestigateComponent.confirmExceptionPage = true;
                        }
                        else {
                            return;
                        }
                    },
                },
                {
                    text: '', datafield: null, width: '10%', renderer: this.columnsrenderer,
                    cellsrenderer: this.investigateCellButtonRenderer, columngroup: 'ActionButton',
                    columnType: "button",
                    buttonclick: function (row, event) {
                        _this.resetButtonValues();
                        _this.editrow = row;
                        var parentName = 'jqxgrid';
                        var parent = _this.getSuggestionRow(event.target, parentName);
                        var dataInfo = $(_this.currentGrid).jqxGrid('getrowdata', row);
                        _this.mneInvestigateComponent.suggestionData = dataInfo;
                        _this.mneInvestigateComponent.investigateClicked = true;
                        _this.mneInvestigateComponent.confirmExceptionPage = false;
                        _this.mneInvestigateComponent.investigatedSpireEquipmentDetail = dataInfo;
                        _this.mneInvestigateComponent.investigatedSpireEquipmentDetail.aaStsId = dataInfo.equipmentId;
                        _this.mneInvestigateComponent.getExceptionEquipmentDataSource();
                        _this.mneInvestigateComponent.displayInvestigatedRecord();
                        _this.suggestionsDataSrcList = [{}];
                        if (_this.mneInvestigateComponent.investigatedSpireEquipmentDetail.type === "AA Request") {
                            _this.mneInvestigateComponent.actionBtnTxt = "Invalid";
                        }
                        else if (_this.mneInvestigateComponent.investigatedSpireEquipmentDetail.type.toUpperCase() === "IBI FORM") {
                            _this.mneInvestigateComponent.actionBtnTxt = "Edit";
                        }
                        _this.ngAfterViewInit();
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
                { text: 'Investigate', datafield: 'investigateFlag', width: '5%', hidden: 'true' },
                { text: 'Suggestion Message', dataField: 'suggestion', hidden: 'true' },
                { text: 'Equipment ID', dataField: 'equipmentId', hidden: 'true' },
                { text: 'AA Status ID', dataField: 'aaStsId', hidden: 'true' },
                { text: 'NUC Swap Flag', dataField: 'nucSwapFlag', hidden: 'true' },
                { text: 'Status', dataField: 'status', hidden: 'true' }
            ];
    };
    ManageExceptionSuggestionComponent.prototype.getSuggestionRow = function (element, searchkey) {
        if (element.tagName == searchkey.toUpperCase()) {
            this.currentGrid = element.firstChild;
            return element.firstChild;
        }
        else {
            this.getSuggestionRow(element.parentNode, searchkey);
        }
    };
    ManageExceptionSuggestionComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.manageExceptionSubTabPage.start('Loading...');
        this.manageExceptionService.getSuggestions(this.mneInvestigateComponent.spireSerialNumber, this.mneInvestigateComponent.aaStsId, this.mneInvestigateComponent.type, this.mneInvestigateComponent.nucSwapFlag).then(function (res) {
            if (res.suggestions != null) {
                _this.mneInvestigateComponent.suggestionCount = res.suggCount;
                _this.suggestionMsgKeys = Object.keys(res.suggestions);
                for (var _i = 0, _a = _this.suggestionMsgKeys; _i < _a.length; _i++) {
                    var eachKey = _a[_i];
                    _this.suggestionsDataSrcList.push({
                        "dataAdapter": _this.loadSuggestions(res.suggestions[eachKey]),
                        "title": res.suggestions[eachKey][0].suggestionMsg
                    });
                }
            }
            if (res.warnings != null) {
                _this.mneInvestigateComponent.warningCount = res.warningCount;
                _this.warningMsgKeys = Object.keys(res.warnings);
                for (var _b = 0, _c = _this.warningMsgKeys; _b < _c.length; _b++) {
                    var eachKey = _c[_b];
                    _this.warningsDataSrcList.push({
                        "dataAdapter": _this.loadWarnings(res.warnings[eachKey]),
                        "title": eachKey
                    });
                }
            }
            if (_this.suggestionsDataSrcList.length === 1) {
                _this.suggestionsFound = true;
                _this.suggestionsDataSrcList = [{ "dataAdapter": {}, "title": "" }];
            }
            if (_this.warningsDataSrcList.length === 1) {
                _this.warningsFound = true;
                _this.warningsDataSrcList = [{ "dataAdapter": {}, "title": "" }];
            }
            _this.displaySuggestions();
            _this.manageExceptionSubTabPage.stop();
        }).catch(function (err) {
            console.log("Error Processing manageException getSuggestions", err);
            var res = { "suggCount": 1, "warningCount": 0, "archiveCount": 8, "suggestions": { "This equipment has a previously associated NUC which is no longer reporting Telemetry": [{ "equipmentId": "166", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "IBI Form", "date": "12/11/2017 07:41:17 PM", "country": "United States", "bottlingPartner": "IBI", "customerId": "2222", "customerName": "changed8", "streetAddress": "update1", "city": "update2", "state": "350", "postalCode": "55553", "assetNumber": "34343434", "spireType": null, "location": "juyd", "nucSerialNumber": "djyu", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": null, "modemSNo": "dyuj", "modemMake": null, "modemModel": null, "modemLocation": "juyd", "timeZone": null, "identItemId": null, "region": null, "countryShortName": "USA", "autoActivationTime": "12/11/2017 07:41 PM", "suggestionMsg": "This equipment has a previously associated NUC which is no longer reporting Telemetry", "suggestionCode": "Suggestion", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }] }, "warnings": {}, "archive": { "Archive": [{ "equipmentId": "122", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "AA Request", "date": "03/11/2018 04:19:54 PM", "country": "Canada", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "102", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "008854400722", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": "CAN", "autoActivationTime": "03/11/2018 04:19 PM", "suggestionMsg": null, "suggestionCode": "Archive", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }, { "equipmentId": "86", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "AA Request", "date": "03/11/2018 04:19:54 PM", "country": "United States", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "102", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "008854400722", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": "USA", "autoActivationTime": "03/11/2018 04:19 PM", "suggestionMsg": null, "suggestionCode": "Archive", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }, { "equipmentId": "81", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "AA Request", "date": "03/11/2018 04:19:54 PM", "country": "United States", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "108", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "GEGKTEST5245", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": "USA", "autoActivationTime": "03/11/2018 04:19 PM", "suggestionMsg": null, "suggestionCode": "Archive", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }, { "equipmentId": "141", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "AA Request", "date": "03/11/2018 04:19:54 PM", "country": "Canada", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "102", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "008854400722", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": "CAN", "autoActivationTime": "03/11/2018 04:19 PM", "suggestionMsg": null, "suggestionCode": "Archive", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }, { "equipmentId": "462", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "AA Request", "date": "03/11/2018 04:19:54 PM", "country": "United States", "bottlingPartner": "IBI", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": null, "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "GooEGK0001", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": "USA", "autoActivationTime": "03/11/2018 04:19 PM", "suggestionMsg": null, "suggestionCode": "Archive", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }, { "equipmentId": "121", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "AA Request", "date": "03/11/2018 04:19:54 PM", "country": "Canada", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "102", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "008854400722", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": "CAN", "autoActivationTime": "03/11/2018 04:19 PM", "suggestionMsg": null, "suggestionCode": "Archive", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }, { "equipmentId": "464", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "AA Request", "date": "03/11/2018 04:19:54 PM", "country": "United States", "bottlingPartner": "IBI", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": null, "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "GooEGK0001", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": "USA", "autoActivationTime": "03/11/2018 04:19 PM", "suggestionMsg": null, "suggestionCode": "Archive", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }, { "equipmentId": "142", "aaStsId": null, "formId": null, "spireSerialNumber": "TESTSERIALEQ102301", "type": "AA Request", "date": "03/11/2018 04:19:54 PM", "country": "Canada", "bottlingPartner": "PBC", "customerId": "1111", "customerName": "SEN PepsiCo", "streetAddress": "1129 Westchester Avenue", "city": "White Plains", "state": "NY", "postalCode": "10604", "assetNumber": "102", "spireType": "Spire 2", "location": "First Floor", "nucSerialNumber": "008854400722", "lastSenDataUpload": null, "lastHeartBeatTime": null, "formReceivedDate": null, "modemCarrier": "AT&T", "modemSNo": "123123123", "modemMake": "MULTI TECH SYSTEMS", "modemModel": "MTModem", "modemLocation": "First Floor", "timeZone": "GMT-07:00", "identItemId": null, "region": null, "countryShortName": "CAN", "autoActivationTime": "03/11/2018 04:19 PM", "suggestionMsg": null, "suggestionCode": "Archive", "warningMsg": null, "investigateFlag": "TRUE", "nucSwapFlag": "TRUE", "status": "Reconciled" }] } };
            if (res.suggestions != null) {
                _this.mneInvestigateComponent.suggestionCount = res.suggCount;
                _this.suggestionMsgKeys = Object.keys(res.suggestions);
                for (var _i = 0, _a = _this.suggestionMsgKeys; _i < _a.length; _i++) {
                    var eachKey = _a[_i];
                    _this.suggestionsDataSrcList.push({
                        "dataAdapter": _this.loadSuggestions(res.suggestions[eachKey]),
                        "title": res.suggestions[eachKey][0].suggestionMsg
                    });
                }
                _this.mneInvestigateComponent.mneInvestigateTab.selectedItem(1);
            }
            if (res.warnings != null) {
                _this.mneInvestigateComponent.warningCount = res.warningCount;
                _this.warningMsgKeys = Object.keys(res.warnings);
                for (var _b = 0, _c = _this.warningMsgKeys; _b < _c.length; _b++) {
                    var eachKey = _c[_b];
                    _this.warningsDataSrcList.push({
                        "dataAdapter": _this.loadWarnings(res.warnings[eachKey]),
                        "title": eachKey
                    });
                }
                _this.mneInvestigateComponent.mneInvestigateTab.selectedItem(0);
            }
            if (_this.suggestionsDataSrcList.length === 1) {
                _this.suggestionsFound = true;
                _this.suggestionsDataSrcList = [{ "dataAdapter": {}, "title": "" }];
            }
            if (_this.warningsDataSrcList.length === 1) {
                _this.warningsFound = true;
                _this.warningsDataSrcList = [{ "dataAdapter": {}, "title": "" }];
            }
            _this.mneInvestigateComponent.mneInvestigateTab.setTitleAt(0, "Warnings (" + res.warningCount + ")");
            _this.mneInvestigateComponent.mneInvestigateTab.setTitleAt(1, "Suggestions (" + res.suggCount + ")");
            _this.displaySuggestions();
            _this.manageExceptionSubTabPage.stop();
        });
    };
    ManageExceptionSuggestionComponent.prototype.resetButtonValues = function () {
        this.mneInvestigateComponent.nucSwapClicked = false;
        this.mneInvestigateComponent.reconcileClicked = false;
        this.mneInvestigateComponent.unReconcileClicked = false;
        this.mneInvestigateComponent.investigateClicked = false;
    };
    return ManageExceptionSuggestionComponent;
}());
__decorate([
    BlockUI('manageExceptionSubTabPage'),
    __metadata("design:type", Object)
], ManageExceptionSuggestionComponent.prototype, "manageExceptionSubTabPage", void 0);
__decorate([
    ViewChild('mnesuggestionsRef'),
    __metadata("design:type", jqxGridComponent)
], ManageExceptionSuggestionComponent.prototype, "suggestionDataGrid", void 0);
ManageExceptionSuggestionComponent = __decorate([
    Component({
        selector: 'manageExceptionsSuggestionsGrid',
        templateUrl: 'app/reconciliation/manageExceptions/manageexceptionssuggestion.component.html',
        styleUrls: ['app/reconciliation/reconciliation.component.css'],
    }),
    __metadata("design:paramtypes", [ManageExceptionInvestigate,
        ManageExceptionService,
        ManageExceptions])
], ManageExceptionSuggestionComponent);
export { ManageExceptionSuggestionComponent };
//# sourceMappingURL=manageexceptionssuggestion.component.js.map