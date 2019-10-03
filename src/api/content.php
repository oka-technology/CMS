<?php
  session_save_path('/var/www/html/session'); 
  require_once('convertPermission.php');
  session_start();
  
  $permission = $_SESSION['permission'];
  if (convertPermission($permission)[0] != 1) {
    echo('no permission');
    exit();
  } else {
    try {
      $dbh = new PDO(
        'mysql:host=db;dbname=webproLastAssignmentdb',
        'user',
        'password'
      );
      $stmt = $dbh->prepare(
        'SELECT * from content where content.id = ?;'
      );
      $stmt->execute([$_GET['id']]);
      while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $result['title'] = $row['title'];
        $result['content'] = $row['mainContent'];
      }
    } catch (PDOException $e) {
      var_dump($e);
    }
  }
  echo(json_encode($result, JSON_PRETTY_PRINT));
