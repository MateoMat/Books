<?php

require 'dbconfig.php';

class Books extends DBConfig {

    private $dbConnection;

    public function __construct() {
        $this->dbConnection = new mysqli($this->server, $this->user, $this->password, $this->database);
        /* VERY IMPORTANT !!!
          fix problem on encoding & json_encode returning error 5 */
        $this->dbConnection->set_charset("utf8");

        if ($this->dbConnection->connect_error) {
            die("DB Connection failed. Error: " . $this->dbConnection->connect_error);
        }
    }

    public function __destruct() {
        $this->dbConnection->close();
        $this->dbConnection = null;
    }

    /**
     * addBook - add new book to DB
     * 
     * @param string $author
     * @param string $title
     * @param string $descr
     * @return boolean FALSE if fails | int book id
     */
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

    /**
     * updateBook - update book in DB
     * 
     * @param int $id
     * @param string $author
     * @param string $title
     * @param string $descr
     * @return boolean
     */
    public function updateBook($id, $author, $title, $descr) {

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

    /**
     * deleteBook - remove book from DB
     * 
     * @param int $id
     * @return boolean
     */
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

    /**
     * getBookDescription - return book description from DB
     * 
     * @param int $id
     * @return boolean|array
     */
    public function getBookDescription($id) {
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

    /**
     * getBookMin - return id, author, title (min book info) from DB
     * 
     * @param int $id
     * @return boolean|array
     */
    public function getBookMin($id) {
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

    /**
     * getBookAll - returns id,author,titel,descr (all book info) from DB
     * 
     * @param int $id
     * @return boolean|array
     */
    public function getBookAll($id) {
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

    /**
     * Return all books prior the id
     * 
     * @param int $id
     * @return boolean|array
     */
    public function getBooksBeforeId($id) {
        return $this->getBooksBeforeAfter($id, false);
    }

    /**
     * Return all books after the id
     * 
     * @param int $id
     * @return boolean|array
     */
    public function getBooksAfterId($id) {
        return $this->getBooksBeforeAfter($id, true);
    }

    /**
     * 
     * @param int $id
     * @param boolean $param
     */
    private function getBooksBeforeAfter($id, $param) {
        if ($param) {
            // TRUE - after
            $query = "SELECT `id`,`author`,`title` FROM `books` WHERE `id` > {$id}";
        }
        else {
            // FALSE = before
            $query = "SELECT `id`,`author`,`title` FROM `books` WHERE `id` < {$id}";
        }
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

    /**
     * getAllBooks - return all books from DB
     * 
     * @param int $sort
     * @return boolean|array
     */
    public function getAllBooks($sort = 0) {
        if ($sort != 0) {
            $query = "SELECT `id`,`author`,`title` FROM `books` ORDER BY `id` DESC;";
        }
        else {
            $query = "SELECT `id`,`author`,`title` FROM `books`;";
        }

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

    /**
     * Returns min books information for range offset & limit
     * 
     * @param int $offset
     * @param int $limit
     * @return boolean|array
     */
    public function getBooksPerPageMin($offset, $limit) {
        $query = "SELECT `id`,`author`,`title` FROM `books` LIMIT {$limit} OFFSET $offset;";

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

    /*
     * PAGINATION methods
     */

    /**
     * Returns number of books in DB
     * 
     * @return int
     */
    public function getBookCount() {
        $count = 0;
        $query = "SELECT COUNT(*) FROM `books`;";
        $result = $this->dbConnection->query($query);
        if ($result == TRUE) {
            $count = $result->fetch_array()[0];
        }
        return $count;
    }

    /**
     * Returns all books information for range offset & limit
     * 
     * @param int $offset
     * @param int $limit
     * @return boolean|array
     */
    public function getBooksPerPage($offset, $limit) {
        $query = "SELECT `id`,`author`,`title`, `descr` FROM `books` LIMIT {$limit} OFFSET $offset;";

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

//    public function getBooksPerPage_NOT_WORKING($offset, $limit) {
//        $query = 'SELECT `id`,`author`,`title`,`descr` FROM `books` LIMIT ? OFFSET ?;';
//        $stmt = $this->dbConnection->prepare($query);
//        $result = array();
//        $rows = new ArrayObject();
//        if ($stmt) {
//            $stmt->bind_param('ii', $limit, $offset);
//            $stmt->execute();
//            if (!$stmt->error) {
//                $stmt->bind_result($result['id'], $result['author'], $result['title'], $result['descr']);
//
//                while ($stmt->fetch()) {
//                    $rows->append($result);
//                }
//                return $rows;
//            }
//        }
//        return FALSE;
//    }
}
