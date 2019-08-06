<?php
  require_once('convertAuthority.php');
  require_once('showAuthority.php');

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

  try{
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );

    $stmt = $dbh->prepare('select * from userInfo');
    $stmt->execute();

    while($rowOfUserInfo = $stmt->fetch(PDO::FETCH_ASSOC)){
      $authorityString = showAuthority($rowOfUserInfo['authority']);
      $userInfoHTML .= "<li><ul>
          <li>{$rowOfUserInfo['id']}</li>
          <li>{$rowOfUserInfo['name']}</li>
          <li>{$authorityString}</li>
        </ul></li>";
    }
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="css/style.css">
  <title>ユーザー一覧</title>
</head>
<body>
  <?php require_once('header.php'); ?>
  <?php require_once('sideBar.php'); ?>
  <main>
    <article>
      <h1>ユーザ</h1>
      <a href="addUser.php">新規登録</a>
      <ul>
        <li>
          <ul>
            <li>ID</li>
            <li>User</li>
            <li>権限</li>
          </ul>
        </li>
        <?= $userInfoHTML ?>
      </ul>
  
    </article>
  </main>
</body>
</html>

<?php 
  } catch (PDOException $e) {
  var_dump($e);
  exit;
  }

