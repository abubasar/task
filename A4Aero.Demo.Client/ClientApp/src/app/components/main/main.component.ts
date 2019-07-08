import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
searchForm:FormGroup
currentJustify = 'center';
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.searchForm=this.fb.group({
      JourneyType:['1']
    })
  }

  searchFlight(){

  }
  
}
