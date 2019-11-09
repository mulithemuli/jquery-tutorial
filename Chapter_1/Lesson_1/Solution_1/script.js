(function($) {
    $('#text_1_handler').on('click', () => {
        let text = $('#text_1').val(); // unnecessary to store the variable, could be inlined, but here for readability.
        $('#helper_text_1').text(text)
    });

    $('#text_2_handler').on('click', () => $('#helper_text_2').text($('#text_2').val()));
}(jQuery));
