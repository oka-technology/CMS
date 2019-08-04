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
  if (convertAuthority($authority)[1] != 1) {
    header('Location: index.php');
    exit();
  }
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <title>カテゴリ登録</title>
</head>
<body>
  <h1>カテゴリ登録</h1>
  <form action="addCategoryProcess.php" method="post">
    <label for="title">タイトル</label><input type="text" id="title" name="title">
    <input type="submit" value="登録">
  </form>
</body>
</html>

<?php
