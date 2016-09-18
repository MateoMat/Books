<?php

header("Access-Control-Allow-Origin: *");

require 'src/class.Books.php';

/*
 * Books Mobile API
 */


switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        $books = new Books();

        if (count($_POST) == 0) {

            // do absolutely nothing as no data is passed on
        }
        else {
            
        }

        break;

    case 'GET':
        $books = new Books();

        if (count($_GET) == 0) {
            // return all books for main screen

            echo json_encode($books->getBooksPerPageMin(0, 10));
        }
        else {
            if (!empty($_GET['before'])) {
                $limit = -1;
                // return all boks before specified id
                $id = $_GET['before'];
                if (!empty($_GET['limit'])) {
                    $limit = $_GET['limit'];
                }
                echo json_encode($books->getBooksBeforeId($id, $limit));
            }
            if (!empty($_GET['after'])) {
                // return all boks after specified id
                $id = $_GET['after'];
                if (!empty($_GET['limit'])) {
                    $limit = $_GET['limit'];
                }
                echo json_encode($books->getBooksAfterId($id, $limit));
            }
        }
        break;
}


