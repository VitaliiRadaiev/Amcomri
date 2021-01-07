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

	@@include('_function.js');
	@@include('forms.js');
	@@include('da.js');
	@@include('burger.js');
	@@include('popup.js');
	


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


		// ==== ADD PADDING-TOP ================================
		{
			let wrapper = document.querySelector('.wrapper');
			if (wrapper) {
				let header = document.querySelector('.header');
				if(header) {
					let headerHeight = header.clientHeight;
					wrapper.style.paddingTop = headerHeight + 'px';
				}
				
			}
		}
		// ==== AND ADD PADDING-TOP ================================
		
		@@include('#header.js');

	// ==== blocks =====================================================
	@@include('##slider.js');
	@@include('##promo-slider.js');
	@@include('##preview-block.js');
	@@include('##slider-text.js');
	@@include('##latest-news.js');
	@@include('##transaction-types.js');
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