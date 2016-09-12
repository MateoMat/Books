$(function () {

var BTN_MORE = "Więcej";
var BTN_CLOSE = "Zamknij";

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
                          + '<div class="panel-footer"><button>' + BTN_MORE +'</button>'
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
        
        
        if($(this).text() == BTN_MORE ){
            // open and read from DB
            
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    id: book_id
                },
        }).done(function (books) {
                $par.find('div.panel-body').text(books[0].descr);
                $par.find('div.panel-body').show();
        });
          
            // change button name :)
            $(this).text(BTN_CLOSE);
        }
        else if( $(this).text() == BTN_CLOSE){
            // close 
            $par.find('div.panel-body').hide();
            $(this).text(BTN_MORE);
        }
        console.log();
        
        
        
        
        
        
        //var $this = this; // zapobiegnie nadpisaniu przez ajax


    });

    closeAllDetails();

});
