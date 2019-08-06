<?php
  function showAuthority ($authorityNum) {
    $returnArray = array();
    if (convertAuthority($authorityNum)[0] == 1) {
      $returnArray[] = "閲覧者";
    }
    if (convertAuthority($authorityNum)[1] == 1) {
      $returnArray[] = "編集者";
    }
    if (convertAuthority($authorityNum)[2] == 1) {
      $returnArray[] = "管理者";
    }
    return implode(" ", $returnArray);
  }
