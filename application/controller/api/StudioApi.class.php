<?php
namespace api;
class StudioApi extends \BaseApi
{
	public function __construct() {
		$this->baseUrl = "http://openapi.aodianyun.com/v2/";
		$this->initAccessInfo();
	}
	public function getStudio($params) 
	{
		if(empty($params['id'])) {
			return $this->paramError('id');
		}
		return $this->httpRequest ( "LCPS.GetStudio", "POST", array (
				'access_id' => $this->accessId,
				'access_key' => $this->accessKey,
				'studioId' => $params['id']
		), 60, array (
				'Content-Type' => 'application/x-www-form-urlencoded' 
		) );
	}
	public function setStudioConfig($params) 
	{
		if(empty($params['id'])) {
			return $this->paramError('id');
		}
		if(!isset($params['config']) && !isset($params['wisId']) && !isset($params['sceneGrpId'])) {
			return $this->paramError('config or wisId or sceneGrpId');
		}
		$body = array (
				'access_id' => $this->accessId,
				'access_key' => $this->accessKey,
				'studioId' => $params['id']
		);
		if(isset($params['config'])) {
			$body["config"] = $params['config'];
		}
		if(isset($params['wisId'])) {
			$body["wisId"] = $params['wisId'];
		}
		if(isset($params['sceneGrpId'])) {
			$body["sceneGrpId"] = $params['sceneGrpId'];
		}
		return $this->httpRequest ( "LCPS.SetStudioConfig", "POST", $body, 60, array (
				'Content-Type' => 'application/x-www-form-urlencoded'
		) );
	}
	public function getStudiosByInstIds($params)
	{
		if(empty($params['instIds'])) {
			return $this->paramError('instIds');
		}
		return $this->httpRequest ( "LCPS.GetStudiosByInstIds", "POST", array (
				'access_id' => $this->accessId,
				'access_key' => $this->accessKey,
				'instIds' => $params['instIds']
		), 60, array (
				'Content-Type' => 'application/x-www-form-urlencoded'
		) );
	}
}
?>
