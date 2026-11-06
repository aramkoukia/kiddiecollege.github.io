
	 /** Scroll to **/
(function($) {	(function scrollto(){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(!e)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);	})( jQuery );

// MC
(function($) {

	// TODO: Do we actually allow custom error styles or is this legacy code?
	var err_style = '';
	try {
	    err_style = mc_custom_error_style;
	} catch(e){
	    err_style = '#mc_embed_signup input.mce_inline_error { border-color:#6B0505; } #mc_embed_signup div.mce_inline_error { margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff; }';
	}
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
	  style.styleSheet.cssText = err_style;
	} else {
	  style.appendChild(document.createTextNode(err_style));
	}
	head.appendChild(style);

	// Expose extra mc form methods in global var
	window.mc = {

		/**
	  	 *	Open the evil popup		
		 */
		openPopup: function() {
			$('#mc_embed_signup a.mc_embed_close').show();
		    setTimeout( function(){ $('#mc_embed_signup').fadeIn(); } , mc.delayPopup);
		},
		/**
		 *	Close the evil popup
		 */
		closePopup: function() {
            $('#mc_embed_signup').hide();
            var now = new Date();
            var expires_date = new Date( now.getTime() + 31536000000 );
            document.cookie = 'MCEvilPopupClosed=yes;expires=' + expires_date.toGMTString()+';path=/';
        },
        /**
		 *	Figure out if we should show the evil popup (if they've closed it before, don't show it.)
         */
        evalPopup: function() {
        	$('#mc_embed_signup').hide();
		    cks = document.cookie.split(';');
		    for(i=0; i<cks.length; i++){
		        parts = cks[i].split('=');
		        if (parts[0].indexOf('MCEvilPopupClosed') != -1) mc.showPopup = false;
		    }
		    if (mc.showPopup) mc.openPopup();
        },
        /**
		 *	Grab the list subscribe url from the form action and make it work for an ajax post.
         */
		// getAjaxSubmitUrl: function() {
		// 	var url = $("form#mc-embedded-subscribe-form").attr("action");
		// 	url = url.replace("/post?u=", "/post-json?u=");
		// 	url += "&c=?";
		// 	return url;
		// },
		/**
		 *	Classify text inputs in the same field group as group for validation purposes.
		 *	All this does is tell jQueryValidation to create one error div for the group, rather
		 *	than one for each input. Primary use case is birthday and date fields, where we want 
		 *	to display errors about the inputs collectively, not individually.
		 *
		 *	NOTE: Grouping inputs will give you one error div, but you still need to specify where
		 *	that div should be displayed. By default, it's inserted after the first input with a
		 *	validation error, which can break up a set of inputs. Use the errorPlacement setting in
		 *	the validator to control error div placement.
		 */
		getGroups: function (){ 
			var groups = {};
			$(".mc-field-group").each(function(index) {
				var inputs = $(this).find("input:text:not(:hidden)");	// TODO: What about non-text inputs like number?
				if (inputs.length > 1) {
					var mergeName = inputs.first().attr("name");
					var fieldNames = $.map(inputs, function(f) { return f.name; });
					groups[mergeName.substring(0, mergeName.indexOf("["))] = fieldNames.join(" ");
				}
			});
			return groups;
		},
		/**
		 *	Chick if a field is part of a multipart field
		 * 	(e.g., A date merge field is composed of individual inputs for month, day and year)
		 *	Used in jQuery validation onkeyup method to ensure that we don't evaluate a field
		 *  if a user hasn't reached the last input in a multipart field yet.
		 */
		isMultiPartField: function(element) {
			return ($('input:not(:hidden)' , $(element).closest(".mc-field-group")).length > 1);
		},
		/**
		 *	Checks if the element is the last input in its fieldgroup. 
		 *	If the field is not the last in a set of inputs we don't want to validate it on certain events (onfocusout, onblur)
		 *	because the user might not be finished yet.
		 */
		isTooEarly: function(element) {
			var fields = $('input:not(:hidden)' , $(element).closest(".mc-field-group"));
			return ($(fields).eq(-1).attr('id') != $(element).attr('id'));
		},
		/**
		 *	Handle the error/success message after successful form submission.
		 *	Success messages are appended to #mce-success-response
		 *	Error messages are displayed with the invalid input when possible, or appended to #mce-error-response
		 */
		mce_success_cb: function(resp){

		    $('#mce-success-response').hide();
		    $('#mce-error-response').hide();

		    // On successful form submission, display a success message and reset the form
		    if (resp.result == "success"){
		        $('#mce-'+resp.result+'-response').show();
		        $('#mce-'+resp.result+'-response').html(resp.msg);
		        $('#mc-embedded-subscribe-form').each(function(){
		            this.reset();
		    	});

		    // If the form has errors, display them, inline if possible, or appended to #mce-error-response
		    } else {

				// Example errors - Note: You only get one back at a time even if you submit several that are bad. 
				// Error structure - number indicates the index of the merge field that was invalid, then details
				// Object {result: "error", msg: "6 - Please enter the date"} 
				// Object {result: "error", msg: "4 - Please enter a value"} 
				// Object {result: "error", msg: "9 - Please enter a complete address"} 

				// Try to parse the error into a field index and a message.
				// On failure, just put the dump thing into in the msg variable.
		        var index = -1;
		        var msg;
		        try {
		            var parts = resp.msg.split(' - ',2);
		            if (parts[1]==undefined){
		                msg = resp.msg;
		            } else {
		                i = parseInt(parts[0]);
		                if (i.toString() == parts[0]){
		                    index = parts[0];
		                    msg = parts[1];
		                } else {
		                    index = -1;
		                    msg = resp.msg;
		                }
		            }
		        } catch(e){
		            index = -1;
		            msg = resp.msg;
		        }

		        try {
		        	// If index is -1 if means we don't have data on specifically which field was invalid.
		        	// Just lump the error message into the generic response div.
		            if (index == -1){
		                $('#mce-'+resp.result+'-response').show();
		                $('#mce-'+resp.result+'-response').html(msg);      

		            } else {
		                var fieldName = $("input[name*='"+fnames[index]+"']").attr('name'); // Make sure this exists (they haven't deleted the fnames array lookup)
		                var data = {};
		                data[fieldName] = msg;
		                mc.mce_validator.showErrors(data);
		            }
		        } catch(e){
		            $('#mce-'+resp.result+'-response').show();
		            $('#mce-'+resp.result+'-response').html(msg);
		        }
		    }
		}
	}

	window.mc.mce_validator = $("#mc-embedded-subscribe-form").validate({

		// Set error HTML: <div class="mce_inline_error"></div>
		errorClass: "mce_inline_error", 
  		errorElement: "div", 
		
  		// Validate fields on keyup, focusout and blur. 
		onkeyup: false,
		onfocusout: function(element) { 
			if (!mc.isTooEarly(element)) {
				$(element).valid();
			}
		},
		onblur: function(element) { 
			if (!mc.isTooEarly(element)) {
				$(element).valid();
			}
		},
		// Grouping fields makes jQuery Validation display one error for all the fields in the group
		// It doesn't have anything to do with how the fields are validated (together or separately), 
		// it's strictly for visual display of errors
		groups: mc.getGroups(),
		// Place a field's inline error HTML just before the div.mc-field-group closing tag 
		errorPlacement: function(error, element) {
			element.closest('.mc-field-group').append(error);
      	},
      	// Submit the form via ajax (see: jQuery Form plugin)
		submitHandler: function(form) {
			$(form).ajaxSubmit(mc.ajaxOptions);
		}
 	});

 // 	window.mc.ajaxOptions = { 
	// 	url: mc.getAjaxSubmitUrl(), 
	// 	type: 'GET', 
	// 	dataType: 'json', 
	// 	contentType: "application/json; charset=utf-8",
	// 	success: mc.mce_success_cb
	// };

}(jQuery));

