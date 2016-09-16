<!DOCTYPE html>
<html>

    <head>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

        <link rel="stylesheet" href="../css/sb-admin.css">

        <link rel="stylesheet" href="../css/style.css">

        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>

        <div id="add_book_title" class="col-md-6 col-md-offset-3">
            <h3></h3> 
        </div>


        <?php
        require_once 'src/class.Books.php';
        require '../vendor/autoload.php';


        $mustache = new Mustache_Engine(array(
            'loader' => new Mustache_Loader_FilesystemLoader('../templates')
        ));

        $booksTmpl = $mustache->loadTemplate('books');

        $books = new Books();

        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                if (count($_GET) == 2 && isset($_GET['o']) && isset($_GET['l'])) {
                    $offset = $_GET['o'];
                    $limit = $_GET['l'];

                    $b = $books->getBooksPerPage($offset, $limit);

                    for ($i = 0; $i < count($b); $i++) {

                        print $booksTmpl->render($b[$i]);
                    }
                }
                break;
        }
        ?>

    </body>
</html>
