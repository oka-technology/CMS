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

  $targetID = $_GET['id'];

  try{ 
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );
    $stmt = $dbh->prepare(
      'select * from categories where categories.id = ?;'
    );
    $stmt->execute([$targetID]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $categoryName = $row['name'];
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <title>カテゴリ編集</title>
</head>
<body>
  <h1>カテゴリ編集</h1>
  <form action="editCategoryProcess.php" method="post">
    <label for="title">タイトル</label>
    <input type="text" id="title" name="title" value="<?= $categoryName ?>">
    <input type="text" name="id" value="<?= $targetID ?>" hidden>
    <input type="submit" value="登録">
  </form>
</body>
</html>

<?php
  } catch (PDOException $e) {
    var_dump($e);
  }
