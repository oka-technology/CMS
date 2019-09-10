<?php

  function convertPermission($permissionNum){
    $permissionBinary = decbin((int) $permissionNum);
    $permissionBinaryFilled = sprintf('%03d', $permissionBinary);
    $permissionBinaryArray = str_split($permissionBinaryFilled);
    return $permissionBinaryArray;
  }
