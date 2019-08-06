<?php
  session_start();

  if (!$_SESSION['user']) {
    header('Location: index.php');
    exit();
  }
?>

<header>
  <p>CMS</p>
  <p><a href="logoutProcess.php">Logout</a></p>
</header>
