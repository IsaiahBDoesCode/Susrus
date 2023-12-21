import { Component } from '@angular/core';
import { TextBoxComponent } from '../text-box/text-box.component'
import { AppServiceService } from '../app-service.service';

interface priority {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {

  constructor (private service: AppServiceService) {}

  jobPriority : priority[] = [
    { value: 'lvl5Pri', viewValue: 'Level 5' },
    { value: 'lvl4Pri', viewValue: 'Level 4' },
    { value: 'lvl3Pri', viewValue: 'Level 3' },
    { value: 'lvl2Pri', viewValue: 'Level 2' },
    { value: 'lvl1Pri', viewValue: 'Level 1' },
  ]
  firstName : string
  lastName : string
  jobId :string
  loadDataToModal() {   
      console.log("getData", this.service.getData())
    
  }
}
