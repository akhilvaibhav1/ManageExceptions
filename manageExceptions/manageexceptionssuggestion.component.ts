import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostBinding, Input } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ManageExceptionInvestigate } from '../manageExceptions/manageexceptionsinvestigate.component';
import { ManageExceptionService } from '../manageExceptions/service/manageexceptions.service';
import { ReconciliationComponent } from '../reconciliation.component';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ManageExceptions } from '../manageExceptions/manageexceptions.component';

import { jqxDropDownListComponent } from '../../../jqwidgets-ts/angular_jqxdropdownlist';
import { jqxDataTableComponent } from '../../../jqwidgets-ts/angular_jqxdatatable';
import { jqxGridComponent } from '../../../jqwidgets-ts/angular_jqxgrid';
import { jqxDateTimeInputComponent } from '../../../jqwidgets-ts/angular_jqxdatetimeinput';
import { forEach } from '@angular/router/src/utils/collection';
import { Array } from 'core-js/library/web/timers';

@Component({
    selector: 'manageExceptionsSuggestionsGrid',
    templateUrl: 'app/reconciliation/manageExceptions/manageexceptionssuggestion.component.html',
    styleUrls: ['app/reconciliation/reconciliation.component.css'],
})

export class ManageExceptionSuggestionComponent implements AfterViewInit {

    exports: [ManageExceptionSuggestionComponent];
    constructor(private mneInvestigateComponent: ManageExceptionInvestigate,
        private manageExceptionService: ManageExceptionService,
        private manageExceptions: ManageExceptions) {
    }

    @BlockUI('manageExceptionSubTabPage') manageExceptionSubTabPage: NgBlockUI
    suggestionColumns: any[];
    columngroups: any[] = [
        { text: '<b>Actions</b>', align: 'center', name: 'ActionButton' }
    ];
    suggestionsDataSrcList: any = [{}];
    warningsDataSrcList: any = [{}];
    unreconciledSuggestions: any[];
    suggestionMessage: string;
    @ViewChild('mnesuggestionsRef') suggestionDataGrid: jqxGridComponent;
    suggestionsFound: boolean;
    warningsFound: boolean;
    confirmReconciliationPage: boolean;
    suggestionMsgKeys: string[];
    warningMsgKeys: string[];
    editrow: number = -1;
    res : any;
    currentGrid: any = null;
    navigateFromNotLinked: boolean = false;
    suggestedRecordWithException: any;
    investigateClicked: boolean = false;
    nucSwapButton: any;
    unReconcileButton: any;
    investigateButton: any;
    suggestions: any;
    warnings: any;
    investigatedRecord: any;
    num : number = 200;

    //@Input() apiLoadFlag;

