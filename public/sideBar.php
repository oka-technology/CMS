<?php
  require_once('convertAuthority.php');

  session_start();

  if (!$_SESSION['user']) {
    header('Location: index.php');
    exit();
  }

  $authority = $_SESSION['authority'];
  $convertedAuthority = convertAuthority($authority);

  $appearHTML = '';

  if($convertedAuthority[2] == 1){
    $appearHTML .= '
      <li class="sideBar__list__item"><a class="sideBar__list__item-link" href="userList.php">ユーザ一覧</a></li>  
      <li class="sideBar__list__item"><a class="sideBar__list__item-link" href="addUser.php">ユーザ登録</a></li>
    ';
  }
  if($convertedAuthority[1] == 1 || $convertedAuthority[0] == 1){
    $appearHTML .= '
      <li class="sideBar__list__item"><a class="sideBar__list__item-link" href="contentsList.php">コンテンツ一覧</a></li>
    ';
  }
  if($convertedAuthority[1] == 1){
    $appearHTML .= '
      <li class="sideBar__list__item"><a class="sideBar__list__item-link" href="addContents.php">コンテンツ登録</a></li>
      <li class="sideBar__list__item"><a class="sideBar__list__item-link" href="categoryList.php">カテゴリ一覧</a></li>
      <li class="sideBar__list__item"><a class="sideBar__list__item-link" href="addCategory.php">カテゴリ登録</a></li>
    ';
  }
?>

<aside class="sideBar">
  <ul class="sideBar__list">
    <?= $appearHTML ?>
  </ul>
</aside>
