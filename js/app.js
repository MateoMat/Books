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

        constructor() {
            // variable to store offset for already loaded books
            this.offset = 0;
            // number of books to be loaded at once on inf sroll
            this.limit = 1;
            // initial number of books to load
            this.initialN = 5;
            console.log('O:L:IN ' + this.offset + ":" + this.limit + ":" + this.initialN);
        }

        /**
         * add Book to HTML using common template for JS and PHP
         *      
         *      
         * @param {array} book
         * @param {boolean} prepend (TRUE = prepend, FALSE = append)
         * @returns {undefined}
         */
        addBookToHTMLTmpl(book, prepend = false) {
            var template = $("#booksTmpl").html();
            // add button names to Template
            book['BTN_MORE'] = BTN_MORE;
            book['BTN_EDIT'] = BTN_EDIT;
            book['BTN_DEL'] = BTN_DEL;
            var newEl = Mustache.render(template, book);
            if (prepend) {
                $('books').prepend(newEl);
            } else
            {
                $('books').append(newEl);
            }

            closeAllBookMoreHTML();
        }

        /**
         * NOT USED
         * create All Book list in HTML 
         * 
         * @returns {undefined}
         */
        /*
         createBookAllListHTML() {
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
         $(window).bind('scroll');
         });
         }
         */

        /**
         * create Book list in HTML with offset and limit for DB
         * 
         * @returns {undefined}
         */
        createBookListHTML() {
            var $this = this;
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    o: this.offset,
                    l: this.initialN
                },
            }).done(function (books) {
                $this.offset += $this.initialN;
                console.log('createBookListHTML : ' + $this.offset)
                for (var i = 0; i < books.length; i++) {
                    $this.addBookToHTMLTmpl(books[i]);
                }
                $('books div.panel-body').hide();

            });
        }

        /**
         * infinite Book scroll
         * 
         * @returns {array}
         */
        infBookScroll() {
            this.offset += this.limit;
            console.log('infBookScroll : ' + this.offset);
            return  $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    o: this.offset,
                    l: this.limit
                },
            });
        }

        /*
         * get Book description from database for id
         * 
         * @param {int} book_id
         * @returns {undefined}
         */
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

        // 
        /**
         * get Book from database (id,author,title) for id
         * 
         * @param {int} book_id
         * @param {boolean} prepend
         * @returns {undefined}
         */
        getBookMin(book_id, prepend) {
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
                $this.addBookToHTMLTmpl(books[0], prepend)
            });
        }

        /**
         * get all book info for single book
         * 
         * @param {int} book_id
         * @returns {jqXHR}
         */
        getAllBookInfo(book_id) {
            return  $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    edit_id: book_id
                },
            });

        }

        /**
         * NOT USED
         * 
         * get all book information for editing
         * 
         * @param {int} book_id
         * @returns {Array|appL#1.Books.getBook4Edit.book}
         */
        /*
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
         */

        /**
         * removing HTML element for deleted Book from <books>
         * 
         * @param {int} book_id
         * @returns {undefined}
         */
        removeBookHTML(book_id) {
            $('books div[data-id="' + book_id + '"]').remove();
        }

        /**
         * remove Book from database
         * 
         * @param {int} book_id
         * @returns {undefined}
         */
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

        /**
         * add Book to database
         * 
         * @param {string} author
         * @param {string} title
         * @param {string} descr
         * @param {boolean} prepend
         * @returns {undefined}
         */
        addBook(author, title, descr, prepend) { // the same var names for POST
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
                    $this.getBookMin(data, prepend);
                }
            });
        }

        /**
         * update book in DB after edit
         * 
         * @param {int} id
         * @param {string} author
         * @param {string} title
         * @param {string} descr
         * @returns {undefined}
         */
        updateBook(id, author, title, descr) {
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

        /**
         * update HTML for edited book
         * 
         * @param {int} id
         * @param {string} author
         * @param {string} title
         * @returns {undefined}
         */
        updateBookHTML(id, author, title) {
            var $par = $('books div[data-id="' + id + '"]');
            $par.find('h3.panel-title').text(title + ' - ' + author);
        }

        // end class definition

    }


    /**
     * close Book Details element for all books
     * 
     * @returns {undefined}
     */
    function closeAllBookMoreHTML() {
        // first change all button names to MORE        
        $('books div.panel-body').hide();
        $('books button.button_more').text(BTN_MORE);
    }

    /**
     * empty all form inputs after book is added
     * 
     * @returns {undefined}
     */
    function cleanAddBookFormHTML() {
        $('input#inp_add_book_author').val("");
        $('input#inp_add_book_title').val("");
        $('textarea#ta_add_book_descr').val("");
    }


    // setting page Title
    $('head title').text(PAGE_TITLE);

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

        books.addBook(author, title, descr, true);
        cleanAddBookFormHTML();
    });


    /*
     * Remove Book event
     */
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


    /*
     * Book Details event (opens hidden HTML)
     */
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

    /*
     * Book Edit event
     */
    $('books').on('click', 'button.button_edit', function () {
        var $par = $(this).parent('div').parent('div').parent('div');
        var book_id = $par.data('id');


        $.when(books.getAllBookInfo(book_id)).done(function (bookArr) {
            var book = bookArr[0];

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
                            books.updateBook(book_id, author, title, descr);
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
    });


    /**
     *  scroll event for inf scroll
     */
    $(window).scroll(function (event) {

        var $win = $(window);
        if ($win.height() + $win.scrollTop() == $(document).height()) {

            $.when(books.infBookScroll()).done(function (b) {
                for (var i = 0; i < b.length; i++) {
                    books.addBookToHTMLTmpl(b[i]);
                }
                $('books div.panel-body').hide();
            });
        }
    });

// end of APP    
});
