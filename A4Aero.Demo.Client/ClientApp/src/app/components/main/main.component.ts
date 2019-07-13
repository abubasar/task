import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FlightService } from 'src/app/services/flight.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { Observable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  flightInfo = {
    OriginDestinationInformation: [
      {
        SequenceNumber: 0,
        OriginLocationCode: '',
        DestinationLocationCode: '',
        OriginLocation: '',
        DestinationLocation: '',
        DepartureDateTime: '',
        ReturnDateTime: '',
        OriginCity:'',
        DestinationCity: '',
        OriginAirport: '',
        DestinationAirport:''
      }
    ]
  }
  
  minJourneyDate:Date
  minReturnDate:Date
searchForm:FormGroup
currentJustify = 'center';
  constructor(private fb:FormBuilder,private datePipe: DatePipe,private flightService:FlightService) { 
    this.minJourneyDate=new Date()
    this.minReturnDate=new Date()
    this.minReturnDate.setDate(this.minJourneyDate.getDate() + 2);
    }
  today = this.datePipe.transform(new Date(),"dd MMM yyyy");
  dayAfterTomorrow=this.datePipe.transform(new Date().setDate(new Date().getDate()+2),"dd MMM yyyy");
  ngOnInit() {
    this.searchForm=this.fb.group({
      JourneyType:['1'],
      OriginDestinationInformation: this.fb.array([
        ]),
      Adults:[1],
      PeopleTxt: ['1 Travellers, Economy'],
      Children: 0,
      Infants: 0,
      TravelClass: ['Economy'],
      IsLocalSearch: false,
      SeatRequested: 0,
      ProviderId: 1,
      Currency: ['BDT']
    })
   this.setOriginDestinationInformation()
    this.getFlights();
//...................Travellers Touchspin.....................
    $(document).ready(()=>{
    
      let InitSpinners=() =>{
        var mx = 9;
        var adt = parseInt($("#flt-people-adult").val());
    
        $("#flt-people-adult").TouchSpin({
            min: 1,
            max: mx,
            buttondown_class: "btn spinner-btn  flt-adt-spinner-btn",
            buttonup_class: "btn spinner-btn  flt-adt-spinner-btn"
        });
    
        mx = parseInt($("#flt-people-max-adults").val()) - adt;
        $("#flt-people-child").TouchSpin({
            min: 0,
            max: mx,
            buttondown_class: "btn spinner-btn flt-child-spinner-btn",
            buttonup_class: "btn spinner-btn flt-child-spinner-btn"
        });
    
        $("#flt-people-infant").TouchSpin({
            min: 0,
            max: adt,
            buttondown_class: "btn spinner-btn flt-child-spinner-btn",
            buttonup_class: "btn spinner-btn flt-child-spinner-btn"
        });
    }

      InitSpinners();

      $('body').on('click', 'input[name=TravelClass]',  (event)=> {
        SetDisplayText();
    });

      $('body').on('click', '.flt-adt-spinner-btn',  (event)=> {

        $("#flt-people-child").val("0")
        $("#flt-people-infant").val("0")
        ReInitSpinner();
    
        SetDisplayText();
    });

      $('body').on('click', '.flt-child-spinner-btn', (event)=> {
        SetDisplayText();
    });
    
    
    
    let ReInitSpinner=()=> {
        var adt = parseInt($("#flt-people-adult").val());
        var mx = 9 - adt;
    
        $("#flt-people-child").trigger("touchspin.updatesettings", { max: mx });
        $("#flt-people-infant").trigger("touchspin.updatesettings", { max: adt });
    }
    let SetDisplayText=()=> {
      var a = parseInt($("#flt-people-adult").val());
      var c = parseInt($("#flt-people-child").val());
      var i = parseInt($("#flt-people-infant").val());

       
       this.searchForm.get('Adults').setValue(a);
       this.searchForm.get('Children').setValue(c);
       this.searchForm.get('Infants').setValue(i);
       console.log(this.searchForm.value.Adults);
      
      var t = a + c + i;
      var txt = t + " Traveller";
      if (t > 1) {
          txt += "s"
      }
  
      var cType = $("input[name=TravelClass]:checked").val();
      txt += ", " + cType;
      this.searchForm.get('PeopleTxt').setValue(txt);
      $("#traveller-summary").html(txt);
  } 



  // Panel Dropdown
  let close_panel_dropdown=()=> {
		$('.panel-dropdown').removeClass("active");
    }
    $('.panel-dropdown a').on('click', function(e) {
		if ( $(this).parent().is(".active") ) {
            close_panel_dropdown();
        } else {
            close_panel_dropdown();
            $(this).parent().addClass('active');
        }
        e.preventDefault();
    });

    // Closes dropdown on click outside the conatainer
	var mouse_is_inside = false;

	$('.panel-dropdown').hover(()=>{
	    mouse_is_inside=true;
	}, function(){
	    mouse_is_inside=false;
	});

	$("body").mouseup(()=>{
	    if(! mouse_is_inside) close_panel_dropdown();
	});
	
	/* Dropdown user logged */
	$('.dropdown-user').hover( ()=> {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(300);
	}, function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(300);
	});
    
  });

  
}

