<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>

<head>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <link rel="stylesheet" href="css/sb-admin.css">
    
    <link rel="stylesheet" href="css/style.css">
    
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    
   
    <div id="add_book_title" class="col-md-6 col-md-offset-3">
        <h3></h3> 
    </div>

    <div class="col-md-6 col-md-offset-3">
        <label id="lbl_add_book_author"></label>
        <input id="inp_add_book_author" type="text" size="40">   
    </div>
    <div class="col-md-6 col-md-offset-3">
        <label id="lbl_add_book_title"></label>
        <input id="inp_add_book_title" type="text" size="40">   
    </div>
    <div class="col-md-6 col-md-offset-3">
        <label id="lbl_add_book_descr"></label>
    </div>
    <div class="col-md-6 col-md-offset-3">
        <textarea id="ta_add_book_descr"></textarea>
    </div>
    <div class="col-md-6 col-md-offset-3">
        <button id="btn_add_book" type="button" class="btn btn-primary"></button>
    </div>

     <div class="col-md-6 col-md-offset-3">
         &nbsp;
    </div>
<!--    <row class="col-md-6 col-md-offset-3">
    <form id="book_add">
        <row class="row col-md-6">
            <label name="author"></label>
            <input name="author"></input>
        </row>
        <row class="row col-md-6">
            <label name="title"></label>
            <input name="title"></input>
        </row>
        <row class="row col-md-6">
        <textarea name="descr"></textarea>
        </row>
    </form>
    </row>-->
    <books></books>

</body>

</html>

<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>


<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<script src="js/bootbox.min.js"></script>
<script src="js/app.js"></script>
