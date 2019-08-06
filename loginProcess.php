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
      header('Location: index.php');
      exit();
    } else {
      echo '<p>idまたはパスワードが違います</p><p><a href="index.php">戻る</a></p>';
    }
  } catch (PDOException $e) {
    var_dump($e);
  }

  
  
