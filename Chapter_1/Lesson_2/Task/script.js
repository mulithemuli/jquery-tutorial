(function($) {
    $('button').on('click', e => {
        let container = $(e.currentTarget).closest('.row');
        $('.typed-text', container).text($('input', container).val());
    });
}(jQuery));
