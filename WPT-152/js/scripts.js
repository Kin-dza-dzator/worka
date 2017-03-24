// Empty JS for your own code to be here

$(function(){//тожесамое $(document).ready(function(){
    console.log('i am ready');

    var slider = $('#slider').bxSlider({
       slideWidth: 300,
        minSlides: 1,
        maxSlides: 3,
        moveSlides: 1,
        slideMargin: 15,
        adaptiveHeight:true,
        onSlideAfter: function($slideElement, oldIndex, newIndex){
           //прописать в средний num
            $('#slider-num .num:nth-child(2)').text(newIndex+1);
        }

    });
    //узнать количество слайдов в слайдере
    var count = slider.getSlideCount();
    //todo пихнуть цыфру количества слайдов в конец(вмсето 45)
    $("#slider-num .num:last-child").text(count);

    var current = slider.getCurrentSlide();
    // засунуть вместо 13
    $("#slider-num .num:nth-child(2) ").text(current);
//todo изменить все индексы на -1



    $('#slider-num .num:first-child').on('click', function(){
        slider.goToSlide(1);
    });

     $('#slider-num .num:last-child').on('click', function(){
         slider.goToSlide(count);
    });



});
