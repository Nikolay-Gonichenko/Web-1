<?php
session_start();
date_default_timezone_set('Europe/Moscow');
$start = microtime(true);
$x;
$y;
$r;
$result;
$time = date("H:i:s");
if (!isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}
if(isset($_GET["x_value"])){
    $x = $_GET["x_value"];
}else{
    $x = null;
}

if(isset($_GET["y_value"])){
    $y = $_GET["y_value"];
}else{
    $y = null;
}

if(isset($_GET["r_value"])){
    $r = $_GET["r_value"];
}else{
    $r = null;
}

if($x!=null && $y!=null && $r!=null){
   $result = check($x, $y, $r); 
}else{
   $result = null;
}
$delta_time = number_format((microtime(true) - $start), 6); 
send($x,$y,$r,$result, $time, $delta_time);


function check($x_value, $y_value, $r_value){
    if(($x_value**2 + $y_value**2 <= $r_value**2 && $x_value<0 && $y_value>0)
        || ($x_value<$r_value && $x_value>0 && $y_value>0 && $y_value< $r_value/2)
        || ($y_value>=$x_value-$r_value/2 && $x_value<0 && $y_value<0)){
            return true;
    }else{
            return false;  
    }
}


function send($x_value,$y_value,$r_value,$result,$time, $delta_time){
    $all_data = array();
    if(!is_null($result)){
       $all_data = [$x_value,$y_value,$r_value,$result, $time, $delta_time];
       array_push($_SESSION['data'], $all_data);
    }else{
        $all_data = [null];
    }
    $response = json_encode($_SESSION['data']);
    echo($response); 
}
?>

