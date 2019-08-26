<?php

  session_start();

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
      $_SESSION['user'] = $loginId;
      $_SESSION['authority'] = $row['authority'];
      $result['loggedIn'] = true;
      $result['userID'] = $loginId;
      $result['authority'] = $row['authority'];
      // header('Location: index.php');
      // exit();
    } else {
      $result['loggedIn'] = false;
    }

    echo(json_encode($result, JSON_PRETTY_PRINT));
  } catch (PDOException $e) {
    echo($e);
  }
  
  
