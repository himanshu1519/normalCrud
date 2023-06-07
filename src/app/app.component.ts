import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'normalcrud';
  bookFrom: FormGroup;
  bookstoreData = []
  update: boolean = false;
  add: boolean = true;
  id: number;
  jsonData: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.bookFrom = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      genre: ['', Validators.required],
      price: ['', Validators.required]
    })
    this.callApi()
    this.bookstoreData = JSON.parse(localStorage.getItem('bookStorData'))


  }

  //function for add  data into table 
  addDataIntoTable() {
    if(this.bookstoreData==null){
      this.bookstoreData = []
      this.bookstoreData.push(this.bookFrom.value)

    }
    else{
      this.bookstoreData.push(this.bookFrom.value)
   }
    localStorage.setItem('bookStorData', JSON.stringify(this.bookstoreData))
    this.bookFrom.reset()
  }

  //fumction for  delete data 
  deleteData(index) {
    this.bookstoreData.splice(index, 1)
    localStorage.removeItem('bookStorData')
    localStorage.setItem('bookStorData', JSON.stringify(this.bookstoreData))


  }

  //function for update Data
  editData(element, index) {
    this.id = index
    this.update = true;
    this.add = false;
    this.bookFrom.controls.title.setValue(element.title)
    this.bookFrom.controls.author.setValue(element.author)
    this.bookFrom.controls.publisher.setValue(element.publisher)
    this.bookFrom.controls.genre.setValue(element.genre)
    this.bookFrom.controls.price.setValue(element.price)
  }

  

  updateData() {
    this.update = false;
    this.add = true;
    this.bookstoreData[this.id] = this.bookFrom.value
    this.bookFrom.reset()
    localStorage.removeItem('bookStorData')
    localStorage.setItem('bookStorData', JSON.stringify(this.bookstoreData))
  }


  callApi() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1/comments').subscribe(res => {
      this.jsonData = res
      console.log('data', this.jsonData)
      localStorage.setItem('jsonData', JSON.stringify(this.jsonData))
    })

  }

  
}
