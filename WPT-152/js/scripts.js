// Empty JS for your own code to be here

$(function(){//тожесамое $(document).ready(function(){
    console.log('i am ready')

    $('#slider').bxSlider({
       slideWidth: 300,
        minSlides: 1,
        maxSlides: 3,
        moveSlides: 1,
        slideMargin: 15,
        adaptiveHeight:true
    });



    //
    // $('#rev_slider_1')
    //     .show()
    //     .revolution({
    //         sliderType:"standard",
    //         delay:9000,
    //         sliderLayout: 'fullwidth',
    //         navigation: {
    //             arrows: {
    //                 enable: true,
    //                 hide_onleave:false
    //             },
    //             bullets: {
    //                 enable: true,
    //                 style: 'hermes',
    //                 direction: 'horizontal',
    //                 h_align: 'center',
    //                 hide_onmobile: 'true',
    //                 v_align: 'bottom',
    //                 h_offset: 0,
    //                 v_offset: 20,
    //                 hide_onleave: false,
    //                 space: 10
    //             }
    //         },
    //         responsiveLevels:[1240,1024,778,480],
    //         visibilityLevels:[1240,1024,778,480],
    //         gridwidth:[1240,1024,778,480],
    //         gridheight:[450,400,350,350],
    //         shuffle:"off",
    //         minHeight:340,
    //         spinner: 'spinner4',
    //         debugMode:false
    //     });

});
