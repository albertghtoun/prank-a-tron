replacements = {
    'the'       : 'teh',
    'lose'      : 'loose',
    'there'     : 'their',
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

$('input[type="text"], textarea').on('change keyup paste', function() {
    var contents = $(this).val();
    for (key in replacements) {
        var regex = new RegExp(key);
        contents = contents.replace(regex, replacements[key]);
    }
    $(this).val(contents);
});