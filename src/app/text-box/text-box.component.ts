import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { formatDate } from "@angular/common";
import { ComponentService } from '../dataService'
import { OtherJobTypeModalComponent } from '../other-job-type-modal/other-job-type-modal.component'







interface Status {
  value: string;
  viewValue: string;
}
interface valueOfJob {
  value: string,
  viewValue: string
}
@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  firstName: string
  lastName: string
  jobId: string
  dataFromQuery: any
  data: any
  dataSource: any
  displayedColumns: string[] = ['first_name', 'last_name', 'job_Number', 'status', 'Created At', 'Due Date', 'actions'];
  showTableToggle: any
  hasDataLoaded: boolean
  valueForStatus: any
  currentDate: Date
  dueDate: any;
  dueDateSelected: boolean
  usersEmail = "Isaiah.bell.h@gmail.com"
  showNotes: boolean
  dateHasBeenChosen: boolean
  valueForTypeOfJob: any
  checkLawnCareBool: any
  dynamicJobType: string[] = []

  ngOnInit(): void {
    this.dateHasBeenChosen = false
    this.checkLawnCareBool = false
    this.dueDateSelected = false
    this.showNotes = false
    this.hasDataLoaded = false
    this.dataFromQuery = this.getDataFromAPi()
    this.dataSource = this.dataFromQuery
    this.loadTableData()
    this.openData()
    // this.emailFirsteminder()
  }

  jobStatus: Status[] = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Closed', viewValue: 'Closed' },
    { value: 'Blocked', viewValue: 'Blocked' },
    { value: 'Waiting On Client', viewValue: 'Waiting On Client' },
    { value: `${this.dynamicJobType}`, viewValue: 'Other' }
  ];

  typeOfJob : valueOfJob[] = [
    { value: 'Lawn Care', viewValue: 'Lawn Care' },
    { value: 'Construction', viewValue: 'Construction' },
    { value: 'IT', viewValue: "IT"},
    { value: 'OTHER', viewValue: `Other`}
  ]





  dataToShow: any

  constructor(private service: AppServiceService, private http: HttpClient, private _snackBar: MatSnackBar, private dialogRef: MatDialog) { }


  openDialog(element: any) {
    this.dialogRef.open(PopUpComponent)
  }

  openOtherModal(){
    this.dialogRef.open(OtherJobTypeModalComponent)

  }

  checkOtherJob(){
    if(this.valueForTypeOfJob === "OTHER") {
      console.log("Hello world")
      this.openOtherModal()
  
      return
  
     }
  }

  openData() {
    console.log("Hello world from component", this.service.setData(this))
  }

 

  showNotesOption() {
    if (this.valueForStatus === "Other" || this.valueForStatus === "Waiting On Client") {
      console.log("inside if")
      this.showNotes = true
    }
    else {
      this.showNotes = false
    }

  }

  openLawnCareModal() {
    console.log("this.checkLawnCareBool ", this.checkLawnCareBool )
    if(this.checkLawnCareBool === true) {
    console.log("valueForTypeOfJob", this.valueForTypeOfJob)
    this.openDialog(PopUpComponent)
    }
  }

  deleteRow(element: any) {
    let jobNumber = element.jobNumber
    this.http.post<any>('http://localhost:3000/deleteBasedOnJobNumber', { jobNumber: `${jobNumber}` }).subscribe(data => {
      this.dataToShow = data
    })
  }

  dateChanged($event: any) {
    this.dueDate = $event.target.value
    this.dueDateSelected = true

    console.log('Event happened', this.dueDate)

    return this.dueDate

  }


  passData() {
    // this.passDataBetweenComponentsService.setData(this)
  }

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

  openEditModal() {
    console.log("Edit Button Clicked", this.dataFromQuery.result)
  }
  getDataFromAPi() {
    this.service.showDataToClient().subscribe((response) => {
      console.log("Query Results ", response)
      this.dataFromQuery = response
      return this.dataFromQuery.result
    }, (error) => {
      console.log("error", error)
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  resetFields() {
    let firstName = this.firstName
    let lastName = this.lastName
    let jobId = this.jobId
    let jobStatus = this.valueForStatus
  }

  setCurrentTime() {
    let currentTime = new Date()
    const format = 'MM/dd/yyyy';
    const myDate = currentTime;
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    return formattedDate
  }

  formatDueDate() {
    if (this.dueDate) {
      this.dateHasBeenChosen = true
      const format = 'MM/dd/yyyy';
      const myDate = this.dueDate;
      const locale = 'en-US';
      const formattedDate = formatDate(myDate, format, locale);
      return formattedDate
    } else {
      this.dateHasBeenChosen = false
      const format = 'MM/dd/yyyy';
      const myDate = new Date();
      const locale = 'en-US';
      const formattedDate = formatDate(myDate, format, locale);
      return formattedDate
    }
  }

  emailFirsteminder() {
    let subject = "Reminer for task: (placeholder)"
    let message = "Hello! I have been keeping track of your jobs and you have a job that is scheduled to be finished in 2 weeks on (due date placeholder)"
    this.http.post<any>('http://localhost:3000/remind', {
      from: "sursusserviceandhelp@gmail.com",
      to: this.usersEmail,
      subject: subject,
      text: message
    }).subscribe(data => {
      this.dataToShow = data
    })
  }

  addJob() {
   if(this.valueForTypeOfJob === "Lawn Care") {
    console.log("It is lawn care")
     this.checkLawnCareBool = true
   }
   
   

   this.openLawnCareModal()
    this.setCurrentTime()
    let firstName = this.firstName
    let lastName = this.lastName
    let jobId = this.jobId
    let jobStatus = this.valueForStatus
    let fullJobObject = `${firstName} ` + `${lastName} ` + `${jobId}` + ` ${jobStatus}`
    console.log(this.formatDueDate())

    if (firstName === undefined || lastName === undefined || jobId === undefined || jobStatus === undefined) {
      this.openSnackBar("You Are Missing a Field", `Please Ensure All Fields Have Been Filled Out`)
      return
    } else {
      this.http.post<any>('http://localhost:3000/insertNameToSqlDB', {
        firstName: `${this.firstName}`,
        lastName: `${this.lastName}`,
        jobNumber: `${this.jobId}`,
        jobStatus: `${jobStatus}`,
        createdAt: `${this.setCurrentTime()}`,
        dueDate: `${this.formatDueDate()}`
      }).subscribe(data => {
        this.dataToShow = data
      })
      this.openSnackBar("Successfully Added Job: ", `${fullJobObject}`)
      this.getDataFromAPi()
    }

  }
}
