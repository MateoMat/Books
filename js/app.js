$(function() {

    var BTN_MORE = "More";
    var BTN_CLOSE = "Close";
    var FORM_ADD_BOOK_TITLE = "Add book to library";
    var LABEL_AUTHOR = "Author";
    var LABEL_TITLE = "Title";
    var LABEL_DESCR = "Description";

    class Books {

        constructor() {}

        addBookToList(book) {

            var newEl = '<div class="col-md-6 col-md-offset-3" data-id="' + book.id + '">' +
                '<div class="panel panel-info">' +
                '<div class="panel-heading">' +
                '<h3 class="panel-title">' + book.title + ' - ' + book.author + '</h3>' +
                '</div>' +
                '<div class="panel-body">' +
                '</div>' +
                '<div class="panel-footer"><button>' + BTN_MORE  + '</button>' +
                '</div>' +
                '</div>' +
                '</div>';

            $('books').append(newEl);

        }

        createBookList() {
            var $this = this;
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json'
            }).done(function(books) {
                for (var i = 0; i < books.length; i++) {
                    $this.addBookToList(books[i]);
                }
                $('books div.panel-body').hide();
            });
        }
    }

    function closeAllDetails() {
        // first change all button names to MORE
        
        $('books div.panel-body').hide();
        $('books button').text(BTN_MORE);
    }


    var books = new Books();

    books.createBookList();
    
    $('div#add_book_title h3').text(FORM_ADD_BOOK_TITLE);
    
    $('label#lbl_add_book_author').text(LABEL_AUTHOR);
    $('label#lbl_add_book_title').text(LABEL_TITLE);
    $('label#lbl_add_book_descr').text(LABEL_DESCR);
    

    $('books').on('click', 'button', function() {

        var $par = $(this).parent('div').parent('div').parent('div');
        var book_id = $par.data('id');
        //console.log(book_id);
        //closeAllDetails();


        if ($(this).text() == BTN_MORE) {
            // open and read from DB
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    id: book_id
                },
            }).done(function(books) {
                $par.find('div.panel-body').text(books[0].descr);
                $par.find('div.panel-body').show();
            });

            // change button name :)
            $(this).text(BTN_CLOSE);
        } else if ($(this).text() == BTN_CLOSE) {
            // close
            $par.find('div.panel-body').hide();
            // change button name
            $(this).text(BTN_MORE);
        }
        console.log();


        //var $this = this; // zapobiegnie nadpisaniu przez ajax


    });

    closeAllDetails();

});
