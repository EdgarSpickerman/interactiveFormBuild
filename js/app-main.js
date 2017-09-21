/* ********************************************************functions******************************************************************* */
function showColors(design) {
    $('select#color').html('');
    for (var i = 0; i < $colorOptions.length; i++) {
        $colorOptions[i].innerHTML.includes(design) ? $('select#color').append($colorOptions[i].outerHTML) : '';
    }
} //1) erases the html contents of the color select 2) sets the content of the color select to the colors based on design

function conflict(clickedEvent, conflict, conflictedEvent) {
    if (clickedEvent === conflict) {
        if ($(`[name="${conflictedEvent}"]`).attr('disabled') === 'disabled') {                   // checks to see if the conflicted events checkbox is disabled.
            $(`[name="${conflictedEvent}"]`).removeAttr('disabled');                              // enables the disabled checkbox
            $(`[name="${conflictedEvent}"]`).parent().removeAttr('style');                        // removes the gray textcolor
        } else {
            $(`[name="${conflictedEvent}"]`).attr('disabled', 'true');                            // disables the checkbox of the conflicted event
            $(`[name="${conflictedEvent}"]`).parent().css('color', 'gray');                       // sets the conflicted events textcolor to gray
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
function nameValidator() {
    $('input#name').parent().children('span:contains("name")').remove();
    $('input#name').attr('style', 'background-color:#ff4c4c');
    var validity = false;
    if ($('input#name').val().length === 0) {
        $('input#name').parent().children('legend').after('<span style="color:red">Please enter your name.<br></span>');
    } else if (/^[A-Za-z\s]{1,50}$/.test($('input#name').val())) {
        $('input#name').attr('style', 'background-color:#66ff66');
        validity = true;
    } else {
        $('input#name').parent().children('legend').after('<span style="color:red">Please enter a valid name with no special characters or digits.<br></span>');
    }
    return validity;
} //removes name error messages, checks input for validity against all cases displays the approriate error message depening on the case. returns true if the input is valid.

function emailValidator() {
    $('input#mail').parent().children('span:contains("email")').remove();
    $('input#mail').attr('style', 'background-color:#ff4c4c');
    var validity = false;
    if ($('input#mail').val().length === 0) {
        $('input#name').parent().children('legend').after('<span style="color:red">Please enter your email address.<br></span>');
    } else if (/^[A-Za-z0-9\._-]*[@][A-Za-z]*[\.][a-zA-Z]{2,4}$/.test($('input#mail').val())) {
            $('input#mail').attr('style', 'background-color:#66ff66');
            validity = true;
    } else {
        $('input#name').parent().children('legend').after('<span style="color:red">Please enter a valid email address.For example 1234@example.com<br></span>');
    }
    return validity;
}//removes email error messages, checks input for validity against all cases displays the approriate error message depening on the case. returns true if the input is valid.

function activitiesValidator() {
    $('fieldset.activities').children('span').remove();
    if ($('fieldset.activities input:checked').length > 0) {
        return true;
    } else {
        $('fieldset.activities legend').after('<span style="color:red">Please select at least 1 activity to attend.</span>');
        return false;
    }
}//removes activity error messages, checks user action for validity against all cases displays the approriate error message depening on the case. returns true if the input is valid.

function ccValidator() {
    $('#credit-card').parent().children('span:contains("credit card")').remove();
    $('input#cc-num').attr('style', 'background-color:#ff4c4c');
    var validity = false;
    if ($('input#cc-num').val().length === 0) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">Please enter your 13 to 16 digit credit card number.<br></span>');
    } else if ($('input#cc-num').val().length < 13) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">You entered a invalid credit card number. Credit card numbers need to be at least 13 digits long.<br></span>');
    } else if ($('input#cc-num').val().length > 16) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">You entered a invalid credit card number. Credit card numbers need to be no more than 16 digits long.<br></span>');
    } else if (/^[0-9]{13,16}$/.test($('input#cc-num').val())) {
        $('input#cc-num').attr('style', 'background-color:#66ff66');
        validity = true;
    } else {
        $('#credit-card').parent().children('legend').after('<span style="color:red">You entered a invalid credit card number.<br></span>');
    }
    return validity;
}//removes cc error messages, checks input for validity against all cases displays the approriate error message depening on the case. returns true if the input is valid.

function zipValidator() {
    $('#credit-card').parent().children('span:contains("zip")').remove();
    $('input#zip').attr('style', 'background-color:#ff4c4c');
    var validity = false;
    if ($('input#zip').val().length === 0) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">Please enter your 5 digit zip Code.<br></span>');
    } else if ($('input#zip').val().length<5){
        $('#credit-card').parent().children('legend').after('<span style="color:red">zip Code is not 5 digits long.<br></span>');
    } else if ($('input#zip').val().length > 5) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">zip Code is over 5 digits long.<br></span>');
    } else if (/^[0-9]{5}$/.test($('input#zip').val())) {
        $('input#zip').attr('style', 'background-color:#66ff66');
        validity = true;
    } else {
        $('#credit-card').parent().children('legend').after('<span style="color:red">Please enter a valid zip Code with only numbers.<br></span>');
    }
    return validity;
}//removes zip error messages, checks input for validity against all cases displays the approriate error message depening on the case. returns true if the input is valid.

