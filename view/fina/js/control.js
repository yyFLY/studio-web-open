function loadSceneList() {
    studioApp.LoadSceneWithInitLcps({
        onGetSceneListSuccess: function (list) {
            SceneList = list;
        },
        onInitSceneItem: function (item) {
            var html =
                '<div class="col-lg-3">\
                    <div class="thumbnail">\
                    <img src="' + (item.coverUrl ? item.coverUrl : "./images/scenes/default.png") + '" />\
                    <div class="caption">\
                    <p><label class="checkbox-inline" data-title="' + item.title + '">\
                        <input type="checkbox" name="scenesItem" scene="' + (item.url + "?sceneId=" + item.id + "&user=" + item.user) + '" sortVal="'
                + item.sortVal + '" PosOfVideo="' + item.PosOfVideo + '" onclick="selectScene(this)" />\
                    '+ item.title + '</label>\
                    <span class="text-primary f-btn1"><a href="' + (item.MgrUrl + "?sceneId=" + item.id + "&user=" + item.user) + '" target="_blank">设置</a></span>\
                    </p>\
                    </div>\
                    </div>\
                </div>';
            $(".sceneList").append(html);
        },
        onSelectSceneItem: function (item) {
            $(".sceneList div div div p input[scene='" + item.url + "']").attr("checked", "checked");
        },
        onInitSceneCompleted: function () {
        }
    });
}
function selectScene(self) {
    var boxArray = document.getElementsByName('scenesItem');
    var Scenenum = 0;
    for (var i = 0; i < boxArray.length; i++) {
        if (boxArray[i].checked) {
            Scenenum++;
        }
    }
    var maxNum = studioApp.getLcpsConfigInfo() ? studioApp.getLcpsConfigInfo().webPageNumMax : 0;
    if (Scenenum > (maxNum / 2)) {
        alert('只能选择' + (maxNum / 2) + '个场景元素');
        $(self).attr('checked', false);
        return false;
    }
    var index = $(self).parent().parent().parent().parent().parent().index();
    var webPageInfo = {
        "index": index,
        "zIndex": $(self).attr("sortVal"),
        "enable": self.checked,
        "beforeVideo": parseInt($(self).attr("PosOfVideo")) == 2,
        "url": $(self).attr("scene"),
        "coverUrl": SceneList[index].coverUrl,
        "mgrUrl": SceneList[index].mgrUrl,
        "title": $(self).parent().attr("data-title"),
        "reload": false,
        "$$hashKey": "object:240"
    };
    studioApp.Lcps.SelectWebPage({
        para: webPageInfo,
        failure: function (error) {
            alert("设置场景失败");
        }
    });
}
function initLcpsConfig() {
    if (studioConfigInfo.models == undefined || studioConfigInfo.models.length < 5) {
        studioConfigInfo.models = [];
        for (var i = 0; i < 5; ++i) {
            studioConfigInfo.models.push({});
            if (i < 3) { continue; }
            studioConfigInfo.models[i] = initModelURL[i];
        }
        setStudioConfigInfo(studioConfigInfo);
    }
    for (var i = 3; i < 5; ++i) {
        if (i % 2 == 0) {
            ScenneModelURL[i] = templateUrl + '/background.html?image=' + studioConfigInfo.models[i];
        }
        else {
            ScenneModelURL[i] = templateUrl + '/desk.html?image=' + studioConfigInfo.models[i];
        }
    }//处理模板图片地址
    if (studioApp.getLcpsConfigInfo().sourceArray[0].playURL == '0.flv') {
        var postData = studioApp.getLcpsConfigInfo().pgwArray[0];
        postData.formatIndex = 0;
        postData.videoCBR = false;
        postData.videoBitrate = '400k';
        postData.videoSize != '1280x720';
        studioApp.Lcps.ChangeOutput({
            params: postData,
            success: function () {
                studioApp.getLcpsConfigInfo().pgwArray[0] = postData;
            },
            failure: function (error) {
                alert("设置输出流失败");
            }
        });
        var config = studioApp.getLcpsConfigInfo();
        var inputItem = config.sourceArray[0];
        studioApp.Lcps.ChangeInput({
            params: {
                playURL: 'kx.mp4',
                inputType: "拉流",
                channel: 0,
                enableChromaKey: true,
                maxBufferTime: 0
            },
            failure: function () {
                alert("设置导播台源失败");
            }
        });
        inputItem.playURL = 'kx.mp4';
        inputItem.inputType = '拉流';
        inputItem.enableChromaKey = true;
        inputItem.maxBufferTime = 0;

        var inputItem = config.sourceArray[1];
        studioApp.Lcps.ChangeInput({
            params: {
                playURL: '3.flv',
                inputType: "拉流",
                channel: 1,
                enableChromaKey: false,
                maxBufferTime: 0
            },
            failure: function () {
                alert("设置导播台源失败");
            }
        });
        inputItem.playURL = '3.flv';
        inputItem.inputType = '拉流';
        inputItem.enableChromaKey = false;
        inputItem.maxBufferTime = 0;

        stateMgr.changeState("model0");
    }
    else {
        var streamParaArray = studioApp.getLcpsConfigInfo().streamParaArray;
        var model = -1;
        if (streamParaArray[4] && streamParaArray[4].x == 0 && streamParaArray[4].y == 0) {
            model = 0;
        }
        else if (streamParaArray[1] && streamParaArray[1].x == 0 && streamParaArray[1].y == 0) {
            model = 1;
        }
        else if (streamParaArray[2] && streamParaArray[2].x == 0 && streamParaArray[2].y == 0) {
            model = 2;
        }
        $('.switchScene').addClass('u-btn-gray').removeClass('btn-primary');
        $('.switchScene:eq(' + model + ')').addClass('btn-primary').removeClass('u-btn-gray');
    }
    stateMgr.initStateFromLcps();
}

