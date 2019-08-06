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
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="css/style.css">
  <title>カテゴリ登録</title>
</head>
<body>
  <?php require_once('header.php'); ?>
  <div class="mainAndAsideWrapper">
    <?php require_once('sideBar.php'); ?>
    <main class="main">
      <h1>カテゴリ登録</h1>
      <form action="addCategoryProcess.php" method="post">
        <label for="title">タイトル</label><input type="text" id="title" name="title">
        <input type="submit" value="登録">
      </form>
    </main>
  </div>
</body>
</html>

<?php
