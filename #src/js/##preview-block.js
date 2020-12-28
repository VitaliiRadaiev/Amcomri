let previewBlock = document.querySelector('.preview-block');
if(previewBlock) {
    let previewText;
    previewText = new Swiper(previewBlock.querySelector('.preview-block__slider.swiper-container'), {
        spaceBetween: 0,
        //effect: 'fade',
        slidesPerView: 5,
        centeredSlides: true,
        loop: true,
        speed: 800,
        
        navigation: {
            nextEl: previewBlock.querySelector('.slider-btn.btn-next'),
            prevEl: previewBlock.querySelector('.slider-btn.btn-prev'),
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
         autoplay: {
             delay: 4000,
                disableOnInteraction: false,
         },
       on: {
        slideChange: function () {
            if(previewText) {
 
                let bg = previewBlock.querySelector('.preview-block__bg').children;
                let text = previewBlock.querySelector('.preview-block__text .swiper-wrapper').children;
            
                bg[previewText.realIndex].classList.add('_active');
                text[previewText.realIndex].classList.add('_active');
                for(let bgEl of bg) {
                    if(bgEl == bg[previewText.realIndex]) {
                        continue
                    }
                    bgEl.classList.remove('_active');
                }

                for(let textEl of text) {
                    if(textEl == text[previewText.realIndex]) {
                        continue
                    }
                    textEl.classList.remove('_active');
                }

            }
            
         
        },
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                direction: 'horizontal',
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 0,
                direction: 'vertical',
            },
        },
    });

    let stop = false;
    let playPouse = document.querySelector('.preview-block__pouse-play');
    let img = document.querySelector('.preview-block__pouse-play img');
    let srcPause = img.src;
    let srcPlay = srcPause.replace('pause.svg', 'play.svg')
    
    playPouse.addEventListener('click', () => {
        if(!stop) {
            stop =  previewText.autoplay.stop(); 
            img.src = srcPlay;
        } else {
            previewText.autoplay.start();
            stop = false;
            img.src = srcPause;
        }
       
    })    


    if(document.documentElement.clientWidth < 992) {
        let text = previewBlock.querySelector('.preview-block__text').children;
        for(let textEl of text) {
            console.log(textEl.clientHeight);
            
        }
    }

    let sliderText = previewBlock.querySelector('.preview-block__text.swiper-container');
    let previewText2;

    
    function mobileSlider() {
        if(document.documentElement.clientWidth < 992 && sliderText.dataset.mobile == 'false') {
            previewText2 = new Swiper(sliderText, {
                slidesPerView: 1,
                //centeredSlides: true,
                speed: 800,
                loop: true,
            });

            sliderText.dataset.mobile = 'true';

            previewText.controller.control = previewText2;
            previewText2.controller.control = previewText;
            //mySwiper.slideNext(0);
        }

        if(document.documentElement.clientWidth > 991) {
            sliderText.dataset.mobile = 'false';

            if(sliderText.classList.contains('swiper-container-initialized')) {
                previewText2.destroy();
            }
        }
    }

    mobileSlider();

    window.addEventListener('resize', () => {
        mobileSlider();
    })
    
}