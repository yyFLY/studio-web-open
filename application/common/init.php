<?php
require_once APP_PATH.'common/BaseApi.class.php';

$g_accessId = "";
$g_accessKey = "";
function initAccessInfo() {
	global $g_accessId;
	global $g_accessKey;
	if(empty($_REQUEST["accessId"]) || empty($_REQUEST["accessKey"])) {
		require_once APP_PATH.'common/Aodianyun.class.php';
		$adapi = new Aodianyun();
		$access = $adapi->getAccessIdAndKey($g_userId);
		$g_accessId = $access['accessid'];
		$g_accessKey = $access['accesskey'];
	} else {
		$g_accessId = $_REQUEST["accessId"];
		$g_accessKey = $_REQUEST["accessKey"];
	}
	if(empty($g_accessId) || empty($g_accessKey)) {
		echo json_encode(array('Flag' => 101, 'FlagString' => '认证参数失败'));
		exit();
	}
}
?>