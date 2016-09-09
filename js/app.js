
class Books {

    constructor() {}

    addBookToList(book) {
        var newElement = '<div><h2>' + book.title + '</h2></h3>' + book.author + '</h3><button>Więcej</button>';
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
            //books.forEach(function (book) {

            //});
        });
    }

}

var books = new Books();

books.createBookList();