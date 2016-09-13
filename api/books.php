<?php

require 'src/class.Books.php';



switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $books = new Books();

        if (count($_POST) == 0) {
            // add new book
            $books->addBook();
        } else {
            if (!empty($_POST['del_id'])) {
                // delete book with del_id
                $id = $_POST['del_id'];
                $books->deleteBook($id);
            }
        }

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