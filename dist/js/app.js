var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };



// === lazy load ==================================================================
document.addEventListener("DOMContentLoaded", function () {
	var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

	if ("IntersectionObserver" in window) {
		let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					//lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove("lazy");
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});

		lazyImages.forEach(function (lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});
	} else {
		// Possibly fall back to event handlers here
	}
});
// === // lazy load ==================================================================

$(document).ready(function () {
	document.body.classList.add('is-load');

	//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================




// === Конвертация svg картинки в svg код ==================================================================
$('img.img-svg').each(function(){
  var $img = $(this);
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');
  $.get(imgURL, function(data) {
    var $svg = $(data).find('svg');
    if(typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass+' replaced-svg');
    }
    $svg = $svg.removeAttr('xmlns:a');
    if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
      $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    }
    $img.replaceWith($svg);
  }, 'xml');
});
// === // Конвертация svg картинки в svg код ==================================================================



//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
spollerInit()
// === // Spollers ==================================================================;
	// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');

//Слушаем изменение размера экрана
window.addEventListener('resize', move);

//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}

//Вызываем функцию
move();

*/
;
	// === Burger Handler =====================================================================
	function burgerBtnAnimation(e) {
		$('.burger span:nth-child(1)').toggleClass('first');
		$('.burger span:nth-child(2)').toggleClass('second');
		$('.burger span:nth-child(3)').toggleClass('third');
		$('.burger span:nth-child(4)').toggleClass('fourth');
		let classNameElem = document.querySelector('.burger').dataset.activel;
		document.querySelector(`.${classNameElem}`).classList.toggle('open');
		_slideToggle(document.querySelector(`.${classNameElem}`));
	}
	$('.burger').click((e) => burgerBtnAnimation(e));
// === Burger Handler =====================================================================	;
	// ==== Popup form handler====

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup_content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function() {
		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===;


	// === Проверка, поддержка браузером формата webp ==================================================================

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

	// === // Проверка, поддержка браузером формата webp ==================================================================


		// // ==== ADD PADDING-TOP ================================
		// {
		// 	let wrapper = document.querySelector('.wrapper');
		// 	if (wrapper) {
		// 		let headerHeight = document.querySelector('.top-line').clientHeight;
		// 			wrapper.style.paddingTop = headerHeight + 'px';
		// 	}
		// }
		// // ==== AND ADD PADDING-TOP ================================

	// ==== blocks =====================================================
	{
    let slider = document.querySelectorAll('.slider');

	if(slider.length>0) {
		slider.forEach(item => {
			var mySwiper = new Swiper(item.querySelector('.swiper-container'), {
			slidesPerView:1,
			effect: 'fade',
			//loop: true,
			speed: 600,
			autoplay: {
			  delay: 4000,
			   disableOnInteraction: false,
			},
			spaceBetween: 15,
			pagination: {
			    el: item.querySelector('.swiper-pagination'),
			     clickable: true,
			     renderBullet: function(index, className) {
			     	return '<div class="' + className + '"> <span class="progress"></span> </div>'
			     }
			  },
			 on: {

			 	slideChangeTransitionStart: function(current) {
			 		let pagination = item.querySelector('.swiper-pagination');
			 		let lenght = pagination.children.length;
			 		
			 		for(let i = 0; i < lenght; i++) {
			 			if(i == current.activeIndex) break;
			 			pagination.children[i].classList.add('isShow');
			 		}

			 		for(let i = current.activeIndex; i < lenght; i++) {
			 			pagination.children[i].classList.remove('isShow');
			 			pagination.children[i].firstElementChild.style.transform = 'scaleX(0)';
			 		}
			 	}
			 }, 
				// scrollbar: {
				//   el: item.querySelector('.swiper-scrollbar'),
				// },
			})
		})
	}
};
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
;
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
    
};
	{
    let slider = document.querySelectorAll('.text-slider');

	if(slider.length>0) {
		slider.forEach(item => {
			var mySwiper = new Swiper(item.querySelector('.swiper-container'), {
			slidesPerView:1,
			//loop: true,
			speed: 600,
			autoplay: {
			  delay: 4000,
			   disableOnInteraction: false,
			},
			spaceBetween: 55,
			pagination: {
			    el: item.querySelector('.swiper-pagination'),
			     clickable: true,
			     renderBullet: function(index, className) {
			     	return '<div class="' + className + '"> <span class="progress"></span> </div>'
			     }
			  },
			 on: {

			 	slideChangeTransitionStart: function(current) {
			 		let pagination = item.querySelector('.swiper-pagination');
			 		let lenght = pagination.children.length;
			 		
			 		for(let i = 0; i < lenght; i++) {
			 			if(i == current.activeIndex) break;
			 			pagination.children[i].classList.add('isShow');
			 		}

			 		for(let i = current.activeIndex; i < lenght; i++) {
			 			pagination.children[i].classList.remove('isShow');
			 			pagination.children[i].firstElementChild.style.transform = 'scaleX(0)';
			 		}
			 	}
			 }, 
				// scrollbar: {
				//   el: item.querySelector('.swiper-scrollbar'),
				// },
			})
		})
	}
};
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
;
	// ==== AND blocks =====================================================

});

// {


// 	let isMap = document.getElementById("map");
// 	if(isMap) {
// 		var map;

// 		let center = {
// 			lat: 40.68950,
// 			lng: -74.044683,
// 		}

// 		let markerPosition = {
// 			lat: 40.68950,
// 			lng: -74.044683,
// 		}

// 		// Функция initMap которая отрисует карту на странице
// 		function initMap() {

// 			// В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
// 			map = new google.maps.Map(document.getElementById('map'), {
// 				// При создании объекта карты необходимо указать его свойства
// 				// center - определяем точку на которой карта будет центрироваться
// 				center: {lat: center.lat, lng: center.lng},
// 				// zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.

// 				zoom: 16,

// 				// Добавляем свои стили для отображения карты
// 				//styles: 
// 			});

// 			// Создаем маркер на карте
// 			var marker = new google.maps.Marker({

// 				// Определяем позицию маркера
// 			    position: {lat: markerPosition.lat, lng: markerPosition.lng},

// 			    // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
// 			    map: map,

// 			    // Пишем название маркера - появится если навести на него курсор и немного подождать
// 			    title: '',
// 			    label: '',

// 			    // Укажем свою иконку для маркера
// 			   // icon: 'img/contact/googlMarker.svg',
// 			});

// 		}
// 	}
// }