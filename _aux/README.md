

lewa strona GET ale tylko id, title, author

prawa strona GET po kliknięciu szczegóły bierzemy wszystko 

w js napisać funkcję do tworzenia ramki z książką oraz formularza do jej edycji

$.ajax({
    type: 'POST',
    // make sure you respect the same origin policy with this url:
    // http://en.wikipedia.org/wiki/Same_origin_policy
    url: 'http://nakolesah.ru/',
    data: { 
        'foo': 'bar', 
        'ca$libri': 'no$libri' // <-- the $ sign in the parameter name seems unusual, I would avoid it
    },
    success: function(msg){
        alert('wow' + msg);
    }
});
