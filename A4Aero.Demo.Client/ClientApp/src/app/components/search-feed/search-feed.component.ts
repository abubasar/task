import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.css']
})
export class SearchFeedComponent implements OnInit {
  
searchResult:any;
  constructor(private stateService:StateService) { }

  ngOnInit() {
this.searchResult=this.stateService.searchResult;
//console.log(this.searchResult);
console.log(this.searchResult.Results.AllGroupedIternaries);
this.stateService.searchResult=undefined;

  }
  selectedValue=2
  journeyTypes = [
    {JourneyType: 1, name: "One Way"},
    {JourneyType: 2, name: "Round Trip"},
    {JourneyType: 3, name: "Multi City"},
   
  ];
 
}
