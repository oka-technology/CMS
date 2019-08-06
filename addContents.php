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

  try{ 
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );
    $stmt = $dbh->prepare(
      'select * from categories;'
    );
    $stmt->execute();

    while($rowOfCategories = $stmt->fetch(PDO::FETCH_ASSOC)){
      $selectCategoryHTML .= "
        <option value='{$rowOfCategories["id"]}'>{$rowOfCategories['name']}</option>
      ";
    }
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="css/style.css">
  <title>コンテンツ登録</title>
</head>
<body>
  <div class="wrapper">
    <?php require_once('header.php'); ?>
    <div class="mainAndAsideWrapper">
      <?php require_once('sideBar.php'); ?>
      <main class="main">
        <h1 class="main__pageTitle">コンテンツ登録</h1>
        <form class="form" action="addContentsProcess.php" method="post">
          <label class="form__label" for="category">カテゴリ</label>
          <select class="form__select" name="category" id="category">
            <?= $selectCategoryHTML ?>
          </select>
          <label class="form__label" for="title">タイトル</label>
          <input class="form__text" type="text" name="title" id="title">
          <label class="form__label" for="contents">内容</label>
          <textarea class="form__textarea" name="contents" id="contents"></textarea>
          <input class="form__button" type="submit" value="登録">
        </form>
      </main>
    </div>
    <?php require_once('footer.php'); ?>
  </div>
</body>
</html>

<?php
  } catch (PDOException $e) {
    var_dump($e);
  }