    loadSuggestions = (equipmentSuggested): any => {
        this.suggestionsFound = true;
        let source: any =
            {
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
        let dataAdapter: any = new $.jqx.dataAdapter(source)
        return dataAdapter;
    }

    loadWarnings = (warningEquipments): any => {
        this.warningsFound = true;
        let source: any =
            {
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
        let dataAdapter: any = new $.jqx.dataAdapter(source)
        return dataAdapter;
    }

    rowdetailstemplate: any = {
        rowdetails: '<div></div>',
        rowdetailsheight: 122
    }

    sugesstionDetail = (itemName, itemvalue, investigateComponentItemValue): any => {
        var childtdSuggestionsCSS = "font-family: 12px;text-align: left;vertical-align: central;margin: 2px;padding-left: 10px;padding-right: 10px;"
        var childtdSuggestionsHighlightCSS = "color: red;border: 1px dashed Red;background: #ffffff;";
        var boldFontCSS = "font-weight: bold;";
        let tdHtml: any = '<td style="' + childtdSuggestionsCSS + ' ' + boldFontCSS + '">' + itemName + '</td><td style="' + childtdSuggestionsCSS + '';
        if (itemvalue == null || itemvalue == "") {
            tdHtml += '">';
            tdHtml += ' - ';
        }
        else {
            if (this.checkMismatch(investigateComponentItemValue, itemvalue)) {
                tdHtml += ' ' + childtdSuggestionsHighlightCSS + '';
            }
            tdHtml += '">';
            tdHtml += '' + itemvalue + '';
        }
        tdHtml += '</td>';
        return tdHtml;
    }

    initrowdetails = (index: any, parentElement: any, gridElement: any, datarecord: any): void => {
        if (parentElement != undefined) {
            let information = parentElement.children[0];
            if (information != null) {
                let container = document.createElement('div');
                let leftcolumn = document.createElement('div');
                let rightcolumn = document.createElement('div');
                leftcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';
                rightcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';
                let childTable = document.createElement('table');
                childTable.width = '100%';
                var innerHtml = '';
                let rows1 = document.createElement('tr');
                innerHtml += (this.sugesstionDetail('Zip/Postal Code', datarecord.postalCode, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.postalCode));
                innerHtml += '<td style="width:50px"></td>';
                innerHtml += (this.sugesstionDetail('Modem Make', datarecord.modemMake, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.modemMake));
                rows1.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows1);

                innerHtml = '';
                let rows2 = document.createElement('tr');
                innerHtml += (this.sugesstionDetail('Equipment Asset#', datarecord.assetNumber, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.assetNumber));
                innerHtml += '<td style="width:50px"></td>';
                innerHtml += (this.sugesstionDetail('Modem Model', datarecord.modemModel, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.modemMake));
                rows2.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows2);

                innerHtml = ''
                let rows3 = document.createElement('tr');
                innerHtml += (this.sugesstionDetail('Spire Type', datarecord.spireType, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.spireType));
                innerHtml += '<td style="width:50px"></td>';
                innerHtml += (this.sugesstionDetail('Modem Location', datarecord.modemLocation, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.modemLocation));
                rows3.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows3);

                innerHtml = '';
                let rows4 = document.createElement('tr');
                innerHtml += (this.sugesstionDetail('Equipment Location', datarecord.location, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.location));
                innerHtml += '<td style="width:50px"></td>';
                innerHtml += (this.sugesstionDetail('Last SEN Data Upload', datarecord.lastSenDataUpload, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.lastSenDataUpload));
                rows4.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows4);

                innerHtml = '';
                let rows5 = document.createElement('tr');
                innerHtml += (this.sugesstionDetail('NUC Serial#', datarecord.nucSerialNumber, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.nucSerialNumber));
                innerHtml += '<td style="width:50px"></td>';
                innerHtml += (this.sugesstionDetail('Last Heartbeat Time', datarecord.lastHeartBeatTime, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.lastHeartBeatTime));
                rows5.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows5);

