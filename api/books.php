<?php

require 'src/class.Books.php';



switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $books = new Books();
        $books->addBook();
        break;

    case 'GET':
        $books = new Books();
        if (!empty($_GET['id'])) {
            echo json_encode($books->getBookById($_GET['id']));
        } else {
            echo json_encode($books->getAllBooks());
        }

        break;
}