<?php
  session_start();
  if ($_SESSION['user']) {
    if ($_SESSION['userAuthority'] == 1){
      header('Location: userList.php');
    } else {
      header('Location: contentsList.php');
    }
    exit();    
  }
?>

<!DOCTYPE html>
<html lang="ja-JP">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>
      <form action="loginProcess.php" method="post">
        <label htmlFor="Email">Email</label>
        <input type="email" name="email" id="Email" placeholder="Enter Email" />
        <label htmlFor="Password">Password</label>
        <input type="password" id="Password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
</body>
</html>
