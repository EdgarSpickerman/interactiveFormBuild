/* ********************************************************functions******************************************************************* */
function showColors(design) {
    $('select#color').html('');
    for (var i = 0; i < $colorOptions.length; i++) {
        if ($colorOptions[i].innerHTML.includes(design)) {
            $('select#color').append($colorOptions[i].outerHTML);
        }
    }
} //1) erases the html contents of the color select 2) sets the content of the color select to the colors based on design
function conflict(clickedEvent,event, conflictEvent) {
    if (clickedEvent === event) {
        if ($(`[name="${conflictEvent}"]`).attr('disabled') === 'disabled') {                   // checks to see if the conflicted events checkbox is disabled.
            $(`[name="${conflictEvent}"]`).removeAttr('disabled');                              // enables the disabled checkbox
            $(`[name="${conflictEvent}"]`).parent().removeAttr('style');                        // removes the gray textcolor
        } else {
            $(`[name="${conflictEvent}"]`).attr('disabled', 'true');                            // disables the checkbox of the conflicted event
            $(`[name="${conflictEvent}"]`).parent().css('color', 'gray');                       // sets the conflicted events textcolor to gray

        }
    }
}

function disableConflictedEvents(clickedEvent) {
    conflict(clickedEvent, 'js-frameworks','express'); 
    conflict(clickedEvent, 'express', 'js-frameworks');
    conflict(clickedEvent, 'node', 'js-libs');
    conflict(clickedEvent, 'js-libs', 'node');
} //checks all known conflicts

function getTotalAmount() {
    $('.activities p').remove();                                            //removes the total paragraph from the dom
    let totalAmount = 0;
    if ($('input:checked').length > 0) {
        for (var i = 0; i < $('input:checked').length; i++) {
            let labelString = $('input:checked')[i].nextSibling.data;       //traverses to the next sibling and grabs the data(text) of the associated label tag.
            let endPos = labelString.length;                                //retrieves the count of the characters in the label assoicated with each checkbox checked
            let startPos = 1 + labelString.indexOf('$');                    //finds and returns the starting position of the $ sign adds 1 since we dont want the $ sign.
            totalAmount += parseInt(labelString.slice(startPos, endPos));
        }
        $('.activities').append(`<p>Total: $${totalAmount}</p>`);
    }
}

/* ********************************************************Validation functions******************************************************** */
function emailValidator() {
    let result = /^[A-Za-z0-9\._-]*[@][A-Za-z]*[\.][a-zA-Z]{2,4}$/.test($('input#mail').val());
}

function ccValidator() {
    return /^[0-9]{13,16}$/.test($('input#cc-num').val());
}

function nameValidator() {
    return /^[A-Za-z\s]{1,50}$/.test($('input#name').val());
}

function zipValidator() {
    return /^[0-9]{5}$/.test($('input#zip').val());
}

function cvvValidator() {
    $('#credit-card').parent().children('span').remove();
    var result = false;
    $('input#cvv').attr('style', 'background-color:#ff4c4c');
    if ($('input#cvv').val().length === 0) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">Please enter the 3 digit code locatated at the back of your card.</span>')
    } else if ($('input#cvv').val().length < 3) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">The CVV code must be 3 digits long.</span>')
    } else if ($('input#cvv').val().length === 3) {
        if (/[0-9]{3}$/.test($('input#cvv').val())) {
            $('input#cvv').attr('style', 'background-color:#66ff66');
            result = true;
        } else {
            $('#credit-card').parent().children('legend').after('<span style="color:red">You entered an invalid 3 character code.</span>')
        }
    } else {
        $('#credit-card').parent().children('legend').after('<span style="color:red">You entered too many digits for your cvv code.</span>')
    }
    return result;
}

function activitiesValidator() {
    $('fieldset.activities legend').children().remove();
    let result = $('fieldset.activities input:checked').length;
    if (result > 0) {
        return true;
    } else {
        $('fieldset.activities').children('legend').after('<span style="color:red">Please select at least 1 activity to attend.</span>');
        return false;
    }
}

/* ********************************************************Events******************************************************** */
$('input#name').keyup(() => {
    nameValidator();
});
$('input#email').keyup(() => {
    emailValidator();
});
$('#title').change(() => {
    $('#other-title').attr('style', 'display:none');
    $('#title option:selected').val() === 'other' ? $('#other-title').removeAttr('style') : '';
}); //  1) hides the other title text field 2) only shows it when its selected by the user

$('#design').change(() => {
    let selectedDesign = $('select#design option:selected').html();
    selectedDesign !== 'Select Theme' ? $('#colors-js-puns').removeAttr('style') : $('#colors-js-puns').attr('style','display:none');
    selectedDesign === 'Theme - JS Puns' ? showColors('JS Puns shirt only') : showColors('JS shirt only');
}); //1) gets the html of the selected option. 2) color options show if any theme is selected 3) displays only the colors for each design.

$('fieldset.activities').change((e) => {
    disableConflictedEvents(e.target.name);
    getTotalAmount();
});

$('#payment').change(() => {
    $('div p').attr('style', 'display:none');
    $('div#credit-card').attr('style', 'display:none');
    $('#payment option:selected').val() === 'credit card' ? $('div#credit-card').removeAttr('style') : '';
    $('#payment option:selected').val() === 'paypal' ? $('p:contains("PayPal option")').removeAttr('style') : '';
    $('#payment option:selected').val() === 'bitcoin' ? $('p:contains("Bitcoin option")').removeAttr('style') : '';
}); //1) hides the paypal and bitcoin paragraph 2) shows information only for the correct selected option.

$('input#cc-num').keyup(() => {
    ccValidator();
});

$('input#zip').keyup(() => {
    zipValidator();
});

$('input#cvv').keyup(() => {
    cvvValidator();
});

$('[type="submit"]').on('click', (e) => {
    activitiesValidator();
    cvvValidator();
    emailValidator();
    ccValidator();
    nameValidator();
    zipValidator();
    if (emailValidator() && ccValidator() && nameValidator() && zipValidator() && cvvValidator() && activitiesValidator()) {
        alert('successfully completed form');
    } else {
        alert('Form has errors please check');
        e.preventDefault();
    }
}); //calls each validation method, evaluates if any fail. if any fail it prevents the user from submittig. if no fails the user submits the form. User is notified of either sucessful or unsuccessful submits.

/* ********************************************************Global scope and default actions******************************************************* */
$('input#name').focus();                                                    //focus on the first text area
$('#other-title').attr('style', 'display:none');                          //hiding the other job role text field
$('#colors-js-puns').attr('style', 'display:none');                        // hiding the color options 
$('#payment').val('credit card');                                         // selecting the cc as default
$('select#payment option').first().remove();                              //removes the select payment option since we default to cc
$('div p').attr('style', 'display:none');                                 // hiding the paypal and bitcoin text since cc is default option
$colorOptions = $('#color option');                                       // get all availble color choices