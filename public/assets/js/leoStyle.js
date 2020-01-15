// TODO: Da Completare
(function () {
    console.log('Lavorando per voi... | Style.js');
    let x = document.getElementsByClassName('postCover');
    console.log(x);
    x.forEach((item, index) => {
        if (!item.get.complete) {
            item.style.display = 'none';
        } else {
            console.log(`Controllo immagine ${index} completato > Caricamento corretto`);
        }
    })

})();