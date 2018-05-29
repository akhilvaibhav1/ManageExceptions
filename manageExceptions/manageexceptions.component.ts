import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Util } from '../../util/util.service';
import { ManageExceptionService } from '../manageExceptions/service/manageexceptions.service';
import { ReconciliationService } from '../../services/reconciliation.service';
import { InvestigateComponent } from '../unReconciledEquipment/unreconciledinvestigate.component';
import { NotLinkedSuggestionComponent } from '../notLinkedToEquipment/notlinkedsuggestion.component';
import { SuggestionComponent } from '../unReconciledEquipment/unreconciledsuggestion.component';
import { ReconciliationComponent } from '../reconciliation.component';

import { jqxGridComponent } from '../../../jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from '../../../jqwidgets-ts/angular_jqxbuttons';
import { jqxInputComponent } from '../../../jqwidgets-ts/angular_jqxinput';
import { jqxDropDownListComponent } from '../../../jqwidgets-ts/angular_jqxdropdownlist';
import { jqxDateTimeInputComponent } from '../../../jqwidgets-ts/angular_jqxdatetimeinput';

@Component({
    selector: 'manageExceptions',
    templateUrl: 'app/reconciliation/manageExceptions/manageexceptions.component.html',
    styleUrls: ['app/reconciliation/reconciliation.component.css']
})
export class ManageExceptions implements OnInit {

    toggleBasicAdv = true;
    totalExceptions = 0;
    aaExceptions = 0;
    installConfExceptions = 0;
    initialLoad = true;
    @BlockUI('manageExceptionPage') manageExceptionPage: NgBlockUI;
    manageExceptionInvestigatePage: boolean;
    exceptionEquipmentDataSource: any;
    exceptionEquipments: any;
    selectedRow: any;
    countryFilterList: any;
    countryFilterDataSource: any;
    bottlingPartnerFilterList: any;
    bottlingPartnerFilterDataSource: any;
    regionFilterList: any;
    regionFilterDataSource: any;
    stateList: any;
    stateListDataSource: any;
    modemCarrierList: any;
    modemCarrierListDataSource: any;
    modemMakeList: any;
    modemMakeListDataSource: any;
    modemModelList: any;
    modemModelListDataSource: any;
    spireTypeList: any;
    spireTypeDataSource: any;
    countryList: any;
    countryListDataSource: any;
    bottlingPartnerList: any;
    bottlingPartnerListDataSource: any;
    searchRequest: any = {};
    isNucSwap: boolean = false;

    @ViewChild('manageExceptionsRef') manageExceptionGrid: jqxGridComponent;
    @ViewChild('countryFilterRefMNE') countryFilter: jqxDropDownListComponent;
    @ViewChild('bottlingPartnersFilterRefMNE') bottlingPartnerFilter: jqxDropDownListComponent;
    @ViewChild('regionRefMNE') regionFilter: jqxDropDownListComponent;
    @ViewChild('exportButtonMNE') exportButtonNLE: jqxButtonComponent;
    @ViewChild('searchInputMNE') searchInput: jqxInputComponent;
    @ViewChild('stateRefMNE') stateDropdown: jqxDropDownListComponent;
    @ViewChild('countryRefMNE') countryDropdown: jqxDropDownListComponent;
    @ViewChild('bottlingPartnerRefMNE') bottlingPrtnrDropdown: jqxDropDownListComponent;
    @ViewChild('spireUnitRefMNE') spireUnitDropdown: jqxDropDownListComponent;
    @ViewChild('modemCarrierRefMNE') modemCarrierDropdown: jqxDropDownListComponent;
    @ViewChild('modemMakeRefMNE') modemMakeDropdown: jqxDropDownListComponent;
    @ViewChild('modemModelRefMNE') modemModelDropdown: jqxDropDownListComponent;
    @ViewChild('fromDateInputMNE') fromDateInput: jqxDateTimeInputComponent;
    @ViewChild('toDateInputMNE') toDateInput: jqxDateTimeInputComponent;
    @ViewChild('spireNumInputMNE') spireNumInput: jqxInputComponent;
    @ViewChild('zipcodeInputMNE') zipcodeInput: jqxInputComponent;
    @ViewChild('equipAssetInputMNE') equipAssetInput: jqxInputComponent;
    @ViewChild('cofInputMNE') cofInput: jqxInputComponent;
    @ViewChild('equipLocInputMNE') equipLocInput: jqxInputComponent;
    @ViewChild('customerNameInputMNE') customerNameInput: jqxInputComponent;
    @ViewChild('nucSerialInputMNE') nucSerialInput: jqxInputComponent;
    @ViewChild('streetAddInputMNE') streetAddInput: jqxInputComponent;
    @ViewChild('cityInputMNE') cityInput: jqxInputComponent;
    @ViewChild('modemSerialInputMNE') modemSerialInput: jqxInputComponent;
    @ViewChild('modemLocationInputMNE') modemLocationInput: jqxInputComponent;
    @ViewChild('identItemIdInputMNE') identItemIdInput: jqxInputComponent;

