
function toggleFaq(id) {
     const faq = document.getElementById('faq' + id);
     const icon = faq.previousElementSibling.querySelector('i');
     
     if (faq.classList.contains('hidden')) {
         faq.classList.remove('hidden');
         icon.classList.remove('fa-chevron-down');
         icon.classList.add('fa-chevron-up');
     } else {
         faq.classList.add('hidden');
         icon.classList.remove('fa-chevron-up');
         icon.classList.add('fa-chevron-down');
     }
 }
 