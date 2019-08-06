<?php

  session_start();

  if($_SESSION['user']){
    $_SESSION['user'] = null;
    $_SESSION['authority'] = null;
  }

  header('Location: index.php');
  exit();
