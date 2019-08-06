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
  <link rel="stylesheet" href="css/style.css">
  <title>ユーザ登録</title>
</head>
<body>
  <div class="wrapper">
    <?php require_once('header.php'); ?>
    <div class="mainAndAsideWrapper">
      <?php require_once('sideBar.php'); ?>
      <main class="main">
        <h1 class="main__pageTitle">ユーザ登録</h1>
        <form class="form" action="addUserProcess.php" method="post">
          <label class="form__label" for="loginId">ログインID</label>
          <input class="form__text" type="email" id="loginId" name="loginId" placeholder="Enter Login ID">
          <label class="form__label" for="password">パスワード</label>
          <input class="form__text" type="password" id="password" name="password" placeholder="Enter Login Password">
          <label class="form__label">権限</label>
          <div>
            <div class="form__checkboxWrapper"><input class="form__checkbox" id="check1" type="checkbox" name="authority[]" value="1"><label class="form__label form__label--inline" for="check1">管理者</label></div>
            <div class="form__checkboxWrapper"><input class="form__checkbox" id="check2" type="checkbox" name="authority[]" value="2"><label class="form__label form__label--inline" for="check2">編集者</label></div>
            <div class="form__checkboxWrapper"><input class="form__checkbox" id="check3" type="checkbox" name="authority[]" value="4"><label class="form__label form__label--inline" for="check3">閲覧者</label></div>
          </di>
          <input class="form__button" type="submit" value="登録">
        </form>
      </main>
    </div>
    <?php require_once('footer.php'); ?>
  </div>
</body>
</html>
