(function($) {
    $('button').on('click', e => {
        let button = $(e.currentTarget); // need to initialize jQuery on the element to use its functions
        let text = button.siblings('input').val(); // there is only one input as sibling. Otherwise .val() would return the value of the first input matched. (https://api.jquery.com/val/)
        button.siblings('.helper-text').text(text);
    });
}(jQuery));
