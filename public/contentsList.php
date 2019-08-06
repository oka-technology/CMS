<?php
  require_once('convertAuthority.php');

  session_start();

  if (!$_SESSION['user']) {
    header('Location: index.php');
    exit();
  }

  $authority = $_SESSION['authority'];
  $convertedAuthority = convertAuthority($authority);
  if ($convertedAuthority[0] != 1 && $convertedAuthority[1] != 1) {
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
      'select contents.id, contents.title, contents.registrationDate, categories.name as categoryName from contents join categories on contents.category_id = categories.id;'
    );
    $stmt->execute();

    while($rowOfContents = $stmt->fetch(PDO::FETCH_ASSOC)){
      $contentsHTML .=  "
        <li class='list__row'>
          <ul class='row'>
            <li class='row__item--thin'>{$rowOfContents['id']}</li>
            <li class='row__item'>{$rowOfContents['categoryName']}</li>
            <li class='row__item'>{$rowOfContents['title']}</li>
            <li class='row__item'>{$rowOfContents['registrationDate']}</li>
            <li><a class='row__readButton' href='seeContents.php?id={$rowOfContents['id']}'>閲覧</a></li>
            <li><a class='row__editButton' href='editContents.php?id={$rowOfContents['id']}'>編集</a></li>
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
  <title>コンテンツ一覧</title>
</head>
<body>
  <div class="wrapper">
    <?php require_once('header.php'); ?>
    <div class="mainAndAsideWrapper">
      <?php require_once('sideBar.php'); ?>
      <main class="main">
        <h1 class="main__pageTitle">コンテンツ</h1>
        <?php if($convertedAuthority[1] == 1){echo '<a class="main__addButton" href="addContents.php">新規登録</a>';} ?>
        <ul class="list">
          <li class="list__row">
            <ul class="row">
              <li class="row__item--title--thin">ID</li>
              <li class="row__item--title">カテゴリ</li>
              <li class="row__item--title">タイトル</li>
              <li class="row__item--title">登録日</li>
            </ul>
          </li>
          <?= $contentsHTML ?>
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
