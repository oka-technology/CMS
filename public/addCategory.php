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
  <div class="wrapper">
    <?php require_once('header.php'); ?>
    <div class="mainAndAsideWrapper">
      <?php require_once('sideBar.php'); ?>
      <main class="main">
        <h1 class="main__pageTitle">カテゴリ登録</h1>
        <form class="form" action="addCategoryProcess.php" method="post">
          <label class="form__label" for="title">タイトル</label>
          <input class="form__text" type="text" id="title" name="title">
          <input class="form__button" type="submit" value="登録">
        </form>
      </main>
    </div>
    <?php require_once('footer.php'); ?>
  </div>
</body>
</html>

<?php