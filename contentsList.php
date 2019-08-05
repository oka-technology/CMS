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
        <li>
          <ul>
            <li>{$rowOfContents['id']}</li>
            <li>{$rowOfContents['categoryName']}</li>
            <li>{$rowOfContents['title']}</li>
            <li>{$rowOfContents['registrationDate']}</li>
            <li><a href='seeContents.php?id={$rowOfContents['id']}'>閲覧</a></li>
            <li><a href='editContents.php?id={$rowOfContents['id']}'>編集</a></li>
          </ul>
        </li>
      ";
    }
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <title>コンテンツ一覧</title>
</head>
<body>
  <h1>コンテンツ</h1>
  <a href="addContents.php">新規登録</a>
  <ul>
    <li>
      <ul>
        <li>ID</li>
        <li>カテゴリ</li>
        <li>タイトル</li>
        <li>登録日</li>
      </ul>
    </li>
    <?= $contentsHTML ?>
</body>
</html>

<?php
  } catch (PDOException $e) {
    var_dump($e);
  }
