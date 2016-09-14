<?php

require 'dbconfig.php';

class Books extends DBConfig {

    private $dbConnection;

    public function __construct() {
        $this->dbConnection = new mysqli($this->server, $this->user, $this->password, $this->database);
// VERY IMPORTANT !!!
// fix problem on encoding and json_encode returning error 5
        $this->dbConnection->set_charset("utf8");

        if ($this->dbConnection->connect_error) {
            die("DB Connection failed. Error: " . $this->dbConnection->connect_error);
        }
    }

    public function __destruct() {
        $this->dbConnection->close();
        $this->dbConnection = null;
    }

    public function addBook($author, $title, $descr) {
        $query = 'INSERT INTO `books`(`author`, `title`,`descr`) VALUES(?,?,?);';
        $stmt = $this->dbConnection->prepare($query);
        if ($stmt) {
            $stmt->bind_param('sss', $author, $title, $descr);
            $stmt->execute();
            if (!$stmt->error) {
                return $stmt->insert_id;
            }
        }
        return FALSE;
    }

    public function editBook($id, $author, $title, $descr) {

        $query = 'UPDATE `books` SET `author`=?, `title`=?, `descr`=? WHERE `id`=?;';
        $stmt = $this->dbConnection->prepare($query);
        if ($stmt) {
            $stmt->bind_param('sssi', $author, $title, $descr, $id);
            $stmt->execute();
            if (!$stmt->error) {
                return TRUE;
            }
        }
        return FALSE;
    }

    public function deleteBook($id) {
        $query = "DELETE FROM `books` WHERE `id`=?;";
        $stmt = $this->dbConnection->prepare($query);
        if ($stmt) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            if (!$stmt->error) {
                return TRUE;
            }
        }
        return FALSE;
    }

    public function getBookDescrById($id) {
        $query = "SELECT `descr` FROM `books` WHERE `id`=?;";
        $stmt = $this->dbConnection->prepare($query);
        $result = array();
        if ($stmt) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            if (!$stmt->error) {
                $stmt->bind_result($result['descr']);
                $rows = [];
                while ($stmt->fetch()) {
                    $rows[] = $result;
                }
                return $rows;
            }
        }
        return FALSE;
    }

    public function getBookById($id) {
        $query = 'SELECT `id`,`author`,`title` FROM `books` WHERE `id`=?;';
        $stmt = $this->dbConnection->prepare($query);
        $result = array();
        if ($stmt) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            if (!$stmt->error) {
                $stmt->bind_result($result['id'], $result['author'], $result['title']);
                $rows = [];
                while ($stmt->fetch()) {
                    $rows[] = $result;
                }
                return $rows;
            }
        }
        return FALSE;
    }

    public function getWholeBookById($id) {
        $query = 'SELECT `id`,`author`,`title`,`descr` FROM `books` WHERE `id`=?;';
        $stmt = $this->dbConnection->prepare($query);
        $result = array();
        if ($stmt) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            if (!$stmt->error) {
                $stmt->bind_result($result['id'], $result['author'], $result['title'], $result['descr']);
                $rows = [];
                while ($stmt->fetch()) {
                    $rows[] = $result;
                }
                return $rows;
            }
        }
        return FALSE;
    }

    public function getAllBooks() {
        $query = "SELECT `id`,`author`,`title` FROM `books`;";

        $result = $this->dbConnection->query($query);
        if ($result == TRUE) {
            $rows = [];
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $rows[] = $row;
            }
            return $rows;
        }
        return FALSE;
    }

}
