{
    let promoSlider = document.querySelector('.promo-slider');
    if (promoSlider) {
        let tpromoSliderBg;
            tpromoSliderBg = new Swiper(promoSlider.querySelector('.promo-slider__bg.swiper-container'), { 
            speed: 800,
            effect: 'fade',
            loop: true,
        });

        let promoSliderText;
            promoSliderText = new Swiper(promoSlider.querySelector('.promo-slider__column-big.swiper-container'), {
            spaceBetween: 40,
            //effect: 'fade',
            loop: true,
            speed: 800,
            navigation: {
                nextEl: promoSlider.querySelector('.slider-btn.btn-next'),
                prevEl: promoSlider.querySelector('.slider-btn.btn-prev'),
            },
            preloadImages: false,
            autoplay: {
                delay: 5000,
            },
        });

        promoSliderText.controller.control = tpromoSliderBg;
    }

}
