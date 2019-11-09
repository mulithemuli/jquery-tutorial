(function($) {
    let clickCounter = 0;

    $('button').on('click', e => {
        let container = $(e.currentTarget).closest('.row');
        let text = $('.typed-text', container).text();
        let typedText = $('input', container).val();
        if (text !== typedText) {
            clickCounter += 1;
            $('.times-clicked').text(clickCounter);
            $('.typed-text', container).text(typedText);
        }
    });
}(jQuery));
