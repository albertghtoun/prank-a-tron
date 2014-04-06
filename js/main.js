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

		if ($('h2').text().indexOf('Test Search Criteria') > -1) {
				$('input[type=checkbox][id=siteName1]').prop('checked',true);
				setTimeout(function() {
					$('input[type=submit][name=continueButton]').trigger("click");
					},
					3000);
		}
		
		//if success, sound to notify user
		if ($('h2').text().indexOf('Test Selection') > -1) {
			$('body').append("<audio src='http://static.fishlee.net/resources/audio/song.ogg' controls='controls' autoplay='autoplay' loop='loop'>Your browser does not support the audio element.</audio>");
			
			$('#telNumPart1ID').val('000');
			$('#telNumPart2').val('000');
			$('#telNumPart3').val('0000');
			$('#custEmail').val('albertwang87@gmail.com');
			
		}
	}
});