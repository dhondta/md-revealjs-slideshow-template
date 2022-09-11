/*
 * Reveal.js quizz plugin
 * (c) Alexandre D'Hondt 2016
 */
$(function () {
    var quizz = $(".quizz");
    if (quizz.length) {
        loadResource( 'js/plugin/quizz/quizz.css', 'stylesheet', function() {});
        var quizz_vars = new Object();
        $.each($(".quizz"), function(index, quizz) {
            var fn = "assets/" + quizz.id + ".json";
            var get_quiz = new XMLHttpRequest();
            quizz_vars[quizz.id] = {qlist: new Object(), nq: 0, ans: 0, over: false};
            get_quiz.overrideMimeType( 'application/json; charset=utf-8' );

		    get_quiz.onreadystatechange = function() {
			    if( get_quiz.readyState === 4 ) {
				    if ( ( get_quiz.status >= 200 && get_quiz.status < 300 ) || get_quiz.status === 0 ) {
                        try {
                            quizz_vars[quizz.id].qlist = JSON.parse(get_quiz.responseText);
                            quizzStart(quizz.id);
                        } catch( e ) {
					        quizz.text('ERROR: "' + fn + '" appears to be an invalid JSON file. Please correct it so that it can be parsed.' +
						        '<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>');
                        }
				    } else {
					    quizz.text('ERROR: The attempt to fetch "' + fn + '" failed with HTTP status ' + get_quiz.status + '.' +
						    'Check your browser\'s JavaScript console for more details.' +
						    '<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>');
				    }
			    }
		    };

		    get_quiz.open( 'GET', './' + fn, false );

		    try {
			    get_quiz.send();
		    } catch ( e ) {
			    alert( 'Failed to get the questions file "' + fn +
                       '". Make sure that the file is served by an HTTP server and the file can be found there. ' + e );
		    }
        });

        function quizzRefresh(qid) {
            var c, clist = $('.quizz-choices#'+qid), qlist = quizz_vars[qid].qlist, nq = quizz_vars[qid].nq;
            $('.quizz-next#'+qid).attr('disabled', true);
            $('.quizz-question#'+qid).text(qlist[nq].question);
            clist.find("li").remove();
            for (i = 0; i < qlist[nq].choices.length; i++) {
                c = qlist[nq].choices[i];
                $('<li id="'+qid+'" class="quizz-choice"><label><input type="radio" value=' + i
                     + ' id="'+qid+'" class="quizz-radio"><span>' + c + '</span></label></li>').appendTo(clist);
            }
            $('.quizz-radio#'+qid).click(function (e) {
                $('.quizz-next#'+qid).removeAttr('disabled');
                $('.quizz-radio#'+qid).removeAttr('checked');
                $(this).attr('checked', true);
            });
        }

        function quizzReset(qid) {
            quizz_vars[qid].nq = 0;
            quizz_vars[qid].ans = 0;
            quizz_vars[qid].over = false;
            $('.quizz-next#'+qid).text("Next");
            $('.quizz-result#'+qid).hide();
        }

        function quizzStart(qid) {
            var qlist = quizz_vars[qid].qlist;
            if (qlist == undefined || qlist.length == 0) {
                $('.quizz-question#'+qid).text("No question to display");
                $('.quizz-choices#'+qid).remove();
                $('.quizz-next#'+qid).remove();
                return;
            } else {
                quizzReset(qid);
                quizzRefresh(qid);
                $('.quizz-next#'+qid).click(function (e) {
                    if (quizz_vars[qid].over) {
                        quizzReset(qid);
                        quizzRefresh(qid);
                    } else {
                        v = $('input.quizz-radio#'+qid+':checked').val();
                        if (v == undefined) {
                            $('.quizz-next#'+qid).attr('disabled', true);
                        } else {
                            if (v == qlist[quizz_vars[qid].nq].answer) { quizz_vars[qid].ans++; }
                            quizz_vars[qid].nq++;
                            if (quizz_vars[qid].nq < qlist.length) {
                                quizzRefresh(qid);
                            } else {
                                $('.quizz-result#'+qid).text("Your score: " + quizz_vars[qid].ans + "/" + qlist.length).show();
                                $('.quizz-next#'+qid).text("Restart");
                                quizz_vars[qid].over = true;
                            }
                        }
                    }
                });
            }
        }
    };

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
