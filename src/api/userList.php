<?php
  session_save_path('/var/www/html/session'); 
  require_once('convertPermission.php');
  session_start();

  $permission = $_SESSION['permission'];
  if (convertPermission($permission)[2] != 1) {
    echo('no permission');
  } else {
    try{
      $dbh = new PDO(
        'mysql:host=db;dbname=webproLastAssignmentdb',
        'user',
        'password'
      );

      $stmt = $dbh->prepare('select * from userInfo');
      $stmt->execute();

      function counter() {
        $num = 0;
        return function() use (&$num){
          return $num++;
        };
      };
      $counter = counter();

      while($rowOfUserInfo = $stmt->fetch(PDO::FETCH_ASSOC)){
        $index = $counter();
        $result[$index]['id'] = $rowOfUserInfo['id'];
        $result[$index]['name'] = $rowOfUserInfo['name'];
        $result[$index]['permission'] = $rowOfUserInfo['permission'];
      }
      echo(json_encode($result, JSON_PRETTY_PRINT));
    } catch (PDOException $e) {
      echo($e);
    }
  }
