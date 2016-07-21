<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
define("APP_PATH", dirname(dirname(__FILE__)).'/application/');
function __autoload($classname) {
	$classpath = APP_PATH.'controller/'.str_replace("\\","/",$classname).'.class.php';
	if(file_exists($classpath)){
		require_once($classpath);
	}
}

$__ROUTER = array(
	//'wis' => '\wis\WisInterface',
	//'vod' => '\api\VodApi',
	'studio' => '\api\StudioApi',
	'scene' => '\api\SceneApi',
	'lcps' => '\api\LcpsApi',
	'open' => '\api\LcpsOpenApi',
	'upload' => '\api\UploadApi'
);

$controller = $_REQUEST['c'];
$action = $_REQUEST['a'];
if (empty($controller) || empty($action)) {
	echo json_encode(array('Flag' => 101, 'FlagString' => 'a or c is empty'));
	exit();
}
if(empty($__ROUTER[$controller])) {
	echo json_encode(array('Flag' => 101, 'FlagString' => 'router error'));
	exit();
}
require_once APP_PATH.'common/init.php';
$api = new $__ROUTER[$controller];
echo $api->$action($_REQUEST);
?>
