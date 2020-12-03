import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class DialogosService {

  public shareData?: any;
  public height?: string;
  public width?: string;

  constructor(private dialog: MatDialog) {}

  /**
   * @description open a component like dialog
   * @param comp component reference
   */
  public openDialog(comp: ComponentType<unknown>): MatDialogRef<unknown> {
    const dialogRef = this.dialog.open(comp, {
      width: '45vh',
      height: 'auto',
      data: this.shareData,
    });

    return dialogRef;
  }

}
