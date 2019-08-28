<?php
  session_start();
  session_destroy();

  $result['loggedIn'] = false;
  $result['userID'] = '';
  $result['authority'] = '0';

  echo(json_encode($result, JSON_PRETTY_PRINT));

