<?php

require 'src/class.Books.php';



switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        $books = new Books();

        if (count($_POST) == 0) {
// do absolutely nothing as no data is passed on
        } else {
            if (!empty($_POST['del_id'])) {
// delete book with del_id
                $id = $_POST['del_id'];
                $books->deleteBook($id);
            } elseif (!empty($_POST['author']) && !empty($_POST['title']) && !empty($_POST['descr'])) {
                $author = $_POST['author'];
                $title = $_POST['title'];
                $descr = $_POST['descr'];
                echo json_encode($books->addBook($author, $title, $descr));
            }
        }

        break;

    case 'GET':
        $books = new Books();

        if (count($_GET) == 0) {
            echo json_encode($books->getAllBooks());
        } else {
            if (!empty($_GET['descr_id'])) {
                echo json_encode($books->getBookDescrById($_GET['descr_id']));
            }
            if (!empty($_GET['new_id'])) {
                echo json_encode($books->getBookById($_GET['new_id']));
            }
        }



        break;
}