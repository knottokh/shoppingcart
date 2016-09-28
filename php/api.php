<?php

 header('Content-Type: application/json');
  $aResult = array();
 //$aResult['error'] = 'Error in arguments!';
// $aResult['result'] = 5;
//echo json_encode($aResult);
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];

$dbserver ='localhost';
$dbuser ='knottoc9';
$dbpass = '';
$dbdatabase = 'c9';
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
//$input = json_decode(file_get_contents('php://input'),true);
 
// connect to the mysql database
$link = mysqli_connect($dbserver ,$dbuser  ,$dbpass,$dbdatabase );
//$link = mysqli_connect('localhost', 'rs_royal_project', 'royal2559', 'rs_royal_project');
mysqli_set_charset($link,'utf8');
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  else{
 if( !isset($_POST['table']) ) { $aResult['error'] = 'No Table name!'; }
 else{
    $table =$_POST['table'];
  //  $aResult['result'] = $table;
 }
  if( !isset($_POST['objdata']) ) { $aResult['error'] = 'No Data Found!'; }
 else{
    $objdata =$_POST['objdata'];
  //  $aResult['result'] = $table;
 }
if( !isset($_POST['where']) ) { 
    $where = "";
}
 else{
    $where =$_POST['where'];
  //  $aResult['result'] = $table;
 }
 if( !isset($_POST['colselect']) ) { 
    $colselect = "*";
}
 else{
    $colselect =$_POST['colselect'];
 }
 if( !isset($_POST['count']) ) { 
    $count = "";
}
 else{
    $count =$_POST['count'];
 }
 if(isset($_POST['method']) ) {
   $method = strtoupper($_POST['method']);
 }

$set = '';
$i = 0;
foreach($objdata as $key=>$value) {
  //var_dump($key, $value);
  if($key != $value && $key !="primary" && $key !="value"){
     $set.=($i>0?',':'').'`'.$key.'`=';
     $set.= '"'.$value.'"';
      $i++;
  }
 
}
// create SQL based on HTTP method
switch ($method) {
  case 'GET':
   if($where != ""){
        $sql = "select $colselect from `$table` $where";
    }
    else{
        if($objdata["value"] > 0){
            $sql = "select $colselect from `$table`"." WHERE ".$objdata["primary"]."=".$objdata["value"]; 
        }else{
            $sql = "select $colselect from `$table`";
        }
    }
    break;
  case 'PUT':
    $sql = "update `$table` set $set "." WHERE ".$objdata["primary"]."=".$objdata["value"];  

    break;
  case 'POST':
    $sql = "insert into `$table` set $set"; 
    break;
  case 'DELETE':
    $sql = "delete FROM `$table`"." WHERE ".$objdata["primary"]."=".$objdata["value"]; 
    break;
}
//$vars = get_object_vars ( $objdata );

$aResult['resultkeytest'] = $sql ;
 
// excecute SQL statement
$result = mysqli_query($link,$sql);
 
// die if SQL statement failed
if (!$result) {
 // http_response_code(404);
  die(mysqli_error($link));
}

// print results, insert id or affected row count 

if ($method == 'GET') {

    $start =  0;
    $total_recs = mysqli_num_rows($result);
    $end  =  $total_recs;
    if($count == ""){
    if( array_key_exists('pageIndex',$objdata) && array_key_exists('pageSize',$objdata)  ){
        $pageIndex =  (int)$objdata['pageIndex'] ;
        $pageSize =  (int)$objdata['pageSize'] ;
        $start =  ($pageIndex > 0?$pageIndex -1 :0) * $pageSize;
        $end = $start + $pageSize;
        if($end > $total_recs) {
            $end = $total_recs;
        }
        $aResult['pageIndex'] = $end;
    }
    /***fetch index***/
    for($i=0;$i<$start;$i++){
      mysqli_fetch_object($result);
    }
    $results = "[";
      for ($i= $start;$i<$end;$i++) {   
       $curinfo = (array)mysqli_fetch_object($result);
       $curinfo["RecordNo"] = ($i+1) ;   
       $curinfo = (object)$curinfo;  
        $results = $results.($i>$start?',':'').json_encode($curinfo);       
      }
      $results .="]"; 

    $aResult['data'] = $results;
    $aResult['total_recs'] = $total_recs;
  }
  else{
    $aResult['total_recs'] = $total_recs;
  }

 }
 elseif ($method == 'POST') {

     $aResult['resultmsg'] = mysqli_insert_id($link);
 }
 else{
     $aResult['resultmsg'] = mysqli_affected_rows($link);

  }

  $aResult['result2'] = $objdata;
  $aResult['success'] = true;
  echo json_encode($aResult);
 /* if (!$key) echo ']';
if ($method == 'GET') {
  if (!$key) echo '[';
  for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$key) echo ']';
} elseif ($method == 'POST') {
  echo mysqli_insert_id($link);
} else {
  echo mysqli_affected_rows($link);
}
 */
// close mysql connection
mysqli_close($link);
}
?>