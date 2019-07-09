import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var $: any;
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


    $(document).ready(function(){


      InitSpinners();
      $('body').on('click', 'input[name=TravelClass]', function (event) {
        SetDisplayText();
    });

      $('body').on('click', '.flt-adt-spinner-btn', function (event) {

        $("#flt-people-child").val("0")
        $("#flt-people-infant").val("0")
        ReInitSpinner();
    
        SetDisplayText();
    });

      $('body').on('click', '.flt-child-spinner-btn', function (event) {
        SetDisplayText();
    });
    
    function InitSpinners() {
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
    
    function ReInitSpinner() {
        var adt = parseInt($("#flt-people-adult").val());
        var mx = 9 - adt;
    
        $("#flt-people-child").trigger("touchspin.updatesettings", { max: mx });
        $("#flt-people-infant").trigger("touchspin.updatesettings", { max: adt });
    }
    function SetDisplayText() {
      var a = parseInt($("#flt-people-adult").val());
      var c = parseInt($("#flt-people-child").val());
      var i = parseInt($("#flt-people-infant").val());
  
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
  function close_panel_dropdown() {
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

	$('.panel-dropdown').hover(function(){
	    mouse_is_inside=true;
	}, function(){
	    mouse_is_inside=false;
	});

	$("body").mouseup(function(){
	    if(! mouse_is_inside) close_panel_dropdown();
	});
	
	/* Dropdown user logged */
	$('.dropdown-user').hover(function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(300);
	}, function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(300);
	});
    
  });

  
}



  searchFlight(){

  }
  
}
