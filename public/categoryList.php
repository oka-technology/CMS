<?php
  require_once('convertAuthority.php');

  session_start();

  if (!$_SESSION['user']) {
    header('Location: index.php');
    exit();
  }

  $authority = $_SESSION['authority'];
  $convertedAuthority = convertAuthority($authority);
  if ($convertedAuthority[1] != 1) {
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
      $categoryListHTML .= "
        <li class='list__row'>
          <ul class='row'>
            <li class='row__item--thin'>{$rowOfCategories['id']}</li>
            <li class='row__item'>{$rowOfCategories['name']}</li>
            <li'><a class='row__editButton' href='editCategory.php?id={$rowOfCategories['id']}'>編集</a></li>
          </ul>
        </li>
      ";
    }
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="css/style.css">
  <title>カテゴリ一覧</title>
</head>
<body>
  <div class="wrapper">
    <?php require_once('header.php'); ?>
    <div class="mainAndAsideWrapper">
      <?php require_once('sideBar.php'); ?>
      <main class="main">
        <h1 class="main__pageTitle">カテゴリ</h1>
        <a class="main__addButton" href="addCategory.php">新規登録</a>
        <ul class="list">
          <li class="list__row">
            <ul class="row">
              <li class="row__item--title--thin">ID</li>
              <li class="row__item--title">タイトル</li>
            </ul>
          </li>
          <?= $categoryListHTML ?>
        </ul>
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
