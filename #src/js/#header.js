
    let subMenuTitle = document.querySelectorAll('.sub-menu__title');
    if(subMenuTitle.length) {
        for(let i = 0; i < subMenuTitle.length; i++) {
            let title = subMenuTitle[i];
            title.addEventListener('click', function() {
                if(document.documentElement.clientWidth < 992) {
                    this.classList.toggle('_active');
                    _slideToggle(this.nextElementSibling);

                    for(let j = 0; j < subMenuTitle.length; j++) {
                        let title = subMenuTitle[j];
                        
                        if(this == title) {
                            continue
                        }
                        title.classList.remove('_active');
                        _slideUp(title.nextElementSibling);
                    }
                }
            })
        }
    }
// }

{
    let menuList = document.querySelector('.menu__list');
    let wrapper = document.querySelector('.wrapper');
    if(menuList) {
        for(let item of menuList.children) {
           item.addEventListener('mouseenter', function(e) {
               if(document.documentElement.clientWidth > 991) {
                if(item.classList.contains('is-sub-menu')) {
                    this.classList.add('_active')
                    wrapper.classList.add('cover');

                    for(let item of menuList.children) {
                        if(this == item) {
                            continue;
                        }
    
                        item.classList.remove('_active');
                    }
               } else {
                    wrapper.classList.remove('cover');
                    for(let item of menuList.children) {
                        item.classList.remove('_active');
                    }
               }
               }               

           })

           item.addEventListener('click', function(e) {
               if(document.documentElement.clientWidth < 992) {
                    if(item.classList.contains('is-sub-menu')) {
                        if(e.target.closest('.menu__link')) {
                            e.preventDefault();
                            item.classList.toggle('_active');
                            _slideToggle(item.querySelector('.sub-menu'))
     
                            for(let item of menuList.children) {                                
                                 if(this == item) {
                                     continue;
                                 }
             
                                 item.classList.remove('_active');
                                 let subMenu = item.querySelector('.sub-menu');
                                 if(subMenu) {
                                     _slideUp(subMenu)
                                 }
                         }
                        }
                    }
               }
           })
            
        }
    }

    if(document.documentElement.clientWidth > 991) {
        let subMenu = document.querySelectorAll('.sub-menu');
        if(subMenu.length) {
            subMenu.forEach(item => {
                let btnClose = item.querySelector('.sub-menu__close');
                btnClose.addEventListener('click', function() {
                    this.closest('.menu__item').classList.remove('_active')
                    wrapper.classList.remove('cover');
                })
            })
        }
    }
}


{
    let header = document.querySelector('.header');
    if(header) {
        let isScroll = window.pageYOffset;
        let menuList = document.querySelector('.menu__list');
        let wrapper = document.querySelector('.wrapper');
        window.addEventListener('scroll', () => {
            if(window.pageYOffset > isScroll) {
                if(window.pageYOffset > header.clientHeight) {
                    header.style.transform = "translateY(-100%)";

                    for(let el of menuList.children) {
                        el.classList.remove('_active');
                    }
                    wrapper.classList.remove('cover')
                    isScroll = window.pageYOffset;
                }
            } else if(window.pageYOffset < isScroll) {
                header.style.transform = "translateY(0%)";
                isScroll = window.pageYOffset;
            }
            
        });
    }
}