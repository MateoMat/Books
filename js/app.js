$(function () {

    var PAGE_TITLE = "Book Library";
    var BTN_MORE = "More";
    var BTN_CLOSE = "Close";
    var BTN_DEL = "Remove Book"
    var BTN_CANCEL = "Cancel";
    var BTN_EDIT = "Edit";
    var BTN_SAVE = "Save";
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
    var MSG_EDIT_TITLE = "Edit Book";

    class Books {

        constructor() {}

        // add Book to HTML using common template for JS and PHP
        addBookToHTMLTmpl(book) {
            var template = $("#booksTmpl").html();

            // add button names to Template
            book['BTN_MORE'] = BTN_MORE;
            book['BTN_EDIT'] = BTN_EDIT;
            book['BTN_DEL'] = BTN_DEL;

            var newEl = Mustache.render(template, book);
            $('books').prepend(newEl);
            closeAllBookMoreHTML();
        }

        // create Book list in HTML
        createBookListHTML() {
            var $this = this;
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json'
            }).done(function (books) {
                for (var i = 0; i < books.length; i++) {
                    $this.addBookToHTMLTmpl(books[i]);
                }
                $('books div.panel-body').hide();
            });
        }

        // get Book description from database for id
        getBookDescription(book_id) {
            var $this = this;
            var descr = "";
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    descr_id: book_id
                },
            }).done(function (books) {
                $('*[data-id="' + book_id + '"] div.panel-body').text(books[0].descr);
            });
        }

        // get Book from database (id,author,title) for id
        getBookMin(book_id) {
            var $this = this;
            var descr = "";
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    new_id: book_id
                },
            }).done(function (books) {
                $this.addBookToHTMLTmpl(books[0])
            });
        }

        // get all book information for editing
        getBook4Edit(book_id) {
            var $this = this;
            var book = [];
            var ret;
            $.ajax({
                // async : false - to allow to get whole book from db before opening edit dialog
                // nothing else will be happening at the same time as whole page is locked for Edit Book dialog
                // in any other case callback function would be used for getting data from ajax for further processing
                async: false,
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    edit_id: book_id
                },
            }).done(function (books) {
                book['title'] = books[0].title;
                book['author'] = books[0].author;
                book['descr'] = books[0].descr;
            });
            return book;
        }

        // removing HTML element for deleted Book from <books>
        removeBookHTML(book_id) {
            $('books div[data-id="' + book_id + '"]').remove();
        }

        // remove Book from database
        deleteBook(book_id) {
            var $this = this;
            $.ajax({
                type: 'POST',
                url: 'api/books.php',
                data: {
                    del_id: book_id
                },
                success: function (data, status) {
                    $this.removeBookHTML(book_id);
                }
            });
        }

        // add Book to database
        addBook(author, title, descr) { // the same var names for POST
            var $this = this;
            $.ajax({
                type: 'POST',
                url: 'api/books.php',
                data: {
                    author: author,
                    title: title,
                    descr: descr
                },
                success: function (data, status) {
                    // data contains inserted record number returned
                    $this.getBookMin(data);
                }
            });
        }

        editBook(id, author, title, descr) {
            var $this = this;
            $.ajax({
                type: 'POST',
                url: 'api/books.php',
                data: {
                    uid: id,
                    uauthor: author,
                    utitle: title,
                    udescr: descr
                },
                success: function (data, status) {
                    // data contains inserted record number returned
                    //$this.getBook(data);
                    $this.updateBookHTML(id, author, title);
                }
            });
        }

        updateBookHTML(id, author, title) {
            var $par = $('books div[data-id="' + id + '"]');
            $par.find('h3.panel-title').text(title + ' - ' + author);
        }

    }

    function closeAllBookMoreHTML() {
        // first change all button names to MORE        
        $('books div.panel-body').hide();
        $('books button.button_more').text(BTN_MORE);
    }

    function cleanAddBookFormHTML() {
        $('input#inp_add_book_author').val("");
        $('input#inp_add_book_title').val("");
        $('textarea#ta_add_book_descr').val("");
    }


    // hide pagination
    $('div.pagination').hide();

    var books = new Books();
    books.createBookListHTML();

    $('div#add_book_title h3').text(FORM_ADD_BOOK_TITLE);

    $('label#lbl_add_book_author').text(LABEL_AUTHOR);
    $('label#lbl_add_book_title').text(LABEL_TITLE);
    $('label#lbl_add_book_descr').text(LABEL_DESCR);
    $('button#btn_add_book').text(BTN_ADD_BOOK);

    // event to add Book
    $('button#btn_add_book').on('click', function (event) {
        var author = $('input#inp_add_book_author').val();
        var title = $('input#inp_add_book_title').val();
        var descr = $('textarea#ta_add_book_descr').val();

        if (author.length == 0) {
            bootbox.alert(MSG_AUTHOR);
            return false;
        }

        if (title.length == 0) {
            bootbox.alert(MSG_TITLE);
            return false;
        }

        if (descr.length == 0) {
            bootbox.alert(MSG_DESCR);
            return false;
        }

        books.addBook(author, title, descr);
        cleanAddBookFormHTML();
    });

    // event to remove Book
    $('books').on('click', 'button.button_del', function () {

        var $par = $(this).parent('div').parent('div').parent('div');
        var book_id = $par.data('id');

        bootbox.dialog({
            message: MSG_DEL_MSG + '<br><strong>' + $par.find('h3').text() + '</strong>',
            title: MSG_DEL_TITLE,
            buttons: {
                success: {
                    label: BTN_CANCEL,
                    className: "btn-success",
                    callback: function () {
                        // do nothing
                    }
                },
                danger: {
                    label: BTN_DEL,
                    className: "btn-danger",
                    callback: function () {
                        // call Book delete
                        books.deleteBook(book_id);
                    }
                },
            }
        });
    });


    // event to open Book Details 
    $('books').on('click', 'button.button_more', function () {

        var $par = $(this).parent('div').parent('div').parent('div');
        var book_id = $par.data('id');

        if ($(this).text() == BTN_MORE) {
            // get book description from db by ajax call
            books.getBookDescription(book_id);
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
    });

    // event to edit Book
    $('books').on('click', 'button.button_edit', function () {
        var $par = $(this).parent('div').parent('div').parent('div');
        var book_id = $par.data('id');

//          $().ajaxStop();
        var book = books.getBook4Edit(book_id);


        var $editDlg = bootbox.dialog({
            title: MSG_EDIT_TITLE,
            message:
                    '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-2 control-label">' + LABEL_AUTHOR + '</label> ' +
                    '<div class="col-md-6"> ' +
                    '<input id="inp_edit_book_author" type="text" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div>' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-2 control-label">' + LABEL_TITLE + '</label> ' +
                    '<div class="col-md-6"> ' +
                    '<input id="inp_edit_book_title" type="text" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div>' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-2 control-label">' + LABEL_DESCR + '</label> ' +
                    '</div>' +
                    '<div class="col-md-2"> ' +
                    '<textarea id="ta_edit_book_descr" class=""></textarea>' +
                    '</div>' +
                    '</form> </div>  </div>',
            buttons: {
                cancel: {
                    label: BTN_CANCEL,
                    className: "btn-success",
                    callback: function () {
                        // do nothing
                    }
                },
                save: {
                    label: BTN_SAVE,
                    className: "btn-danger",
                    callback: function () {
                        var author = $('#inp_edit_book_author').val();
                        var title = $('#inp_edit_book_title').val();
                        var descr = $('#ta_edit_book_descr').val();
                        console.log('BTN_SAVE : ' + author);
                        books.editBook(book_id, author, title, descr);
                    }
                }

            }
        }
        ).bind('shown.bs.modal', function () {

            $editDlg.find('input#inp_edit_book_author').val(book['author']);
            $editDlg.find('input#inp_edit_book_title').val(book['title']);
            $editDlg.find('textarea#ta_edit_book_descr').val(book['descr']);

            var dlgWidth = $editDlg.children(":first").width();
            var xPos = $editDlg.find('textarea#ta_edit_book_descr').position().left;
            $editDlg.find('textarea#ta_edit_book_descr').width(dlgWidth - (4 * xPos));
        });
    });

    // setting page Title
    $('head title').text(PAGE_TITLE);
// end of APP    
});