function cvvValidator() {
    $('#credit-card').parent().children('span:contains("cvv")').remove();
    $('input#cvv').attr('style', 'background-color:#ff4c4c');
    var validity = false;
    if ($('input#cvv').val().length === 0) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">Please enter the 3 digit cvv code locatated at the back of your card.<br></span>');
    } else if ($('input#cvv').val().length < 3) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">The cvv code must be 3 digits long.<br></span>');
    } else if ($('input#cvv').val().length > 3) {
        $('#credit-card').parent().children('legend').after('<span style="color:red">You entered too many digits for your cvv code.<br></span>');
    } else if (/[0-9]{3}$/.test($('input#cvv').val())) {
        $('input#cvv').attr('style', 'background-color:#66ff66');
        validity = true;
    } else {
        $('#credit-card').parent().children('legend').after('<span style="color:red">You entered an invalid 3 digit cvv code.<br></span>');
    }
    return validity;
} //removes cvv error messages, checks input for validity against all cases displays the approriate error message depening on the case. returns true if the input is valid.

/* ********************************************************Events******************************************************** */
//keyup events
$('input#cc-num').keyup(() => {
    ccValidator();
}); //keyboard event listener for the cc field
$('input#zip').keyup(() => {
    zipValidator();
});//keyboard event listener for the zip field
$('input#cvv').keyup(() => {
    cvvValidator();
});//keyboard event listener for the ccv field
$('input#name').keyup(() => {
    nameValidator();
});//keyboard event listener for the name field
$('input#mail').keyup(() => {
    emailValidator();
});//keyboard event listener for the email field

//change events
$('#title').change(() => {
    $('#other-title').attr('style', 'display:none');
    $('#title option:selected').val() === 'other' ? $('#other-title').removeAttr('style') : '';
}); //  1) hides the other title text field 2) only shows it when its selected by the user

$('#design').change(() => {
    let selectedDesign = $('select#design option:selected').html();
    selectedDesign !== 'Select Theme' ? $('#colors-js-puns').removeAttr('style') : $('#colors-js-puns').attr('style','display:none');
    selectedDesign === 'Theme - JS Puns' ? showColors('JS Puns shirt only') : showColors('JS shirt only');
}); //1) gets the html of the selected option. 2) color options show if any theme is selected 3) displays only the colors for each design.

$('fieldset.activities input').on('click',() => {
    $('fieldset.activities').children('span').remove();
}); //

$('fieldset.activities').change((e) => {
    disableConflictedEvents(e.target.name);
    getTotalAmount();
}); //

$('#payment').change(() => {
    $('div p').attr('style', 'display:none');
    $('#credit-card').parent().children('span').remove();
    $('#credit-card .col input').removeAttr('style');
    $('div#credit-card').attr('style', 'display:none');
    $('#payment option:selected').val() === 'credit card' ? $('div#credit-card').removeAttr('style') : '';
    $('#payment option:selected').val() === 'paypal' ? $('p:contains("PayPal option")').removeAttr('style') : '';
    $('#payment option:selected').val() === 'bitcoin' ? $('p:contains("Bitcoin option")').removeAttr('style') : '';
}); //1) hides the paypal and bitcoin paragraph 2) if payment is switched removes any previous error messages/indication 3) shows information only for the correct selected option.

//submit events
$('[type="submit"]').on('click', (e) => {
    var valid = false;
    const message='You successfully completed the form'
    activitiesValidator();
    emailValidator();
    nameValidator();
    if ($('#credit-card').css('display') === 'none') {
        emailValidator() && nameValidator() && activitiesValidator() ? valid = true : '';
    } else {
        cvvValidator();
        ccValidator();
        zipValidator();
        emailValidator() && ccValidator() && nameValidator() && zipValidator() && cvvValidator() && activitiesValidator() ? valid = true:'';
    }
    !valid ? e.preventDefault() : alert(message);
}); //depending if paying with CC calls either 3 or all validation methods. prevents the user from submittig if validation methods fail.

/* ********************************************************Global scope and default actions******************************************************* */
$('input#name').focus();                                                    //focus on the first text area
$('#other-title').attr('style', 'display:none');                          //hiding the other job role text field
$('#colors-js-puns').attr('style', 'display:none');                        // hiding the color options 
$('#payment').val('credit card');                                         // selecting the cc as default
$('select#payment option').first().remove();                              //removes the select payment option since we default to cc
$('div p').attr('style', 'display:none');                                 // hiding the paypal and bitcoin text since cc is default option
$colorOptions = $('#color option');                                       // get all availble color choices