function StateManager() {
    var currState = 'model1';
    var states = {
        model0: function (state) {
            var para = [];
            for (var i = 0; i < 5; ++i) {
                para.push({});
                if (i == 0 || i == 1 || i == 3 || i == 4) {
                    continue;
                }
                para[i].x = studioApp.getLcpsConfigInfo().sceneWidth;
                para[i].y = studioApp.getLcpsConfigInfo().sceneHeight;
                para[i].v = 0;
            }
            para[4].x = 0;
            para[4].y = 0;
            para[4].w = studioApp.getLcpsConfigInfo().sceneWidth;
            para[4].h = studioApp.getLcpsConfigInfo().sceneHeight;
            para[4].v = 0;//桌子

            para[3].x = 0;
            para[3].y = 0;
            para[3].w = studioApp.getLcpsConfigInfo().sceneWidth;
            para[3].h = studioApp.getLcpsConfigInfo().sceneHeight;
            para[3].v = 0; //背景

            para[1].x = studioApp.getLcpsConfigInfo().sceneWidth * 906 / 1280;
            para[1].y = studioApp.getLcpsConfigInfo().sceneHeight * 176 / 720;
            para[1].w = studioApp.getLcpsConfigInfo().sceneWidth * 320 / 1280;
            para[1].h = studioApp.getLcpsConfigInfo().sceneHeight * 180 / 720;
            para[1].v = 0;//小视频

            para[0].x = studioApp.getLcpsConfigInfo().sceneWidth / 1280 * 140;
            para[0].y = studioApp.getLcpsConfigInfo().sceneHeight / 720 * 42;
            para[0].w = studioApp.getLcpsConfigInfo().sceneWidth / 1280 * 969;
            para[0].h = studioApp.getLcpsConfigInfo().sceneHeight / 720 * 540;
            para[0].v = 100;//抠像
            lcpsSwitch(para);
            currState = 'model0'; //切换状态

            for (var i = 0; i < 5; i++) {
                var volume = 0;
                if (i == 0) { volume = 100; }
                studioApp.updatePubVoiceBar({ channel: i, volume: volume, noChangeLcps: true });
            }
        },
        model1: function (state) {
            var para = [];
            for (var i = 0; i < 5; ++i) {
                para.push({});
                if (i == 1) {
                    continue;
                }
                para[i].x = studioApp.getLcpsConfigInfo().sceneWidth;
                para[i].y = studioApp.getLcpsConfigInfo().sceneHeight;
                para[i].v = 0;
            }
            para[1].x = 0;
            para[1].y = 0;
            para[1].w = studioApp.getLcpsConfigInfo().sceneWidth;
            para[1].h = studioApp.getLcpsConfigInfo().sceneHeight;
            para[1].v = 0;//小视频

            para[0].v = 100;
            lcpsSwitch(para);
            currState = 'model1'; //切换状态

            for (var i = 0; i < 5; i++) {
                var volume = 0;
                if (i == 0) { volume = 100; }
                studioApp.updatePubVoiceBar({ channel: i, volume: volume, noChangeLcps: true });
            }
        },
        model2: function (state) {
            var para = [];
            for (var i = 0; i < 5; ++i) {
                para.push({});
                if (i == 2) {
                    continue;
                }
                para[i].x = studioApp.getLcpsConfigInfo().sceneWidth;
                para[i].y = studioApp.getLcpsConfigInfo().sceneHeight;
                para[i].v = 0;
            }
            para[2].x = 0;
            para[2].y = 0;
            para[2].w = studioApp.getLcpsConfigInfo().sceneWidth;
            para[2].h = studioApp.getLcpsConfigInfo().sceneHeight;
            para[2].v = 100;//广告

            lcpsSwitch(para);
            currState = 'model1'; //切换状态

            for (var i = 0; i < 5; i++) {
                var volume = 0;
                if (i == 2) { volume = 100; }
                studioApp.updatePubVoiceBar({ channel: i, volume: volume, noChangeLcps: true });
            }
        }
    }
    var changeState = function (state) {
        states[state] && states[state]();
    }
    var initStateFromLcps = function () {
        for (var i = 3; i < 5; i++) {
            var url = ScenneModelURL[i];
            if (studioApp.getLcpsConfigInfo().sourceArray[i].inputType != '页面' ||
                studioApp.getLcpsConfigInfo().sourceArray[i].webPageUrlArray.length < 1 ||
                studioApp.getLcpsConfigInfo().sourceArray[i].webPageUrlArray[0] != url) {
                var option = { channel: i, objArray: [] };
                option.objArray.push(url);
                setQuickSceneInfo(option);
            }
        }
    }
    var setQuickSceneInfo = function (option) {
        var postData = {
            channel: option.channel,
            videoRecord: false,
            enableChromaKey: false,
            inputType: '页面',
            publishKey: '',
            playURL: ''
        }
        postData.webPageUrlArray = option.objArray;
        studioApp.Lcps.ChangeInput({
            params: postData,
            failure: function (error) {
                alert("设置失败");
            },
            success: function () {
            }
        }, "setQuickSceneInfo");
    }
    function lcpsSwitch(paraArray) {
        if (!paraArray) return;
        studioApp.Lcps.Switch({
            paraArray: paraArray,
            failure: function (error) {
                alert("设置导播台视频失败");
            }
        });
    }
    return {
        changeState: changeState,
        initStateFromLcps: initStateFromLcps,
        setQuickSceneInfo: setQuickSceneInfo
    }
}
var stateMgr = new StateManager();
//保存StudioConfigInfo
function setStudioConfigInfo(data) {
    studioApp.SetStudioConfig({
        config: data
    });
}