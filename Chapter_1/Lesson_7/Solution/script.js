(function($, undefined) {
    let clickCounter = 0;

    $.fn.autoclick = function() {
        return this.each((i, element) => {
            if ($(element).hasClass('autoclick-enabled')) {
                return;
            }
            $('input[type=text]', element).on('change', () => {
                $('button', element).trigger('click');
            });

            $('button', element).hide().on('click', () => {
                let text = $('.typed-text', element).text();
                let typedText = $('input', element).val();
                if (text !== typedText) {
                    clickCounter += 1;
                    $('.times-clicked').text(clickCounter);
                    $('.typed-text', element).text(typedText);
                }
            });
        }).addClass('autoclick-enabled');
    };
}(jQuery));

// it would be okay to move the code of this anonymous function to the one above.
// the separation is made here to simulate a "real-world" environment where the scripts are most likely in separate
// files.
(function($) {
    $('.autoclick').autoclick();

    // this will be invoked after the model has been updated
    // (i.e. our helper function to replace content has replaced everything)
    $(document).on('domUpdated', () => {
        $('.autoclick').autoclick();
    });

    // just a helper to simulate a dom change of some content
    // usually the new dom would be the response of an ajax call or newly generated elements after an event.
    $('#reload_simulator').on('click', () => {
        let oldRow = $('.row:eq(1)');
        let newRow = oldRow.clone(); // clone without arguments ignores events (https://api.jquery.com/clone/)
        newRow.removeClass('autoclick-enabled'); // remove the class since it has been cloned. the dom update wouldn't have done that
        $('button', newRow).removeAttr('style'); // the only changed dom manipulation was to hide the button, so we remove the style attribute
        $('input', newRow).val(''); // if you have already typed something
        $('.typed-text', newRow).text(''); // if you have already typed something
        oldRow.replaceWith(newRow);

        // we trigger an event on the document signalling that a dom modification has occured.
        $(document).trigger('domUpdated');
    });
}(jQuery));
