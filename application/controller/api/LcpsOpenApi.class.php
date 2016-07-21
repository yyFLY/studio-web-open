<?php
namespace api;
class LcpsOpenApi extends \BaseApi 
{
	public function __construct() {
		$this->baseUrl = "http://openapi.aodianyun.com/v2/";
		$this->initAccessInfo();
	}
	public function getApp($params) {
		return $this->httpRequest ( "LCPS.GetApp", 'POST', array (
				'access_id' => $this->accessId,
				'access_key' => $this->accessKey 
		) );
	}
	//获取按时计费的导播台
	public function getInstance($params) {
		if (empty ( $params ['instanceID'] )) {
			return $this->paramError ( 'instanceID' );
		}
		return $this->httpRequest ( "LCPS.GetInstance", 'POST', array (
				'access_id' => $this->accessId,
				'access_key' => $this->accessKey,
				'instanceID' => $params ['instanceID']
		) );
	}
	//获取按月计费的导播台
	public function  getMonthInstance($params) {
		if (empty ( $params ['instanceID'] )) {
			return $this->paramError ( 'instanceID' );
		}
		return $this->httpRequest ( "LCPS.GetMonthInstance", 'POST', array (
				'access_id' => $this->accessId,
				'access_key' => $this->accessKey,
				'instanceID' => $params ['instanceID']
		) );
	}
}
?>
