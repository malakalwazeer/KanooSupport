import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Form } from '../form';
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  
  itemCreated = new EventEmitter<any>(); 

  isPopupOpen = false;
  constructor(private dialog: MatDialog) { }
  openPopup(form: Form) {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true;
      const dialogRef = this.dialog.open(PopupComponent, { data: form });

      dialogRef.afterClosed().subscribe(() => {
        this.isPopupOpen = false;
      });

      dialogRef.componentInstance.itemCreated.subscribe((res:any) => 
      {
        this.itemCreated.emit(res);
      })

    }
  }

}
