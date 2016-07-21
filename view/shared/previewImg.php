<?php
	error_reporting(E_ALL & ~E_NOTICE);
	if(!isset($_REQUEST["channel"])) {
		echo "channel empty";
		exit();
	}
	if (empty($_REQUEST["lcpsAddr"])) {
		echo "lcpsAddr empty";
		exit();
	}
	header('Content-Type: image/jpeg');
	$pic = 'http://'.$_REQUEST["lcpsAddr"].'/previewImg?channel='.intval($_REQUEST["channel"]);
	echo file_get_contents($pic);
?>