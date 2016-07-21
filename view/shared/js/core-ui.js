/** 动态加载的资源 **/
var sharedDirPath = "../shared/";
DynamicLoading.css(sharedDirPath + "css/core-ui.css");
DynamicLoading.js(sharedDirPath + "js/ui/jquery.reveal.js");
DynamicLoading.js(sharedDirPath + "js/player/swfobject.js");
/** 界面插件定义 **/
$.fn.sliderBar = function (option) {
    var container = $(this);
    var direction = "bottom2top";
    switch(option.direction) {
        case "left2right": direction = "left2right"; break;
    }
    var slider = {
        value: option.value != undefined ? option.value : 50,
        maxValue: option.maxValue ? ption.maxValue : 100,
        step: option.step ? option.step : 1,
        container: container,
        valueChanged: option.valueChanged,
        mouseup: option.mouseup,
        direction: direction,
        Initialize: function () {
            var obj = container.html("").addClass("slider_" + slider.direction).append('<div class="slider_Back"></div><div class="slider_Track"></div><div class="slider_Thumb" ' + (option.hideThumb ? ('style="background-color:rgba(0,0,0,0);filter:alpha(opacity=0);-moz-opacity:0;opacity:0;"') : "") + '></div>');
            this.Update(this.value);
            obj.children(".slider_Track,.slider_Back").click(function (event) {
                if (slider.direction == "left2right") {
                    if (option.hideThumb) {
                        var maxMargin = obj.width();
                        var currentValue = (event.pageX - obj.offset().left) / maxMargin * slider.maxValue;
                        slider.Update(currentValue);
                    } else {
                        var centerOffset = obj.children(".slider_Thumb").width() / 2;
                        var maxMargin = obj.width() - obj.children(".slider_Thumb").width();
                        var currentValue = (event.pageX - obj.offset().left - centerOffset) / maxMargin * slider.maxValue;
                        slider.Update(currentValue);
                    }
                } else {
                    if (option.hideThumb) {
                        var maxMargin = obj.height();
                        var currentValue = (obj.offset().top + obj.height() - event.pageY) / maxMargin * slider.maxValue;
                        slider.Update(currentValue);
                    } else {
                        var centerOffset = obj.children(".slider_Thumb").height() / 2;
                        var maxMargin = obj.height() - obj.children(".slider_Thumb").height();
                        var currentValue = (obj.offset().top + obj.height() - event.pageY - centerOffset) / maxMargin * slider.maxValue;
                        slider.Update(currentValue);
                    }
                }
                if (slider.mouseup) {
                    slider.mouseup(slider);
                }
            });
            this.Value();
        },
        Value: function () {
            var valite = false;
            var currentValue = (container.height() - container.children(".slider_Thumb").height()) * (1 - this.value / this.maxValue);
            var obj = container;
            obj.children(".slider_Thumb").mousedown(function () {
                if (document.selection) {
                    document.selection.empty();
                } else if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                }
                valite = true;
                var obj = container;
                if (slider.direction == "left2right") {
                    $(document.body).mousemove(function (event) {
                        if (valite == false) return;
                        if (document.selection) {
                            document.selection.empty();
                        } else if (window.getSelection) {
                            window.getSelection().removeAllRanges();
                        }
                        if (option.hideThumb) {
                            var maxMargin = obj.width();
                            var currentValue = (event.pageX - obj.offset().left) / maxMargin * slider.maxValue;
                            slider.Update(currentValue);
                        } else {
                            var centerOffset = obj.children(".slider_Thumb").width() / 2;
                            var maxMargin = obj.width() - obj.children(".slider_Thumb").height();
                            var currentValue = (event.pageX - obj.offset().left - centerOffset) / maxMargin * slider.maxValue;
                            slider.Update(currentValue);
                        }
                    });
                } else {
                    $(document.body).mousemove(function (event) {
                        if (valite == false) return;
                        if (document.selection) {
                            document.selection.empty();
                        } else if (window.getSelection) {
                            window.getSelection().removeAllRanges();
                        }
                        if (option.hideThumb) {
                            var maxMargin = obj.height();
                            var currentValue = (obj.offset().top + obj.height() - event.pageY) / maxMargin * slider.maxValue;
                            slider.Update(currentValue);
                        } else {
                            var centerOffset = obj.children(".slider_Thumb").height() / 2;
                            var maxMargin = obj.height() - obj.children(".slider_Thumb").height();
                            var currentValue = (obj.offset().top + obj.height() - event.pageY - centerOffset) / maxMargin * slider.maxValue;
                            slider.Update(currentValue);
                        }
                    });
                }
            });
            $(document.body).mouseup(function () {
                if (!valite) return;
                valite = false;
                if (slider.mouseup) {
                    slider.mouseup(slider);
                }
            });
        },
        Update: function (value) {
            var obj = container;
            this.value = value;
            this.value = this.value > this.maxValue ? this.maxValue : this.value;
            this.value = this.value < 0 ? 0 : this.value;
            if (slider.direction == "left2right") {
                if (option.hideThumb) {
                    var centerOffset = obj.children(".slider_Thumb").width() / 2;
                    var maxWidth = obj.width();
                    var currentValue = maxWidth * this.value / this.maxValue;
                    obj.children(".slider_Thumb").css({ "margin-left": currentValue - centerOffset });
                    obj.children(".slider_Track").css({ "width": currentValue });
                } else {
                    var centerOffset = obj.children(".slider_Thumb").width() / 2;
                    var maxWidth = obj.width() - obj.children(".slider_Thumb").width();
                    var currentValue = maxWidth * this.value / this.maxValue;
                    obj.children(".slider_Thumb").css({ "margin-left": currentValue });
                    //obj.children(".slider_Back").css({ "margin-left": currentValue + centerOffset, "width": maxWidth - currentValue + centerOffset });
                    obj.children(".slider_Track").css({ "width": currentValue + centerOffset });
                }
            } else {
                if (option.hideThumb) {
                    var centerOffset = obj.children(".slider_Thumb").height() / 2;
                    var maxHeight = obj.height();
                    var currentValue = maxHeight * (1 - this.value / this.maxValue);
                    obj.children(".slider_Thumb").css({ "margin-top": currentValue - centerOffset });
                    obj.children(".slider_Track").css({ "margin-top": currentValue, "height": maxHeight - currentValue });
                } else {
                    var centerOffset = obj.children(".slider_Thumb").height() / 2;
                    var maxHeight = obj.height() - obj.children(".slider_Thumb").height();
                    var currentValue = maxHeight * (1 - this.value / this.maxValue);
                    obj.children(".slider_Thumb").css({ "margin-top": currentValue });
                    //obj.children(".slider_Back").css({ "height": currentValue + centerOffset });
                    obj.children(".slider_Track").css({ "margin-top": currentValue + centerOffset, "height": maxHeight - currentValue + centerOffset });
                }
            }
            if (slider.valueChanged) {
                slider.valueChanged(slider);
            }
        }
    }
    slider.Initialize();
    return slider;
}
/** 演播室扩展 **/
//通用工具函数
StudioApp.prototype.globalData = {};
StudioApp.prototype.setData = function (option) {
    if (option.append && this.globalData[option.key] && typeof this.globalData[option.key] == "object") {
        for(var item  in option.data) {
            this.globalData[option.key][item] = option.data[item];
        }
    } else {
        this.globalData[option.key] = option.data;
    }
}
StudioApp.prototype.getData = function (option) {
    return this.globalData[option.key];
}
StudioApp.prototype.showDlg = function (dlgId, option) {
    option = option ? option : {};
    option.revealId = dlgId;
    $('#' + dlgId).reveal( option );
}
function studioApp_CreateArrayInputItem(domElem, maxNum) {
    var inputArray = $(".reveal-arrayInputList input", domElem);
    if (maxNum != undefined && inputArray.length >= maxNum) {
        return;
    }
    var html = '<div class="reveal-inputBtnRow">\
                        <div class="reveal-inputBtn_wrap1">\
                            <div class="reveal-inputBtn_wrap2">\
                                <input type="text" />\
                            </div>\
                        </div>\
                        <a class="reveal-btn">删除</a>\
                    </div>';
    var item = $(html);
    item.children(".reveal-btn").click(function () {
        var inputArray = $(".reveal-arrayInputList input", domElem);
        if (inputArray.length <= 1) return;
        if (inputArray.length <= 2) {
            $(this).parent().siblings().children(".reveal-btn").addClass("reveal-disableBtn");
        }
        $(this).parent().remove();
    });
    $(".reveal-arrayInputList", domElem).append(item);
    if ($(".reveal-arrayInputList input", domElem).length <= 1) {
        $(".reveal-arrayInputList .reveal-btn", domElem).addClass("reveal-disableBtn");
    } else {
        $(".reveal-arrayInputList .reveal-btn", domElem).removeClass("reveal-disableBtn");
    }
    return item;
}
function studioApp_InitArrayInputUI(domElem, maxNum) {
    $(".reveal-arrIptAddBtn", domElem).click(function () {
        studioApp_CreateArrayInputItem(domElem, maxNum);
    });
}
function studioApp_InitArrayInputData(domElem, list) {
    $(".reveal-arrayInputList", domElem).html("");
    if (typeof list == "string") {
        $("input", studioApp_CreateArrayInputItem(domElem)[0]).val(list);
    } else {
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; ++i) {
                $("input", studioApp_CreateArrayInputItem(domElem)[0]).val(list[i]);
            }
        } else {
            studioApp_CreateArrayInputItem(domElem);
        }
    }
}
//设置输出流对话框
StudioApp.prototype.showSetOutputDlg = function (option) {
    var self = this;
    var dlgId = "studio_showSetOutputDlg";
    function updateUI() {
        var domElem = $("#" + dlgId)[0];
        var config = self.getLcpsConfigInfo();
        if (config.pgwArray.length <= 0) return;
        var outItem = config.pgwArray[0];
        $(".stuData-enableOutput", domElem)[0].checked = !!outItem.enable;
        studioApp_InitArrayInputData(domElem, outItem.publishURL);
        $(".stuData-outputVideoSize", domElem).val(outItem.videoSize);
        $(".stuData-outputVideoBit", domElem).val(outItem.videoBitrate);
        $(".stuData-outputVideoCBR", domElem)[0].checked = !!outItem.videoCBR;
        $(".stuData-outputAudioBit", domElem).val(outItem.audioBitrate);
    }
    if ($("#" + dlgId).length <= 0) {
        var html = 
        '<div id="' + dlgId + '" class="reveal-modal">\
            <a class="close-reveal-modal">&#215;</a>\
            <h1 class="reveal_h1">设置输出流</h1>\
            <div class="reveal-rowItem reveal-checkBox">\
                <input type="checkbox" class="stuData-enableOutput" />\
                <span>是否启用</span>\
            </div>\
            <div class="reveal-rowItem">\
                <div class="reveal-inputLabel">发布URL / 发布URL列表: ( 如: rtmp://127.0.0.1/3001/0_pgw )</div>\
                <div class="reveal-arrayInputList"></div>\
                <div class="reveal-inputBtnRow">\
                    <a class="reveal-btn reveal-arrIptAddBtn">增加</a>\
                </div>\
            </div>\
            <div class="reveal-rowItem">\
                <div class="reveal-inputLabel">视频大小( 如. 320x240 / 320x? / ?x240 后2种格式为等比例缩放 ):</div>\
                <input type="text" class="stuData-outputVideoSize" />\
            </div>\
            <div class="reveal-rowItem">\
                <div class="reveal-inputLabel">视频码率( 如. 1500k ):</div>\
                <input type="text" class="stuData-outputVideoBit" />\
            </div>\
            <div class="reveal-rowItem reveal-checkBox">\
                <input type="checkbox" class="stuData-outputVideoCBR" />\
                <span>视频固定码率CBR</span>\
            </div>\
            <div class="reveal-rowItem">\
                <div class="reveal-inputLabel">音频码率( 如. 128k ):</div>\
                <input type="text" class="stuData-outputAudioBit" />\
            </div>\
            <div class="reveal-bottomBar">\
                <div class="reveal-btns">\
                    <a class="reveal-close" onclick="$(this).parent().parent().parent().children(\'.close-reveal-modal\').click()">关闭</a>\
                    <a class="reveal-open">提交</a>\
                </div>\
            </div>\
        </div>';
        var elem = $(html);
        $(document.body).append(elem);
        var domElem = elem[0];
        studioApp_InitArrayInputUI(domElem, 5);
        $(".reveal-open", domElem).click(function () {
            var addrInputs = $(".reveal-arrayInputList input",domElem);
            var publishURL = [];
            for (var i = 0; i < addrInputs.length; ++i) {
                if ($(addrInputs[i]).val()) {
                    publishURL.push($(addrInputs[i]).val());
                }
            }
            var postData = {
                "formatIndex": 0,
                "enable": !!$(".stuData-enableOutput", domElem)[0].checked,
                "publishURL": publishURL,
                "playURL": "",
                "videoSize": $(".stuData-outputVideoSize", domElem).val(),
                "videoBitrate": $(".stuData-outputVideoBit", domElem).val(),
                "videoCBR": !!$(".stuData-outputVideoCBR", domElem)[0].checked,
                "audioBitrate": $(".stuData-outputAudioBit", domElem).val()
            };
            self.Lcps.ChangeOutput({
                params: postData,
                success: function () {
                    self.getLcpsConfigInfo().pgwArray[0] = postData;
                },
                failure: function (error) {
                    alert("设置输出流失败");
                }
            });
            $(".close-reveal-modal", domElem).click();
        });
        updateUI();
    }
    option = option ? option : {};
    var domElem = $("#" + dlgId)[0];
    function fixedValue() {
        if (option.enableOutput) {
            $('.stuData-enableOutput', domElem).parent().hide();
            $('.stuData-enableOutput', domElem)[0].checked = !!option.enableOutput;
        } else {
            $('.stuData-enableOutput', domElem).parent().show();
        }
        if (option.videoSize) {
            $('.stuData-outputVideoSize', domElem).val(option.videoSize).parent().hide();
        } else {
            $('.stuData-outputVideoSize', domElem).parent().show();
        }
        if (option.videoBit) {
            $('.stuData-outputVideoBit', domElem).val(option.videoBit).parent().hide();
        } else {
            $('.stuData-outputVideoBit', domElem).parent().show();
        }
        if (option.videoCBR) {
            $('.stuData-outputVideoCBR', domElem).parent().hide();
            $('.stuData-outputVideoCBR', domElem)[0].checked = !!option.videoCBR;
        } else {
            $('.stuData-outputVideoCBR', domElem).parent().show();
        }
        if (option.audioBit) {
            $('.stuData-outputAudioBit', domElem).val(option.audioBit).parent().hide();
        } else {
            $('.stuData-outputAudioBit', domElem).parent().show();
        }
    }
    if (option.reload) {
        self.getLcpsConfigInfo({
            reload: true,
            success: function () {
                updateUI();
                fixedValue();
                self.showDlg(dlgId);
            }
        });
        return;
    }
    fixedValue();
    this.showDlg(dlgId);
}
//设置节目输出延时
StudioApp.prototype.showSetPgmDelayTimeDlg = function (option) {
    var self = this;
    var dlgId = "studio_showSetPgmDelayTimeDlg";
    if ($("#" + dlgId).length <= 0) {
        var html =
            '<div id="' + dlgId + '" class="reveal-modal">\
                <a class="close-reveal-modal">&#215;</a>\
                <h1 class="reveal_h1">设置节目输出延时</h1>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputTips">说明：此功能的作用是将最终广播出去的节目缓冲延时输出，以便应对直播突发状况。\
                        当启用此功能时，紧急切换后，会清空所有的缓冲数据，并切换第一个输入源作为备用源输出。\
                        因此建议您将第一个输入源设置为拉流模式点播源宣传片。 \
                    </div>\
                </div>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputLabel">延时输出时间，单位秒，范围 0-30，0表示不启用延时输出:</div>\
                    <input type="text" id="stuData-pgmDelayTime" />\
                </div>\
                <div class="reveal-bottomBar">\
                    <div class="reveal-btns">\
                        <a class="reveal-close" onclick="$(this).parent().parent().parent().children(\'.close-reveal-modal\').click()">关闭</a>\
                        <a class="reveal-open">提交</a>\
                    </div>\
                </div>\
            </div>';
        var elem = $(html);
        var domElem = elem[0];
        $(document.body).append(elem);
        $(".reveal-open", domElem).click(function () {
            var pgmDelayTime = $("#stuData-pgmDelayTime", domElem).val();
            var postData = {
                time: pgmDelayTime,
            };
            self.Lcps.SetPgmDelayTime({
                params: postData,
                failure: function (error) {
                    alert("设置输出延迟失败");
                },
                success: function () {
                    self.getLcpsConfigInfo().pgmDelayTime = pgmDelayTime;
                }
            }, "SetPgmDelayTime");
            $(".close-reveal-modal", domElem).click();
        });
        var config = self.getLcpsConfigInfo();
        var _pgmDelayTime = config.pgmDelayTime ? config.pgmDelayTime : 0;
        $("#stuData-pgmDelayTime", domElem).val(_pgmDelayTime);
    }
    option = option ? option : {};
    var domElem = $("#" + dlgId)[0];
    if (option.pgmDelayTime) {
        $('#stuData-pgmDelayTime', domElem).val(option.pgmDelayTime).parent().hide();
    } else {
        $('#stuData-pgmDelayTime', domElem).parent().show();
    }
    this.showDlg(dlgId);
}
StudioApp.prototype.showSetInputDlg = function (option) {
    var self = this;
    var channel = option.channel != undefined ? option.channel : 0;
    var dlgId = "studio_showSetInputDlg_" + channel;
    function updateUI() {
        var domElem = $("#" + dlgId)[0];
        var config = self.getLcpsConfigInfo();
        if (channel >= config.sourceArray.length) return;
        var inputItem = config.sourceArray[channel];
        $(".studio-inputType", domElem).val(inputItem.inputType).change();
        studioApp_InitArrayInputData($(".studio-inputType-laliu", domElem)[0], inputItem.playURL);
        $(".stuData-inputEnableChromaKey", domElem)[0].checked = !!inputItem.enableChromaKey;
        $(".stuData-inputMaxBufTime", domElem).val(inputItem.maxBufferTime);
        $(".stuData-inputVideoRecord", domElem)[0].checked = !!inputItem.videoRecord;
        $(".stuData-inputPublishKey", domElem).val(inputItem.publishKey != undefined ? inputItem.publishKey : "");
        $(".stuData-inputWisId", domElem).val(inputItem.wisId != undefined ? inputItem.wisId : "");
        $(".stuData-inputUserId", domElem).val(inputItem.userId != undefined ? inputItem.userId : "");
        studioApp_InitArrayInputData($(".studio-inputType-yemian", domElem)[0], inputItem.webPageUrlArray);
    }
    if ($("#" + dlgId).length <= 0) {
        var html =
        '<div id="' + dlgId + '" class="studio_showSetInputDlg reveal-modal">\
            <a class="close-reveal-modal">&#215;</a>\
            <h1 class="reveal_h1">设置输入流-通道' + channel + '</h1>\
            <div class="reveal-rowItem">\
                <div class="reveal-inputLabel">输入源类型:</div>\
                <select class="studio-inputType">\
                    <option value="拉流">拉流</option>\
                    <option value="推流">推流</option>\
                    <option value="直接发布">直接发布</option>\
                    <option value="白板">白板</option>\
                    <option value="页面">页面</option>\
                </select>\
            </div>\
            <div class="studio-inputType-box">\
                <div class="studio-inputType-laliu">\
                    <div class="reveal-rowItem">\
                        <div class="reveal-inputLabel">拉流URL / 拉流URL列表: (举例 rtmp://*/live/stream,http://*/vod.flv,rtsp://*/live/stream)</div>\
                        <div class="reveal-arrayInputList"></div>\
                        <div class="reveal-inputBtnRow">\
                            <a class="reveal-btn reveal-arrIptAddBtn">增加</a>\
                        </div>\
                    </div>\
                </div>\
                <div class="studio-inputType-tuiliu">\
                    <div class="reveal-rowItem">\
                        <div class="reveal-inputLabel">推流 URL: (您可以直接往这个地址进行发布)</div>\
                        <input type="text" class="reveal-readonlyInput" readonly="readonly" value="' + self.getRtmpAddr() + '/' + self.getPubApp() + '/' + self.getPubStream(channel) + '" />\
                    </div>\
                    <div class="reveal-rowItem">\
                        <div class="reveal-inputLabel">推流密码：</div>\
                        <input type="text" class="stuData-inputPublishKey" />\
                    </div>\
                    <div class="reveal-rowItem reveal-checkBox">\
                        <input type="checkbox" class="stuData-inputVideoRecord" />\
                        <span>推流视频自动录制到MSS</span>\
                        <div class="reveal-inputTips">提醒：自动存储的视频会产生存储费用。</div>\
                    </div>\
                </div>\
                <div class="studio-inputType-zjfb">\
                    <div class="reveal-rowItem CheckFlashSecurityUntilAllowedRow" style="display:none;">\
                        <span>请点击下面对话框中的“允许”并“记住”，点击“关闭”按钮，然后点击“完成设置按钮”</span><br/>\
                        <iframe  class="CheckFlashSecurityUntilAllowed" scrolling="no" frameborder="0" width="214px" height="137px" style="display:none;" ></iframe>\
                    </div>\
                    <div class="reveal-rowItem">\
                        <div class="reveal-inputLabel">摄像头:</div>\
                        <select class="studio-inputPubCam">\
                            <option value="0"></option>\
                        </select>\
                    </div>\
                    <div class="reveal-rowItem">\
                        <div class="reveal-inputLabel">麦克风:</div>\
                        <select class="studio-inputPubMic">\
                            <option value="0"></option>\
                        </select>\
                    </div>\
                </div>\
                <div class="studio-inputType-baiban">\
                    <div class="reveal-rowItem">\
                        <div class="reveal-inputLabel">白板id(wisId)：</div>\
                        <input type="text" class="stuData-inputWisId" />\
                    </div>\
                    <div class="reveal-rowItem">\
                        <div class="reveal-inputLabel">奥点云帐号数字id(userId)：</div>\
                        <input type="text" class="stuData-inputUserId" />\
                    </div>\
                    <div class="reveal-rowItem reveal-checkBox">\
                        <div class="reveal-inputTips">提醒：初次使用白板启动可能会比较慢，请您耐心等待。</div>\
                    </div>\
                </div>\
                <div class="studio-inputType-yemian">\
                     <div class="reveal-rowItem">\
                        <div class="reveal-inputLabel">页面链接地址，如http://www.site.com/index.html</div>\
                        <div class="reveal-arrayInputList"></div>\
                        <div class="reveal-inputBtnRow">\
                            <a class="reveal-btn reveal-arrIptAddBtn">增加</a>\
                        </div>\
                    </div>\
                    <div class="reveal-rowItem reveal-checkBox">\
                        <div class="reveal-inputTips">提醒：初次使用页面可能会比较慢，请您耐心等待。</div>\
                    </div>\
                </div>\
            </div>\
            <div class="studio-setInput-common">\
                <div class="reveal-rowItem reveal-checkBox">\
                    <input type="checkbox" class="stuData-inputEnableChromaKey" />\
                    <span>启用抠像（提醒：只支持一路）</span>\
                </div>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputLabel">最大缓冲时间:(单位：秒。范围：大于0，小于等于10。说明：值越小，延时越小；值越大，越流畅)</div>\
                    <input type="text" class="stuData-inputMaxBufTime" />\
                </div>\
            </div>\
            <div class="reveal-bottomBar">\
                <div class="reveal-btns">\
                    <a class="reveal-close" onclick="$(this).parent().parent().parent().children(\'.close-reveal-modal\').click()">关闭</a>\
                    <a class="reveal-open">提交</a>\
                </div>\
            </div>\
        </div>';
        var elem = $(html);
        $(document.body).append(elem);
        var domElem = elem[0];
        if(window.studioApp_onSecurityUntilAllowed_ok) {
            studioApp_onSecurityUntilAllowed(window.studio_inputPubCamArray, window.studio_inputPubMicArray);
        }
        studioApp_InitArrayInputUI($(".studio-inputType-laliu", domElem)[0], 20);
        studioApp_InitArrayInputUI($(".studio-inputType-yemian", domElem)[0], 20);
        $(".studio-inputType", domElem).change(function () {
            if ($(this).val() == "拉流") {
                $(".studio-inputType-laliu", domElem).show().siblings().hide();
                $(".studio-setInput-common", domElem).show();
            } else if ($(this).val() == "推流") {
                $(".studio-inputType-tuiliu", domElem).show().siblings().hide();
                $(".studio-setInput-common", domElem).show();
            } else if ($(this).val() == "直接发布") {
                if (!$(".CheckFlashSecurityUntilAllowed", domElem).attr("src") && !window.studioApp_onSecurityUntilAllowed_ok) {
                    $(".CheckFlashSecurityUntilAllowed", domElem).attr("src", sharedDirPath + "js/CheckFlashSecurity/CheckFlashSecurityUntilAllowed.html?callback=studioApp_onSecurityUntilAllowed");
                    $('.CheckFlashSecurityUntilAllowed', domElem).show();
                    $('.CheckFlashSecurityUntilAllowedRow', domElem).show();
                }
                $(".studio-inputType-zjfb", domElem).show().siblings().hide();
                $(".studio-setInput-common", domElem).show();
            } else if ($(this).val() == "白板") {
                $(".studio-inputType-baiban", domElem).show().siblings().hide();
                $(".studio-setInput-common", domElem).hide();
            } else if ($(this).val() == "页面") {
                $(".studio-inputType-yemian", domElem).show().siblings().hide();
                $(".studio-setInput-common", domElem).hide();
            } else {
                $(".studio-inputType-box", domElem).children().hide();
                $(".studio-setInput-common", domElem).hide();
            }  
        });
        $(".reveal-open", domElem).click(function () {
            var postData = {
                channel: channel,
                playURL: "",
                inputType: $(".studio-inputType", domElem).val(),
                enableChromaKey:!!$(".stuData-inputEnableChromaKey", domElem)[0].checked,
                videoRecord: false
            }
            var maxBufferTime = parseInt($(".stuData-inputMaxBufTime", domElem));
            if (!isNaN(maxBufferTime)) {
                postData.maxBufferTime = maxBufferTime;
            }
            if (postData.inputType == "拉流") {
                var list = $(".studio-inputType-laliu .reveal-arrayInputList input", domElem);
                postData.playURL = [];
                for (var i = 0; i < list.length; ++i) {
                    var item = $(list[i]);
                    postData.playURL.push(item.val());
                }
            } else if (postData.inputType == "推流") {
                postData.playURL = self.getRtmpAddr() + "/" + self.getPubApp() + "/" + self.getPubStream(channel);
                postData.videoRecord = !!$(".stuData-inputVideoRecord", domElem)[0].checked;
                postData.publishKey = $(".stuData-inputPublishKey", domElem).val();
            } else if (postData.inputType == "直接发布") {
                postData.playURL = [self.getRtmpAddr() + "/" + self.getPubApp() + "/" + self.getPubStream(channel)];
            } else if (postData.inputType == "白板") {
                postData.wisId = $(".stuData-inputWisId", domElem).val();
                postData.userId = $(".stuData-inputUserId", domElem).val();
                postData.maxBufferTime = 0;
                postData.enableChromaKey = false;
            } else if (postData.inputType == "页面") {
                var list = $(".studio-inputType-yemian .reveal-arrayInputList input", domElem);
                postData.webPageUrlArray = [];
                for (var i = 0; i < list.length; ++i) {
                    var item = $(list[i]);
                    postData.webPageUrlArray.push(item.val());
                }
                postData.maxBufferTime = 0;
                postData.enableChromaKey = false;
            }
            self.Lcps.ChangeInput({
                params: postData,
                failure: function () {
                    alert("设置输入源失败");
                },
                success: function () {
                    var playerId = "studio_smallVideo_" + channel;
                    var data = self.globalData[playerId];
                    if (!data) return;
                    if (data.type == "iframe") {
                        if (postData.inputType == "直接发布") {
                            var camIndex = $(".studio-inputPubCam", domElem).val();
                            var micIndex = $(".studio-inputPubMic", domElem).val();
                            var url = sharedDirPath + "micFrame.html?width=" + parseInt($("#" + playerId).width()) + "&height=" + parseInt($("#" + playerId).height()) + "&addr="
                                + encodeURIComponent(self.getRtmpAddr()) +
                                "&app=" + self.getPlayApp() + "&stream=" + self.getSmallStream(channel) +
                                "&volume=" + data.volume + "&mode=publish&start=true&camId=" + camIndex + "&micId=" + micIndex;
                            if ($("#" + playerId).attr("src") != url) {
                                $("#" + playerId).attr("src", url);
                            }
                        } else {
                            //声音
                            var url = sharedDirPath +
                                "micFrame2.html?width=" + parseInt($("#" + playerId).width()) + "&height=" + parseInt($("#" + playerId).height()) +
                                "&start=true&addr=" + encodeURIComponent(self.getRtmpAddr()) + "&app=" + self.getPlayApp() + "&stream=" + self.getSmallStream(channel) + "&volume=" + data.volume + "&mode=play";
                            if($("#" + playerId).attr("src") != url) {
                                $("#" + playerId).attr("src", url);
                            }
                        }
                    } else {
                        if (document.getElementById(playerId).SetMode) {
                            var url = self.getRtmpAddr() + "/" + self.getPlayApp();
                            if (postData.inputType == "直接发布") {
                                var camIndex = $(".studio-inputPubCam", domElem).val();
                                var micIndex = $(".studio-inputPubMic", domElem).val();
                                document.getElementById(playerId).SetMode("publish", url, self.getSmallStream(channel), camIndex, micIndex);
                            } else {
                                document.getElementById(playerId).SetMode("play", url, self.getSmallStream(channel));
                            }
                        }
                    }
                }
            });
            $(".close-reveal-modal", domElem).click();
        });
        updateUI();
    }
    option = option ? option : {};
    if (option.reload) {
        self.getLcpsConfigInfo({
            reload: true,
            success: function () {
                updateUI();
                self.showDlg(dlgId);
            }
        });
        return;
    }
    this.showDlg(dlgId);
}
function studioApp_onSecurityUntilAllowed(cameraNameArray, microphoneNameArray) {
    window.studioApp_onSecurityUntilAllowed_ok = true;
    window.studio_inputPubCamArray = [];
    $(".studio-inputPubCam").html("");
    for (var i = 0; i < cameraNameArray.length; ++i) {
        window.studio_inputPubCamArray.push(cameraNameArray[i]);
        $(".studio-inputPubCam").append("<option value='" + i + "' >" + cameraNameArray[i] + "</option>");
    }
    $(".studio-inputPubCam").val(0);
    $('.studio-inputPubMic').html("");
    window.studio_inputPubMicArray = [];
    for (var i = 0; i < microphoneNameArray.length; ++i) {
        window.studio_inputPubMicArray.push(microphoneNameArray[i]);
        $(".studio-inputPubMic").append("<option value='" + i + "' >" + microphoneNameArray[i] + "</option>");
    }
    $(".studio-inputPubMic").val(0);
    $('.CheckFlashSecurityUntilAllowedRow').css('display', 'none');
    $('.CheckFlashSecurityUntilAllowed').css('display', 'none');
}
//嵌入播放器插件
function studioApp_embedPlayer(width, height, url, stream, volume, playerId, bgcolor, bStart, noVideo) {
    if (DynamicLoading.waitForObject({
        objName: "swfobject",
        entry: function () {
            studioApp_embedPlayer(width, height, url, stream, volume, playerId, bgcolor, bStart, noVideo);
        }
    })) return;
    // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
    var swfVersionStr = "10.2.0";
    // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
    var xiSwfUrlStr = sharedDirPath + "js/player/playerProductInstall.swf";
    var flashvars = {
        width: width,
        height: height,
        url: url,
        stream: stream,
        volume: volume,/* 0 - 1 */
    };
    if (bStart != undefined && bStart != null) {
        flashvars['bStart'] = bStart;
    }
    if (noVideo != undefined && noVideo != null) {
        flashvars['noVideo'] = noVideo;
    }
    var params = {};
    params.quality = "high";
    params.bgcolor = "#ffffff";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    params.wmode = "Opaque";
    if (bgcolor != undefined && bgcolor != null) {
        params['bgcolor'] = bgcolor;
    }
    var attributes = {};
    attributes.id = playerId;
    attributes.name = playerId;
    // attributes.align = "middle";
    attributes.style = "float:left;padding-right:";
    swfobject.embedSWF(
        sharedDirPath + "js/player/player.swf", playerId,
        width, height,
        swfVersionStr, xiSwfUrlStr,
        flashvars, params, attributes);
    // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
    swfobject.createCSS("#" + playerId, "display:block;text-align:left;float:left;");
}
//预览小视频
StudioApp.prototype.smallVideoBox = function (option) {
    var self = this;
    var width = option.width != undefined ? option.width : 160;
    var height = option.height != undefined ? option.height : 120;
    var channel = option.channel != undefined ? option.channel : 0;
    var volume = option.volume != undefined ? option.volume : 100;
    volume = volume < 0 ? 0 : (volume > 100 ? 100 : volume); 
    var playerId = "studio_smallVideo_" + channel;
    self.globalData[playerId] = { type: option.type, volume: volume };
    $(option.selector).width(width).height(height);
    if (option.type == "iframe") {
        var iframe = $('<iframe id="' + playerId + '" style="height:100%;width:100%;display:none;float:left;" frameborder="0"></iframe>');
        iframe.load(function () { $(this).show(); });
        $(option.selector).html("").append(iframe);
        $("#" + playerId).attr("src", sharedDirPath +
            "micFrame2.html?width=" + width + "&height=" + height +
            "&start=true&addr=" + encodeURIComponent(self.getRtmpAddr()) + "&app=" + self.getPlayApp() + "&stream=" + self.getSmallStream(channel) + "&volume=" + volume + "&mode=play");
    } else {
        $(option.selector).append('<div id="' + playerId + '"></div>');
        studioApp_embedPlayer(
        width, height,
        self.getRtmpAddr() + "/" + self.getPlayApp(),
        self.getSmallStream(channel), volume / 100, playerId);
    }
}
//预览合成视频
StudioApp.prototype.preVideoBox = function (option) {
    var self = this;
    var width = option.width != undefined ? option.width : 360;
    var height = option.height != undefined ? option.height : 240;
    var volume = option.volume != undefined ? option.volume : 100;
    volume = volume < 0 ? 0 : (volume > 100 ? 100 : volume);
    var playerId = "studio_preVideoBox";
    self.globalData[playerId] = { type: option.type, volume: volume };
    $(option.selector).width(width).height(height);
    if (option.type == "iframe") {
        var iframe = $('<iframe id="' + playerId + '" style="height:100%;width:100%;display:none;float:left;" frameborder="0"></iframe>');
        iframe.load(function () { $(this).show(); });
        $(option.selector).html("").append(iframe);
        $("#" + playerId).attr("src", sharedDirPath +
            "micFrame2.html?width=" + width + "&height=" + height +
            "&start=true&addr=" + encodeURIComponent(self.getRtmpAddr()) + "&app=" + self.getPlayApp() + "&stream=" + self.getPreStream() + "&volume=" + volume + "&mode=play");
    } else {
        $(option.selector).append('<div id="' + playerId + '"></div>');
        studioApp_embedPlayer(
        width, height,
        self.getRtmpAddr() + "/" + self.getPlayApp(),
        self.getPreStream(), volume / 100, playerId);
    }
}
//刷新视频
StudioApp.prototype.refreshVideoBox = function (option) {
    var self = this;
    var playerId = option && option.channel != undefined ? ("studio_smallVideo_" + option.channel) : "studio_preVideoBox";
    var data = self.globalData[playerId];
    if(!data) return;
    if(data.type == "iframe") {
        document.getElementById(playerId).contentWindow.location.reload();
    } else {
        document.getElementById(playerId).Reconnect();
    }
    
}
//声音
StudioApp.prototype.pubVoiceBar = function (option) {
    var self = this;
    var channel = option.channel != undefined ? option.channel : 0;
    var playerId = "studio_smallVideo_" + channel;
    var data = self.globalData[playerId];
    data = data ? data : {};
    var paraArray = self.getLcpsConfigInfo().streamParaArray;
    if (channel >= paraArray.length) return;
    option.value = option.volume != undefined ? option.volume : paraArray[channel].v;
    option.mouseup = function (slider) {
        self.getLcpsConfigInfo().streamParaArray[channel].v = slider.value;
        self.Lcps.SetInputVoice({
            volumes: [{ index: channel, value: slider.value }],
            failure: function (error) {
                alert("设置声音失败");
            }
        });
    };
    data.pubSlider = $(option.selector).sliderBar(option);
    self.globalData[playerId] = data;
}
StudioApp.prototype.updatePubVoiceBar = function (option) {
    var self = this;
    var channel = option.channel != undefined ? option.channel : 0;
    var playerId = "studio_smallVideo_" + channel;
    var data = self.globalData[playerId];
    if (!data || !data.pubSlider) return;
    data.pubSlider.Update(option.volume);
    if (!option.noChangeLcps) {
        data.pubSlider.mouseup(data.pubSlider);
    }
}
StudioApp.prototype.localVoiceBar = function (option) {
    var self = this;
    var playerId = option.channel != undefined ? ("studio_smallVideo_" + option.channel) : "studio_preVideoBox";
    var data = self.globalData[playerId];
    if(!data) return;
    if(data.type == "iframe") {
        option.valueChanged = function (slider) {
            if (self.globalData[playerId] && self.globalData[playerId].volume != undefined) {
                self.globalData[playerId].volume = slider.value;
            }
            var setVolume = document.getElementById(playerId).contentWindow.setVolume;
            if (!!setVolume) {
                setVolume(slider.value);
            }
        }
    } else {
        option.valueChanged = function (slider) {
            if (self.globalData[playerId] && self.globalData[playerId].volume != undefined) {
                self.globalData[playerId].volume = slider.value;
            }
            if (document.getElementById(playerId).SetVolume) {
                document.getElementById(playerId).SetVolume((slider.value / slider.maxValue).toFixed(2));
            }
        }
    }
    option.value = option.volume != undefined ? option.volume : data.volume;
    data.localSlider = $(option.selector).sliderBar(option);
    self.globalData[playerId] = data;
}
StudioApp.prototype.updateLocalVoiceBar = function (option) {
    var self = this;
    var playerId = option.channel != undefined ? ("studio_smallVideo_" + option.channel) : "studio_preVideoBox";
    var data = self.globalData[playerId];
    if (!data || !data.localSlider) return;
    data.localSlider.Update(option.volume);
}
//二维码
StudioApp.prototype.qrcodeImage = function (option) {
    var self = this;
    if (DynamicLoading.waitForObject({
        js: sharedDirPath + "js/QR/QR.js",
        objName: "QR",
        entry: function () {
            self.qrcodeImage(option);
    }
    })) return;
    if (!$(option.selector).attr("src")) {
        var QRdataURI = QR(self.getQrCodeUrl(), { type: 6, size: 6, level: 'Q' });
        $(option.selector).attr("src", QRdataURI);
    }
}
function studioApp_initOnGetStatus(self) {
    if (!self.onGetStatus) {
        self.onGetStatus = function (data) {
            $('#studio_lcps_clientCount').text(data.client_cout);
            $('#studio_lcps_svrStartTime').text(data.svrStartTime);
            var progress = self.globalData["studio_progressBar"];
            if (progress) {
                //播放进度处理
                for (var i = 0; i < data.sourceProgressStatus.length; ++i) {
                    if (!progress[i]) continue;
                    var sts = data.sourceProgressStatus[i];
                    progress[i].duration = sts.duration;
                    if (sts.duration > 0) {
                        progress[i].slider.Update(sts.pos * progress[i].slider.maxValue / sts.duration);
                    } else {
                        progress[i].slider.Update(0);
                    }
                    if (sts.pause) {
                        $("#studio_playPauseBtn_" + i).attr("src", sharedDirPath + "images/glyphicons-175-pause.png");
                    } else {
                        $("#studio_playPauseBtn_" + i).attr("src", sharedDirPath + "images/glyphicons-174-play.png");
                    };
                }
            }
            var signals = self.globalData["studio_signalBox"];
            if (signals) {
                var statistics_5s = data.sourceStatistics_5s;
                var statistics_60s = data.sourceStatistics_60s;
                if (!(statistics_5s && statistics_60s)) return;
                for (var i = 0; i < statistics_5s.length; ++i) {
                    if (!signals[i]) continue;
                    var signalImg = $(signals[i]);
                    var sts = statistics_5s[i];
                    var sts60s = i < statistics_60s.length ? statistics_60s[i] : {};
                    //信号
                    var signalImgUrl = sharedDirPath + "images/signal/";
                    if (sts.empty / sts.sum == 0) {
                        signalImgUrl += "0.png";
                    } else if (sts.empty / sts.sum < 0.3) {
                        signalImgUrl += "1.png";
                    } else if (sts.empty / sts.sum < 1) {
                        signalImgUrl += "2.png";
                    } else {
                        signalImgUrl += "3.png";
                    }
                    //信号提示
                    var title = "5秒流畅度：" + (Math.floor(10000 * (sts.sum - sts.empty) / sts.sum) / 100) + "%, 缓冲区：" + (Math.floor(100 * sts.buf / 25) / 100) + "秒, 帧率: " + sts.fps + ", 码率: " + sts.kbps + "kbps";
                    title += "\n60秒流畅度：" + (Math.floor(10000 * (sts60s.sum - sts60s.empty) / sts60s.sum) / 100) + "%, 缓冲区：" + (Math.floor(100 * sts60s.buf / 25) / 100) + "秒, 帧率: " + sts60s.fps + ", 码率: " + sts60s.kbps + "kbps";
                    signalImg.attr({ 'src': signalImgUrl, 'title': title });
                }
            }
        }
    }
}
//信号
StudioApp.prototype.signalBox = function (option) {
    var self = this;
    var channel = option.channel != undefined ? option.channel : 0;
    var identifier = "studio_signalBox_" + channel;
    $(option.selector).html('<img class="studio_signalBox_img" src="' + sharedDirPath + 'images/signal/0.png" id="' + identifier + '" />').addClass("studio_signalBox");
    var signals = self.globalData["studio_signalBox"];
    signals = signals ? signals : {};
    signals[channel] = "#" + identifier;
    self.globalData["studio_signalBox"] = signals;
    studioApp_initOnGetStatus(self);
}
StudioApp.prototype.progressBar = function (option) {
    var self = this;
    var channel = option.channel != undefined ? option.channel : 0;
    var data = self.globalData["studio_progressBar"];
    data = data ? data : {};
    option.direction = option.direction ? option.direction : "left2right";
    option.hideThumb = true;
    option.value = 0;
    option.mouseup = function (slider) {
        var data = self.globalData["studio_progressBar"];
        if (!data) return;
        self.Lcps.SetInputStatus({
            params: {
                channel: channel,
                seek: slider.value / slider.maxValue * data[channel]["duration"],
            },
            failure: function (error) {
                alert("设置播放进度失败");
            }
        });
    };
    var playPauseBtn = $("<img id='studio_playPauseBtn_" + channel + "' src='" + sharedDirPath + "images/glyphicons-174-play.png' class='studio_playPauseBtn' />");
    playPauseBtn.click(function () {
        var postData = {
            channel: channel,
        };
        if ($(this).attr("src") == (sharedDirPath + "images/glyphicons-174-play.png")) {
            $(this).attr("src", sharedDirPath + "images/glyphicons-175-pause.png");
            postData.pause = 1;
        } else {
            $(this).attr("src", sharedDirPath + "images/glyphicons-174-play.png");
            postData.pause = 0;
        }
        self.Lcps.SetInputStatus({
            params: postData,
            failure: function (error) {
                alert("设置播放暂停状态失败");
            }
        });
    });
    $(option.selector).addClass("studio_progressBar_Box").html("<div class='studio_progressBar'><div/>").prepend(playPauseBtn);
    data[channel] = {};
    data[channel]["slider"] = $(option.selector + " .studio_progressBar").sliderBar(option);
    data[channel]["duration"] = 0;
    self.globalData["studio_progressBar"] = data;
    studioApp_initOnGetStatus(self);
}
//设置场景组对话框
StudioApp.prototype.showSceneGroupDlg = function (option) {
    var self = this;
    var dlgId = "studio_showSceneGroupDlg";
    if ($("#" + dlgId).length <= 0) {
        var html =
        '<div id="' + dlgId + '" class="reveal-modal">\
            <a class="close-reveal-modal">&#215;</a>\
            <h1 class="reveal_h1">选择场景组</h1>\
            <div class="reveal-rowItem">\
                <div class="studio-tableWait">\
                    <img src="' + sharedDirPath + 'images/loading.gif" />\
                </div>\
                <div class="studio-tableBox" style="display:none">\
                    <table class="studio-table">\
                        <tr>\
                            <th>名称</th>\
                            <th style="width:160px;">描述</th>\
                            <th style="width:60px;text-align:right;">操作</th>\
                        </tr>\
                    </table>\
                    <div class="studio-tableBody">\
                        <table class="studio-table">\
                            <thead>\
                                <tr class="studio-table-noborder">\
                                    <td style="height:0px;"></td>\
                                    <td style="height:0px;width:160px;"></td>\
                                    <td style="height:0px;width:60px;"></td>\
                                </tr>\
                            </thead>\
                            <tbody class="studio-sceneList" ></tbody>\
                        </table>\
                    </div>\
                </div>\
            </div>\
        </div>';
        var elem = $(html);
        $(document.body).append(elem);
        var domElem = elem[0];
        function getSceneGroupPage(dir) {
            var page = parseInt($(".studio-tableBody", domElem).attr("data-page"));
            page = isNaN(page) ? 1 : page;
            if (dir < 0) {
                page = (page - 1) < 1 ? 1 : (page - 1);
            } else {
                page++;
            }
            $(".studio-tableWait", domElem).show();
            $(".studio-tableBox", domElem).hide();
            $(".studio-sceneList", domElem).html("");
            self.Scene.GetGroupList({
                page: page, num: 10,
                success: function (data) {
                    var list = data.list;
                    for (var i = 0; i < list.length; ++i) {
                        var item = list[i];
                        var html = 
                            '<tr>\
                                <td>' + $("<div />").text(item.title).html() + '</td>\
                                <td>' + $("<div />").text(item.dsc).html() + '</td>\
                                <td class="studio-sceneGrpOp"><a data-sceneId="' + item.id + '" >选择</a></td>\
                            </tr>';
                        html = $(html);
                        html.children("td").children("a").click(function () {
                            var id = $(this).attr("data-sceneId");
                            self.ChangeSceneGroup({ sceneGroupId: id });
                        });
                        $(".studio-sceneList", domElem).append(html);
                    }
                    var pageHtml = 
                        '<tr class="studio-pageBar studio-table-noborder">\
                            <td colspan="3">\
                                <a dir="-1" >上一页</a>\
                                <a class="studio-pageTips">' + page + '</a>\
                                <a dir="1" >下一页</a>\
                            </td>\
                        </tr>';
                    pageHtml = $(pageHtml);
                    pageHtml.children("td").children("a").click(function () {
                        var dir = parseInt($(this).attr("dir"));
                        if (isNaN(dir)) return;
                        getSceneGroupPage(dir);
                    });
                    $(".studio-sceneList", domElem).append(pageHtml);
                    $(".studio-tableBody", domElem).attr("data-page",page);
                    $(".studio-tableWait", domElem).hide();
                    $(".studio-tableBox", domElem).show();
                },
                failure: function (error) {
                    alert("获取场景组失败");
                }
            });
        }
        getSceneGroupPage(-1);
    }
    this.showDlg(dlgId);
}
//显示抠像设置
StudioApp.prototype.showSetKxDlg = function (option) {
    var self = this;
    var dlgId = "studio_showSetKxDlg";
    if ($("#" + dlgId).length <= 0) {
        var html =
            '<div id="' + dlgId + '" class="reveal-modal">\
                <a class="close-reveal-modal">&#215;</a>\
                <h1 class="reveal_h1">设置视频抠像</h1>\
                <div class="reveal-rowItem">\
                     <iframe id="stuData-kxIframe" width="432px" height="190px" frameborder="0" scrolling="no" ></iframe>\
                </div>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputLabel">抠像颜色值，如59CC8B:</div>\
                    <input type="text" id="stuData-chromaKeyColor" />\
                </div>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputLabel">抠像相似度，范围0-1:</div>\
                    <input type="text" id="stuData-chromaKeySimilarity" />\
                </div>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputLabel">抠像混合度，范围0-1:</div>\
                    <input type="text" id="stuData-chromaKeyBlend" />\
                </div>\
                <div class="reveal-bottomBar">\
                    <div class="reveal-btns">\
                        <a class="reveal-close" onclick="$(this).parent().parent().parent().children(\'.close-reveal-modal\').click()">关闭</a>\
                        <a class="reveal-open">提交</a>\
                    </div>\
                </div>\
            </div>';
        var elem = $(html);
        var domElem = elem[0];
        $(document.body).append(elem);
        window.studio_kxColorSelect = function (channel, color) {
            var colorFormat = color.replace(/[^0-9A-Fa-f]/g, '', color);
            $('#stuData-chromaKeyColor').val(colorFormat);
        }
        $(".reveal-open", domElem).click(function () {
            var chromaKeyColor = $("#stuData-chromaKeyColor", domElem).val();
            var chromaKeySimilarity = $("#stuData-chromaKeySimilarity", domElem).val();
            var chromaKeyBlend = $("#stuData-chromaKeyBlend", domElem).val();
            var channel = parseInt(elem.attr("curChannel"));
            channel = channel ? channel : 0;
            var postData = {
                'channel': channel,
                'chromaKeyColor': chromaKeyColor,
                'chromaKeySimilarity': chromaKeySimilarity,
                'chromaKeyBlend': chromaKeyBlend,
            };
            self.Lcps.SetChromakey({
                params: postData,
                success: function () {
                    if (self.getLcpsConfigInfo().sourceArray[channel]) {
                        self.getLcpsConfigInfo().sourceArray[channel].chromaKeyColor = postData.chromaKeyColor;
                        self.getLcpsConfigInfo().sourceArray[channel].chromaKeySimilarity = postData.chromaKeySimilarity;
                        self.getLcpsConfigInfo().sourceArray[channel].chromaKeyBlend = postData.chromaKeyBlend;
                    }
                },
                failure: function (error) {
                    alert("设置抠图参数失败");
                }
            });
            $(".close-reveal-modal", domElem).click();
        });
    }
    var channel = option.channel ? option.channel : 0;
    $("#" + dlgId).attr("curChannel", channel);
    $("#stuData-kxIframe").attr("src", sharedDirPath + "kx.html?callback=studio_kxColorSelect&channel=" + channel + "&videoip=" + self.getLcpsHost());
    var domElem = $("#" + dlgId)[0];
    var config = self.getLcpsConfigInfo().sourceArray[channel];
    $("#stuData-chromaKeyColor", domElem).val(config.chromaKeyColor);
    $("#stuData-chromaKeySimilarity", domElem).val(config.chromaKeySimilarity);
    $("#stuData-chromaKeyBlend", domElem).val(config.chromaKeyBlend);
    this.showDlg(dlgId);
}
//版本信息、负载cpu等
function studioApp_initOnGetOSInfo(self) {
    if (!self.onGetOSInfo) {
        function getReadbleTraffic(bps) {
            if (bps > 1024 * 1024) {
                return Math.floor(bps / (1024 * 1024) * 100) / 100 + "mbps";
            } else {
                return Math.floor(bps / 1024 * 100) / 100 + "kbps";
            }
        }
        function getReadbleByte(KByte) {
            if (KByte > 1024 * 1024) {
                return Math.floor(KByte / (1024 * 1024) * 100) / 100 + "G";
            } else {
                return Math.floor(KByte / 1024 * 100) / 100 + "M";
            }
        }
        self.onGetOSInfo = function (data) {
            for (var eth in data.net) {
                if (data.net[eth].info.length > 0 && data.net[eth].info[0].address == data.svrip) {
                    $('#studio_lcps_netin').text(getReadbleTraffic(data.net[eth]['in']));
                    $('#studio_lcps_netout').text(getReadbleTraffic(data.net[eth]['out']));
                    break;
                }
            }
            for (var i = 0; i < data.loadavg.length; ++i) {
                data.loadavg[i] = data.loadavg[i].toFixed(2);
            }
            $('#studio_lcps_loadavg').text(data.loadavg);
            $('#studio_lcps_cpu').text(data.cpu);
            $('#studio_lcps_mem').text(getReadbleByte(data.usemem));
        }
    }
}
StudioApp.prototype.describeService = function (option) {
    var self = this;
    if ($('#studio_describeService').length <= 0) {
        var html =
         '<div id="studio_describeService" class="studio_describeService">\
            版本:<span id="studio_lcps_version">-</span>\
            配置:<span id="studio_lcps_capability">-</span>\
            启动时间:<span id="studio_lcps_svrStartTime">-</span>\
            页面打开数:<span id="studio_lcps_clientCount">-</span>\
            负载:<span id="studio_lcps_loadavg">-</span>\
            cpu:<span id="studio_lcps_cpu">-</span>\
            mem:<span id="studio_lcps_mem">-</span>\
            in:<span id="studio_lcps_netin">-.</span>\
            out:<span id="studio_lcps_netout">-</span>\
        </div>';
        $(option.selector).html(html);
        if (!self.getVersion()) {
            self.getVersion({
                reload: true,
                success: function () {
                    $('#studio_lcps_version').text(self.getVersion());
                }
            });
        } else {
            $('#studio_lcps_version').text(self.getVersion());
        }
        $('#studio_lcps_capability').text(self.getLcpsConfigInfo().cpuCount >= 16 ? "1080p" : (self.getLcpsConfigInfo().cpuCount >= 8 ? "720p" : "480p"));
        studioApp_initOnGetOSInfo(self);
    }
}
/*导播台设置重启、重置、密码 start*/
StudioApp.prototype.restartService = function () {
    var self = this;
    self.Lcps.RestartService({
        success: function (data) {
            self.waitLcpsReady({ tips: "导播台重启中..." });
        },
        failure: function (error) {
            alert("重启失败");
        }
    });
}
StudioApp.prototype.resetService = function () {
    var self = this;
    self.Lcps.ResetService({
        success: function (data) {
            self.waitLcpsReady({ tips: "导播台重置中..." });
        },
        failure: function (error) {
            alert("重置失败");
        }
    });
}
StudioApp.prototype.waitLcpsReady = function (option) {
    var self = this;
    option = option ? option : {};
    var tips = option.tips == undefined ? "请稍等哦..." : option.tips;
    var html = '<div id="studio_waitLcpsReady" class="studio_waitLcpsReady"" >\
                    <h2>' + tips + '</h2>\
                    <p><img src="' + sharedDirPath + 'images/loading.gif"></p>\
                </div>';
    $(document.body).html("").append(html);
    self.stopGetSatusTimer();
    setInterval(function () {
        self.Lcps.GetStatus({
            success: function (data) {
                window.location.reload();
            }
        });
    }, option.interval ? option.interval : 5000);
}
StudioApp.prototype.onLcpsCreating = function (option) {
    option = option ? option : {};
    this.waitLcpsReady({ tips: (option.tips ? option.tips : "导播台创建中...") });
}
StudioApp.prototype.onLcpsIniting = function (option) {
    option = option ? option : {};
    this.waitLcpsReady({ tips: (option.tips ? option.tips : "导播台初始化中...") });
}
StudioApp.prototype.showSetLcpsPassword = function () {
    var self = this;
    var dlgId = "studio-showSetLcpsPassword";    
    if ($("#" + dlgId).length <= 0) {
        var html =
            '<div id="' + dlgId + '" class="reveal-modal">\
                <a class="close-reveal-modal">&#215;</a>\
                <h1 class="reveal_h1">设置导播台密码</h1>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputTips">说明：第一次设置密码无需填写旧密码</div>\
                </div>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputLabel">旧密码:</div>\
                    <input type="password" id="stuData-oldPassword" />\
                </div>\
                 <div class="reveal-rowItem">\
                    <div class="reveal-inputLabel">新密码:</div>\
                    <input type="password" id="stuData-newPassword" />\
                </div>\
                <div class="reveal-bottomBar">\
                    <div class="reveal-btns">\
                        <a class="reveal-close" onclick="$(this).parent().parent().parent().children(\'.close-reveal-modal\').click()">关闭</a>\
                        <a class="reveal-open">提交</a>\
                    </div>\
                </div>\
            </div>';
        var elem = $(html);
        var domElem = elem[0];
        $(document.body).append(elem);
        $(".reveal-open", domElem).click(function () {
            var oldPassword = $("#stuData-oldPassword", domElem).val();
            var newPassword = $("#stuData-newPassword", domElem).val();
            if (newPassword && !self.getLcpsClientIp()) {
                self.getLcpsClientIp({
                    reload: true,
                    success: function (data) {
                        self.Lcps.Setpassword({
                            params: { password: newPassword },
                            password: oldPassword,
                            failure: function (error) {
                                alert("设置密码失败");
                            },
                            success: function () {
                                $(".close-reveal-modal", domElem).click();
                            }
                        });
                    }
                });
            } else {
                self.Lcps.Setpassword({
                    params: { password: newPassword },
                    password: oldPassword,
                    failure: function (error) {
                        alert("设置密码失败");
                    },
                    success: function () {
                        $(".close-reveal-modal", domElem).click();
                    }
                });
            }
        });
    }   
    this.showDlg(dlgId);   
}
StudioApp.prototype.onShowInputPassword = function (loadLcpsConfig) {
    var self = this;
    var dlgId = "studio-showInputPassword";    
    if ($("#" + dlgId).length <= 0) {
        var html =
            '<div id="' + dlgId + '" class="reveal-modal">\
                <a class="close-reveal-modal" style="display:none">&#215;</a>\
                <h1 class="reveal_h1">输入导播台密码</h1>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputLabel">密码:</div>\
                    <input type="password" id="stuData-password" />\
                </div>\
                <div class="reveal-rowItem">\
                    <div class="reveal-inputTips" style="display:none;">密码错误</div>\
                </div>\
                <div class="reveal-bottomBar">\
                    <div class="reveal-btns">\
                        <a class="reveal-open">提交</a>\
                    </div>\
                </div>\
            </div>';
        var elem = $(html);
        var domElem = elem[0];
        $(document.body).append(elem);
        $(".reveal-open", domElem).click(function () {
            var Password = $("#stuData-password", domElem).val();
            self.Lcps.IsPasswardOK({
                password: Password,
                failure: function (error) {
                    self.showDlg(dlgId, { modalDlg: true });
                    $('#' + dlgId + ' .reveal-inputTips').show();
                },
                success: function () {
                    loadLcpsConfig(Password);
                    $('#' + dlgId + ' .reveal-inputTips').hide();
                    $(".close-reveal-modal", domElem).click();
                }
            });
        });
    }   
    this.showDlg(dlgId, { modalDlg: true });
}