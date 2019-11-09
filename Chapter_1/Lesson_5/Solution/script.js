(function($) {
    let clickCounter = 0;

    $('.autoclick').each((i, element) => {
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
    });
}(jQuery));
