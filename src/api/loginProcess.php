<?php
  session_save_path('/var/www/html/session'); 
  session_start();
  $_POST = json_decode(file_get_contents('php://input'), true);
  $loginId = $_POST['email'];
  $password = $_POST['password'];

  try{
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );

    $stmt = $dbh->prepare(
      'select * from userInfo' .
      ' where userInfo.name = ?'
    );
    $stmt->execute([$loginId]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (password_verify($password, $row['password'])) {
      $_SESSION['loggedIn'] = true;
      $_SESSION['user'] = $loginId;
      $_SESSION['permission'] = $row['permission'];
      $result['loggedIn'] = true;
      $result['userID'] = $loginId;
      $result['permission'] = $row['permission'];
    } else {
      $result['loggedIn'] = false;
    }

    echo(json_encode($result, JSON_PRETTY_PRINT));
  } catch (PDOException $e) {
    echo($e);
  }
  
  
