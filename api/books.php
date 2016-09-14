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
                // add new book

                $author = $_POST['author'];
                $title = $_POST['title'];
                $descr = $_POST['descr'];
                echo json_encode($books->addBook($author, $title, $descr));
            } elseif (!empty($_POST['uid']) && !empty($_POST['uauthor']) && !empty($_POST['utitle']) && !empty($_POST['udescr'])) {
                // update existing book

                $id = $_POST['uid'];
                $author = $_POST['uauthor'];
                $title = $_POST['utitle'];
                $descr = $_POST['udescr'];
                echo json_encode($books->editBook($id, $author, $title, $descr));
            }
        }

        break;

    case 'GET':
        $books = new Books();

        if (count($_GET) == 0) {
            // return all books for main screen

            echo json_encode($books->getAllBooks());
        } else {
            if (!empty($_GET['descr_id'])) {
                // return book description on More button click

                echo json_encode($books->getBookDescrById($_GET['descr_id']));
            }
            if (!empty($_GET['new_id'])) {
                // return new book from db to append it to HTML

                echo json_encode($books->getBookById($_GET['new_id']));
            }
            if (!empty($_GET['edit_id'])) {
                // return whole book for edit dialog

                echo json_encode($books->getWholeBookById($_GET['edit_id']));
            }
        }
        break;
}