    spireSerialNumber: any;
    manageExceptionReconSuccess: boolean;
    manageExceptionReconFailed: boolean;
    nucSwapSuccess: boolean;
    nucSwapFailed: boolean;
    manageExceptionUnReconcileSuccess: boolean;
    manageExceptionUnReconcileFailed: boolean;
    aaRequestInvalidSuccess: boolean;
    aaRequestInvalidFailed: boolean;

    constructor(private manageExceptionService: ManageExceptionService,
        private reconService: ReconciliationService,
        private unreconciledComponent: InvestigateComponent,
        private reconComponent: ReconciliationComponent,
        private util: Util) {
    }

    ngOnInit() {
        if (this.unreconciledComponent.manageExceptionInvestigatePage == true) {
            //this.manageExceptionInvestigatePage = true;
            this.reconComponent.showInvestigate = true;
        }
    }

    columnsrenderer = (value: any): any => {
        return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;">' + value + '</div>';
    };

    statusCellsRenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata): any => {
        if (rowdata.status.toUpperCase() === "RECONCILED") {
            return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;"><img src="app/images/reconciledSmall.png" /></div>';
        }
        else {
            return '<div style="text-align: center; font-weight:bold; margin-top: 5px; height:100%; width:100%; vertical-align: bottom;"><img src="app/images/unreconciledSmall.png" /></div>';
        }
    };

    exceptionEquipmentColumns =
        [
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
                cellsrenderer: (value: any): string => {
                    return ' Investigate ';
                },
                buttonclick: (row: number): void => {
                    this.manageExceptionReconSuccess = false;
                    this.manageExceptionReconFailed = false;
                    this.aaRequestInvalidSuccess = false;
                    this.aaRequestInvalidFailed = false;
                    this.nucSwapSuccess = false;
                    this.nucSwapFailed = false;
                    this.reconComponent.formUpdatedSuccess = false;
                    this.reconComponent.formUpdatedFail = false;
                    this.reconComponent.showInvestigate = true;
                    this.reconComponent.showManageException = false;
                    //this.manageExceptionInvestigatePage = true;
                    this.selectedRow = this.manageExceptionGrid.getrowdata(this.manageExceptionGrid.selectedrowindex());
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
        ]

    rowdetailstemplate: any = {
        rowdetails: '<div></div>',
        rowdetailsheight: 122
    }

    initrowdetails = (index: any, parentElement: any, gridElement: any, datarecord: any): void => {
        if (parentElement != null) {
            let information = parentElement.children[0];
            if (information != null) {
                let container = document.createElement('div');
                information.appendChild(container);

                let leftcolumn = document.createElement('div');
                let rightcolumn = document.createElement('div');
                let childTable = document.createElement('table');
                childTable.width = '100%';
                var innerHtml = '';
                leftcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';
                rightcolumn.style.cssText = 'float: left; width: 50%; border-top: 1px dotted blue';

                innerHtml = '';
                let rows1 = document.createElement('tr');
                innerHtml += (this.rowDetail('Zip/Postal Code', datarecord.postalCode));
                innerHtml += (this.rowDetail('Modem Make:', datarecord.modemMake));
                rows1.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows1);

                innerHtml = '';
                let rows2 = document.createElement('tr');
                innerHtml += (this.rowDetail('Spire Unit Asset #', datarecord.assetNumber));
                innerHtml += (this.rowDetail('Modem Model', datarecord.modemModel));
                rows2.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows2);

                innerHtml = '';
                let rows3 = document.createElement('tr');
                innerHtml += (this.rowDetail('Spire Unit Type', datarecord.spireType));
                innerHtml += (this.rowDetail('Modem Location', datarecord.modemLocation));
                rows3.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows3);

                innerHtml = '';
                let rows4 = document.createElement('tr');
                innerHtml += (this.rowDetail('Spire Unit Location', datarecord.location));
                if (datarecord.type !== 'CETS Install' && datarecord.type !== 'AA Request' && datarecord.type !== 'Install/Form') {
                    innerHtml += (this.rowDetail('Form Received Date', datarecord.formReceivedDate));
                }
                else {
                    innerHtml += (this.rowDetail('Last SEN Data Upload', datarecord.lastSenDataUpload));
                }
                rows4.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows4);
                innerHtml = '';
                let rows5 = document.createElement('tr');
                innerHtml += (this.rowDetail('NUC Serial#', datarecord.nucSerialNumber));
                if (datarecord.type === 'AA Request') {
                    innerHtml += (this.rowDetail('Last Heartbeat Time', datarecord.lastHeartBeatTime));
                }
                else {
                    innerHtml += (this.rowDetail('Region', datarecord.region));
                }
                rows5.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows5);

                innerHtml = '';
                let rows6 = document.createElement('tr');
                innerHtml += (this.rowDetail('Modem Carrier', datarecord.modemCarrier));
                if (datarecord.type === 'AA Request') {
                    innerHtml += (this.rowDetail('Time Zone', datarecord.timeZone));
                }
                else {
                    innerHtml += (this.rowDetail('Region', datarecord.region));
                }
                rows6.insertAdjacentHTML('beforeend', innerHtml);
                childTable.appendChild(rows6);

                innerHtml = '';
                let rows7 = document.createElement('tr');
                innerHtml += (this.rowDetail('Modem Serial #', datarecord.modemSNo));
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

    rowDetail = (itemName, itemvalue): any => {
        var childtdSuggestionsCSS = "font-family:12px;text-align:left;margin:2px;padding-left:90px;font-weight:bold;widht:200px"
        let tdHtml: any = '<td style="' + childtdSuggestionsCSS + '">' + itemName + '</td><td style="width:200px">';
        if (itemvalue == null || itemvalue == "") {
            tdHtml += ' - ';
        }
        else {
            tdHtml += '' + itemvalue + '';
        }
        tdHtml += '</td>';
        return tdHtml;
    }

    getExceptionEquipmentDatasource = (): any => {
        let source: any =
            {
                localdata: this.exceptionEquipments,
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

        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    reloadManageExceptions() {
        this.reconComponent.showManageException = true;
        this.reconComponent.showInvestigate = false;
        this.toggleBasicAdv = true;
        this.exceptionEquipmentDataSource = null;
        this.manageExceptionPage.start('Loading..');
        this.manageExceptionService.getExceptionEquipments().then(res => {
            let equipmentData = res;
            this.exceptionEquipments = equipmentData.exceptionEquipments;
            this.exceptionEquipmentDataSource = this.getExceptionEquipmentDatasource();
            this.totalExceptions = equipmentData.totalExceptions;
            this.aaExceptions = equipmentData.aaExceptions;
            this.installConfExceptions = equipmentData.installConfExceptions;
            this.bottlingPartnerFilter.disabled(true);
            this.regionFilter.disabled(true);
            this.manageExceptionPage.stop();
        }).catch((err) => {
            console.log("Error Processing getExceptionEquipments", err);
            this.manageExceptionPage.stop();
        });
    }
    resetAllImages(){
    (document.getElementById('i1') as HTMLImageElement).src = "app/images/unreconciled.png";
    (document.getElementById('i2') as HTMLImageElement).src = "app/images/notLinked.png";
    (document.getElementById('i3') as HTMLImageElement).src = "app/images/manageExceptions.png";
    (document.getElementById('i4') as HTMLImageElement).src = "app/images/summaryreport.png";
    (document.getElementById('i5') as HTMLImageElement).src = "app/images/forms.png";
    (document.getElementById('i6') as HTMLImageElement).src = "app/images/search.png";
}

    onTabClick() {
this.resetAllImages();
(document.getElementById('i3') as HTMLImageElement).src = "app/images/manageExceptions-i.png";
        if (this.initialLoad) {
            this.manageExceptionPage.start('Loading..');
            // this.manageExceptionService.getExceptionEquipments().then(res => {
            //     let equipmentData = res;
             let equipmentData = {"totalExceptions":4,"aaExceptions":2,"installConfExceptions":2,"exceptionEquipments":[{"equipmentId":null,"aaStsId":"467","formId":null,"spireSerialNumber":"6211717PT030","type":"AA Request","date":"04/05/2018 11:21 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"12233","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GEGK3220030F33","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":null,"autoActivationTime":"04/05/2018 11:21 PM","suggestionMsg":null,"suggestionCode":null,"warningMsg":null,"investigateFlag":"FALSE","nucSwapFlag":"TRUE","status":"Unreconciled"},{"equipmentId":null,"aaStsId":"467","formId":null,"spireSerialNumber":"6211717PT030","type":"AA Request","date":"04/05/2018 11:21 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"12233","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GEGK3220030F33","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":null,"autoActivationTime":"04/05/2018 11:21 PM","suggestionMsg":null,"suggestionCode":null,"warningMsg":null,"investigateFlag":"FALSE","nucSwapFlag":"TRUE","status":"Unreconciled"},{"equipmentId":null,"aaStsId":"467","formId":null,"spireSerialNumber":"6211717PT030","type":"AA Request","date":"04/05/2018 11:21 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"12233","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GEGK3220030F33","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":null,"autoActivationTime":"04/05/2018 11:21 PM","suggestionMsg":null,"suggestionCode":null,"warningMsg":null,"investigateFlag":"FALSE","nucSwapFlag":"TRUE","status":"Unreconciled"},{"equipmentId":null,"aaStsId":"467","formId":null,"spireSerialNumber":"6211717PT030","type":"AA Request","date":"04/05/2018 11:21 PM","country":"Canada","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"12233","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GEGK3220030F33","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":"AT&T","modemSNo":"123123123","modemMake":"MULTI TECH SYSTEMS","modemModel":"MTModem","modemLocation":"First Floor","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":null,"autoActivationTime":"04/05/2018 11:21 PM","suggestionMsg":null,"suggestionCode":null,"warningMsg":null,"investigateFlag":"FALSE","nucSwapFlag":"TRUE","status":"Unreconciled"},{"equipmentId":null,"aaStsId":"48634173","formId":null,"spireSerialNumber":"6211717PT030","type":"Install/Form","date":"07/21/2017 12:34 AM","country":"United States","bottlingPartner":"PBC","customerId":"7360331","customerName":"CHARTWELLS@UOFU FOOD COURT V#651757","streetAddress":"200 S CENTRAL CAMPUS DR","city":"SALT LAKE CITY","state":"Utah","postalCode":"841129149","assetNumber":"10393800","spireType":"SPIRE 5.0 PEDESTAL ASSEMBLY, MIDNIG","location":"BLDG 53 F1 Spire 1","nucSerialNumber":"GEGK531001W7","lastSenDataUpload":null,"lastHeartBeatTime":"2018-04-10 23:40:39","formReceivedDate":null,"modemCarrier":null,"modemSNo":null,"modemMake":null,"modemModel":null,"modemLocation":"BLDG 53 F1 Spire 1","timeZone":"GMT-07:00","identItemId":null,"region":null,"countryShortName":null,"autoActivationTime":"07/21/2017 12:34 AM","suggestionMsg":null,"suggestionCode":null,"warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"},{"equipmentId":null,"aaStsId":"521","formId":null,"spireSerialNumber":"510510","type":"AA Request","date":"04/09/2018 12:23 AM","country":"Poland","bottlingPartner":"PBC","customerId":"1111","customerName":"SEN PepsiCo","streetAddress":"1129 Westchester Avenue","city":"White Plains","state":"NY","postalCode":"10604","assetNumber":"102","spireType":"Spire 2","location":"First Floor","nucSerialNumber":"GEGK54400762","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":null,"modemSNo":null,"modemMake":null,"modemModel":"NA","modemLocation":"First Floor","timeZone":"Eastern Standard Time","identItemId":null,"region":null,"countryShortName":null,"autoActivationTime":"04/09/2018 12:23 AM","suggestionMsg":null,"suggestionCode":null,"warningMsg":null,"investigateFlag":"FALSE","nucSwapFlag":"TRUE","status":"Unreconciled"},{"equipmentId":null,"aaStsId":"201","formId":null,"spireSerialNumber":"510510","type":"IBI Form","date":"12/19/2017 02:40 AM","country":"Canada","bottlingPartner":"IBI","customerId":null,"customerName":"Testdata1","streetAddress":null,"city":null,"state":null,"postalCode":"1235566","assetNumber":null,"spireType":"SPIRE 1.1","location":"Subway GF","nucSerialNumber":"GEGK33332323","lastSenDataUpload":null,"lastHeartBeatTime":null,"formReceivedDate":null,"modemCarrier":null,"modemSNo":"12345","modemMake":null,"modemModel":null,"modemLocation":"Subway GF","timeZone":null,"identItemId":null,"region":null,"countryShortName":null,"autoActivationTime":"12/19/2017 02:40 AM","suggestionMsg":null,"suggestionCode":null,"warningMsg":null,"investigateFlag":"TRUE","nucSwapFlag":"TRUE","status":"Reconciled"}]};

                this.exceptionEquipments = equipmentData.exceptionEquipments;
                this.exceptionEquipmentDataSource = this.getExceptionEquipmentDatasource();
                this.totalExceptions = equipmentData.totalExceptions;
                this.aaExceptions = equipmentData.aaExceptions;
                this.installConfExceptions = equipmentData.installConfExceptions;
                this.manageExceptionPage.stop();
            // }).catch((err) => {
            //     console.log("Error Processing getExceptionEquipments", err);
            //     this.manageExceptionPage.stop();
            // });

            this.manageExceptionService.getExceptionEquipmentDropdownData().then(res => {
                let dropdownData = res;
                this.countryFilterList = dropdownData.countries;
                this.spireTypeList = dropdownData.spireUnitTypes;
                this.countryList = dropdownData.countries;
                this.bottlingPartnerFilter.disabled(true);
                this.regionFilter.disabled(true);
                this.countryFilterDataSource = this.getCountryFilterDataSource();
                this.spireTypeDataSource = this.getSpireTypeDataSource();
                this.countryListDataSource = this.getCountryListDataSource();
            }).catch((err) => {
                console.log("Error Processing getExceptionEquipmentDropdownData");
                this.manageExceptionPage.stop();
            });

            this.reconService.loadFormDetails().then(res => {
                this.modemMakeList = res.modemMake;
                this.modemMakeListDataSource = this.getModemMakeListDataSource();
                this.modemCarrierList = res.modemCarrier;
                this.modemCarrierListDataSource = this.getModemCarrierListDataSource();
            }).catch((err) => {
                console.log("Error Processing loadFormDetails" + err);
                this.manageExceptionPage.stop();
            });
            this.modemModelDropdown.createComponent();
            this.modemModelDropdown.disabled(true);
            this.initialLoad = false;
        }
    }

    exportExceptionEquipments(fileName) {
        var col = this.exceptionEquipmentColumns;
        var filteredData = this.util.filterData(this.manageExceptionGrid.getrows());
        var csv = this.util.ConvertToReconciliationCSV(col, filteredData);
        var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName)
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                //link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        //this.manageExceptionGrid.clearfilters();
    }

    getRegionFilterDataSource = (): any => {
        let source: any =
            {
                localdata: this.regionFilterList,
                datatype: 'json',
                datafields: [
                    { name: 'regionName' },
                    { name: 'regionValue' }
                ]
            };

        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    getCountryFilterDataSource = (): any => {
        let source: any =
            {
                localdata: this.countryFilterList,
                datatype: 'json',
                datafields: [
                    { name: 'countryName' },
                    { name: 'countryValue' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    getSpireTypeDataSource = (): any => {
        let source: any =
            {
                localdata: this.spireTypeList,
                datatype: 'json',
                datafields: [
                    { name: 'spireName' },
                    { name: 'spireValue' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    getBottlingPartnerFilterDataSource = (): any => {
        let source: any =
            {
                localdata: this.bottlingPartnerFilterList,
                datatype: 'json',
                datafields: [
                    { name: 'bottlingPartnerName' },
                    { name: 'bottlingPartnerValue' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    getCountryListDataSource = (): any => {
        let source: any =
            {
                localdata: this.countryList,
                datatype: 'json',
                datafields: [
                    { name: 'countryName' },
                    { name: 'countryValue' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
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

    getModemCarrierListDataSource = (): any => {
        let source: any =
            {
                localdata: this.modemCarrierList,
                datatype: 'json',
                datafields: [
                    { name: 'key' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    getModemMakeListDataSource = (): any => {
        let source: any =
            {
                localdata: this.modemMakeList,
                datatype: 'json',
                datafields: [
                    { name: 'key' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    getModemModelListDataSource = (): any => {
        let source: any =
            {
                localdata: this.modemModelList,
                datatype: 'json',
                datafields: [
                    { name: 'key' }
                ]
            };
        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    manageExceptionColumns =
        [
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
                cellsrenderer: (value: any): string => {
                    return ' Investigate ';
                },
                buttonclick: (row: number): void => {
                    this.reconComponent.showInvestigate = true;
                    this.reconComponent.showManageException = false;
                    this.reconComponent.formUpdatedSuccess = false;
                    this.reconComponent.formUpdatedFail = false;
                    //this.manageExceptionInvestigatePage = true;
                    this.selectedRow = this.manageExceptionGrid.getrowdata(this.manageExceptionGrid.selectedrowindex());
                    this.spireSerialNumber = this.selectedRow.spireSerialNumber;
                    if (this.selectedRow.type.toUpperCase() === "FORM INSTALL") {
                        this.selectedRow.type = 'IB/International Form';
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
        ]

    getManageExceptionDataSource = (): any => {
        let source: any =
            {
                localdata: this.exceptionEquipments,
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

        let dataAdapter: any = new $.jqx.dataAdapter(source);
        return dataAdapter;
    }

    clearSearchInput() {
        this.searchInput.val('');
        this.resetFilters();
    }

    clearAdvancedSearchForm() {
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
    }

    addSearchFilter() {
        if (this.searchTextEntered) {
            this.manageExceptionReconSuccess = false;
            this.manageExceptionReconFailed = false;
            this.aaRequestInvalidSuccess = false;
            this.aaRequestInvalidFailed = false;
            this.nucSwapSuccess = false;
            this.nucSwapFailed = false;
            this.manageExceptionUnReconcileSuccess = false;
            this.manageExceptionUnReconcileFailed = false;
            let refreshGrid = false;
            let filtergroup = new $.jqx.filter();
            filtergroup.operator = 'or';
            let filter_or_operator = 1;
            let filtervalue = this.searchInput.val();
            let filtercondition = 'contains';
            let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            // clear all filters
            this.manageExceptionGrid.clearfilters();

            // add the filters.
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
            // apply the filters.
            this.manageExceptionGrid.applyfilters();
            this.countryFilter.clearSelection();
            this.bottlingPartnerFilter.clearSelection();
            this.regionFilter.clearSelection();
            this.regionFilter.disabled(true);
            this.countryFilter.disabled(true);
            this.bottlingPartnerFilter.disabled(true);
            this.updateStatusbarResults();
        }
    }

    addAdvancedSearchFilter() {
        let refreshGrid = false;
        let filtergroup = new $.jqx.filter();
        filtergroup.operator = 'and';
        let filter_or_operator = 1;
        let filtercondition = 'contains';

        let spireNum = this.spireNumInput.val();
        let state = this.stateDropdown.val();
        let fromDate = this.fromDateInput.getRange(null);
        let toDate = this.toDateInput.getRange(null);
        let zipCode = this.zipcodeInput.val();
        let country = this.countryDropdown.val();
        let equipAsset = this.equipAssetInput.val();
        let bottlingPartner = this.bottlingPrtnrDropdown.val();
        let spireUnit = this.spireUnitDropdown.val();
        let cof = this.cofInput.val();
        let equipLoc = this.equipLocInput.val();
        let custName = this.customerNameInput.val();
        let nucSerialNo = this.nucSerialInput.val();
        let streetAdd = this.streetAddInput.val();
        let city = this.cityInput.val();
        let modemCarrier = this.modemCarrierDropdown.val();
        let modemSNo = this.modemSerialInput.val();
        let modemMake = this.modemMakeDropdown.val();
        let modemModel = this.modemModelDropdown.val();
        let modemLocation = this.modemLocationInput.val();
        let identItemId = this.identItemIdInput.val();

        this.manageExceptionGrid.clearfilters();

        if (spireNum) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', spireNum, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('spireSerialNumber', filtergroup, refreshGrid);
        }
        if (this.stateDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', state, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('state', filtergroup, refreshGrid);
        }
        if (fromDate && toDate) {
            filtergroup = new $.jqx.filter();
            filtergroup.operatotor = 'and';
            let filter_or_operator_date = 0;
            let filter1 = filtergroup.createfilter('datefilter', fromDate, 'GREATER_THAN_OR_EQUAL');
            filtergroup.addfilter(filter_or_operator_date, filter1);
            let filter2 = filtergroup.createfilter('datefilter', toDate, 'LESS_THAN_OR_EQUAL');
            filtergroup.addfilter(filter_or_operator_date, filter2);
            this.manageExceptionGrid.addfilter('date', filtergroup, refreshGrid);
        }
        if (zipCode) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', zipCode, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('postalCode', filtergroup, refreshGrid);
        }
        if (this.countryDropdown.selectedIndex() !== -1 && country !== 'All Countries') {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', country, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('country', filtergroup, refreshGrid);
        }
        if (equipAsset) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', equipAsset, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('assetNumber', filtergroup, refreshGrid);
        }
        if (this.bottlingPrtnrDropdown.selectedIndex() !== -1 && bottlingPartner !== 'All') {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', bottlingPartner, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('bottlingPartner', filtergroup, refreshGrid);
        }
        if (this.spireUnitDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', spireUnit, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('spireType', filtergroup, refreshGrid);
        }
        if (cof) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', cof, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('customerId', filtergroup, refreshGrid);
        }
        if (equipLoc) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', equipLoc, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('location', filtergroup, refreshGrid);
        }
        if (custName) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', custName, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('customerName', filtergroup, refreshGrid);
        }
        if (nucSerialNo) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', nucSerialNo, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('nucSerialNumber', filtergroup, refreshGrid);
        }
        if (modemSNo) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', modemSNo, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemSNo', filtergroup, refreshGrid);
        }
        if (this.modemCarrierDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', modemCarrier, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemCarrier', filtergroup, refreshGrid);
        }
        if (this.modemMakeDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', modemMake, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemMake', filtergroup, refreshGrid);
        }
        if (this.modemModelDropdown.selectedIndex() !== -1) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', modemModel, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemModel', filtergroup, refreshGrid);
        }
        if (modemLocation) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', modemLocation, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('modemLocation', filtergroup, refreshGrid);
        }
        if (streetAdd) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', streetAdd, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('streetAddress', filtergroup, refreshGrid);
        }
        if (city) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', city, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('city', filtergroup, refreshGrid);
        }
        if (identItemId) {
            filtergroup = new $.jqx.filter();
            let filter = filtergroup.createfilter('stringfilter', identItemId, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            this.manageExceptionGrid.addfilter('identItemId', filtergroup, refreshGrid);
        }

        // apply the filters.
        this.manageExceptionGrid.applyfilters();
        this.countryFilter.clearSelection();
        this.bottlingPartnerFilter.clearSelection();
        this.regionFilter.clearSelection();
        this.countryFilter.disabled(true);
        this.bottlingPartnerFilter.disabled(true);
        this.regionFilter.disabled(true);
        this.updateStatusbarResults();

    }

    addCountryFilter(event: any): void {
        if (event.args) {
            let item = event.args.item;
            if (item) {
                let value = item.value;
                this.showClearButtonMne(value);
                for (let i = 0; i < this.countryFilterList.length; i++) {
                    let country = this.countryFilterList[i];
                    if (country.countryName === value) {
                        this.bottlingPartnerFilterList = country.bottlingPartners;
                        this.bottlingPartnerFilterDataSource = this.getBottlingPartnerFilterDataSource();
                    }
                }
                let filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                let filter_or_operator = 0;

                let filtervalue = value;
                let filtercondition = 'contains';

                if (value !== 'All Countries') {
                    this.bottlingPartnerFilter.disabled(false);
                    this.bottlingPartnerFilter.selectedIndex(0);
                    let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    this.manageExceptionGrid.removefilter('country', false);
                    // add the filters.
                    this.manageExceptionGrid.addfilter('country', filtergroup, true);
                } else {
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
    }

    addBottlingPartnerFilter(event: any): void {
        if (event.args) {
            let item = event.args.item;
            if (item) {
                let value = item.value;
                let filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                let filter_or_operator = 0;
                let filtervalue = value;
                let filtercondition = 'contains';
                if (value !== 'All') {
                    let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    this.manageExceptionGrid.removefilter('bottlingPartner', false);
                    // add the filters.
                    this.manageExceptionGrid.addfilter('bottlingPartner', filtergroup, true);
                    if (value === 'PBC') {
                        let countryDropdownVal = this.countryFilter.val();
                        for (let i = 0; i < this.countryFilterList.length; i++) {
                            let country = this.countryFilterList[i];
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
    }

    addRegionFilter(event: any): void {
        if (event.args) {
            let item = event.args.item;
            if (item) {
                let value = item.value;
                let filtergroup = new $.jqx.filter();
                filtergroup.operator = 'and';
                let filter_or_operator = 0;
                let filtervalue = value;
                let filtercondition = 'contains';
                if (value !== 'All Regions') {
                    let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                    this.manageExceptionGrid.removefilter('region', false);
                    // add the filters.
                    this.manageExceptionGrid.addfilter('region', filtergroup, true);
                }
                else {
                    this.manageExceptionGrid.removefilter('region', true);
                }
                this.updateStatusbarResults();
            }
        }
    }

    updateStatusbarResults() {
        let manageExceptionGridRows = this.manageExceptionGrid.getrows();
        this.totalExceptions = manageExceptionGridRows.length;
        let aaExcptns = 0;
        let installConfExcptns = 0;
        $.each(manageExceptionGridRows, function (index, value) {
            let recordType = value.type;
            if (recordType.indexOf('CETS') >= 0 || recordType.indexOf('IB') >= 0) {
                installConfExcptns++;
            }
            if (recordType.indexOf('AA')) {
                aaExcptns++;
            }
        });
        this.installConfExceptions = installConfExcptns;
        this.aaExceptions = aaExcptns;
    }

    resetFilters() {
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
    }

    onCountrySelect(event: any): void {
        if (event.args) {
            let item = event.args.item;
            if (item) {
                let value = item.value;
                this.showClearButtonMne(value);
                for (let i = 0; i < this.countryList.length; i++) {
                    let country = this.countryList[i];
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
                } else {
                    this.bottlingPrtnrDropdown.disabled(true);
                    this.stateDropdown.disabled(true);
                }
            }
        }
    }

    toggleSearch() {
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
    }

    searchTextEntered: boolean = false;
    showClearButtonMne(value: any): void {
        if (!!value && value !== "All") {
            this.searchTextEntered = true;
        }
        else {
            this.searchTextEntered = false;
        }
    }

    showClearButtonDropDown(event: any): void {
        if (event.args) {
            let item = event.args.item;
            if (item.value) {
                this.searchTextEntered = true;
            }
            else {
                this.searchTextEntered = false;
            }
        }
    }


}