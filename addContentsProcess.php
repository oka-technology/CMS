<?php
  require_once('convertAuthority.php');

  session_start();

  if (!$_SESSION['user']) {
    header('Location: index.php');
    exit();
  }

  $authority = $_SESSION['authority'];
  if (convertAuthority($authority)[1] != 1) {
    header('Location: index.php');
    exit();
  }

  $categoryID = $_POST['category'];
  $title = $_POST['title'];
  $contents = $_POST['contents'];

  if ($categoryID == null || $title == null || $contents == null) {
    echo '<p>未設定の箇所があります</p><p><a href="addContents.php">戻る</a></p>';
    var_dump($categoryID);
    var_dump($title);
    exit();
  }

  date_default_timezone_set('Asia/Tokyo');
  $nowDate = date('y.m.d H:i:s');

  try{
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );
    $stmt = $dbh->prepare(
      "insert into contents (category_id, title, registrationDate, mainContents) values (?, ?, ?, ?);"
    );
    $stmt->execute([$categoryID, $title, $nowDate, $contents]);
    header('Location: contentsList.php');
    exit();
  } catch (PDOException $e) {
    var_dump($e);
  }
