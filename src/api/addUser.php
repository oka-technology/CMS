<?php
  require_once('convertPermission.php'); 
  session_save_path('/var/www/html/session'); 
  $_POST = json_decode(file_get_contents('php://input'), true);
  // $_POST = {
  //   email: string,
  //   password: string,
  //   adminPermission: boolean,
  //   editorPermission: boolean,
  //   viewerPermission: boolean,
  // }
  $hashedPassword = password_hash($_POST['password'], PASSWORD_BCRYPT);
  $permissionNum = 0;
  if ($_POST['adminPermission']) {
    $permissionNum += 1;
  }
  if ($_POST['editorPermission']) {
    $permissionNum += 2;
  }
  if ($_POST['viewerPermission']) {
    $permissionNum += 4;
  }
  session_start();
  if (convertPermission($_SESSION['permission'])[2] != 1) {
    echo('no permission');
    exit();
  } else if (!$_POST['email'] || !$_POST['password'] || (!$_POST['adminPermission'] && !$_POST['editorPermission'] && !$_POST['viewerPermission'])) {
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
        "insert into userInfo (name, password, permission) values (?, ?, ?);"
      );
      $stmt->execute([$_POST['email'], $hashedPassword, $permissionNum]);
      $result['successful'] = true;
    } catch (PDOException $e) {
      echo($e);
      $result['successful'] = false;
    }
  }
  echo(json_encode($result, JSON_PRETTY_PRINT));
