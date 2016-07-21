var lcpsConfigInfo,studioConfigInfo;
var PgwVideo = {
    sceneWidth: 1280,
    sceneHeight: 720
}

//导播台版本，码率等信息描述
var DescribeService = {};
DescribeService.loadavg = [0, 0, 0];
DescribeService.cpu = 0;
DescribeService.mem = 0;
DescribeService.netin = 0;
DescribeService.netout = 0;
DescribeService.version = "";
DescribeService.webkitInitFinish = false;
//场景
var SceneList = {}
var templateUrl='http://studio.aodianyun.com/view/shared/templete'
var ScenneModelURL=new Array(10);
var initModelURL=new Array(5);
initModelURL[3]='http://studio.aodianyun.com/view/fina/templete/background1.jpg';
initModelURL[4]='http://studio.aodianyun.com/view/fina/templete/desk1.png';