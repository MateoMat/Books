$(function () {

    class Books {

        constructor() {}

        addBookToList(book) {
        //     var newEl =
        // '<div data-id="' + book.id + '"><h2>'
        // + book.title + '</h2></h3>'
        // + book.author + '</h3>'
        // + '<button>Więcej</button>';
            //$('books').append(newElement);
//            console.log(book['title']);
//            console.log(book.title);
            
            
//       var newEl = '<div class="col-md-6 col-md-offset-3">'
//                    +'<div class="panel panel-info">'
//                    +   '<div class="panel-heading">';
//                    +      '<h3 class="panel-title">' + book.title + '</h3>'
//                    +   '</div>'
//                    +   '<div class="panel-body">asdjasldk'
//                    +   '</div>'
//                    +   '<div class="panel-footer"> Panel Footer</div>'
//                    +'</div>'
//                  +'</div>';
//                  
//                  
           var newEl = '<div class="col-md-6 col-md-offset-3" data-id="' + book.id + '">'
                       + '<div class="panel panel-info">'
                          + '<div class="panel-heading">'
                              + '<h3 class="panel-title">' + book.title +' - ' + book.author +'</h3>'
                          + '</div>'
                          + '<div class="panel-body">'
                          + '</div>'
                          + '<div class="panel-footer"><button>Więcej</button>'
                          + '</div>'
                       + '</div>'
                    +'</div>';       
                  
           $('books').append(newEl);

        }

/*
 * <div class="panel panel-info">
                            <div class="panel-heading">
                                <h3 class="panel-title">Panel title</h3>
                            </div>
                            <div class="panel-body">
                                Panel content
                            </div>
                        </div>
 */

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
                $('books div.panel-body').hide();
            });
        }
    }

    function closeAllDetails(){
        $('books div.panel-body').hide();
    }


    var books = new Books();

    books.createBookList();

    

    $('books').on('click', 'button', function () {
        
        var $par = $(this).parent('div').parent('div').parent('div');
        var book_id = $par.data('id');
        console.log(book_id);
        closeAllDetails();
        $par.find('div.panel-body').show();
        
        if($par.find('div.panel-body').text().length > 0 ){
            console.log("już wczytane, nie ładujemy z bazy");
        }
        else{
            console.log("nie wczytane i ładujemy z bazy");
        }
        
        var $this = this; // zapobiegnie nadpisaniu przez ajax
        //console.log(this.parrent().data('id'));

    });


    closeAllDetails();

});
