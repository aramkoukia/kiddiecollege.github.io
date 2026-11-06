jQuery(function($) {
"use strict";
    if ($('#map-canvas').length) {
        var script = document.createElement('script');
        script.src = directory_uri.stylesheet_directory_uri + "/js/map.js";
        document.body.appendChild(script);
    }

    if ($('#show_pop').length) {
        jQuery('#modal_trigger').click();
        $('.cd-switcher').children('li').eq(1).children('a').click();
    }
    var stickyHeaderTop = $('#navbar-custom').offset().top;
    $(window).scroll(function() {
        if ($(window).scrollTop() > stickyHeaderTop) {
            $('#navbar-custom').addClass("fix-inmobile");
        } else {
            $('#navbar-custom').removeClass("fix-inmobile");
        }
    });

   
});