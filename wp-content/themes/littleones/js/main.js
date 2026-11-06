/*
Template Name: Little Ones
Author: Ingrid Kuhn
Author URI: themeforest/user/ingridk
Version: 1.0
*/
(function($) {
"use strict";
$(document).ready(function() {

    //Smooth Scroll 
	
    $('.page-scroll a').on('click', function(event) {
        var $anchor = $(this);
        var str_href = $anchor.attr('href');
        var targetMatch = str_href && str_href.match(/#(.+)/);

        if(targetMatch && $(targetMatch[0]).length > 0) {
            event.preventDefault();

            var $target = $(targetMatch[0]);
            var headerOffset = $(window).width() <= 991 ? 56 : 70;
            var targetTop = targetMatch[0] === '#page-top' ? 0 : $target.offset().top - headerOffset;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });

            if($(window).width() <= 991) {
                var $navbar = $('#navbar-brand');
                if($navbar.hasClass('in')) {
                    $navbar.collapse('hide');
                }
            }

            if(history.replaceState) {
                history.replaceState(null, '', targetMatch[0]);
            }
        }
    });
		

    //	Back Top Link

    var offset = 200;
    var duration = 500;
	var backtotop = $('.back-to-top');
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            backtotop.fadeIn(400);
        } else {
            backtotop.fadeOut(400);
        }
    });

    //Owl-carousels
   
	$("#blog-slider").owlCarousel({
        dots: true,
        loop:true,
		margin: 10,
        autoplay: false,
        nav: true,
		  navText: [
            "<i class='flaticon-arrows-1'></i>",
            "<i class='flaticon-arrows'></i>"

        ],
        responsive: {
            1: {
                items: 1,
            },
			1200: {
                items: 3,
            },
        }
    });
	$("#team-slider").owlCarousel({
        dots: true,
		loop:true,
		margin: 50,
        nav: true,
		  navText: [
            "<i class='flaticon-arrows-1'></i>",
            "<i class='flaticon-arrows'></i>"

        ],
        responsive: {
            1: {
                items: 1,
            },
			 600: {
                items: 2,
            },
			900: {
                items: 3,
            },
        }
    });
	 $("#services-slider").owlCarousel({
        dots: true,
        loop:true,
		margin: 30,
        autoplay: false,
        nav: true,
		  navText: [
            "<i class='flaticon-arrows-1'></i>",
            "<i class='flaticon-arrows'></i>"

        ],
        responsive: {
            1: {
                items: 1,
            },
			767: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        }
    });
	$("#featured-icons").owlCarousel({
        dots: true,
        loop:true,
		margin: 50,
        autoplay: true,     
        responsive: {
            1: {
                items: 1,
            },
			600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        }
    });
	$("#testimonial-slider").owlCarousel({
        loop:true,
		dots: true,
        autoplay: false,
        responsive: {
            1: {
                items: 1,
            },
			767: {
                items: 2,
            },		
        }
    });
	  
   //Load Skrollr

	var skr0llr = skrollr.init({
		forceHeight: false,
		mobileCheck: function() {
			//hack - forces mobile version to be off
			return false;
		}
	});		


	//Dropdown nav on Hover

    if ( $(window).width() > 991) {  
	 var dropmenu = $('.dropdown-menu');
		$('.menu-item-has-children').hover(function() {
		  $(this).find( dropmenu ).first().stop(true, true).delay(100).fadeIn(500);
		}, function() {
		  $(this).find( dropmenu ).stop(true, true).delay(100).fadeOut(500);
		});
	}

  		
}); // end document ready


//On Click  function
	 

// Window load function

$(window).load(function() {

    // Page Preloader 	

    $("#preloader").slideUp("slow");
	
    // Pretty Photo

    $("a[data-gal^='prettyPhoto']").prettyPhoto({
        hook: 'data-gal'
    });
    ({
        animation_speed: 'normal',
        opacity: 1,
        show_title: true,
        allow_resize: true,
        counter_separator_label: '/',
        theme: 'light_square',
        /* light_rounded / dark_rounded / light_square / dark_square / facebook */
    });	
		
    //Isotope 

    var $container = $('#lightbox');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
            layoutMode: 'masonry'
        }

    });
	$(window).smartresize(function() {
        $container.isotope({
            columnWidth: '.col-sm-3'
        });
    });

}); // end window load
})( jQuery );