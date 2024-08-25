import { ViewChild, AfterViewInit, Component,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { MatSort } from '@angular/material/sort';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Form } from '../form';
import { PopupService } from '../popup/popup.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  [x: string]: any;
  title = 'Kanoo_it_Support';
  private apiUrl = 'http://10.10.20.153:8000/api/listings';
  displayedColumns: string[] = ['Date', 'KITREF_NO', 'Month', 'LENOVO_CLAIM', 'Customer', 'Machine_Type', 'Serial_NO', 'Warranty_Expiry', 'Warranty_Type', 'DEF_FRU', 'DEF_SERIAL_NO', 'REP_FRU', 'REP_SNO', 'Problem_Reported', 'Action_Taken', 'Recieved_Date', 'Remarks', 'action'];
  searchText: any;

  formArray: Form[] = [];
  _form: Form = {
    id: "",
    Date: new Date(),
    KITREF_NO: "",
    Month: "",
    LENOVO_CLAIM: "",
    Customer: "",
    Machine_Type: "",
    Serial_NO: "",
    Warranty_Expiry: undefined,
    Warranty_Type: "",
    DEF_FRU: "",
    DEF_SERIAL_NO: "",
    REP_FRU: "",
    REP_SNO: "",
    Problem_Reported: "",
    Action_Taken: "",
    Recieved_Date: undefined,
    Remarks: "",
    userId: 0,
    views: 0 
  };
  filterForm: FormGroup = new FormGroup({
    filter: new FormControl('')
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Form>(this.formArray);
  applyFilter() {
    console.log(this.searchText);
    this.dataSource.filter = this.searchText.trim().toLowerCase() || '';
  }

  constructor(private http: HttpClient, private popupService: PopupService,private authService: AuthService) {
    this.getAllItems();
    
  }

  exportToExcel(){
    const ws = XLSX.utils.json_to_sheet(this.formArray);
    const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'exportingtoexcel');
    XLSX.writeFile(wb, 'MTSA_Lenovo_Warranty_claims_2024.xlsx');
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.popupService.itemCreated.subscribe((res: any) => {
        this.popupClosed(res);
    }

    )
  }
  popupClosed(value:any)
  {
    this.getAllItems();
  }
  getAllItems() {
    this.http.get('http://10.10.20.153:8000/api/listings').subscribe((res: any) => {
      this.formArray = res;
      console.log(res)
      this.dataSource.data = res;
    })
  }

  onEdit(item: any) {
    console.log(item);
    this.popupService.openPopup(item);

  }
  openPopup() {
    this.popupService.openPopup(this._form);
  }
  itemForms: any;
  onSaveItem() {
    const newItemForm = this.itemForms.value;
    this.http.post('http://10.10.20.153:8000/api/listings', newItemForm).subscribe((_res: any) => {
      alert('User Created');
      this.getAllItems();
    });
  }
  onDelete(item: Form) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete(`http://10.10.20.153:8000/api/listings/${item.id}`).subscribe(
        () => {
          this.formArray = this.formArray.filter(i => i.id !== item.id);
          this.dataSource.data = this.formArray;
          alert('Item deleted successfully');
        },
        (error) => {
          console.error('There was an error!', error);
          alert('Failed to delete the item');
        }
      );
    }
  }
  
  logout() {
    this['authService'].logout();
  }

}
