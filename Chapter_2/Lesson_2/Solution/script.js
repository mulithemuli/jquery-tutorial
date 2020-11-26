(function($) {
    $('.amount-table').each((i, table) => {
        $('input[type=text]', table).prop('disabled', true);

        const $table = $(table);

        $table.on('change', 'table input[type=checkbox]', e => {
            const checkbox = $(e.currentTarget);
            const checked = checkbox.prop('checked');
            $('input[type=text]', checkbox.closest('tr')).prop('disabled', !checked).val(() => {
                if (checked) {
                    return $('span.amount', checkbox.closest('tr')).text();
                } else {
                    return '';
                }
            });
        });
    });
}(jQuery));
