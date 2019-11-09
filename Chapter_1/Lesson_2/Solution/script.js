(function($) {
    let clickCounter = 0;

    $('button').on('click', e => {
        let container = $(e.currentTarget).closest('.row');
        $('.typed-text', container).text($('input', container).val());
        clickCounter += 1;
        $('.times-clicked').text(clickCounter);
    });
}(jQuery));
