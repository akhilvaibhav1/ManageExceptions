import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ManageExceptionInvestigate } from './manageexceptionsinvestigate.component';
import { ManageExceptionService } from './service/manageexceptions.service';
import { ManageExceptions } from './manageexceptions.component';
import { ReconciliationComponent } from '../reconciliation.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'aaInvalidateConfirm',
    templateUrl: 'app/reconciliation/manageExceptions/manageexceptionsinvalidate.component.html',
    styleUrls: ['app/reconciliation/reconciliation.component.css']
})
export class ManageExceptionsInvalidate implements OnInit {

    aaRequest: any;
    @BlockUI('manageExceptionInvalidPage') manageExceptionInvalidPage: NgBlockUI

    constructor(private mneInvestigate: ManageExceptionInvestigate,
        private manageExceptionService: ManageExceptionService,
        private manageExceptions: ManageExceptions,
        private reconComponent: ReconciliationComponent) {
    }


    ngOnInit() {
        document.documentElement.scrollTop = 0;
        this.aaRequest = this.mneInvestigate.investigatedSpireEquipmentDetail;
    }

    backToInvestigate() {
        this.mneInvestigate.aaInvalidConfirmationPage = false;
        this.reconComponent.showInvestigate = true;
        document.documentElement.scrollTop = 0;
    }

    invalidateAARequest() {
        this.manageExceptionInvalidPage.start("Loading...");
        this.manageExceptionService.unreconcileAARecord(this.aaRequest.aaStsId).then(res => {
            if (res === true) {
                this.manageExceptions.aaRequestInvalidSuccess = true;
                this.manageExceptions.aaRequestInvalidFailed = false;
            }
            else {
                this.manageExceptions.aaRequestInvalidSuccess = false;
                this.manageExceptions.aaRequestInvalidFailed = true;
            }
            this.manageExceptionInvalidPage.stop();
            this.reconComponent.showManageException = true;
            document.documentElement.scrollTop = 0;
            this.manageExceptions.reloadManageExceptions();
        }).catch((err) => {
            console.log("Error Processing unreconcileAARecord" + err);
            this.manageExceptionInvalidPage.stop();
            this.reconComponent.showManageException = true;
            document.documentElement.scrollTop = 0;
            this.manageExceptions.reloadManageExceptions();
        });
    }

}