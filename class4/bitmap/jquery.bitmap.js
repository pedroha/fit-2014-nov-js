
;(function( $ ) {

    var divId = 0; // Are div IDs needed?
	
    $.fn.bitmap = function(options) {

        var settings = $.extend({}, $.fn.bitmap.defaults, options);

		var bitmapId = 0;
        
        this.each(function() {
            var $bitmap = $(this);
			var bitmapData = $bitmap.data("bitmap");

			var bitmapOptions = settings;
			
            if (bitmapData) {
				var statement = 'var domData = ' + bitmapData;
				// alert(statement);
                eval(statement);
                bitmapOptions = $.extend({}, settings, domData);
            }
			var $pixels = getBitmap( bitmapOptions );
            $bitmap.append( $pixels.children() );

			applyStyle( $bitmap, bitmapOptions, bitmapId );
			
			addEvent( $bitmap, bitmapOptions.onColor );
			
			bitmapId++;
        });

		return this;
    }

	function applyStyle($bitmap, bitmapOptions, bitmapId) {
       	var pixHeight = bitmapOptions.pixHeight;
        var pixWidth  = bitmapOptions.pixWidth;
		var offColor  = bitmapOptions.offColor;
		var roundness = bitmapOptions.roundness;

		var pixelStyle = {
             	"width": pixWidth + "px"
              , "height": pixHeight + "px"
			  , "background-color" : offColor
			  , "-webkit-border-radius": roundness + "px"
			  , "-moz-border-radius": roundness + "px"
			  , "border-radius": roundness + "px"
			  , "position" : "absolute"
		      , '-webkit-transition': 'background-color 0.5s linear'
		      , '-moz-transition': 'background-color 0.5s linear'
		      , 'transition': 'background-color 0.5s linear'				
		};
		
		var className = "Bitmap-" + bitmapId;
		var css = JSON.stringify(pixelStyle).replace(/"/g, '').replace(/,/g, ';');
		var cssStyle = "<style type='text/css'> ." + className + " > div " + css + " </style>";
		
		$(cssStyle).appendTo("head");

		$bitmap.css('position', 'absolute');
		$bitmap.addClass(className);
	}

	function addEvent($bitmap, onColor) {
        $bitmap.delegate("div", "touchstart.bitmap touchend.bitmap mouseover.bitmap", 			
			function() {
				var $pixel = $(this);

				// NOTE: Want to hookup customizable callbacks for painting here!
				var color = ($pixel.data('row') % 3 == 0)? 'blue' : onColor;
				
                $pixel.css({
					'background-color': color
				});
            }
		);
	}

	function getBitmap(settings) {
        var rows = settings.rows;
        var cols = settings.cols;
        var top  = settings.offsetTop;
        var left = settings.offsetLeft;
        var pixHeight = settings.pixHeight;
        var pixWidth  = settings.pixWidth;

        $root = $('<div/>'); // placeholder for all pixels

        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
	
                var $pixel = $('<div id="' + "pix-" + divId + '"/> "');
				divId++;

                $pixel.css({
                    "top"  : row * pixHeight + top
                  , "left" : col * pixWidth + left
                });

                $pixel.data({
                    row: row
                  , col: col
                });

                $root.append($pixel);
            }
        }
		return $root;
	}

    $.fn.bitmap.defaults = {
        rows: 8
      , cols: 8
      , roundness: 10
      , pixWidth: 20
      , pixHeight: 20
      , offsetTop: 10
      , offsetLeft: 10
	  , onColor: '#05c6d9'
	  , offColor: '#cccccc'
//	  , offColor: '#a07f3d'
    };
    
})(jQuery);
