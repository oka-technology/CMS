<?php

  function convertAuthority($authorityNum){
    $authorityBinary = decbin((int) $authorityNum);
    $authorityBinaryFilled = sprintf('%03d', $authorityBinary);
    $authorityBinaryArray = str_split($authorityBinaryFilled);
    return $authorityBinaryArray;
  }

  function showAuthority ($authorityNum) {
    $returnArray = array();
    if (convertAuthority($authorityNum)[0] == 1) {
      $returnArray[] = "閲覧者";
    }
    if (convertAuthority($authorityNum)[1] == 1) {
      $returnArray[] = "編集者";
    }
    if (convertAuthority($authorityNum)[2] == 1) {
      $returnArray[] = "管理者";
    }
    return implode(" ", $returnArray);
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
  <title>ユーザー一覧</title>
</head>
<body>
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
</body>
</html>

<?php 
  } catch (PDOException $e) {
  var_dump($e);
  exit;
  }

