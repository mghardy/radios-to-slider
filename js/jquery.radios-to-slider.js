/* 
 * radiosToSlider v0.2.0
 * jquery plugin to create a slider using a list of radio buttons
 * (c)2014 Rub�n Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

(function($) {

	function RadiosToSlider(element, options){
		this.bearer=element;
		this.options=options;
		this.currentLevel=0; //this means no level selected
	}

	RadiosToSlider.prototype = {
		
		activate: function(){
			//Get number options
			this.numOptions=this.bearer.find('input[type=radio]').length;
			this.addBaseStyle();
			this.addLevels();
			this.addBar();
			this.setSlider();
			this.addInteraction();
		},

		addBaseStyle: function(){
			this.bearer.find('input[type=radio]').hide();
			this.bearer.addClass("radios-to-slider");
			this.bearer.addClass(this.options.size);
			this.bearer.addClass('num-options-' + this.numOptions);
			this.bearer.find('label').each(function(){
				$(this).addClass('slider-label');
			});
            if(this.options.animation){
                this.bearer.find('.slider-bar').addClass('transition-enabled');
            }
		},

		//Add level indicators to DOM
		addLevels: function(){
			var b=this.bearer;
			this.bearer.find('input[type=radio]').each(function(){
				var radioId=$(this).attr('id');
				b.append("<ins class='slider-level' data-radio='" + radioId + "'></ins>");
			});
		},

		//Add slider bar to DOM
		addBar: function(){
			this.bearer.append("<ins class='slider-bar'><span class='slider-knob'></span></ins>");
		},

		//set width of slider bar and current level
		setSlider: function(){
			var radio=0;
			var slider=this;
            var width = 0;
			this.bearer.find('input[type=radio]').each( function(){
                var cssMarginLeft = $(slider.bearer.find('.slider-level')[radio]).css('margin-left');
                var marginLeft = parseInt(cssMarginLeft.substring(0, cssMarginLeft.length - 2)); //trim 'px'
                width = width + marginLeft + slider.bearer.find('.slider-level').width();

				if($(this).prop('checked')){
					slider.bearer.find('.slider-bar').css('display', 'block');
					slider.bearer.find('.slider-bar').width( width + 5 ); //5px padding
					slider.currentLevel = radio;
				}
				radio++;
			});
			//Set style for lower levels
			var label=0;
			this.bearer.find('.slider-level').each(function(){
				if(label < slider.currentLevel){
					$(this).css('visibility', 'visible');
                    $(this).show();
					$(this).addClass('slider-lower-level');
				}else if(label == slider.currentLevel){
					$(this).css('visibility', 'hidden');
				}else{
					$(this).css('visibility', 'visible');
                    $(this).show();
					$(this).removeClass('slider-lower-level');
				}
                label++;
			});
			//Add bold style for selected label
			var label=0;
			this.bearer.find('.slider-label').each(function(){
				label++;
				if(label == slider.currentLevel){
					$(this).addClass('slider-label-active');
				}else{
					$(this).removeClass('slider-label-active');
				}
			});
		},

		addInteraction: function(){
			var slider=this;

			this.bearer.find('.slider-level').click( function(){
				var radioId = $(this).attr('data-radio');
				slider.bearer.find('#' + radioId).prop('checked', true);
				slider.setSlider();
			});

			this.bearer.find('input[type=radio]').change(function(){
				slider.setSlider();
			});

		}

	}

	$.fn.radiosToSlider = function(options) {
		this.each(function(){
			options = $.extend({}, $.fn.radiosToSlider.defaults, options);

			var slider = new RadiosToSlider($(this), options);
			slider.activate();
		});	
	}

	$.fn.radiosToSlider.defaults = {
        size: 'medium',
        animation: true
    };

})(jQuery);
