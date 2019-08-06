<?php
  require_once('convertAuthority.php');

  session_start();
  if ($_SESSION['user']) {
    if (convertAuthority($_SESSION['authority'])[2] == 1){
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
  <link rel="stylesheet" href="css/style.css">
  <title>Login</title>
</head>
<body class="login">
  <main class="login__main">
    <h1 class="login__pageTitle">Login</h1>
    <form class="form" action="loginProcess.php" method="post">
      <label class="form__label" htmlFor="Email">Email</label>
      <input class="form__text" type="email" name="email" id="Email" placeholder="Enter Email" />
      <label class="form__label" htmlFor="Password">Password</label>
      <input class="form__text" type="password" id="Password" name="password" placeholder="Password" />
      <input class="form__button--login" type="submit" value="Login" />
    </form>
  </main>
</body>
</html>
