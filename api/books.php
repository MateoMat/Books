<?php

require 'src/class.Books.php';



switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $books = new Books();
        $books->addBook();
        break;

    case 'GET':
        $books = new Books();
        echo json_encode($books->getAllBooks());
        break;
}