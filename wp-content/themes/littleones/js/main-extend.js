(function($) {
"use strict";
$(window).load(function() {
	$('.category a').on('click', function() {
        $('.category .active').removeClass('active');
        $(this).addClass('active');
        var $container = $('#lightbox');
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
}); // end window load
})( jQuery );