                innerHtml = '';
                let rows6 = document.createElement('tr');
                innerHtml += (this.sugesstionDetail('Modem Carrier', datarecord.modemCarrier, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.modemCarrier));
                innerHtml += '<td style="width:50px"></td>';
                innerHtml += (this.sugesstionDetail('Time Zone', datarecord.timeZone, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.timeZone));
                rows6.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows6);

                innerHtml = '';
                let rows7 = document.createElement('tr');
                innerHtml += (this.sugesstionDetail('Modem Serial #', datarecord.modemSNo, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.postalCode));
                innerHtml += '<td style="width:50px"></td>';
                innerHtml += (this.sugesstionDetail('Ident Item ID', datarecord.identItemId, this.mneInvestigateComponent.investigatedSpireEquipmentDetail.identItemId));
                rows7.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows7);
                innerHtml = '';
                container.appendChild(leftcolumn);
                container.appendChild(rightcolumn);
                container.appendChild(childTable);
                information.appendChild(container);
            }
        }
    }

    displaySuggestions() {
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
                    buttonclick: (row, event): void => {
                        this.resetButtonValues();
                        this.editrow = row;
                        let parentName = 'jqxgrid';
                        let parent = this.getSuggestionRow(event.target, parentName);
                        let dataInfo = $(this.currentGrid).jqxGrid('getrowdata', row);
                        if (dataInfo.nucSwapFlag == 'TRUE') {
                            this.mneInvestigateComponent.suggestionData = dataInfo;
                            this.mneInvestigateComponent.nucSwapClicked = true;
                            this.mneInvestigateComponent.confirmExceptionPage = true;
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
                    buttonclick: (row, event): void => {
                        this.resetButtonValues();
                        this.editrow = row;
                        let parentName = 'jqxgrid';
                        let parent = this.getSuggestionRow(event.target, parentName);
                        let dataInfo = $(this.currentGrid).jqxGrid('getrowdata', row);
                        if (dataInfo.status.toUpperCase() == 'UNRECONCILED') {
                            this.mneInvestigateComponent.suggestionData = dataInfo;
                            this.mneInvestigateComponent.reconcileClicked = true;
                            this.mneInvestigateComponent.confirmExceptionPage = true;
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
                    buttonclick: (row, event): void => {
                        this.resetButtonValues();
                        this.editrow = row;
                        let parentName = 'jqxgrid';
                        let parent = this.getSuggestionRow(event.target, parentName);
                        let dataInfo = $(this.currentGrid).jqxGrid('getrowdata', row);
                        if (dataInfo.status.toUpperCase() == 'RECONCILED') {
                            this.mneInvestigateComponent.suggestionData = dataInfo;
                            this.mneInvestigateComponent.unReconcileClicked = true;
                            this.mneInvestigateComponent.confirmExceptionPage = true;
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
                    buttonclick: (row, event): void => {
                        this.resetButtonValues();
                        this.editrow = row;
                        let parentName = 'jqxgrid';
                        let parent = this.getSuggestionRow(event.target, parentName);
                        let dataInfo = $(this.currentGrid).jqxGrid('getrowdata', row);
                        this.mneInvestigateComponent.suggestionData = dataInfo;
                        this.mneInvestigateComponent.investigateClicked = true;
                        this.mneInvestigateComponent.confirmExceptionPage = false;
                        this.mneInvestigateComponent.investigatedSpireEquipmentDetail = dataInfo;
                        this.mneInvestigateComponent.investigatedSpireEquipmentDetail.aaStsId = dataInfo.equipmentId;
                        this.mneInvestigateComponent.getExceptionEquipmentDataSource();
                        this.mneInvestigateComponent.displayInvestigatedRecord();
                        this.suggestionsDataSrcList = [{}];
                        if (this.mneInvestigateComponent.investigatedSpireEquipmentDetail.type === "AA Request") {
                            this.mneInvestigateComponent.actionBtnTxt = "Invalid";
                        }
                        else if (this.mneInvestigateComponent.investigatedSpireEquipmentDetail.type.toUpperCase() === "IBI FORM") {
                            this.mneInvestigateComponent.actionBtnTxt = "Edit";
                        }
                        this.ngAfterViewInit();
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
    }

    columnsrenderer = (value: any): any => {
        return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;">' + value + '</div>';
    };

    typeCellRenderer = (index, datafield, value, rowdata): string => {
        return '<div class="jqx-grid-cell-center-align">' + value + '</div>';
    }

    spireSerialNumberCellRenderer = (index, datafield, value, rowdata): string => {
        if (!!value && this.mneInvestigateComponent.investigatedSpireEquipmentDetail.spireSerialNumber !== value) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };

    autoActivationCellRenderer = (index, datafield, value, rowdata): string => {
        if (!!value && this.mneInvestigateComponent.investigatedSpireEquipmentDetail.date !== value) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };

    countryCellRenderer = (index, datafield, value, rowdata): string => {
        if (this.checkMismatch(this.mneInvestigateComponent.investigatedSpireEquipmentDetail.country, value)) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };

    bottlerRenderer = (index, datafield, value, rowdata): string => {
        if (this.checkMismatch(this.mneInvestigateComponent.investigatedSpireEquipmentDetail.bottlingPartner, value)) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };


    cofIDCellRenderer = (index, datafield, value, rowdata): string => {
        if (!!value && this.mneInvestigateComponent.investigatedSpireEquipmentDetail.customerId !== value) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };

    customerNameCellRenderer = (index, datafield, value, rowdata): string => {
        if (this.checkMismatch(this.mneInvestigateComponent.investigatedSpireEquipmentDetail.customerName, value)) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };

    streetAddressCellRenderer = (index, datafield, value, rowdata): string => {
        if (this.checkMismatch(this.mneInvestigateComponent.investigatedSpireEquipmentDetail.streetAddress, value)) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };

    cityCellRenderer = (index, datafield, value, rowdata): string => {
        if (this.checkMismatch(this.mneInvestigateComponent.investigatedSpireEquipmentDetail.city, value)) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };

    stateCellRenderer = (index, datafield, value, rowdata): string => {
        if (this.checkMismatch(this.mneInvestigateComponent.investigatedSpireEquipmentDetail.state, value)) {
            return '<div class="jqx-grid-cell-center-align suggestionGridHighlight">' + value + '</div>';
        }
        else {
            return '<div class="jqx-grid-cell-center-align suggestionGrid">' + value + '</div>';
        }
    };

    nucSwapCellButtonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        return 'NUC Swap';
    }

    unreconciledCellButtonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        return 'Un-Reconcile';
    }

    investigateCellButtonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        return 'Investigate';
    }

    reconcileCellButtonRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): string => {
        return 'Reconcile';
    }

    getSuggestionRow(element, searchkey) {
        if (element.tagName == searchkey.toUpperCase()) {
            this.currentGrid = element.firstChild;
            return element.firstChild;
        } else {
            this.getSuggestionRow(element.parentNode, searchkey)
        }
    }

    ngAfterViewInit() {
        
         this.manageExceptionSubTabPage.start('Loading...');
        this.manageExceptionService.getSuggestions(this.mneInvestigateComponent.spireSerialNumber,
            this.mneInvestigateComponent.aaStsId, this.mneInvestigateComponent.type, this.mneInvestigateComponent.nucSwapFlag).then(res => {

                // let res = {"suggCount":1,"warningCount":0,"archiveCount":8,"suggestions":{"This equipment has a previously associated NUC which is no longer reporting Telemetry":[{"equipmentId":"166","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"IBI Form","date":"12/11/2017 07:41:17 PM","country":"United States","bottlingPartner":"IBI","customerId":"2222","customerName":"changed8","streetAddress":"update1","city":"update2","state":"350","postalCode":"55553","assetNumber":"34343434","spireType":null,"location":"juyd","nucSerialNumber":"djyu","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":null,"modemSNo":"dyuj","modemMake":null,"modemModel":null,"modemLocation":"juyd","timeZone":null,"identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"12/11/2017 07:41 PM","suggestionMsg":"This equipment has a previously associated NUC which is no longer reporting Telemetry","suggestionCode":"Suggestion","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"}]},"warnings":{},"archive":{"Archive":[{"equipmentId":"122","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"CAN","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"86","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"United States","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"81","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"United States","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"108","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GEGKTEST5245","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"141","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"CAN","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"462","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"United States","bottlingPartner":"IBI","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":null,"spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GooEGK0001","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"121","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"CAN","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"464","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"United States","bottlingPartner":"IBI","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":null,"spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GooEGK0001","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"142","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"CAN","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"}]}};
                //  
                if (res.suggestions != null) {
                    this.mneInvestigateComponent.suggestionCount = res.suggCount;
                    this.suggestionMsgKeys = Object.keys(res.suggestions);
                    for (let eachKey of this.suggestionMsgKeys) {
                        this.suggestionsDataSrcList.push({
                            "dataAdapter": this.loadSuggestions(res.suggestions[eachKey]),
                            "title": res.suggestions[eachKey][0].suggestionMsg
                        });
                    }
                    //this.mneInvestigateComponent.mneInvestigateTab.selectedItem(1);
                }
                if (res.warnings != null) {
                    this.mneInvestigateComponent.warningCount = res.warningCount;
                    this.warningMsgKeys = Object.keys(res.warnings);
                    for (let eachKey of this.warningMsgKeys) {
                        this.warningsDataSrcList.push({
                            "dataAdapter": this.loadWarnings(res.warnings[eachKey]),
                            "title": eachKey
                        });
                    }
                    //this.mneInvestigateComponent.mneInvestigateTab.selectedItem(0);
                }
                if (this.suggestionsDataSrcList.length === 1) {
                    this.suggestionsFound = true;//to display empty grid
                    this.suggestionsDataSrcList = [{ "dataAdapter": {}, "title": "" }];
                }
                if (this.warningsDataSrcList.length === 1) {
                    this.warningsFound = true;//to display empty grid
                    this.warningsDataSrcList = [{ "dataAdapter": {}, "title": "" }];
                }
                // if (this.res.archive != null && Object.keys(this.res.archive).length !== 0) {
                //     this.mneInvestigateComponent.archiveRecord = this.res.archive.Archive[0];
                // }
                this.displaySuggestions();
                this.manageExceptionSubTabPage.stop();
               // this.mneInvestigateComponent.mneInvestigateTab.setTitleAt(0, "Suggestions (" + res.suggCount + ")");
            }).catch((err) => {
                console.log("Error Processing manageException getSuggestions", err);
                let res = {"suggCount":1,"warningCount":0,"archiveCount":8,"suggestions":{"This equipment has a previously associated NUC which is no longer reporting Telemetry":[{"equipmentId":"166","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"IBI Form","date":"12/11/2017 07:41:17 PM","country":"United States","bottlingPartner":"IBI","customerId":"2222","customerName":"changed8","streetAddress":"update1","city":"update2","state":"350","postalCode":"55553","assetNumber":"34343434","spireType":null,"location":"juyd","nucSerialNumber":"djyu","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":null,"modemSNo":"dyuj","modemMake":null,"modemModel":null,"modemLocation":"juyd","timeZone":null,"identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"12/11/2017 07:41 PM","suggestionMsg":"This equipment has a previously associated NUC which is no longer reporting Telemetry","suggestionCode":"Suggestion","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"}]},"warnings":{},"archive":{"Archive":[{"equipmentId":"122","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"CAN","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"86","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"United States","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"81","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"United States","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"108","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GEGKTEST5245","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"141","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"CAN","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"462","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"United States","bottlingPartner":"IBI","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":null,"spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GooEGK0001","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"121","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"CAN","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"464","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"United States","bottlingPartner":"IBI","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":null,"spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GooEGK0001","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"USA","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":"142","aaStsId":null,"formId":null,"spireSerialNumber":"TESTSERIALEQ102301","type":"AA Request","date":"03/11/2018 04:19:54 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"008854400722","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":"CAN","autoActivationTime":"03/11/2018 04:19 PM","suggestionMsg":null,"suggestionCode":"Archive","warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"}]}};
                 if (res.suggestions != null) {
                    this.mneInvestigateComponent.suggestionCount = res.suggCount;
                    this.suggestionMsgKeys = Object.keys(res.suggestions);
                    for (let eachKey of this.suggestionMsgKeys) {
                        this.suggestionsDataSrcList.push({
                            "dataAdapter": this.loadSuggestions(res.suggestions[eachKey]),
                            "title": res.suggestions[eachKey][0].suggestionMsg
                        });
                    }
                    this.mneInvestigateComponent.mneInvestigateTab.selectedItem(1);
                }
                if (res.warnings != null) {
                    this.mneInvestigateComponent.warningCount = res.warningCount;
                    this.warningMsgKeys = Object.keys(res.warnings);
                    for (let eachKey of this.warningMsgKeys) {
                        this.warningsDataSrcList.push({
                            "dataAdapter": this.loadWarnings(res.warnings[eachKey]),
                            "title": eachKey
                        });
                    }
                    this.mneInvestigateComponent.mneInvestigateTab.selectedItem(0);
                }
                if (this.suggestionsDataSrcList.length === 1) {
                    this.suggestionsFound = true;//to display empty grid
                    this.suggestionsDataSrcList = [{ "dataAdapter": {}, "title": "" }];
                }
                if (this.warningsDataSrcList.length === 1) {
                    this.warningsFound = true;//to display empty grid
                    this.warningsDataSrcList = [{ "dataAdapter": {}, "title": "" }];
                }
                // if (this.res.archive != null && Object.keys(this.res.archive).length !== 0) {
                //     this.mneInvestigateComponent.archiveRecord = this.res.archive.Archive[0];
                // }
                this.mneInvestigateComponent.mneInvestigateTab.setTitleAt(0, "Warnings (" + res.warningCount + ")");
                this.mneInvestigateComponent.mneInvestigateTab.setTitleAt(1, "Suggestions (" + res.suggCount + ")");

                this.displaySuggestions();
                this.manageExceptionSubTabPage.stop();
            });
    }

    resetButtonValues() {
        this.mneInvestigateComponent.nucSwapClicked = false;
        this.mneInvestigateComponent.reconcileClicked = false;
        this.mneInvestigateComponent.unReconcileClicked = false;
        this.mneInvestigateComponent.investigateClicked = false;
    }

    checkMismatch = (investigatedRecordValue: string, suggestedRecordValue: string): boolean => {
        return !!investigatedRecordValue && !!suggestedRecordValue && investigatedRecordValue.toUpperCase() !== suggestedRecordValue.toUpperCase();
    };
}