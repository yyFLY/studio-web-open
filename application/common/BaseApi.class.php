<?php
class BaseApi
{
	protected $baseUrl = "";
	protected $errorField = "Flag";
	protected $msgField = "FlagString";
	protected function errorMessage($msg,$code=101) {
		return json_encode(array(
				$this->errorField =>$code,
				$this->msgField => $msg
			));
	}
	protected function paramError($field='') {
		return json_encode(array(
				$this->errorField => 101,
				$this->msgField => 'parameter '.$field.' error'
			));
	}
	protected function httpRequest($path,$method="GET",$params="",$timeout=60,$headers=null,$baseUrl=null) 
	{
		$ch = curl_init();
		if(empty($baseUrl)) {
			curl_setopt($ch,CURLOPT_URL,$this->baseUrl.$path);
		} else {
			curl_setopt($ch,CURLOPT_URL,$baseUrl.$path);
		}
		curl_setopt($ch,CURLOPT_HEADER,false);
		curl_setopt($ch,CURLOPT_AUTOREFERER,true);
		curl_setopt($ch,CURLOPT_FOLLOWLOCATION,true);
		curl_setopt($ch,CURLOPT_FRESH_CONNECT,true);
		curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
		curl_setopt($ch,CURLOPT_TIMEOUT,$timeout);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch,CURLOPT_BINARYTRANSFER,true);
	    if(!empty($headers)) {
			curl_setopt($ch,CURLOPT_HTTPHEADER, $headers);
		}
		curl_setopt($ch,CURLOPT_CUSTOMREQUEST,$method);
		if($method == 'POST') {
			curl_setopt($ch,CURLOPT_POST,true);
		}
		if(!empty($params)) {
			$body = json_encode($params);
			curl_setopt($ch,CURLOPT_POSTFIELDS,$body);
		}
		$response = curl_exec($ch);
		$response_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		if($response_code != 200 && $response_code != 201 && $response_code != 204) {
			return $this->errorMessage(trim($response));
		}
		return trim($response);
	}
	protected $accessId;
	protected $accessKey;
	protected function initAccessInfo() {
		global $g_accessId,$g_accessKey;
		initAccessInfo();
		$this->accessKey = $g_accessKey;
		$this->accessId = $g_accessId;
	}
}
?>