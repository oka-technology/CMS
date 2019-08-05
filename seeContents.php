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
  if (convertAuthority($authority)[0] != 1) {
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
      "select * from contents where contents.id = ?;"
    );
    $stmt->execute([$targetID]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $title = $row['title'];
    $contents = $row['mainContents'];

?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <title><?= $title ?></title>
</head>
<body>
  <h1><?= $title ?></h1>
  <p><?= str_replace("\r\n", '</br>', $contents); ?></p>
</html>

<?php
  } catch (PDOException $e) {
    var_dump($e);
  }
