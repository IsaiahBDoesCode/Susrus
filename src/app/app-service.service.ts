import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  dataArray: string[]

  showDataToClient () {
    return this.http.get('/api/showDataToClient')
  }

  showUsers() {
    return this.http.get('/api/showUsers')
  }
  setData (dataToSet:any) {
    this.dataArray = dataToSet
    console.log("Hello World")
    return this.dataArray
}

getData(){
 console.log("data array", this.dataArray)

  return this.dataArray

}





}
