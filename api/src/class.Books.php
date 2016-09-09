<?php

require 'dbconfig.php';

class Books extends DBConfig {

    private $dbConnection;

    public function __construct() {
        $this->dbConnection = mysqli_connect(
                $this->server, $this->user, $this->password, $this->database); //, $port, $socket)
    }

    public function __destruct() {
        $this->dbConnection->close();
        $this->dbConnection = null;
    }

    public function addBook() {
        
    }

    public function editBook() {
        
    }

    public function deleteBook() {
        
    }

    public function getBook($id) {
        
    }

    public function getAllBooks() {
        $query = "SELECT `id`,`title`,`author` FROM `books`";

        $result = $this->dbConnection->query($query);
        if ($result == TRUE) {
            return mysqli_fetch_all($result, MYSQLI_ASSOC);
        }
        else {
            return false;
        }
    }

}
