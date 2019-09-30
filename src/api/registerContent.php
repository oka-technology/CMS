<?php
  require_once('convertPermission.php'); 
  session_save_path('/var/www/html/session'); 
  $_POST = json_decode(file_get_contents('php://input'), true);
  // $_POST = {
  //   category: string,
  //   title: string,
  //   content: string,
  // }
  session_start();
  if (convertPermission($_SESSION['permission'])[1] != 1) {
    $result['successful'] = false;
  } else if (!$_POST['category'] || $_POST['category'] === "0" || !$_POST['title'] || !$_POST['content']) {
    $result['successful'] = false;
  } else {
    try{
      $dbh = new PDO(
        'mysql:host=db;dbname=webproLastAssignmentdb',
        'user',
        'password'
      );

      date_default_timezone_set('Asia/Tokyo');
      $months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      $currentMonth = date("n");
      $nowDate = $months[$currentMonth - 1] . " " . date("d") . ", " . date("Y") . " " . date("H:i:s");

      $stmt = $dbh->prepare(
        "INSERT into content (category_id, title, registrationDate, mainContent) values (?, ?, ?, ?);"
      );
      $stmt->execute([$_POST['category'], $_POST['title'], $nowDate, $_POST['content']]);
      $result['successful'] = true;
    } catch (PDOException $e) {
      var_dump($e);
      $result['successful'] = false;
    }
  }
  echo(json_encode($result, JSON_PRETTY_PRINT));
