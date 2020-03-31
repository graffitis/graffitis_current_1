// TODO: Da Completare
(function() {
  console.log('Lavorando... | Style.js');

  var path = window.location.pathname;
  var page = path.split('/').pop();

  if (page === '' || page === '/') {
    page = 'primapagina';
  } else if (page === 'redazione') {
    document.getElementById(page).classList.add('active');
    return;
  }

  document.getElementById(page).classList.add('active');

  console.log('Pagina Corrente > ' + page);
})();
