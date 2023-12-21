import { Component, OnInit } from '@angular/core';
import {AppServiceService} from '../app-service.service'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { formatDate } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';




interface roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit{

  ngOnInit(): void {
    this.hasDataLoaded = false
    this.getUsers()
    this.loadTableData()
  }

  constructor(private service: AppServiceService, private http:HttpClient,private _snackBar: MatSnackBar, private dialogRef: MatDialog){}
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  firstName: string
  lastName: string
  jobId: string
  dataFromQuery: any
  data: any
  dataSource: any  
  valueForStatus: any
  showTableToggle: boolean
  hasDataLoaded:boolean
  valueForRole: any
  displayedColumns: string[] = ['first_name', 'last_name', 'job_Number', 'status', 'Created At', 'actions'];
  dataToShow: any


  usersRoles: roles[] = [
    { value: 'Foreman', viewValue: 'Foreman' },
    { value: 'Crew', viewValue: 'Crew' },
    { value: 'ProductOwner', viewValue: 'Product Owner' },
  ];


  loadTableData() {
    setTimeout(() => {
      if (this.dataFromQuery != undefined) {
        this.hasDataLoaded = true
      }
      else {
        console.log("Data has not loaded")
      }
    }, 1500)


  }
  toggleTable(){
    console.log("This table toggle", this.showTableToggle)
  }

  openDialog(element: any) {
    this.dialogRef.open(PopUpComponent)
  }


  getUsers() {
    this.service.showUsers().subscribe((response) => {
      console.log("Query Results ", response)
      this.dataFromQuery = response
      this.hasDataLoaded = true
      return this.dataFromQuery.result
    }, (error) => {
      console.log("error", error)
    })
  }

  setCurrentTime() {
    let currentTime = new Date()
    const format = 'MM/dd/yyyy';
    const myDate = currentTime;
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    return formattedDate
  }

  deleteRow(element: any) {
    let jobNumber = element.jobNumber
    this.http.post<any>('http://localhost:3000/deleteBasedOnJobNumber', { jobNumber: `${jobNumber}` }).subscribe(data => {
      this.dataToShow = data
    })
  }

  generateRandomId(length: any){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


  submitUser(){
    console.log("This data", this.dataFromQuery)
    return
    let fullUser = this.firstName + this.lastName + this.valueForRole 
    if (this.firstName === undefined || this.lastName === undefined || this.valueForRole) {
      this.openSnackBar("You Are Missing a Field", `Please Ensure All Fields Have Been Filled Out`)
      return
    }
    else{
    this.http.post<any>('http://localhost:3000/updateUsers', {
        id: `${this.generateRandomId(10)}`,
        firstName: `${this.firstName}`,
        lastName: `${this.lastName}`,
        role: `${this.valueForRole}`,
        createdAt: `${this.setCurrentTime()}`
      }).subscribe(data => {
        // this.dataToShow = data
      })

      this.openSnackBar("Successfully Added User: ",fullUser)
    }

  }





}
