<?php 
namespace api;
class UploadApi extends \BaseApi
{
	public function __construct() {
		$this->initAccessInfo();
	}
	private function uploadFile($accessId,$accessKey,$fileName,$data,$timeout=60)
	{
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,"http://upload.dvr.aodianyun.com/v2/MFS.WIS.Put");
		curl_setopt($ch,CURLOPT_HEADER,false);
		curl_setopt($ch,CURLOPT_AUTOREFERER,true);
		curl_setopt($ch,CURLOPT_FOLLOWLOCATION,true);
		curl_setopt($ch,CURLOPT_FRESH_CONNECT,true);
		curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
		curl_setopt($ch,CURLOPT_TIMEOUT,$timeout);
		//	curl_setopt($ch,CURLOPT_USERAGENT,$useragent);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch,CURLOPT_BINARYTRANSFER,true);
		curl_setopt($ch,CURLOPT_CUSTOMREQUEST,"POST");
		// curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch,CURLOPT_HTTPHEADER, array('Content-Type' => "application/x-www-form-urlencoded"));
		curl_setopt($ch,CURLOPT_POST,true);
		$body = json_encode(array(
				'access_id' => $accessId,
				'access_key' => $accessKey,
				'fileName' => $fileName,
				'blob' => $data
		));
		curl_setopt($ch,CURLOPT_POSTFIELDS,$body);
		$response = curl_exec($ch);
		//get response code
		$response_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		//close connection
		curl_close($ch);
		if($response_code != 200 && $response_code != 201 && $response_code != 204) {
			$rst = array(
					'Flag'=>101,
					'FlagString'=> trim($response)
			);
			return json_encode($rst);
		}
		return trim($response);
	}
	public function upload() {
		if(empty($_FILES['file'])){
			return json_encode(array('Flag' => 101,'FlagString' => 'file empty'));
		}
		$size = $_FILES['file']['size']/(pow(1024, 2));
		if($size > 20){
			return json_encode(array('Flag' => 101,'FlagString' => 'file too big'));
		}
		$fileName = $_FILES['file']['name'];
		$file = $_FILES['file']['tmp_name'];
		$picType = $_FILES['file']['type'];
		if(is_uploaded_file($file)){
			$handle = fopen($file, "r");
			$contents = fread($handle, filesize ($file));
			fclose($handle);
			$fileData = base64_encode($contents);
			$fileName = md5($fileData).'.png';
			return $this->uploadFile($this->accessId, $this->accessKey, $fileName, $fileData);
		} else {
			return json_encode(array('Flag' => 101,'FlagString' => 'file format error'));
		}
	}
}
?>