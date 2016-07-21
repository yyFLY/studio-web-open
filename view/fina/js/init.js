var studioApp = new StudioApp({
    defStudioId: "3f2e16e9381982307bdfdd6a0a765e3a"
});
$(function () {
    studioApp.Init({
        onStudioLoad: function (info) {
            //合成视频
            studioApp.preVideoBox({ selector: "#idPgwVideo", volume: 100, height: 220, width: '100%' });
            //预览小视频
            studioApp.smallVideoBox({ selector: "#smallVideo0", channel: 0, volume: 0, height: 130, width: 180 });
            studioApp.smallVideoBox({ selector: "#smallVideo1", channel: 1, volume: 0, height: 130, width: 180 });
            studioApp.smallVideoBox({ selector: "#smallVideo2", channel: 2, volume: 0, height: 130, width: 180 });
            //信号
            studioApp.signalBox({ selector: "#signal0", channel: 0 });
            studioApp.signalBox({ selector: "#signal1", channel: 1 });
            studioApp.signalBox({ selector: "#signal2", channel: 2 });
            //进度条
            studioApp.progressBar({ selector: "#smallvideoProgress0", channel: 0 });
            studioApp.progressBar({ selector: "#smallvideoProgress1", channel: 1 });
            studioApp.progressBar({ selector: "#smallvideoProgress2", channel: 2 });
            //合成视频播放音量
            studioApp.localVoiceBar({ selector: "#pgwVolume", direction: "left2right" });
            //小视频播放音量
            studioApp.localVoiceBar({ selector: "#idsmallvideoVolume0", channel: 0, direction: "left2right" });
            studioApp.localVoiceBar({ selector: "#idsmallvideoVolume1", channel: 1, direction: "left2right" });
            studioApp.localVoiceBar({ selector: "#idsmallvideoVolume2", channel: 2, direction: "left2right" });
            //小视频发布音量
            studioApp.pubVoiceBar({ selector: "#idsmallvideoVolumeOutput0", channel: 0, direction: "left2right" });
            studioApp.pubVoiceBar({ selector: "#idsmallvideoVolumeOutput1", channel: 1, direction: "left2right" });
            studioApp.pubVoiceBar({ selector: "#idsmallvideoVolumeOutput2", channel: 2, direction: "left2right" });
            //二维码
            studioApp.qrcodeImage({ selector: '#downCode' });
            //版本
            studioApp.describeService({ selector: ".osInfoBox" });

            studioConfigInfo = info.studio.config;

            //初始化导播台配置
            studioApp.expectLcps({
                inputCount: 5,
                sceneWidth: 1280,
                sceneHeight: 720,
                success: function () { initAll(info); }
            });
        }
    });
});
function initAll(info) {
    initLcpsConfig();
    var para = [];
    for (var j = 0, k = 1; j < 5; j++) {
        para.push({});
        if (j == 3) {//背景
            para[j].z = 0;
        }
        else if (j == 0) {//抠像
            para[j].z = 3;
        }
        else {
            para[j].z = k++;
        }
    }
    for (var i = 0; i < studioApp.getLcpsConfigInfo().streamParaArray.length; ++i) {
        if (studioApp.getLcpsConfigInfo().streamParaArray[i].z != para[i].z) { //判断zindex顺序
            studioApp.Lcps.Switch({
                paraArray: para,
                failure: function (error) {
                    alert("设置导播台视频失败");
                }
            });
            break;
        }
    }
    $(document).ready(function () {
        loadSceneList();
        $('.switchScene').on('click', function () {//切换按钮的功能呢
            var index = $(this).index('.switchScene');
            if ($('.switchScene:eq(' + index + ')').hasClass('u-btn-primary')) {
                return;
            }

            $('.switchScene').addClass('u-btn-gray').removeClass('btn-primary');
            $(this).addClass('btn-primary').removeClass('u-btn-gray');

            stateMgr.changeState("model" + index);
        });

        var uploadPage = sharedDirPath + "upload.html?studioId=" + studioApp.getStudioId() + "&accessId=" + studioApp.getAccessId() + "&accessKey=" + studioApp.getAccessKey() + "&userId=" + studioApp.getUserId();
        $("#uploadForm").attr("src", uploadPage);
        $("#uploadForm").load(function () {
            try {
                var resp = $.parseJSON($('#uploadForm').contents().find("body").html());
                if (resp.location) {
                    var curIndex = 0; //当前选中的
                    //选中的不是桌子，就替换背景
                    if ($("input[name='replaceType']:checked").val() != "desk") {
                        curIndex = parseInt($('#temleteBackground').attr('data-channel'));//新的背景地址   
                    } else {
                        curIndex = parseInt($('#temleteDesk').attr('data-channel'));//新的桌子	                      
                    }
                    studioConfigInfo.models[curIndex] = resp.location;
                    if (curIndex % 2 == 0) {
                        var URL = templateUrl + '/background.html?image=' + studioConfigInfo.models[curIndex];
                    }
                    else {
                        var URL = templateUrl + '/desk.html?image=' + studioConfigInfo.models[curIndex];
                    }
                    stateMgr.setQuickSceneInfo({ channel: curIndex, objArray: [URL] });
                    setStudioConfigInfo(studioConfigInfo);
                } else {
                    alert("文件上传失败");
                }
            } catch (err) {
                if ($("#waitImg").css("display") != "none") {
                    errorLog("upload response", err);
                    alert("文件上传失败");
                }
            }
            if ($("#waitImg").css("display") != "none") {
                $("#uploadForm").attr("src", uploadPage);
                $("#waitImg").hide();
            }
        });
        $("#diyTempleteFrame").attr("src", sharedDirPath + "templete.html?studioId=" + studioApp.getStudioId() + "&accessId=" + studioApp.getAccessId() + "&accessKey=" + studioApp.getAccessKey() + "&userId=" + studioApp.getUserId() + "&timestamp=" + new Date().getTime()).
            load(function () {
                var setTempleteInfo = $('#diyTempleteFrame')[0].contentWindow.setTempleteInfo;
            });
    });
}
function fileUploadStart() {
    $("#waitImg").show();
}