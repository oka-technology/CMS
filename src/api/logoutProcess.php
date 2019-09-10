<?php
  session_save_path('/var/www/html/session'); 
  session_start();
  if(isset($_SESSION)) {
    session_destroy();
  }

  $result['loggedIn'] = false;
  $result['userID'] = '';
  $result['permission'] = '0';

  echo(json_encode($result, JSON_PRETTY_PRINT));

