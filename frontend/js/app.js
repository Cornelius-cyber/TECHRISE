document.querySelectorAll('.hamburger').forEach(item => { item.addEventListener('click', () => 
    { document.querySelector('.nav-links').classList.toggle('active'); }); }); document.querySelectorAll('.faq-item h3').forEach(item =>
         { item.addEventListener('click', () => 
    { const parent = item.parentElement; parent.classList.toggle('active'); }); });