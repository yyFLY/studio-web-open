//studio api
function StudioApi(option) {
    var opt = option;
	this.GetInfo = function (option) {
	    option = option ? option : {};
	    option.url = apiBasePath + "index.php?c=studio&a=getStudio&id=" + opt.studioId + "&accessId=" + opt.accessId + "&accessKey=" + opt.accessKey + "&stuKey=" + opt.studioId + "&userId=" + opt.userId;
	    httpHelper.loggedHttpPost(option, "StudioApi.GetInfo", "Flag", "FlagString", 100);
	}
	this.SetConfig = function (option) {
	    option.url = apiBasePath + "index.php?c=studio&a=setStudioConfig&id=" + opt.studioId + "&accessId=" + opt.accessId + "&accessKey=" + opt.accessKey + "&stuKey=" + opt.studioId + "&userId=" + opt.userId;
	    option.data = {};
	    if(option.config != undefined) 
	        option.data["config"] = JSON.stringify(option.config);
	    if(option.wisId != undefined) 
	        option.data["wisId"] = option.wisId;
	    if (option.sceneGrpId != undefined)
	        option.data["sceneGrpId"] = option.sceneGrpId;
	    httpHelper.loggedHttpPost(option, "StudioApi.setStudioConfig", "Flag", "FlagString", 100);
	}
	this.GetInfoListByInstIds = function (option) {
	    option = option ? option : {};
	    option.url = apiBasePath + "index.php?c=studio&a=getStudiosByInstIds&accessId=" + opt.accessId + "&accessKey=" + opt.accessKey + "&stuKey=" + opt.studioId + "&userId=" + opt.userId;
	    httpHelper.loggedHttpPost(option, "StudioApi.GetInfoListByInstIds", "Flag", "FlagString", 100);
	}
	this.SetPlayUrl = function (option) {
	    option = option ? option : {};
	    option.url = apiBasePath + "index.php?c=studio&a=setPlayUrl&studioId=" + opt.studioId + "&accessId=" + opt.accessId + "&accessKey=" + opt.accessKey + "&stuKey=" + opt.studioId + "&userId=" + opt.userId;
	    option.data = option.params;
	    httpHelper.loggedHttpPost(option, "StudioApi.SetPlayUrl", "Flag", "FlagString", 100, option.logLevel);
	}
	this.GetPlayUrl = function (option) {
	    option = option ? option : {};
	    option.url = apiBasePath + "index.php?c=studio&a=getPlayUrl&studioId=" + opt.studioId + "&accessId=" + opt.accessId + "&accessKey=" + opt.accessKey + "&stuKey=" + opt.studioId + "&userId=" + opt.userId;
	    option.data = option.params;
	    httpHelper.loggedHttpPost(option, "StudioApi.GetPlayUrl", "Flag", "FlagString", 100, option.logLevel);
	}
}
//open
function LcpsOpenApi(option) {
    var studioId = option.studioId;
    var accessId = option.accessId;
    var accessKey = option.accessKey;
    var userId = option.userId;
    this.GetApp = function (option) {
        option = option ? option : {};
        httpHelper.loggedHttpGet({
            url: apiBasePath + "index.php?c=open&a=getApp&accessId=" + accessId + "&accessKey=" + accessKey + "&stuKey=" + studioId + "&userId=" + userId,
            success: option.success,
            failure: option.failure
        }, "LcpsOpenApi.GetApp", "Flag", "FlagString", 100)
    }
    this.GetInstance = function (option) {
        option = option ? option : {};
        httpHelper.loggedHttpPost({
            url: apiBasePath + "index.php?c=open&a=getInstance&accessId=" + accessId + "&accessKey=" + accessKey + "&stuKey=" + studioId + "&userId=" + userId,
            data: { instanceID: option.instanceID },
            success: option.success,
            failure: option.failure
        }, "LcpsOpenApi.GetInstance", "Flag", "FlagString", 100)
    }
    this.GetMonthInstance = function (option) {
        option = option ? option : {};
        httpHelper.loggedHttpPost({
            url: apiBasePath + "index.php?c=open&a=getMonthInstance&accessId=" + accessId + "&accessKey=" + accessKey + "&stuKey=" + studioId + "&userId=" + userId,
            data: { instanceID: option.instanceID },
            success: option.success,
            failure: option.failure
        }, "LcpsOpenApi.GetMonthInstance", "Flag", "FlagString", 100)
    }
}
//wis api
function WisExApi(option) {
    var studioId = option.studioId;
    var accessId = option.accessId;
    var accessKey = option.accessKey;
    var userId = option.userId;
	this.GetDocList = function (option) {
		 httpHelper.loggedHttpPost({
	        url: apiBasePath + "index.php?c=wis&a=execute",
	        data: { method: 'DocList', skip: option.skip, num: option.num, accessId:accessId,accessKey:accessKey,stuKey:studioId, userId:userId },
	        success: function (data) {
	            if (data.Flag == 100) {
	                if (option.success) option.success(data.Info);
	            } else {
	                if (option.failure) option.failure(data.FlagString);
	            }
	        },
	        failure: option.failure
        }, "WisExApi.GetDocList", "Flag", "FlagString", 100)
	}
	this.GetInstList = function (option) {
		httpHelper.loggedHttpPost({
	        url: apiBasePath + "index.php?c=wis&a=execute",
	        data: { method: 'GetInstList', skip: option.skip, num: option.num,state: 1, accessId:accessId,accessKey:accessKey,stuKey:studioId,userId:userId },
	        success: function (data) {
	            if (data.Flag == 100) {
	                if (option.success) option.success(data.Info);
	            } else {
	                if (option.failure) option.failure(data.FlagString);
	            }
	        },
	        failure: option.failure
	    }, "WisExApi.GetInstList", "Flag", "FlagString", 100)
	}
}
//scene api
function SceneApi(option) {
    var studioId = option.studioId;
    var accessId = option.accessId;
    var accessKey = option.accessKey;
    var userId = option.userId;
	this.GetList = function (option) {
	    var oldFailure = option ? option.failure : false;
	    var oldSuccess = option ? option.success : false;
	    if (option.sceneGroupId) {
	    	httpHelper.loggedHttpPost({
	            url: apiBasePath + "index.php?c=scene&a=getScenes",
	            data: { accessId: accessId, accessKey: accessKey, stuKey: studioId, userId: userId, groupId: option.sceneGroupId },
	            success: function (scenes) {
	                var list = scenes.list;
	                if (oldSuccess) oldSuccess(list);
	            },
	            failure: oldFailure
	        }, "SceneApi.GetList", "Flag", "FlagString", 100);
	    } else {
	    	httpHelper.loggedHttpPost({
	            url: apiBasePath + "index.php?c=scene&a=getGroups",
	            data: { accessId: accessId, accessKey: accessKey, stuKey: studioId,userId:userId, page: 1, num: 5 },
	            success: function (groups) {
	                if (groups.list.length > 0) {
	                	httpHelper.loggedHttpPost({
	                        url: apiBasePath + "index.php?c=scene&a=getScenes",
	                        data: { accessId: accessId, accessKey: accessKey, stuKey: studioId,userId:userId, groupId: groups.list[0].id },
	                        success: function (scenes) {
	                            var list = scenes.list;
	                            if (oldSuccess) oldSuccess(list);
	                        },
	                        failure: oldFailure
	                    }, "SceneApi.GetList", "Flag", "FlagString", 100);
	                }
	            },
	            failure: option.failure
	        }, "SceneApi.GetList.GetGroups", "Flag", "FlagString", 100);
	    }
	}
	this.GetGroupList = function (option) {
		httpHelper.loggedHttpPost({
	        url: apiBasePath + "index.php?c=scene&a=getGroups",
	        data: {
	            accessId: accessId, accessKey: accessKey, stuKey: studioId, userId:userId,
	            page: option.page!=undefined ? option.page : 1, num: option.num?option.num:100
	        },
	        success: option.success,
	        failure: option.failure
	    }, "SceneApi.GetGroupList", "Flag", "FlagString", 100);
	}
}
//vod api
function VodApi(option) {
    var studioId = option.studioId;
    var accessId = option.accessId;
    var accessKey = option.accessKey;
    var userId = option.userId;
	function vodPostRequest(option, logFix) {
	    option.url = apiBasePath + "index.php?c=vod&a="+ option.method + "&accessId=" + accessId + "&accessKey=" + accessKey + "&stuKey=" + studioId + "&userId=" + userId + (option.url?option.url:"");
	    httpHelper.loggedHttpPost(option, logFix, "Flag", "FlagString", 100);
	}
	this.GetList = function (option) {
	    option.method = "getVodList";
	    option.data = { page: (option.page != undefined ? option.page : 1), num: (option.num != undefined ? option.num : 50) };
	    vodPostRequest(option, "VodApi.GetList");
	}
	this.GetUploadList = function (option) {
	    option.method = "getUploadVodList";
	    option.data = { page: (option.page != undefined ? option.page : 1), num: (option.num != undefined ? option.num : 50) };
	    vodPostRequest(option, "VodApi.GetUploadList");
	}
	this.GetMergeList = function (option) {
	    option.method = "getMergeVodList";
	    option.data = { page: (option.page != undefined ? option.page : 1), num: (option.num != undefined ? option.num : 50) };
	    vodPostRequest(option, "VodApi.GetMergeList");
	}
}
//lcps api
function LcpsApi() {
    var lcpsHost;
    var lcpsPort;
    var randInc = 0, clientIp, password;
    var self = this;
    this.setHostPort = function (_lcpsHost, _lcpsPort) { lcpsHost = _lcpsHost; lcpsPort = _lcpsPort };
    this.setClientIp = function (_clientIp) { clientIp = _clientIp; };
    this.setPassword = function (_password) { password = _password; };
    function appendPasswordParam(option) {
        option.data = option.data ? option.data : {};
        if (password || option.password) {
            var passwd = option.password ? option.password : password;
            var path = option.path ? option.path : "/" + option.method;
            var rand = new Date().getTime() + (randInc++) + "";
            option.data.rand = rand;
            option.data.validate = $.md5(clientIp + "." + path + "." + rand + "." + passwd);
            return true;
        }
        return null;
    }
    function lcpsPostRequest(option, logFix, logLevel) {
        option.url = apiBasePath + "index.php?c=lcps&a=" + option.method + "&apiVersion=1&lcpsAddr=" + encodeURIComponent(lcpsHost + ":" + lcpsPort) + (option.url ? option.url : "");
        option.data = option.data ? option.data : {};
        appendPasswordParam(option);
        option.data = { params: JSON.stringify(option.data) };
        httpHelper.loggedHttpPost(option, logFix, "code", "message", 0, logLevel);
    }
    /*
    function lcpsGetRequest(option, logFix, logLevel) {
        var url = option.url;
        option.url = apiBasePath + "index.php?c=lcps&a=" + option.method + "&apiVersion=1&lcpsAddr=" + encodeURIComponent(lcpsHost + ":" + lcpsPort);
        if (appendPasswordParam(option)) {
            option.url += "&rand=" + option.data.rand + "&validate=" + option.data.validate
        }
        option.url += (url ? url : "")
        httpHelper.loggedHttpGet(option, logFix, "code", "message", 0, logLevel);
    }*/
    this.GetConfig = function (option) {
        lcpsPostRequest({
            method:"getConfig",
            success: option.success,
            failure: option.failure
        }, "LcpsApi.GetConfig", option.logLevel);
    }
    this.SetInputCount = function (option) {
        lcpsPostRequest({
            method: "setInputCount",
            data: { count: option.count },
            success: option.success,
            failure: option.failure
        }, "LcpsApi.SetInputCount", option.logLevel);
    }
    this.SetSceneSize = function (option) {
        lcpsPostRequest({
            method: "setSceneSize",
            data: { width: option.width, height: option.height },
            success: option.success,
            failure: option.failure
        }, "LcpsApi.SetSceneSize", option.logLevel);
    }
    this.SetWebPageNum = function (option) {
        lcpsPostRequest({
            method: "setWebPageNum",
            data: { num: option.num },
            success: option.success,
            failure: option.failure
        }, "LcpsApi.setWebPageNum", option.logLevel);
    }
    this.SelectWebPage = function (option) {
        lcpsPostRequest({
            method: "setWebPage",
            data: { para: option.para},
            failure: option.failure,
            success: option.success
        }, "LcpsApi.setWebPage", option.logLevel);
    }
    this.ChangeInput = function (option) {
        lcpsPostRequest({
            method: "changeInput",
            data: option.params,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.ChangeInput", option.logLevel);
    }
    this.SetChangeInput = function (option) {
        lcpsPostRequest({
            method: "changeInput",
            data: option.postData,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.SetChangeInput", option.logLevel);
    }
    this.Switch = function (option) {
        if (option.paraArray) {
            lcpsPostRequest({
                method: "switchScene",
                data: { paraArray: option.paraArray },
                path: "/switch",
                success: option.success,
                failure: option.failure
            }, "LcpsApi.Switch");
        } else if(option.params) {
            lcpsPostRequest({
                method: "switchScene",
                data: option.params,
                success: option.success,
                failure: option.failure
            }, "lcpsApi.Switch", option.logLevel);
        }
    }
    this.SetInputVoice = function (option) {
        if (!option.volumes || option.volumes.length <= 0) return
        var volumes = option.volumes;
        var param = {};
        for (var i = 0; i < volumes.length; ++i) {
            var item = volumes[i];
            param["v" + item.index] = item.value;
        }
        self.Switch({
            params: param,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.SetInputVoice", option.logLevel);
    }
    this.ChangeOutput = function (option) {
        lcpsPostRequest({
            method: "changeOutput",
            data: option.params,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.ChangeOutput", option.logLevel);
    }
    this.SetChromakey = function (option) {
        lcpsPostRequest({
            method: "setChromakey",
            data: option.params,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.SetChromakey", option.logLevel);
    }
    this.SetInputStatus = function (option) {
        lcpsPostRequest({
            method: "setInputStatus",
            data: option.params,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.SetInputStatus", option.logLevel);
    }
    this.GetStatus = function (option) {
        lcpsPostRequest({
            method: "getStatus",
            success: option.success,
            failure: option.failure
        }, "LcpsApi.GetStatus", option.logLevel);
    }
    this.GetOSInfo = function (option) {
        lcpsPostRequest({
            method: "getOSInfo",
            success: option.success,
            failure: option.failure
        }, "getOSInfo", option.logLevel);
    }
    this.GetVersion = function (option) {
        lcpsPostRequest({
            method: "getVersion",
            success: option.success,
            failure: option.failure
        }, "LcpsApi.GetVersion", option.logLevel);
    }
    this.SetPgmDelayTime = function (option) {
        lcpsPostRequest({
            method: "setPgmDelayTime",
            data: option.params,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.SetPgmDelayTime", option.logLevel);
    }
    this.RestartService = function (option) {
        lcpsPostRequest({
            method: "restartService",
            success: option.success,
            failure: option.failure
        }, "LcpsApi.RestartService", option.logLevel);
    }
    this.ResetService = function (option) {
        lcpsPostRequest({
            method: "resetService",
            success: option.success,
            failure: option.failure
        }, "LcpsApi.ResetService", option.logLevel);
    }
    this.Setpassword = function (option) {
        lcpsPostRequest({
            method: "setpassword",
            data: option.params,
            password: option.password,
            success: function (data) {
                self.setPassword(option.params.password);
                if (option.success) option.success(data);
            },
            failure: option.failure
        }, "LcpsApi.Setpassword", option.logLevel);
    }
    this.ChangeSourcePullList = function (option) {
        lcpsPostRequest({
            method: "changeSourcePullList",
            data: option.params,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.ChangeSourcePullList", option.logLevel);
    }
    this.GetClientIP = function (option) {
        lcpsPostRequest({
            method: "getClientIP",
            success: option.success,
            failure: option.failure
        }, "LcpsApi.GetClientIP", option.logLevel);
    }
    this.IsNeedPassward = function (option) {
        lcpsPostRequest({
            method: "isNeedPassward",
            success: option.success,
            failure: option.failure
        }, "LcpsApi.IsNeedPassward", option.logLevel);
    }
    this.IsPasswardOK = function (option) {
        lcpsPostRequest({
            method: "isPasswardOK",
            data: option.params,
            password: option.password,
            success: option.success,
            failure: option.failure
        }, "LcpsApi.IsPasswardOK", option.logLevel);
    }
}
