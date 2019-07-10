import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
searchForm:FormGroup
currentJustify = 'center';
  constructor(private fb:FormBuilder,private datePipe: DatePipe) { 
    }
  today = this.datePipe.transform(new Date(),"dd MMM yyyy");
  dayAfterToday=this.datePipe.transform(new Date().setDate(new Date().getDate()+1),"dd MMM yyyy");
  ngOnInit() {
    this.searchForm=this.fb.group({
      JourneyType:['1'],
      From:['Dhaka,Shahjal...'],
      To:['Jedda,King Abd...'],
      Adults:[1]
    })
//...................Travellers Touchspin
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
       console.log(this.searchForm.value.Adults);
      
      var t = a + c + i;
      var txt = t + " Traveller";
      if (t > 1) {
          txt += "s"
      }
  
      var cType = $("input[name=TravelClass]:checked").val();
      txt += ", " + cType;
  
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



  searchFlight(){
    
  }
  

  swap(from,to){
    this.searchForm.get('From').setValue(to);
    this.searchForm.get('To').setValue(from);
  }

  setDestinationNull(){
      this.searchForm.get('From').setValue('');
    }
    setArrivalNull(){
      this.searchForm.get('To').setValue('');
    }

    switchToReturn(){
      this.searchForm.get('JourneyType').setValue('2');
    }
    baktToOneWay(){
      this.searchForm.get('JourneyType').setValue('1');
    }
}
