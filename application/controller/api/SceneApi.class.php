<?php
namespace api;
class SceneApi extends \BaseApi 
{
	public function __construct() {
		$this->baseUrl = "http://openapi.aodianyun.com/v2/";		
		$this->initAccessInfo();
	}
	public function getGroups($params) {
		$state = isset ( $params ['state'] ) ? intval ( $params ['state'] ) : 1;
		$page = isset ( $params ['page'] ) ? intval ( $params ['page'] ) : 0;
		$num = isset ( $params ['num'] ) ? intval ( $params ['num'] ) : 100;
		$num = $num < 100 ? $num : 100;
		return $this->httpRequest ( "HSMS.GetGroups", "POST", array (
				'access_id' => $this->accessId,
				'access_key' => $this->accessKey,
				'page' => $page,
				'num' => $num,
				'state' => $state 
		), 60, array (
				'Content-Type' => 'application/x-www-form-urlencoded' 
		) );
	}
	public function getScenes($params) {
		if (empty ( $params ['groupId'] )) {
			return $this->errorMessage ( 'groupId empty' );
		}
		$state = isset ( $params ['state'] ) ? intval ( $params ['state'] ) : 1;
		return $this->httpRequest ( "HSMS.GetScenes", "POST", array (
				'access_id' => $this->accessId,
				'access_key' => $this->accessKey,
				'groupId' => $params ['groupId'],
				'state' => $state 
		), 60, array (
				'Content-Type' => 'application/x-www-form-urlencoded' 
		) );
	}
}
?>
