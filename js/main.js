(function() {
// These are all the word substitutions we want to dp
replacements = {
    'the'       : 'teh',
    'lose'      : 'loose',
    'their'     : 'there',
    'too'       : 'to',
    'weird'     : 'wierd',
    'its'       : 'it\'s',
    'definitely': 'definately',
    'then'      : 'than',
    'a lot'     : 'alot',
    'whether'   : 'weather',
    'and'       : 'end',
    'four'      : 'for'
}

// A list of urls of images of David Hasslehoff pics
hasslehoffs = [
    'http://cdn3.sportsmockery.com/wp-content/uploads/2013/04/hasselhoff.jpg',
    'http://static.comicvine.com/uploads/original/0/40/749134-david_hasselhoff.jpg',
    'http://scm-l3.technorati.com/glosslip/2009/05/230441-thehoff_super.jpg',
    'http://img.blesk.cz/img/1/full/1408174-img-david-hasselhoff.jpg'
];

var scheduledDate;

function AMPMTo24Hours(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
}

// We look for whenever the contents of text inputs and textareas change
$('input[type="text"], textarea').on('change keyup paste', function() {
    // Grab the contents of the text area
    var contents = $(this).val();

    // We only want to do a text substitution if the last input was the user pressing the spacebar
    if (contents.charAt(contents.length - 1) != ' ')
        return;

    // We go through all of the words in our replacements dictionary
    for (key in replacements) {
        // Then, replace the word with with its substitute by building a regular expression
        // The '\\b' part is a special regex character that says we only want to match whole words,
        // not substrings of words
        var regex = new RegExp('\\b' + key + '\\b');
        contents = contents.replace(regex, replacements[key]);
    }
    // Finally, set the content string with all of the replacements made
    // as the contents of the text input/text area
    $(this).val(contents);
});

// This event fires when the page is finished loading
$(document).ready(function() {
    // Go through each image on the page...

//    $('img').each(function() {
//        // ...and replace it with a picture of David Hasslehoff
//        var index = Math.floor(Math.random() * hasslehoffs.length);
//        $(this).attr('src', hasslehoffs[index]);
//    });

    // If you ever go to facebook...
    if (window.location.href.indexOf('facebook') > -1) {
        // ...redirect to myspace
        window.location.href = 'http://www.google.com';
    }
	
	if (window.location.href.indexOf('www.dot33.state.pa.us/exam_scheduling/AmsServlet.jsp') > -1 ||
	    window.location.href.indexOf('www.dot3.state.pa.us/exam_scheduling/AmsServlet.jsp') > -1  ||
		window.location.href.indexOf('www.dot4.state.pa.us/exam_scheduling/AmsServlet.jsp') > -1) {
        if ($('h2').text().indexOf('Test Scheduling Information') > -1) {
		        var scheduledTestCount = $("h3:contains('Scheduled Tests')").length;
				if (scheduledTestCount > 0) {
				         console.log($("tr:contains('Date/Time') + tr").children(":eq(1)").html());
				         var datestr1 = $("tr:contains('Date/Time') + tr").children(":eq(1)").html();
				         var datestr2 = datestr1.split(/\s*,\s*|\s*\n\s*/);
						 console.log(datestr2);
						 var now = new Date();
						 var datestr3 = datestr2[2].concat(", ").concat(now.getFullYear()).concat(" ");
						 var hourminute = AMPMTo24Hours(datestr2[4]);
						 console.log("hour and minute: " + hourminute);
						 var datestr3 = datestr3.concat(hourminute);
						 scheduledDate = new Date(datestr3);;
						 console.log("now:" + now.toString());
						 console.log("scheduled:" + scheduledDate.toString());
				}
		}
		
		if ($('h2').text().indexOf('Test Search Criteria') > -1) {
				$('input[type=checkbox][id=siteName1]').prop('checked',true);
				setTimeout(function() {
					$('input[type=submit][name=continueButton]').trigger("click");
					},
					100);
		}
		
		//if success, sound to notify user
		if ($('h2').text().indexOf('Test Selection') > -1) {
			$('body').append("<audio src='http://static.fishlee.net/resources/audio/song.ogg' controls='controls' autoplay='autoplay' loop='loop'>Your browser does not support the audio element.</audio>");
			
			$('#telNumPart1ID').val('484');
			$('#telNumPart2').val('893');
			$('#telNumPart3').val('0357');
			$('#custEmail').val('xinwang.cas@gmail.com');
			
			$("input[type='radio'][id*='examChoice']").each(function() {	
			     var fields = $(this).prop('value').split('#');
				 var date = new Date(fields[0]);
//				 var time = fields[1];
//				 var testcenterID = fields[2];
//				 var testcenterName = fields[3];
				 var today = new Date();
//                 console.log("already scheduled Time: " + scheduledDate.toString());
				 if (date.getTime() < today.getTime() + 1000*3600*24*3) {
				 	 $(this).prop('checked',true);
					 $('input[type=submit][name=continueButton]').trigger("click");
				 }
			});
			
			
			setTimeout(function() {
			               $("input[type='radio'][id='nextPageChangeTime']").prop('checked', true);
					       $('input[type=submit][name=continueButton]').trigger("click");
                   },
				    10000);
		}
		
		//has successfully scheduled a time for road test, just jump back 
		if ($('h3').text().indexOf('TEST CONFIRMATION') > -1) {
		    $('body').append("<audio src='http://static.fishlee.net/resources/audio/song.ogg' controls='controls' autoplay='autoplay' loop='loop'>Your browser does not support the audio element.</audio>");
		}
	}
});

})();