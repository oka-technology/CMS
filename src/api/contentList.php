<?php
  session_save_path('/var/www/html/session'); 
  require_once('convertPermission.php');
  session_start();
  
  $permission = $_SESSION['permission'];
  if (convertPermission($permission)[0] != 1 && convertPermission($permission)[1] != 1) {
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
        'SELECT content.id, content.title, content.registrationDate, categories.name as categoryName from content join categories on content.category_id = categories.id order by id;'
      );
      $stmt->execute();

      function counter() {
        $num = 0;
        return function() use (&$num){
          return $num++;
        };
      };
      $counter = counter();

      while($rowOfContent = $stmt->fetch(PDO::FETCH_ASSOC)){
        $index = $counter();
        $result[$index]['id'] = $rowOfContent['id'];
        $result[$index]['category'] = $rowOfContent['categoryName'];
        $result[$index]['title'] = $rowOfContent['title'];
        $result[$index]['registrationDate'] = $rowOfContent['registrationDate'];
      }
      echo(json_encode($result, JSON_PRETTY_PRINT));
    } catch (PDOException $e) {
      echo($e);
    }
  }
