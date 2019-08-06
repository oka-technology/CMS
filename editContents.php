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

  $targetID = $_GET['id'];

  try{
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );
    $stmt = $dbh->prepare(
      "select contents.title, contents.mainContents from contents where contents.id = ?;"
    );
    $stmt->execute([$targetID]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $title = $row['title'];
    $contents = $row['mainContents'];

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
  <title>コンテンツ編集</title>
</head>
<body>
  <?php require_once('header.php'); ?>
  <?php require_once('sideBar.php'); ?>
  <main>
    <h1>コンテンツ編集</h1>
    <form action="editContentsProcess.php" method="post">
      <label for="category">カテゴリ</label>
      <select name="category" id="category">
        <?= $selectCategoryHTML ?>
      </select>
      <label for="title">タイトル</label>
      <input type="text" name="title" id="title" value="<?= $title ?>">
      <label for="contents">内容</label>
      <textarea name="contents" id="contents"><?= $contents ?></textarea>
      <input type="text" name="id" value="<?= $targetID ?>" hidden>
      <input type="submit" value="登録">
    </form>
  </main>
</html>

<?php
  } catch (PDOException $e) {
    var_dump($e);
  }
