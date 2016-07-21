<?php
namespace api;
class LcpsApi extends \BaseApi
{
	public function __construct($lcpsAddr = null) {
		if (empty($_REQUEST["lcpsAddr"]) && empty($lcpsAddr)) {
			echo json_encode(array('code' => 101, 'message' => 'lcpsAddr empty'));
			exit();
		}
		$lcpsAddr = empty($lcpsAddr)?$_REQUEST['lcpsAddr']:$lcpsAddr;
		if(strpos($lcpsAddr,"http://") === 0) {
			$this->baseUrl = $lcpsAddr;
		} else {
			$this->baseUrl = "http://".$lcpsAddr;
		}
		$this->errorField = 'code';
		$this->msgField = 'message';
		$this->apiVersion = $_REQUEST['api-version'];
	}
	public function getConfig($param) {
		return $this->httpRequest("/getConfig","POST",json_decode($param['params']));
	}
	public function setInputCount($param) {
		return $this->httpRequest("/setInputCount","POST",json_decode($param['params']));
	}
	public function setWebPageNum($param) {
		return $this->httpRequest("/setWebPageNum","POST",json_decode($param['params']));
	}
	public function setSceneSize($param) {
		return $this->httpRequest("/setSceneSize","POST",json_decode($param['params']));
	}
	public function changeInput($param) {
		return $this->httpRequest("/changeInput",'POST',json_decode($param['params']));
	}
	public function setWebPage($param) {
		return $this->httpRequest("/setWebPage",'POST',json_decode($param['params']));
	}
	public function switchScene($param) {
		return $this->httpRequest("/switch",'POST',json_decode($param['params']));
	}
	public function changeOutput($param) {
		return $this->httpRequest("/changeOutput",'POST',json_decode($param['params']));
	}
	public function setChromakey($param) {
		return $this->httpRequest("/setChromakey",'POST',json_decode($param['params']));
	}
	public function setInputStatus($param) {
		return $this->httpRequest("/setInputStatus",'POST',json_decode($param['params']));
	}
	//小视频详播放情
	public function getStatus($param) {
		return $this->httpRequest("/getStatus","POST",json_decode($param['params']));
	}
	//获取版本负载率等信息	
	public function getOSInfo($param) {
		return $this->httpRequest("/getOSInfo","POST",json_decode($param['params']));
	}
	public function getVersion($param) {
		$vsersion = file_get_contents($this->baseUrl.'/version.js');
		$resp = json_encode(array(
			'version' => str_replace("\"", "", $vsersion),
			'code' => 0,
			'message' => 'success'
		));
		return $resp;
	}
	//设置节目延时
	public function setPgmDelayTime($param) {
		return $this->httpRequest("/setPgmDelayTime","POST",json_decode($param['params']));
	}
	//重启导播台
	public function restartService($param) {
		return $this->httpRequest("/restartService?","POST",json_decode($param['params']));
	}
	//重置导播台
	public function resetService($param) {
		return $this->httpRequest("/resetService?","POST","POST",json_decode($param['params']));
	}
	//设置密码导播台
	public function setpassword($param) {
		return $this->httpRequest("/setpassword","POST",json_decode($param['params']));
	}
	public function changeSourcePullList($param) {
		return $this->httpRequest("/changeSourcePullList","POST",json_decode($param['params']));
	}
	//查询客户端IP，是否需要密码。此接口访问无需密码
	public function getClientIP($param) {
		return $this->httpRequest("/getClientIP","POST",json_decode($param['params']));
	}
	public function isNeedPassward($param) {
		return $this->httpRequest("/isNeedPassward","POST",json_decode($param['params']));
	}
	//验证密码是否正确
	public function isPasswardOK($param) {
		return $this->httpRequest("/isPasswardOK","POST",json_decode($param['params']));
	}
}
?>