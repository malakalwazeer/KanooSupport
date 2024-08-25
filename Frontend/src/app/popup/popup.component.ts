import { Component, EventEmitter, inject, Input, OnInit, Output, ElementRef, output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Form } from '../form';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import moment from 'moment';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  @Output() itemCreated = new EventEmitter<any>();
  readonly date = new FormControl(new Date());
  readonly serializedDate = new FormControl(new Date());

  Warranty_Expiry: any | undefined;
  Date: any | undefined;
  Recieved_Date: any | undefined;
  

  itemForms: FormGroup = new FormGroup({
    id: new FormControl(''),
    Date: new FormControl(''),
    KITREF_NO: new FormControl(''),
    Month: new FormControl(''),
    LENOVO_CLAIM: new FormControl(''),
    Customer: new FormControl(''),
    Machine_Type: new FormControl(''),
    Serial_NO: new FormControl(''),
    Warranty_Expiry: new FormControl(''),
    Warranty_Type: new FormControl(''),
    DEF_FRU: new FormControl(''),
    DEF_SERIAL_NO: new FormControl(''),
    REP_FRU: new FormControl(''),
    REP_SNO: new FormControl(''),
    Problem_Reported: new FormControl(''),
    Action_Taken: new FormControl(''),
    Recieved_Date: new FormControl(''),
    Remarks: new FormControl(''),
    userId: new FormControl(''),
    views: new FormControl('')
  });
  readonly data = inject<Form>(MAT_DIALOG_DATA);
  popupService: any;
  constructor(public dialogRef: MatDialogRef<PopupComponent>, private http: HttpClient) {
  }
  selectedMonth: string | undefined;
  ngOnInit(): void {

    console.log(this.data);
    this.selectedMonth = this.data.Month;
    this.itemForms = new FormGroup({
      id: new FormControl(this.data.id ),
      Date: new FormControl(this.data.Date),
      KITREF_NO: new FormControl(this.data.KITREF_NO),
      Month: new FormControl(this.data.Month),
      LENOVO_CLAIM: new FormControl(this.data.LENOVO_CLAIM),
      Customer: new FormControl(this.data.Customer),
      Machine_Type: new FormControl(this.data.Machine_Type),
      Serial_NO: new FormControl(this.data.Serial_NO),
      Warranty_Expiry: new FormControl(this.data.Warranty_Expiry),
      Warranty_Type: new FormControl(this.data.Warranty_Type),
      DEF_FRU: new FormControl(this.data.DEF_FRU),
      DEF_SERIAL_NO: new FormControl(this.data.DEF_SERIAL_NO),
      REP_FRU: new FormControl(this.data.REP_FRU),
      REP_SNO: new FormControl(this.data.REP_SNO),
      Problem_Reported: new FormControl(this.data.Problem_Reported),
      Action_Taken: new FormControl(this.data.Action_Taken),
      Recieved_Date: new FormControl(this.data.Recieved_Date),
      Remarks: new FormControl(this.data.Remarks),
      userId: new FormControl(this.data.userId),
      views: new FormControl(this.data.views)
      

    });

    if (this.data.Warranty_Expiry)
      this.Warranty_Expiry = moment(this.data.Warranty_Expiry, 'DD-MM-YYYY')?.toDate();
    if (this.data.Date)
    this.Date = moment(this.data.Date, 'DD-MM-YYYY')?.toDate();
    if (this.data.Recieved_Date)
    this.Recieved_Date = moment(this.data.Recieved_Date, 'DD-MM-YYYY')?.toDate();
    
  }

  getFormattedDate(value: Date | undefined) {
    console.log('date: ' + value)
    return moment(new Date()).format('DD-MM-YYYY');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  addItem() {
    console.log(this.itemForms.value);
    this.http.post('http://10.10.20.153:8000/api/listings', this.itemForms.value).subscribe((res: any) => {
      this.itemCreated.emit();
      alert('Added'); 
      console.log(res);
      this.dialogRef.close();
    });
  }

  editItem() {


    console.log(this.itemForms.value);

    this.http.post('http://10.10.20.153:8000/api/listings/' + this.data.id, this.itemForms.value).subscribe((res: any) => {
      this.itemCreated.emit();
      console.log(res);
      this.dialogRef.close();
      alert('Edited'); 
    });
  }
  onSaveItem() {
    console.log(moment(this.Date, "DD/MM/YYYY").format('DD/MM/YYYY').toString())
    this.itemForms.controls['Date'].setValue(moment(this.Date, "DD/MM/YYYY").format('DD/MM/YYYY').toString())
    this.itemForms.controls['Warranty_Expiry'].setValue(moment(this.Warranty_Expiry, "DD/MM/YYYY").format("DD/MM/YYYY").toString())
    this.itemForms.controls['Recieved_Date'].setValue(moment(this.Recieved_Date,"DD/MM/YYYY").format("DD/MM/YYYY").toString())
    if (this.data.id == "0" || this.data.id == undefined || this.data.id == "") {
      this.addItem();
    }
    else {
      this.editItem();
    }
  }
}
