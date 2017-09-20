/* ********************************************************functions******************************************************************* */
function showColors(design) {
    $('select#color').html('');
    for (var i = 0; i < $colorOptions.length; i++) {
        if ($colorOptions[i].innerHTML.includes(design)) {
            $('select#color').append($colorOptions[i].outerHTML);
        }
    }
} //1) erases the html contents of the color select 2) sets the content of the color select to the colors based on design
function conflict(clickedEvent,'event', 'conflictEvent') {

}

function disableConflictedEvents(clickedEvent) {
    conflict(clickedEvent,'event','conflictEvent');
    conflict(clickedEvent, 'event', 'conflictEvent');
    conflict(clickedEvent, 'event', 'conflictEvent');
    conflict(clickedEvent, 'event', 'conflictEvent');
} //checks all known conflicts

function getTotalAmount() {

}

/* ********************************************************Validation functions******************************************************** */

/* ********************************************************Events******************************************************** */
$('#title').change(() => {
    $('#other-title').attr('style', 'display:none');
    $('#title option:selected').val() === 'other' ? $('#other-title').removeAttr('style') : '';
}); //  1) hides the other title text field 2) only shows it when its selected by the user

$('#design').change(() => {
    let selectedDesign = $('select#design option:selected').html();
    selectedDesign !== 'Select Theme' ? $('#colors-js-puns').show() : $('#colors-js-puns').hide();
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

/* ********************************************************Global scope and default actions******************************************************* */
$('input#name').focus();                                                    //focus on the first text area
$('#other-title').attr('style', 'display:none');                          //hiding the other job role text field
$('#colors-js-puns').attr('style', 'display:none');                        // hiding the color options 
$('#payment').val('credit card');                                         // selecting the cc as default
$('div p').attr('style', 'display:none');                                 // hiding the paypal and bitcoin text since cc is default option
$colorOptions = $('#color option');                                       // get all availble color choices