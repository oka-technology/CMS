<?php
  ini_set( 'session.gc_maxlifetime', 600 );
  ini_set( 'session.gc_probability', 1 );
  ini_set( 'session.gc_divisor', 1 );
  session_save_path('/var/www/html/session'); 
  session_start();
