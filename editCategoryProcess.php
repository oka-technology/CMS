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

  $targetID = $_POST['id'];
  $categoryName = $_POST['title'];

  if ($categoryName == null || $targetID == null) {
    echo '<p>未設定の箇所があります</p><p><a href="addCategory.php">戻る</a></p>';
    exit();
  }

  try{
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );
    $stmt = $dbh->prepare(
      "update categories set name=? where id=?;"
    );
    $stmt->execute([$categoryName, $targetID]);
    header('Location: categoryList.php');
    exit();
  } catch (PDOException $e) {
    var_dump($e);
  }
