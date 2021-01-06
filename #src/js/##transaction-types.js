let menuTable = document.querySelector('.transaction-types__nav');
if(menuTable) {
    document.querySelectorAll('.transaction-types__triggers').forEach((item) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const id = e.target.getAttribute('href').replace('#','');

            document.querySelectorAll('.transaction-types__triggers').forEach((child) => {
                child.classList.remove('active');
            });

            document.querySelectorAll('.transaction-types__content').forEach((child) => {
                child.classList.remove('active');
            });

            item.classList.add('active');
            document.getElementById(id).classList.add('active');
        });
    });
}