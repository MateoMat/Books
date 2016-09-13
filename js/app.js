$(function() {

    var BTN_MORE = "More";
    var BTN_CLOSE = "Close";
    var BTN_DEL = "Remove Book"
    var BTN_CANCEL = "Cancel";
    var FORM_ADD_BOOK_TITLE = "Add book to library";
    var LABEL_AUTHOR = "Author";
    var LABEL_TITLE = "Title";
    var LABEL_DESCR = "Description";
    var BTN_ADD_BOOK = "Add book";
    var MSG_AUTHOR = "Author field can't be empty";
    var MSG_TITLE = "Title field can't be empty";
    var MSG_DESCR = "Description field can't be empty";
    var MSG_DEL_TITLE = "Removing book";
    var MSG_DEL_MSG = "Are you sure that you want to remove this book ?";

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
                '<div class="panel-footer">' +
                '<button class="button_more btn btn-xs btn-primary">' + BTN_MORE  + '</button>' +
                '<button class="button_del btn btn-xs btn-danger">' + BTN_DEL + '</button>' +
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
        
        getBookDescription( book_id ){
            var $this = this;
            var descr = "";
             $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    id: book_id
                },
            }).done(function(books) {
                $('*[data-id="' + book_id +'"] div.panel-body').text(books[0].descr);             
            });
        }
        
        // removing HTML element for deleteg book from <books>
        removeBookElement( book_id ){
            $('books div[data-id="' + book_id +'"]').remove();
        }
        
        delBook( book_id ){
            var $this = this;
            
                $.ajax({
                type: 'POST',
                        url: 'api/books.php',
                        data: {
                            del_id : book_id
                        },
                        success: function (data, status) {    
                        $this.removeBookElement(book_id);
                        }
                });
        }
        
        addBook2DB( author, title, descr) { // the same var names for POST
            
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
    $('button#btn_add_book').text(BTN_ADD_BOOK);
    
    $('button#btn_add_book').on('click', function(event){
//        console.log("będę dodawał książkę");
//        console.log($('input#inp_add_book_author').val().length);
        
        if( $('input#inp_add_book_author').val().length == 0){
            bootbox.alert(MSG_AUTHOR);
            return false;
        }
        
        if( $('input#inp_add_book_title').val().length == 0){
            bootbox.alert(MSG_TITLE);
            return false;
        }
        
        if( $('textarea#ta_add_book_descr').val().length == 0){
            bootbox.alert(MSG_DESCR);
            return false;
        }
        
        // take data out and write POST AJAX
        
        
        
    });
    
    
    $('books').on('click', 'button.button_del', function() {

        var $par = $(this).parent('div').parent('div').parent('div');
        var book_id = $par.data('id');
        //console.log();
        
        bootbox.dialog({
        message: MSG_DEL_MSG + '<br><strong>' + $par.find('h3').text() + '</strong>' ,
                title: MSG_DEL_TITLE,
                buttons: {
                success: {
                label: BTN_CANCEL,
                        className: "btn-success",
                        callback: function() {
                        // do nothing
                        }
                },
                        danger: {
                        label: BTN_DEL,
                                className: "btn-danger",
                                callback: function() {
                                // call
                                books.delBook(book_id);
                                }
                        },
                        
                }
        });
        
        
        
        
        
        
//        bootbox.confirm("test", function(result) {
//            if ( result ) {
//                // delete book with book_id
//            }
//            console.log("Confirm result: "+result);
//        }); 
        
        
        
    });
    

    $('books').on('click', 'button.button_more', function() {

        var $par = $(this).parent('div').parent('div').parent('div');
        var book_id = $par.data('id');

        if ($(this).text() == BTN_MORE) {
            // get book description from db by ajax call
            books.getBookDescription( book_id );
            // show element with description
            $par.find('div.panel-body').show();
            
            // change button name :)
            $(this).text(BTN_CLOSE);
            
        } else if ($(this).text() == BTN_CLOSE) {
            // close
            $par.find('div.panel-body').hide();
            // change button name
            $(this).text(BTN_MORE);
        }
       


        //var $this = this; // zapobiegnie nadpisaniu przez aja``x
    });
    
    
    
    

    closeAllDetails();

});
