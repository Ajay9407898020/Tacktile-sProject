import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Injectable({
    providedIn : 'root'
})
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    // OPEN DIALOG METHOD TO PASS THE DATA FROM THE COMPONENT PASSED AS A PARAMETER
    openDialog(component: any, data: any, options: MatDialogConfig, closeCallback?: Function) {
        let defaultOptions = Object.assign({
            hasBackdrop: false,
            maxHeight: '100vh',
            data: data
        }, options)

        // OPENS THE DAIALOG THROUGH THE BELOW METHODS
        let dialogRef = this.dialog.open(component, defaultOptions)

        dialogRef.afterClosed().subscribe(result => {

            // CALLBACK FUNCTION CALLS HERE THE DATA FROM CLOSED DIALOG RESPONDS PASSED THROUGH CALLBACK FUNCTION
            if (closeCallback !== undefined) {
                
                closeCallback(result)
            }
        })
    }

}