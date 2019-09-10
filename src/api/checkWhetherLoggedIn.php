<?php
  session_save_path('/var/www/html/session'); 

  session_start();

  if(isset($_SESSION['user'])){
    $result['loggedIn'] = true;
    $result['userID'] = $_SESSION['user'];
    $result['authority'] = $_SESSION['authority'];
  } else {
    $result['loggedIn'] = false;
    $result['userID'] = '';
    $result['authority'] = '0';
  } 
  
  echo(json_encode($result, JSON_PRETTY_PRINT));

