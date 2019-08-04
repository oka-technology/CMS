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
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <title>ユーザ登録</title>
</head>
<body>
  <h1>ユーザ登録</h1>
  <form action="addUserProcess.php" method="post">
    <label for="loginId">ログインID</label>
    <input type="email" id="loginId" name="loginId">
    <label for="password">パスワード</label>
    <input type="password" id="password" name="password">
    <label>権限</label>
    <input type="checkbox" name="authority[]" value="1">管理者
    <input type="checkbox" name="authority[]" value="2">編集者
    <input type="checkbox" name="authority[]" value="4">閲覧者
    <input type="submit" value="登録">
  </form>
</body>
</html>
