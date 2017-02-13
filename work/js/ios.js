var windowme = $(window);
windowme.resize(function () {
    console.log('resize!!')
    var header = $('.Header');
    var newPosition = windowme.width() < header.width() ? 'static' : 'fixed';

    header.css('position', newPosition );
});
