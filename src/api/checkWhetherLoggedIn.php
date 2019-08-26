<?php

  session_start();

  if($_SESSION['loggedIn']){
    $result['loggedIn'] = true;
    $result['userID'] = $_SESSION['user'];
    $result['authority'] = $_SESSION['authority'];
  } else {
    $result['loggedIn'] = false;
    $result['userID'] = '';
    $result['authority'] = '0';
  } 
  
  echo(json_encode($result, JSON_PRETTY_PRINT));

