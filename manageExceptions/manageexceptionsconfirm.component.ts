import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Router, ActivatedRoute } from '@angular/router';
import { ManageExceptions } from '../manageExceptions/manageexceptions.component';
import { ManageExceptionService } from '../manageExceptions/service/manageexceptions.service';

import { ManageExceptionInvestigate } from '../manageExceptions/manageexceptionsinvestigate.component';
import { ReconciliationComponent } from '../reconciliation.component';

@Component({
    selector: 'manageExceptionConfirmationGrid',
    templateUrl: 'app/reconciliation/manageExceptions/manageexceptionsconfirm.component.html',
    styleUrls: ['app/reconciliation/reconciliation.component.css']
})

export class ManageExceptionConfirmComponent implements OnInit {

    investigatedSpireEquipment: any = {};
    suggestedSpireEquipment: any = {};
    confirmationPageColumns: any;
    confirmationPageResults: any;
    highlightTableCell: boolean;
    showWarningMsg: boolean = false;
    title: string = "";
    @BlockUI() blockUI: NgBlockUI;
    archiveRecord: any = {};

    constructor(private manageExceptionComponent: ManageExceptions,
        private manageExceptionService: ManageExceptionService,
        private reconComponent: ReconciliationComponent,
        private investigateComponent: ManageExceptionInvestigate) {
    }

    ngOnInit() {
        document.documentElement.scrollTop = 0;
        this.investigatedSpireEquipment = this.manageExceptionComponent.selectedRow;
        this.suggestedSpireEquipment = this.investigateComponent.suggestionData;
        this.archiveRecord = this.investigateComponent.archiveRecord;
        if (this.suggestedSpireEquipment.nucSwapFlag === "TRUE" && this.investigateComponent.unReconcileClicked) {
            this.showWarningMsg = true;
        }
        //Set Title   
        if (this.investigateComponent.unReconcileClicked) {
            this.title = "Un-Reconciliation";
        } else if (this.investigateComponent.reconcileClicked) {
            this.title = "Reconciliation";
        } else if (this.investigateComponent.nucSwapClicked) {
            this.title = "NUC Swap";
        }
    }

    backToInvestigate() {
        this.investigateComponent.confirmExceptionPage = false;
        document.documentElement.scrollTop = 0;
    }

    reconcileOrNucSwapManageExceptions() {
        this.blockUI.start('Loading...');
        this.manageExceptionService.reconcileEquipmentOrNucSwap(this.investigatedSpireEquipment.aaStsId,
            this.suggestedSpireEquipment.equipmentId).then(res => {
                if (res === true) {
                    if (this.investigateComponent.nucSwapClicked) {
                        this.manageExceptionComponent.nucSwapSuccess = true;
                        this.manageExceptionComponent.nucSwapFailed = false;
                    }
                    else {
                        this.manageExceptionComponent.manageExceptionReconSuccess = true;
                        this.manageExceptionComponent.manageExceptionReconFailed = false;
                    }
                }
                else {
                    if (this.investigateComponent.nucSwapClicked) {
                        this.manageExceptionComponent.nucSwapFailed = true;
                        this.manageExceptionComponent.nucSwapSuccess = false;
                    }
                    else {
                        this.manageExceptionComponent.manageExceptionReconFailed = true;
                        this.manageExceptionComponent.manageExceptionReconSuccess = false;
                    }
                }
                document.documentElement.scrollTop = 0;
                this.manageExceptionComponent.reloadManageExceptions();
                this.blockUI.stop();
            }).catch((err) => {
                console.log("Error Processing reconcileOrNucSwapManageExceptions" + err);
                this.blockUI.stop();
                if (this.investigateComponent.nucSwapClicked) {
                    this.manageExceptionComponent.nucSwapFailed = true;
                    this.manageExceptionComponent.nucSwapSuccess = false;
                }
                else {
                    this.manageExceptionComponent.nucSwapFailed = true;
                    this.manageExceptionComponent.nucSwapSuccess = false;
                }
                this.manageExceptionComponent.reloadManageExceptions();
                document.documentElement.scrollTop = 0;
            });
    }

    unreconcileManageExceptions() {
        this.blockUI.start('Loading...');
        this.manageExceptionService.unreconcileEquipment(this.investigatedSpireEquipment.aaStsId,
            this.suggestedSpireEquipment.equipmentId, this.investigatedSpireEquipment.type).then(res => {
                if (res === true) {
                    this.manageExceptionComponent.manageExceptionUnReconcileSuccess = true;
                    this.manageExceptionComponent.manageExceptionUnReconcileFailed = false;
                    document.documentElement.scrollTop = 0;
                }
                else {
                    this.manageExceptionComponent.manageExceptionUnReconcileFailed = true;
                    this.manageExceptionComponent.manageExceptionUnReconcileSuccess = false;
                    document.documentElement.scrollTop = 0;
                }
                this.manageExceptionComponent.reloadManageExceptions();
                this.blockUI.stop();
            }).catch((err) => {
                console.log("Error Processing unreconcileManageExceptions" + err);
                this.blockUI.stop();
                this.manageExceptionComponent.manageExceptionUnReconcileFailed = true;
                this.manageExceptionComponent.manageExceptionUnReconcileSuccess = false;
                this.manageExceptionComponent.reloadManageExceptions();
                document.documentElement.scrollTop = 0;
            });
    }

    getDisplayStyle(nucSwapClicked: boolean, record1: any, record2: any) {
        let style = {
            'background-color': nucSwapClicked ? 'lightgreen' : '',
            'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
            'text-align': 'center'
        };
        return style;
    }

    getDisplayStyleArchive(nucSwapClicked: boolean, record1: any, record2: any) {
        let style = {
            'background-color': nucSwapClicked ? 'pink' : '',
            'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
            'text-align': 'center'
        };
        return style;
    }

    getDisplayStyleForSpireSerial(nucSwapClicked: boolean, record1: any, record2: any) {
        let style = {
            'background-color': nucSwapClicked ? 'lightgreen' : '',
            'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
            'border-top': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '2px solid #ddd',
            'text-align': 'center'
        };
        return style;
    }

    getDisplayStyleArchiveForSpireSerial(nucSwapClicked: boolean, record1: any, record2: any) {
        let style = {
            'background-color': nucSwapClicked ? 'pink' : '',
            'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
            'border-top': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '2px solid #ddd',
            'text-align': 'center'
        };
        return style;
    }

    getDisplayStyleForUnreconciled(isSpireSerial: boolean, record1: any, record2: any) {
        let style: any;
        if (isSpireSerial) {
            style = {
                'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
                'border-top': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '2px solid #ddd',
                'text-align': 'center',
            };
        }
        else {
            style = {
                'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
                'text-align': 'center'
            };
        }
        return style;
    }
}