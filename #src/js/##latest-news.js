{
    let latestNews = document.querySelector('.latest-news');
    if (latestNews) {
        let latestNewsSlider;
            latestNewsSlider = new Swiper(latestNews.querySelector('.latest-news__slider.swiper-container'), { 
            spaceBetween: 44,
            speed: 600,
            navigation: {
                nextEl: latestNews.querySelector('.slider-btn.btn-next'),
                prevEl: latestNews.querySelector('.slider-btn.btn-prev'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    autoHeight: true,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 34,
                },
                1268: {
                    slidesPerView: 4,
                    spaceBetween: 44,
                },
            },
        });

    }

}
