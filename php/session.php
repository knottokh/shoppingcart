<?php
    ob_start();
    session_start();

      //Set Empty Variable
      if(!isset($_SESSION["board_id"]))      $_SESSION["board_id"] = "";
      if(!isset($_SESSION["post_id"]))       $_SESSION["post_id"] = "";
      if(!isset($_SESSION["board_name"]))    $_SESSION["board_name"] = "";
      if(!isset($_SESSION["board1_title"]))  $_SESSION["board1_title"] = "";
      if(!isset($_SESSION["action"]))        $_SESSION["action"] = "";
      if(!isset($_SESSION["user_id"]))       $_SESSION["user_id"] = "";
     // echo $_SESSION["board_name"].'-';
      //Set Patameter From QueryString
      if(isset($_GET["board_name"])) { 
            $_SESSION["board_name"] = $_GET['board_name'];
            $_SESSION["board_id"] = "";
            $_SESSION["post_id"] = "";
            $_SESSION["board1_title"] = "";
            $_SESSION["action"] = "";  
      }
      if(isset($_GET["board_id"]))  $_SESSION["board_id"] = $_GET['board_id'];
      if(isset($_GET["post_id"]))  $_SESSION["post_id"] = $_GET['post_id'];
   
      if(isset($_GET["board1_title"]))  $_SESSION["board1_title"] = $_GET['board1_title'];
      if(isset($_GET["action"]))  $_SESSION["action"] = $_GET['action'];
      if(isset($_GET["user_id"]))  $_SESSION["user_id"] = $_GET['user_id'];

     $_SESSION["user_id"]= "00001";

      echo $_SESSION["action"].'-'.$_SESSION["post_id"];

?>