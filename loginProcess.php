<?php

  session_start();

  $login_id = $_POST['email'];
  $password = $_POST['password'];

  $dbh = new PDO(
    'mysql:host=db;dbname=webproLastAssignmentdb',
    'user',
    'password'
  );

  $stmt = $dbh->prepare(
    'select * from userInfo' .
    ' where userInfo.name = ?'
  );
  $stmt->execute([$login_id]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($password === $row['password']) {
    $_SESSION['user'] = $login_id;
    $_SESSION['userAuthority'] = $row['authority'];
  }
  header('Location: index.php');
  
