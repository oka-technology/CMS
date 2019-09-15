<?php
  session_save_path('/var/www/html/session'); 
  require_once('convertPermission.php');
  session_start();

  $permission = $_SESSION['permission'];
  if (convertPermission($permission)[1] != 1) {
    echo('no permission');
    exit();
  } else {
    try{ 
    $dbh = new PDO(
      'mysql:host=db;dbname=webproLastAssignmentdb',
      'user',
      'password'
    );
    $stmt = $dbh->prepare(
      'select * from categories;'
    );

    function counter() {
      $num = 0;
      return function() use (&$num){
        return $num++;
      };
    };
    $counter = counter();

    $stmt->execute();
    while($rowOfCategories = $stmt->fetch(PDO::FETCH_ASSOC)){
      $index = $counter();
      $result[$index]['id'] = $rowOfCategories['id'];
      $result[$index]['title'] = $rowOfCategories['name'];
    }
    echo(json_encode($result, JSON_PRETTY_PRINT));
    } catch (PDOException $e) {
      echo($e);
    }
  }
