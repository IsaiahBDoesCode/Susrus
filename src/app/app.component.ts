import { Component , OnInit} from '@angular/core';
import { AppServiceService } from './app-service.service';
import {ManageUsersComponent} from './manage-users/manage-users.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Sursus';
  constructor(private service: AppServiceService){}
  ngOnInit(): void {
    this.isWelcomePage = true
    this.isUsersPage = false
  }
  isWelcomePage: boolean
  isUsersPage: boolean


  manageUsers() {
    console.log("Hello World")
    // this.isUsersPage = true
  }
  goBack() {
    this.isUsersPage = false
  }
}
