<?php
  ini_set( 'session.gc_maxlifetime', 10 );
  ini_set( 'session.gc_probability', 1 );
  ini_set( 'session.gc_divisor', 1 );
  session_save_path('/var/www/html/session'); 
  session_start();
