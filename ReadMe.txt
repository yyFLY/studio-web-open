一、目录结构：
view: 存放页面代码
	fina: 存放演播室页面的代码
	shared: 演播室除了fina以外，还有其他演播室。这个文件夹存放所有演播室公用的文件，包括封装的演播室js库和公用的资源文件。
application: 存放 php代码，代码的主要工作就是转发页面发起的http请求

二、配置：
1、在application/common/Aodianyun.class.php中修改accessid和accesskey为自己的信息。（登录奥点云控制台可以获取）
2、打开页面时需要studioId参数和可选的参数accessId和accessKey
如果不带accessId和accessKey参数，那么将使用Aodianyun.class.php中配置的accessId和accessKey参数
例子：
http://studio.aodianyun.com/view/fina/?studioId=xxxxxxx&accessId=xxxxx&accessKey=xxxxxxx

三、开发
application中的代码 和 view/shared中的代码 已经封装好了，不用修改。
如果需要新开发一个演播室模版，可以在view文件夹下新建一个目录，里面存放html页面代码和资源文件

在页面上引入
<script src="../shared/js/jquery/jquery-1.11.1.min.js" type="text/javascript"></script>
<script src="../shared/js/core-obj.js" type="text/javascript"></script>
<script src="../shared/js/core-ui.js" type="text/javascript"></script>

然后参考fina中的代码开发即可，fina演播室的入口脚本是init.js文件。
