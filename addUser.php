<?php
  require_once('convertAuthority.php');

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
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <title>ユーザ登録</title>
</head>
<body>
  <?php require_once('header.php'); ?>
  <?php require_once('sideBar.php'); ?>
  <main>
    <h1>ユーザ登録</h1>
    <form action="addUserProcess.php" method="post">
      <label for="loginId">ログインID</label>
      <input type="email" id="loginId" name="loginId">
      <label for="password">パスワード</label>
      <input type="password" id="password" name="password">
      <label>権限</label>
      <input id="check1" type="checkbox" name="authority[]" value="1"><label for="check1">管理者</label>
      <input id="check2" type="checkbox" name="authority[]" value="2"><label for="check2">編集者</label>
      <input id="check3" type="checkbox" name="authority[]" value="4"><label for="check3">閲覧者</label>
      <input type="submit" value="登録">
    </form>
  </main>
</body>
</html>
