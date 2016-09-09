
class Books {

    constructor() {}

    addBookToList(book) {
        var newElement = '<div data-id="' + book.id + '"><h2>' + book.title + '</h2></h3>' + book.author + '</h3><button data>Więcej</button>';
        $('books').append(newElement);
        console.log(book['title']);
    }

    createBookList() {
        var $this = this;
        $.ajax({
            url: 'api/books.php',
            type: 'GET',
            dataType: 'json'
        }).done(function (books) {
            for (var i = 0; i < books.length; i++) {
                $this.addBookToList(books[i]);
            }
        });
    }

}

var books = new Books();

books.createBookList();


$('books').on('click', 'button', function () {
    console.log($(this).parent('div').data('id'));
    var $this = this; // zapobiegnie nadpisaniu przez ajax
    //console.log(this.parrent().data('id'));

});