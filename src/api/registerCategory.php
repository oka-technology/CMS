<?php
  require_once('convertPermission.php'); 
  session_save_path('/var/www/html/session'); 
  $_POST = json_decode(file_get_contents('php://input'), true);
  // $_POST = {
  //   categoryName: string,
  // }
  session_start();
  if (convertPermission($_SESSION['permission'])[1] != 1) {
    $result['successful'] = false;
    exit();
  } else if (!$_POST['categoryName']) {
    $result['successful'] = false;
    exit();
  } else {
    try{
      $dbh = new PDO(
        'mysql:host=db;dbname=webproLastAssignmentdb',
        'user',
        'password'
      );
      $stmt = $dbh->prepare(
        "INSERT into categories (name) values (?);"
      );
      $stmt->execute([$_POST['categoryName']]);
      $result['successful'] = true;
    } catch (PDOException $e) {
      var_dump($e);
      $result['successful'] = false;
    }
  }
  echo(json_encode($result, JSON_PRETTY_PRINT));
