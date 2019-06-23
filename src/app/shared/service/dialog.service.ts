import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SnackBarType} from '../model/snack-bar.type';

@Injectable()
export class DialogService {

  constructor(private snackBar: MatSnackBar) {

  }

  public show(type: SnackBarType, message: string, time?: number): void {

  }

}
