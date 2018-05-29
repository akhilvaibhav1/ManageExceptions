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
import { ManageExceptions } from '../manageExceptions/manageexceptions.component';
import { ManageExceptionService } from '../manageExceptions/service/manageexceptions.service';
import { ManageExceptionInvestigate } from '../manageExceptions/manageexceptionsinvestigate.component';
import { ReconciliationComponent } from '../reconciliation.component';
var ManageExceptionConfirmComponent = (function () {
    function ManageExceptionConfirmComponent(manageExceptionComponent, manageExceptionService, reconComponent, investigateComponent) {
        this.manageExceptionComponent = manageExceptionComponent;
        this.manageExceptionService = manageExceptionService;
        this.reconComponent = reconComponent;
        this.investigateComponent = investigateComponent;
        this.investigatedSpireEquipment = {};
        this.suggestedSpireEquipment = {};
        this.showWarningMsg = false;
        this.title = "";
        this.archiveRecord = {};
    }
    ManageExceptionConfirmComponent.prototype.ngOnInit = function () {
        document.documentElement.scrollTop = 0;
        this.investigatedSpireEquipment = this.manageExceptionComponent.selectedRow;
        this.suggestedSpireEquipment = this.investigateComponent.suggestionData;
        this.archiveRecord = this.investigateComponent.archiveRecord;
        if (this.suggestedSpireEquipment.nucSwapFlag === "TRUE" && this.investigateComponent.unReconcileClicked) {
            this.showWarningMsg = true;
        }
        if (this.investigateComponent.unReconcileClicked) {
            this.title = "Un-Reconciliation";
        }
        else if (this.investigateComponent.reconcileClicked) {
            this.title = "Reconciliation";
        }
        else if (this.investigateComponent.nucSwapClicked) {
            this.title = "NUC Swap";
        }
    };
    ManageExceptionConfirmComponent.prototype.backToInvestigate = function () {
        this.investigateComponent.confirmExceptionPage = false;
        document.documentElement.scrollTop = 0;
    };
    ManageExceptionConfirmComponent.prototype.reconcileOrNucSwapManageExceptions = function () {
        var _this = this;
        this.blockUI.start('Loading...');
        this.manageExceptionService.reconcileEquipmentOrNucSwap(this.investigatedSpireEquipment.aaStsId, this.suggestedSpireEquipment.equipmentId).then(function (res) {
            if (res === true) {
                if (_this.investigateComponent.nucSwapClicked) {
                    _this.manageExceptionComponent.nucSwapSuccess = true;
                    _this.manageExceptionComponent.nucSwapFailed = false;
                }
                else {
                    _this.manageExceptionComponent.manageExceptionReconSuccess = true;
                    _this.manageExceptionComponent.manageExceptionReconFailed = false;
                }
            }
            else {
                if (_this.investigateComponent.nucSwapClicked) {
                    _this.manageExceptionComponent.nucSwapFailed = true;
                    _this.manageExceptionComponent.nucSwapSuccess = false;
                }
                else {
                    _this.manageExceptionComponent.manageExceptionReconFailed = true;
                    _this.manageExceptionComponent.manageExceptionReconSuccess = false;
                }
            }
            document.documentElement.scrollTop = 0;
            _this.manageExceptionComponent.reloadManageExceptions();
            _this.blockUI.stop();
        }).catch(function (err) {
            console.log("Error Processing reconcileOrNucSwapManageExceptions" + err);
            _this.blockUI.stop();
            if (_this.investigateComponent.nucSwapClicked) {
                _this.manageExceptionComponent.nucSwapFailed = true;
                _this.manageExceptionComponent.nucSwapSuccess = false;
            }
            else {
                _this.manageExceptionComponent.nucSwapFailed = true;
                _this.manageExceptionComponent.nucSwapSuccess = false;
            }
            _this.manageExceptionComponent.reloadManageExceptions();
            document.documentElement.scrollTop = 0;
        });
    };
    ManageExceptionConfirmComponent.prototype.unreconcileManageExceptions = function () {
        var _this = this;
        this.blockUI.start('Loading...');
        this.manageExceptionService.unreconcileEquipment(this.investigatedSpireEquipment.aaStsId, this.suggestedSpireEquipment.equipmentId, this.investigatedSpireEquipment.type).then(function (res) {
            if (res === true) {
                _this.manageExceptionComponent.manageExceptionUnReconcileSuccess = true;
                _this.manageExceptionComponent.manageExceptionUnReconcileFailed = false;
                document.documentElement.scrollTop = 0;
            }
            else {
                _this.manageExceptionComponent.manageExceptionUnReconcileFailed = true;
                _this.manageExceptionComponent.manageExceptionUnReconcileSuccess = false;
                document.documentElement.scrollTop = 0;
            }
            _this.manageExceptionComponent.reloadManageExceptions();
            _this.blockUI.stop();
        }).catch(function (err) {
            console.log("Error Processing unreconcileManageExceptions" + err);
            _this.blockUI.stop();
            _this.manageExceptionComponent.manageExceptionUnReconcileFailed = true;
            _this.manageExceptionComponent.manageExceptionUnReconcileSuccess = false;
            _this.manageExceptionComponent.reloadManageExceptions();
            document.documentElement.scrollTop = 0;
        });
    };
    ManageExceptionConfirmComponent.prototype.getDisplayStyle = function (nucSwapClicked, record1, record2) {
        var style = {
            'background-color': nucSwapClicked ? 'lightgreen' : '',
            'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
            'text-align': 'center'
        };
        return style;
    };
    ManageExceptionConfirmComponent.prototype.getDisplayStyleArchive = function (nucSwapClicked, record1, record2) {
        var style = {
            'background-color': nucSwapClicked ? 'pink' : '',
            'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
            'text-align': 'center'
        };
        return style;
    };
    ManageExceptionConfirmComponent.prototype.getDisplayStyleForSpireSerial = function (nucSwapClicked, record1, record2) {
        var style = {
            'background-color': nucSwapClicked ? 'lightgreen' : '',
            'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
            'border-top': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '2px solid #ddd',
            'text-align': 'center'
        };
        return style;
    };
    ManageExceptionConfirmComponent.prototype.getDisplayStyleArchiveForSpireSerial = function (nucSwapClicked, record1, record2) {
        var style = {
            'background-color': nucSwapClicked ? 'pink' : '',
            'border': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '',
            'border-top': !!record1 && !!record2 && record1 != record2 ? '1px dashed red' : '2px solid #ddd',
            'text-align': 'center'
        };
        return style;
    };
    ManageExceptionConfirmComponent.prototype.getDisplayStyleForUnreconciled = function (isSpireSerial, record1, record2) {
        var style;
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
    };
    return ManageExceptionConfirmComponent;
}());
__decorate([
    BlockUI(),
    __metadata("design:type", Object)
], ManageExceptionConfirmComponent.prototype, "blockUI", void 0);
ManageExceptionConfirmComponent = __decorate([
    Component({
        selector: 'manageExceptionConfirmationGrid',
        templateUrl: 'app/reconciliation/manageExceptions/manageexceptionsconfirm.component.html',
        styleUrls: ['app/reconciliation/reconciliation.component.css']
    }),
    __metadata("design:paramtypes", [ManageExceptions,
        ManageExceptionService,
        ReconciliationComponent,
        ManageExceptionInvestigate])
], ManageExceptionConfirmComponent);
export { ManageExceptionConfirmComponent };
//# sourceMappingURL=manageexceptionsconfirm.component.js.map