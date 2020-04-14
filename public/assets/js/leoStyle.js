// TODO: Da Completare
(function () {
  console.log('Lavorando... | Style.js');

  var path = window.location.pathname;
  var page = path.split('/').pop();

  if (page === '' || page === '/') {
    page = 'primapagina';
  } else if (page === 'redazione') {
    document.getElementById(page).classList.add('active');
    return;
  }

  if (document.getElementById(page)) {
    document.getElementById(page).classList.add('active');
  }

  /* cookies.onChanged.addListener(function (changeInfo) {
    console.log('Cookie Aggiornato: ' +
      '\n * Cookie: ' + JSON.stringify(changeInfo.cookie) +
      '\n * Cause: ' + changeInfo.cause +
      '\n * Removed: ' + changeInfo.removed);
  }); */
  /* document.cookie.addEventListener('change', (e) => {
    console.log(e);
  }) */
  console.log(document.cookie);

  console.log('Pagina Corrente > ' + page);
})();

var checkCookie = function () {

  var lastCookie = document.cookie; // 'static' memory between function calls

  return function () {

    var currentCookie = document.cookie;

    if (currentCookie != lastCookie && currentCookie.includes('imgKey') && !currentCookie.includes('null')) {

      // something useful like parse cookie, run a callback fn, etc.
      console.log('Cookie Aggiornati!');
      let location = 'https://graffitisbucket.s3.eu-central-1.amazonaws.com/' + Cookies.get('imgKey').replace(/%2F/gi, '/');
      document.getElementById('imgInputField').setAttribute('value', location);
      console.log('Input Field Immagine Aggiornato: ' + location);

      lastCookie = currentCookie; // store latest cookie

    } else if (currentCookie.includes('null')) {
      Cookies.remove('imgKey');
      document.getElementById('imgInputField').setAttribute('value', '');
    }
  };
}();

window.setInterval(checkCookie, 100); // run every 100 ms