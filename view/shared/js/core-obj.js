//动态加载资源
var DynamicLoading = (function () {
    function onLoadFinished(obj, option) {
        option = option ? option : {};
        if (!option.load) return;
        function ready() { /*IE7.0/IE10.0*/
            if (obj.readyState == 'loaded' || obj.readyState == 'complete') {
                option.load();
            }
        }
        function loaded() { /*chrome/IE10.0*/
            option.load();
        }
        if (document.documentMode == 10 || document.documentMode == 9) {
            obj.onerror = obj.onload = loaded;
        } else {
            obj.onreadystatechange = ready;
            obj.onerror = obj.onload = loaded;
        }
    }
    return {
        css: function (path, option) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            onLoadFinished(link, option);
            head.appendChild(link);
        },
        js: function (path, option) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            onLoadFinished(script, option);
            head.appendChild(script);
        },
        waitForObject: function (option) {
            if (window[option.objName] == undefined) {
                if (option.js && $("script[src='" + option.js + "']").length <= 0) {
                    this.js(option.js);
                } else {
                    console.log("load " + option.objName + " timeout ...");
                }
                setTimeout(option.entry, 800);
                return true;
            }
            return false;
        }
    }
})();
var sharedDirPath = "../shared/";
DynamicLoading.js(sharedDirPath + "js/common-obj.js");
DynamicLoading.js(sharedDirPath + "js/api-obj.js");
//common operate
function StudioApp(_option) {
    var self = this;
    this.Init = function (option) {
        if (DynamicLoading.waitForObject({
            objName: "httpHelper",
            entry: function () {
                self.Init.call(self, option);
        }
        })) return;
        if (DynamicLoading.waitForObject({
            objName: "LcpsApi",
            entry: function () {
                self.Init.call(self, option);
        }
        })) return;
        onLoadResourceOk.call(self, _option);
        self.Init.call(self, option);
    }
    function onLoadResourceOk(_option) {
        var opts = _option ? _option : {};
        var userId = getQueryStr("userId");
        var accessId = getQueryStr("accessId");
        var accessKey = getQueryStr("accessKey");
        var studioId = getQueryStr("studioId");
        var lcpsHost = getQueryStr("lcpsHost");
        var lcpsPort = getQueryStr("lcpsPort");
        userId = userId ? userId : opts.defUserId;
        studioId = studioId ? studioId : opts.defStudioId;
        lcpsHost = lcpsHost ? lcpsHost : opts.defLcpsHost;
        lcpsPort = lcpsPort ? lcpsPort : opts.defLcpsPort;
        var wisId, lcpsConfigInfo, sceneGroupId, studioConfig, lcpsVersion, lcpsClientIp;
        this.getUserId = function () { return userId };
        this.getAccessId = function () { return accessId };
        this.getAccessKey = function () { return accessKey };
        this.getStudioId = function () { return studioId };
        this.getLcpsHost = function () { return lcpsHost };
        this.getLcpsPort = function () { return lcpsPort };
        this.getRtmpAddr = function () { return "rtmp://" + lcpsHost };
        this.getPlayApp = function () { return "" + (parseInt(lcpsPort) + 1) };
        this.getPreStream = function () { return "3_pgw" };
        this.getSmallStream = function (channel) { return channel + "_small" };
        this.getPubApp = function () { return "live" };
        this.getPubStream = function (channel) { return "" + channel };
        this.getQrCodeUrl = function () { return "http://" + lcpsHost + ':' + lcpsPort };
        this.getWisId = function () { return wisId };
        this.getSceneGroupId = function () { return sceneGroupId };
        this.getPlayCompleteNotifyURL = function (channel) {
            return "http://studio.aodianyun.com/view/index.php?c=studio&a=setNextPlayUrl&accessId=x&accessKey=x&studioId=" +
                studioId + "&userId=" + userId + "&channel=" + channel + "&lcpsHost=" + lcpsHost + "&port=" + lcpsPort;
        }
        var AuthInfo = { userId: userId, accessId: accessId, accessKey: accessKey, studioId: studioId };
        var Studio = new StudioApi(AuthInfo);
        var LcpsOpen = new LcpsOpenApi(AuthInfo);
        var Scene = new SceneApi(AuthInfo);
        var Vod = new VodApi(AuthInfo);
        var WisEx = new WisExApi(AuthInfo);
        var Lcps = new LcpsApi();
        this.Studio = Studio;
        this.LcpsOpen = LcpsOpen;
        this.Scene = Scene;
        this.Vod = Vod;
        this.WisEx = WisEx;
        this.Lcps = Lcps;

        //默认的错误处理方式
        function getFailureHandler(notify, option) {
            var failure = option;
            if (failure && (typeof failure != "function")) {
                failure = option.failure;
            }
            if (failure) {
                return failure;
            } else {
                if (opts.defFailureHandler) {
                    return opts.defFailureHandler;
                }
                return function () {
                    alert(notify);
                }
            }
        }
        this.getLcpsConfigInfo = function (option) {
            if (option && option.reload) {
                Lcps.GetConfig({
                    success: function (configResp) {
                        lcpsConfigInfo = configResp.config;
                        if (option.success) option.success(lcpsConfigInfo);
                    },
                    failure: getFailureHandler("获取导播台配置失败", option)
                });
                return;
            }
            return lcpsConfigInfo;
        };
        this.getVersion = function (option) {
            if (option && option.reload) {
                self.Lcps.GetVersion({
                    success: function (data) {
                        lcpsVersion = data.version;
                        if (option.success) option.success(lcpsVersion);
                    },
                    failure: getFailureHandler("获取导播台版本信息失败", option)
                });
            }
            return lcpsVersion;
        }
        this.getLcpsClientIp = function (option) {
            if (option && option.reload) {
                self.Lcps.GetClientIP({
                    success: function (data) {
                        lcpsClientIp = data.ip;
                        self.Lcps.setClientIp(lcpsClientIp);
                        if (option.success) option.success(lcpsClientIp);
                    },
                    failure: getFailureHandler("获取客户ip失败", option)
                });
            }
            return lcpsClientIp;
        }
        var lcpsStatusTimerId;
        function startGetSatusTimer(option) {
            var lcpsStatusTimerInc;
            lcpsStatusTimerId = setInterval(function () {
                try {
                    lcpsStatusTimerInc = (lcpsStatusTimerInc == undefined) ? 0 : (lcpsStatusTimerInc + 1);
                    if (self.onGetStatus) {
                        Lcps.GetStatus({
                            success: self.onGetStatus,
                            logLevel: httpHelper.getLogLevelError()
                        });
                    }
                    if (self.onGetPlayUrl) {
                        Studio.GetPlayUrl({
                            params: { studioId: studioId },
                            success: self.onGetPlayUrl,
                            logLevel: httpHelper.getLogLevelError()
                        });
                    }
                    if (self.onGetOSInfo) {
                        if (lcpsStatusTimerInc % 2 == 0) {
                            Lcps.GetOSInfo({
                                success: self.onGetOSInfo,
                                logLevel: httpHelper.getLogLevelError()
                            });
                        }
                    }
                } catch (e) {
                    errorLog("GetSatusTimer", e);
                }
            }, option.interval ? option.interval : 5000);
        }
        this.stopGetSatusTimer = function () {
            if (lcpsStatusTimerId) {
                clearInterval(lcpsStatusTimerId);
            }
        }
        this.Init = function (option) {
            if (!studioId) {
                getFailureHandler("studioId为空", option)();
                return;
            }
            function onGetInstance(info, insts) {
                if (option.onInitUI) option.onInitUI();
                var inst;
                if (insts.List && insts.List.length > 0) {
                    inst = insts.List[0];
                }
                if (inst && !lcpsPort) {
                    lcpsPort = inst.port;
                }
                lcpsPort = lcpsPort ? lcpsPort : 3000;
                if (inst && !lcpsHost) {
                    lcpsHost = inst.domain + "." + inst.user + "." + "lcps.aodianyun.com";
                }
                if (inst && !lcpsHost) {
                    getFailureHandler("导播台地址参数错误", option)();
                    return;
                }
                Lcps.setHostPort(lcpsHost, lcpsPort);
                wisId = info.wisId;
                userId = info.user;
                AuthInfo.userId = userId;
                try {
                    if (info.config) {
                        info.config = $.parseJSON(info.config);
                    } else {
                        info.config = {};
                    }
                } catch (e) { info.config = {}; }
                studioConfig = info.config;
                sceneGroupId = info.sceneGrpId ? info.sceneGrpId : info.config._sceneGroupId;
                if (inst && inst.progress != 100) {
                    self.onLcpsCreating = option.onLcpsCreating ? option.onLcpsCreating : self.onLcpsCreating;
                    if (self.onLcpsCreating) self.onLcpsCreating(inst);
                    return;
                }
                function loadLcpsConfig(password) {
                    Lcps.setPassword(password);
                    Lcps.GetConfig({
                        success: function (configResp) {
                            lcpsConfigInfo = configResp.config;
                            option.onStudioLoad({ studio: info, lcpsConfig: lcpsConfigInfo, lcpsInst: inst });
                            self.onGetOSInfo = option.onGetOSInfo ? option.onGetOSInfo : self.onGetOSInfo;
                            self.onGetStatus = option.onGetStatus ? option.onGetStatus : self.onGetStatus;
                            self.onGetPlayUrl = option.onGetPlayUrl ? option.onGetPlayUrl : self.onGetPlayUrl;
                            if (self.onGetOSInfo || self.onGetStatus || self.onGetPlayUrl) {
                                startGetSatusTimer({
                                    interval: option.intervalForTimer
                                });
                            }
                        },
                        failure: getFailureHandler("获取导播台配置失败", option)
                    });
                }
                Lcps.IsNeedPassward({ //导播台是否需要密码
                    success: function (data) {
                        if (data.need) {
                            self.getLcpsClientIp({
                                reload: true,
                                success: function (data) {
                                    if (self.onShowInputPassword) {
                                        self.onShowInputPassword(loadLcpsConfig);
                                    }
                                }
                            });
                        } else {
                            loadLcpsConfig();
                        }
                    },
                    failure: getFailureHandler("获取是否设置密码失败", option)
                });
            }
            Studio.GetInfo({
                success: function (data) {
                    var info = data.info;
                    if (!info.instId) {
                        getFailureHandler("导播台实例参数错误", option)();
                        return;
                    }
                    LcpsOpen.GetInstance({
                        instanceID: info.instId,
                        success: function (insts) {
                            if (insts.List && insts.List.length <= 0) {
                                LcpsOpen.GetMonthInstance({
                                    instanceID: info.instId,
                                    success: function (m_insts) {
                                        onGetInstance(info, m_insts);
                                    },
                                    failure: getFailureHandler("获取按月导播台实例失败", option)
                                });
                            } else {
                                onGetInstance(info, insts);
                            }
                        },
                        failure: getFailureHandler("获取按量导播台实例失败", option)
                    });
                },
                failure: getFailureHandler("获取演播室信息失败", option)
            });
        }
        this.ChangeWisInst = function (option) {
            this.SetStudioConfig({
                wisId: option.wisId
            })
        }
        this.ChangeSceneGroup = function (option) {
            this.SetStudioConfig({
                sceneGroupId: option.sceneGroupId
            });
        }
        this.SetStudioConfig = function (option) {
            if (option.config != undefined)
                studioConfig = option.config;
            var reloadPage = false;
            if (option.sceneGroupId != undefined) {
                sceneGroupId = option.sceneGroupId;
                reloadPage = true;
            }
            if (option.wisId != undefined) {
                wisId = option.wisId;
                reloadPage = true;
            }
            Studio.SetConfig({
                config: option.config,
                wisId: option.wisId,
                sceneGrpId: option.sceneGroupId,
                success: function () {
                    if (reloadPage) {
                        window.location.reload();
                    }
                },
                failure: function (error) {
                    getFailureHandler("保存演播室配置失败", option)
                    if (reloadPage) {
                        window.location.reload();
                    }
                }
            })
        }
        this.AppendPlayURL = function (option) {
            Studio.SetPlayUrl({
                params: {
                    operate: "append",
                    channel: option.channel,
                    playItem: JSON.stringify(option.playItem)
                },
                success: option.success,
                failure: getFailureHandler("添加播放项失败", option)
            });
        }
        this.DeletePlayURL = function (option) {
            Studio.SetPlayUrl({
                params: {
                    operate: "delete",
                    channel: option.channel,
                    index: option.index
                },
                success: option.success,
                failure: getFailureHandler("删除播放项失败", option)
            });
        }
        this.SetPlayURL = function (option) {
            Studio.SetPlayUrl({
                params: {
                    operate: "set",
                    channel: option.channel,
                    playList: JSON.stringify(option.playList),
                    resetLcps: option.resetLcps == undefined ? true : !!option.resetLcps
                },
                success: option.success,
                failure: getFailureHandler("设置播放列表失败", option)
            });
        }
        this.SetPlayURLLoop = function (option) {
            Studio.SetPlayUrl({
                params: {
                    operate: "setLoop",
                    channel: option.channel,
                    loop: option.loop ? 1 : 0
                },
                success: option.success,
                failure: getFailureHandler("播放循环模式", option)
            });
        }
        this.LoadSceneWithInitLcps = function (option) {
            Scene.GetList({
                sceneGroupId: sceneGroupId,
                success: function (list) {
                    if (!list) return;
                    var config = lcpsConfigInfo;
                    var webPageNumMax = config ? config.webPageNumMax : 0;
                    var startIdx = option.start != undefined ? option.start : 0;
                    var endIdx = option.end != undefined ? option.end : (webPageNumMax - 1);
                    startIdx = startIdx < 0 ? 0 : (startIdx >= webPageNumMax ? (webPageNumMax - 1) : startIdx);
                    endIdx = endIdx < 0 ? 0 : (endIdx >= webPageNumMax ? (webPageNumMax - 1) : endIdx);
                    if (endIdx < startIdx) return;
                    var maxSceneNum = (endIdx - startIdx + 1) < list.length ? (endIdx - startIdx + 1) : list.length;
                    if (option.onGetSceneListSuccess) {
                        option.onGetSceneListSuccess(list);
                    }
                    for (var i = 0; i < maxSceneNum; ++i) {
                        try {
                            var item = list[i];
                            if (option.onInitSceneItem) {
                                option.onInitSceneItem(item);
                            }
                        } catch (e) {
                            warnLog("invalid scene", e);
                        }
                    }
                    if (option.disableWebPage) {
                        if (config.webPage.length > 0) {
                            Lcps.SetWebPageNum({
                                num: 0,
                                failure: getFailureHandler("设置场景数量失败", option)
                            });
                        }
                        if (option.onInitSceneCompleted) {
                            option.onInitSceneCompleted();
                        }
                        return;
                    }
                    function initLcpsWebPage() {
                        for (var i = 0; i < maxSceneNum; ++i) {
                            var sceneUrl = (list[i].url + "?sceneId=" + list[i].id + "&user=" + list[i].user);
                            var enable = false;
                            if ((startIdx + i) < webPages.length) {
                                var item = webPages[startIdx + i];
                                if (sceneUrl == item.url) {
                                    if (item.enable) {
                                        if (option.onSelectSceneItem) option.onSelectSceneItem(item);
                                        if (item.beforeVideo == (list[i].PosOfVideo == 2) && parseInt(item.zIndex) == list[i].sortVal) {
                                            continue;
                                        }
                                        enable = true;
                                    } else {
                                        continue;
                                    }
                                }
                            }
                            Lcps.SelectWebPage({
                                para: {
                                    "index": startIdx + i,
                                    "enable": enable,
                                    "beforeVideo": list[i].PosOfVideo == 2,
                                    "url": sceneUrl,
                                    "title": $("<div />").text(list[i].title).html(),
                                    "reload": false,
                                    "zIndex": list[i].sortVal + "",
                                    "$$hashKey": "object:240"
                                },
                                failure: getFailureHandler("设置场景失败", option)
                            });
                        }
                        if (option.onInitSceneCompleted) {
                            option.onInitSceneCompleted();
                        }
                    }
                    var webPages = config.webPage;
                    if (webPages.length < (startIdx + maxSceneNum)) {
                        Lcps.SetWebPageNum({
                            num: startIdx + maxSceneNum,
                            failure: getFailureHandler("设置场景数量失败", option),
                            success: function () {
                                initLcpsWebPage();
                            }
                        });
                    } else {
                        initLcpsWebPage();
                    }
                },
                failure: getFailureHandler("获取场景列表", option)
            });
        }
        this.expectLcps = function (option) {
            option = option ? option : {};
            var config = lcpsConfigInfo;
            self.onLcpsIniting = option.onLcpsIniting ? option.onLcpsIniting : self.onLcpsIniting;
            if (!isNaN(option.inputCount) && config.inputCount != option.inputCount) {
                studioApp.Lcps.SetInputCount({
                    count: 5,
                    success: function () {
                        if (self.onLcpsIniting) self.onLcpsIniting();
                    },
                    failure: getFailureHandler("设置导播台源个数失败", option)
                });
                return;
            }
            if (!isNaN(option.sceneWidth) && !isNaN(option.sceneHeight) && (config.sceneWidth != option.sceneWidth || config.sceneHeight != option.sceneHeight))
                studioApp.Lcps.SetSceneSize({
                    width: parseInt(option.sceneWidth), height: parseInt(option.sceneHeight),
                    success: function () {
                        config.sceneWidth = parseInt(option.sceneWidth);
                        config.sceneHeight = parseInt(option.sceneHeight);
                    },
                    failure: getFailureHandler("设置导播台场景大小失败", option)
                });
            if (option.success) option.success();
        }
    }
}
