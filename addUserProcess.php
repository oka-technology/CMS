<?php
  function convertAuthority($authorityNum){
    $authorityBinary = decbin((int) $authorityNum);
    $authorityBinaryFilled = sprintf('%03d', $authorityBinary);
    $authorityBinaryArray = str_split($authorityBinaryFilled);
    return $authorityBinaryArray;
  }

  session_start();

  if (!$_SESSION['user']) {
    header('Location: index.php');
    exit();
  }

  $authority = $_SESSION['authority'];
  if (convertAuthority($authority)[2] != 1) {
    header('Location: index.php');
    exit();
  }

  $loginId = $_POST['loginId'];
  $password = $_POST['password'];
  $authority = $_POST['authority'];

  if ($loginId == null || $password == null || $authority == null) {
    echo '<p>未設定の箇所があります</p><p><a href="addUser.php">戻る</a></p>';
    exit();
  } 

  $authorityNum = 0;
  for ($i=0; $i < count($authority); $i++) { 
    $authorityNum += (int)$authority[$i];
  }

  try{ 
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );
    $stmt = $dbh->prepare(
      "insert into userInfo (name, password, authority) values (?, ?, ?);"
    );
    $stmt->execute([$loginId, $password, $authorityNum]);
    header('Location: addUser.php');
    exit();
  } catch (PDOException $e) {
    var_dump($e);
  }