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

    public function addBook($author, $title, $descr) {
        $query = 'INSERT INTO `books`(`title`, `author`, `descr`) VALUES(?,?,?);';
        $stmt = $this->dbConnection->prepare($query);
        if ($stmt) {
            $stmt->bind_param('sss', $title, $author, $descr);
            $stmt->execute();
            if (!$stmt->error) {
                return $stmt->insert_id;
            } else {
                return FALSE;
            }
        }
    }

    public function editBook() {

    }

    public function deleteBook($id) {

        $query = "DELETE FROM `books` where `id`=?;";
        $stmt = $this->dbConnection->prepare($query);
        if ($stmt) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            if (!$stmt->error) {
                return TRUE;
            } else {
                return FALSE;
            }
        }
    }

    public function getBookDescrById($id) {
        $query = "SELECT `descr` FROM `books` where `id` = " . $id . ";";
        $result = $this->dbConnection->query($query);

        if ($result == TRUE) {
            return mysqli_fetch_all($result, MYSQLI_ASSOC);
        } else {
            return false;
        }
    }

    public function getBookById($id) {
        $query = 'SELECT `id`,`title`,`author` FROM `books` WHERE `id`=?;';
        $stmt = $this->dbConnection->prepare($query);
        if ($stmt) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            if (!$stmt->error) {
                $result = $stmt->get_result();
                return mysqli_fetch_all($result, MYSQLI_ASSOC);
            } else {
                return FALSE;
            }
        }
    }

    public function getWholeBookById($id) {
        $query = 'SELECT * FROM `books` WHERE `id`=?;';
        $stmt = $this->dbConnection->prepare($query);
        if ($stmt) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            if (!$stmt->error) {
                $result = $stmt->get_result();
                return mysqli_fetch_all($result, MYSQLI_ASSOC);
            } else {
                return FALSE;
            }
        }
    }

    public
            function getAllBooks() {
        $query = "SELECT `id`,`title`,`author` FROM `books`;";

        $result = $this->dbConnection->query($query);
        if ($result == TRUE) {
            return mysqli_fetch_all($result, MYSQLI_ASSOC);
        } else {
            return false;
        }
    }

}
