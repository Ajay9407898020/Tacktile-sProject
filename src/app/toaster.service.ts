import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ToasteredService {

    constructor(private toastr: ToastrService) { }

    // Showing the Success massage mathod on toaster
    showSuccess(msg: string) {

        this.toastr.success(msg);
    }

    // Showing the Faliure massage mathod on toaster
    showFailiure(msg: string) {

        this.toastr.error(msg);
    }
}