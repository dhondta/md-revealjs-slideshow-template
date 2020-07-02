/*
 * Reveal.js chart plugin
 * (c) Alexandre D'Hondt 2020
 *
 * See Chart.js at: https://www.chartjs.org/docs/latest/
 */
$(function () {
    var diagram, charts = $("div.diagram.chart");
    if (charts.length) {
        loadResource('js/plugin/chart/chart.css', 'stylesheet', function() {});
        loadResource('js/plugin/chart/csv2chart.js', 'script', function() {});
        $.each($("div.diagram.chart"), function(index, diagram) {
            var fn = "assets/" + diagram.id + ".json";
            var ctx = document.getElementById(diagram.id).getContext('2d');
            var get_chart = new XMLHttpRequest();
            get_chart.overrideMimeType( 'text/plain; charset=utf-8' );
            get_chart.onreadystatechange = function() {
                if( get_chart.readyState === 4 ) {
	                if ( ( get_chart.status >= 200 && get_chart.status < 300 ) || get_chart.status === 0 ) {
                        var chart = new Chart(ctx, JSON.parse(get_chart.responseText));
                        chart.attr("id",diagram.id);
                        chart.appendTo(diagram);
	                } else {
		                diagram.text('ERROR: The attempt to fetch "' + fn + '" failed with HTTP status ' + get_chart.status + '.' +
			                'Check your browser\'s JavaScript console for more details.' +
			                '<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>');
			              console.log(get_chart.status);
	                }
                }
            };
            get_chart.open( 'GET', './' + fn, false );
            try {
                get_chart.send();
            } catch ( e ) {
                alert( 'Failed to get the chart file "' + fn +
                       '". Make sure that the file is served by an HTTP server and the file can be found there. ' + e );
            }
        });
    }

	// modified from math plugin
	function loadResource( url, type, callback ) {
		var head = document.querySelector( 'head' );
		var resource;
		if ( type === 'script' ) {
			resource = document.createElement( 'script' );
			resource.type = 'text/javascript';
			resource.src = url;
		}
		else if ( type === 'stylesheet' ) {
			resource = document.createElement( 'link' );
			resource.rel = 'stylesheet';
			resource.href = url;
		}
		// Wrapper for callback to make sure it only fires once
		var finish = function() {
			if( typeof callback === 'function' ) {
				callback.call();
				callback = null;
			}
		}
		resource.onload = finish;
		// IE
		resource.onreadystatechange = function() {
			if ( this.readyState === 'loaded' ) {
				finish();
			}
		}
		// Normal browsers
		head.appendChild( resource );
	}
});