//..................Travellers Touchspin end....................
searchID;
  searchFlight(){
    console.log(this.searchForm.value)
    this.flightService.getSearchKey(this.searchForm.value).subscribe(res=>{
      console.log(res);
      this.searchID=res.Searchkey
      console.log(this.searchID)
    });
    this.flightService.searchFlights(this.searchID,this.searchForm.value).subscribe(res=>{
      console.log(res);
    })
  }

  //......autocomplete...................
  data:any[]
  keyword='Value'
  getFlights(){
   return this.flightService.getFlights().subscribe(res=>{
     console.log(res.AirportList);
     this.data=res.AirportList;
   })
  }
  destinationFlight={
    Value:'Zia Intl Airport',
    City:'Dhaka',
    Code:'DAC',
    
  }
  arrivalFlight={
    Value:'Newyork Arpt',
    City:'Newyork',
    Code:'JFK',
    
  }
  onSelectDestination(event: TypeaheadMatch,i): void {
    this.destinationFlight = event.item;
    ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('OriginCity').setValue(this.destinationFlight.City);
    ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('OriginLocationCode').setValue(this.destinationFlight.Code);
    ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('OriginLocation').setValue(this.destinationFlight.City+' ('+this.destinationFlight.Code+')');
    ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('OriginAirport').setValue(this.destinationFlight.Value);
    console.log(this.destinationFlight);
  }

  onSelectArrival(event: TypeaheadMatch,i): void {
    this.arrivalFlight = event.item;
    ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('DestinationCity').setValue(this.arrivalFlight.City);
    ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('DestinationLocationCode').setValue(this.arrivalFlight.Code);
    ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('DestinationLocation').setValue(this.arrivalFlight.City+' ('+this.arrivalFlight.Code+')');
    ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('DestinationAirport').setValue(this.arrivalFlight.Value);
    console.log(this.arrivalFlight);
  }
  



//.....................
  swap(from,to,i){
  this.destinationFlight=from;
  this.arrivalFlight=to;
  let temp=this.destinationFlight;
  this.destinationFlight=this.arrivalFlight;
  this.arrivalFlight=temp;
  ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('OriginCity').setValue(this.destinationFlight.City);
  ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('DestinationCity').setValue(this.arrivalFlight.City);

   
  }

  setDestinationNull(i){
   ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('OriginCity').setValue('');
    }
    setArrivalNull(i){
      ( <FormArray>this.searchForm.get('OriginDestinationInformation')).at(i).get('DestinationCity').setValue('');
    }

    switchToReturn(){
      this.searchForm.get('JourneyType').setValue('2');
    }
    baktToOneWay(){
      this.searchForm.get('JourneyType').setValue('1');
    }

    setOriginDestinationInformation() {
      let control = <FormArray>this.searchForm.controls.OriginDestinationInformation;
      this.flightInfo.OriginDestinationInformation.forEach(x =>{
          control.push(this.fb.group({
            SequenceNumber: 0,
            OriginLocationCode: this.destinationFlight.Code,
            DestinationLocationCode: this.arrivalFlight.Code,
            OriginLocation: this.destinationFlight.City+' ('+this.destinationFlight.Code+')',
            DestinationLocation: this.arrivalFlight.City+' ('+this.arrivalFlight.Code+')',
            DepartureDateTime: this.today,
            ReturnDateTime: this.dayAfterTomorrow,
            OriginCity:this.destinationFlight.City,
            DestinationCity: this.arrivalFlight.City,
            OriginAirport: this.destinationFlight.Value,
            DestinationAirport:this.arrivalFlight.Value
          }))
        })
      }
}
