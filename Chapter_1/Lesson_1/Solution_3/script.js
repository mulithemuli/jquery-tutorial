$('button').on('click', e => {
    let container = $(e.currentTarget).closest('.row'); // we use .closest() to get the nearest parent which matches the filter. .parent() would serve as well in this example. But won't work if the text is outside the ".input-field" div.
    let text = $('input', container).val(); // we use a context aware selector. The context is our container (the "div.row"). Only elements inside the container will be selected.
    $('.typed-text', container).text(text); // same as previous in the previous row
});
