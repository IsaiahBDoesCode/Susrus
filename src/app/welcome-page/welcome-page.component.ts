import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeModalComponent } from '../welcome-modal/welcome-modal.component'


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit{
  constructor(private dialogRef: MatDialog){}

  isfirstTimeOnSursus: boolean

  ngOnInit(): void {
    console.log("NgOninti called ")
    this.isfirstTimeOnSursus = true
    console.log("This", this.isfirstTimeOnSursus)
    this.openDialog()
    
  }

  openDialog() {
    console.log("Function has been called")
    if(this.isfirstTimeOnSursus = true) {
    this.dialogRef.open(WelcomeModalComponent)
    }
  }

}
