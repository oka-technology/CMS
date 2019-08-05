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
  <title>コンテンツ登録</title>
</head>
<body>
  <h1>コンテンツ登録</h1>
  <form action="addContentsProcess.php" method="post">
    <label for="category">カテゴリ</label>
    <select name="category" id="category">
      <?= $selectCategoryHTML ?>
    </select>
    <label for="title">タイトル</label>
    <input type="text" name="title" id="title">
    <label for="contents">内容</label>
    <textarea name="contents" id="contents"></textarea>
    <input type="submit" value="登録">
  </form>
</body>
</html>

<?php
  } catch (PDOException $e) {
    var_dump($e);
  }
