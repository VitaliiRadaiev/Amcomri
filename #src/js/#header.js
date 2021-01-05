{
    let menuLink = document.querySelectorAll('.menu__link.is-sub-menu');
    if(menuLink.length) {
        let isOpenSubMenu = false;

        for(let i = 0; i < menuLink.length; i++ ) {
            let link = menuLink[i];
            
            link.addEventListener('click', function(e) {
                e.preventDefault();

                if(document.documentElement.clientWidth > 991) {
                    let subMenu = document.querySelector(`.sub-menu_${i+1}`);
                    subMenu.classList.add('_active');
                    this.classList.add('_active');
                    isOpenSubMenu = true;
                    
                    if(isOpenSubMenu) {
                        
                        for(let j = 0; j < menuLink.length; j++) {
                            let link = menuLink[j];
    
                            if(this == link) {
                                continue
                            }
                            let subMenu = document.querySelector(`.sub-menu_${j+1}`);
                            subMenu.classList.remove('_active');
                            link.classList.remove('_active');
                        }
                    }
                } else {
                    this.closest('li').classList.toggle('_active');
                    _slideToggle(this.nextElementSibling);
                    
                    for(let j = 0; j < menuLink.length; j++) {
                        let link = menuLink[j];

                        if(this == link) {
                            continue
                        }
                        link.closest('li').classList.remove('_active');
                        _slideUp(link.nextElementSibling);
                    }
                }
                
            })
        }
    }

    let close = document.querySelectorAll('.sub-menu__close');
    if(close.length) {
        for(let btn of close) {
            btn.addEventListener('click', () => {
                
                btn.closest('.sub-menu').classList.remove('_active');
                isOpenSubMenu = false;

                for(let i = 0; i < menuLink.length; i++ ) {
                    menuLink[i].classList.remove('_active');
                }
            })
        }
    }


    function resizeHandler() {
        if(document.documentElement.clientWidth < 992) {
            for(let i = 0; i < menuLink.length; i++ ) {
                let link = menuLink[i];
                let subMenu = document.querySelector(`.sub-menu_${i+1}`);
                link.after(subMenu);
            }    
    
    
            let subMenu = document.querySelectorAll('.sub-menu');
            if(subMenu.length) {
                for(let el of subMenu) {
                    el.style.minHeight = 'auto';
                }
            }
        } else {
            let subMenu = document.querySelectorAll('.sub-menu');
            if(subMenu.length) {
                let pageFirstChild = document.querySelector('.page').firstElementChild;
                let height = pageFirstChild.clientHeight;
        
                for(let el of subMenu) {
                    el.style.minHeight = height + 'px';
                    
                }
            }
        }
    }
    resizeHandler();

    window.addEventListener('resize', resizeHandler);


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
}