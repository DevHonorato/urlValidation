import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {Observable, from, of, interval, timer} from 'rxjs';
import {concatMap, delay, startWith, first, skip, take, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

// horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';
  // constructor(private toastr: ToastrService) { }

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(mensagem: string, btn: string | undefined, style: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition, duration: number) {

    this._snackBar.open( mensagem, btn, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: [style]
    });

  }

  // showSuccess(message: string | undefined, title: string | undefined){
  //     this.toastr.success(message, title)
  // }

  // showError(message: string | undefined, title: string | undefined){
  //     this.toastr.error(message, title)
  // }

  // showInfo(message: string | undefined, title: string | undefined){
  //     this.toastr.info(message, title)
  // }

  // showWarning(message: string | undefined, title: string | undefined){
  //     this.toastr.warning(message, title)
  // }

}
