const MenuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('.navbar .nav-links');

MenuToggle.addEventListener('click', function() {
    nav.classList.toggle('slide');
})
