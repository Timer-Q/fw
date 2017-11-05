<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>库工信息</title>
  <link rel="stylesheet" href="../../plugins/bootstrap-3.3.7-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../plugins/bootstrap-table-develop/dist/bootstrap-table.min.css">
  <link rel="stylesheet" href="../../plugins/tree/zTreeStyle/zTreeStyle.css">
  <link rel="stylesheet" href="../../plugins/scroll/jquery.mCustomScrollbar.css"/>
  <link rel="stylesheet" href="../../fonts/iconfont.css">
  <link rel="stylesheet" href="../../css/reset.css">
  <link rel="stylesheet" href="../../css/list.css">
  <link rel="stylesheet" href="../../css/public.css">
  <link rel="stylesheet" href="../../css/popup.css">
  <link rel="stylesheet" href="../../css/warehouseWorker/warehouseWorker.css">
  <link rel="stylesheet" href="../../plugins/bootstrap-table-develop/dist/extensions/reorder-rows/bootstrap-table-reorder-rows.css">
  <script src="../../plugins/jquery/jquery-1.11.1.min.js"></script>
  <script src="../../plugins/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
  <script src="../../plugins/bootstrap-table-develop/dist/bootstrap-table.min.js"></script>
  <script src="../../plugins/bootstrap-table-develop/dist/locale/bootstrap-table-zh-CN.min.js"></script>
</head>
<body>
  <!--标签功能操作栏  start-->
  <div class="wms-modal-div clearfix">
    <div>
      <p class="btnGroup">
        <a href="newInformation.html">新增</a>
        <i>|</i>
        <a href="newInformation.html">修改</a>
      </p>
      <p class="btnGroup">
        <a href="javascript:;">导入</a>
        <i>|</i>
        <a href="javascript:;">下载模板</a>
        <i>|</i>
        <a href="javascript:;">导出</a>
      </p>
      <p class="btnGroup">
        <a href="javascript:;">删除</a>
      </p>
    </div>
  </div>
  <!--标签功能操作栏  end-->
  <!--主体内容  start-->
  <div class="wms-main">
    <div class="mainContainer clearfix">
      <div class="mainContainer-show">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="mainLeft">
        <div class="mainLeft-hide">
          <a href="javascript:;" class="active-color f14-title">查询方案</a>
          <i class="iconfont icon-shouqi" id="hideLeft-btn"></i>
        </div>
        <ul class="search-list">
          <li><a href="javascript:;" class="active-color">库工查询></a></li>
          <li><a href="javascript:;">库工电话查询<</a></li>
        </ul>
        <div class="mainLeft-bottom">
          <div class="mainLeft-title f14-title title-top">快速查询<i class="iconfont icon-xiajiantou"></i></div>
          <div class="bottom-hide">
            <p>库工编号</p>
            <input type="text" />
            <p>库工姓名</p>
            <input type="text" />
            <p class="groupL-p group-l">
              <span class="pb-2">工种</span>
              <select type="text" class="comboBox comboBox-l">
                <option value="">技工</option>
                <option value="">技工</option>
                <option value="">技工</option>
              </select>
              <i class="iconfont icon-xiajiantou newArrow-l"></i>
            </p>
            <p class="groupL-p group-l">
              <span class="pb-2">手机号码</span>
              <select type="text" class="comboBox comboBox-l">
                <option value="">13111111111</option>
                <option value="">13111111111</option>
                <option value="">13111111111</option>
              </select>
              <i class="iconfont icon-xiajiantou newArrow-l"></i>
            </p>
            <p>创建日期</p>
            <div class="date">
              <input type="text" class="date-t"/>
              <i class="iconfont icon-rili"></i>
            </div>
            <div class="date">
              <input type="text" />
              <i class="iconfont icon-rili"></i>
            </div>
            <p class="mainLeft-bottomBtn"><a href="javascript:;" class="clear-btn">清空值</a><a href="javascript:;" class="search-btn active">查询</a></p>
          </div>
        </div>
        <p class="mainLeft-title f14-title title-bottom">快速查询<i class="iconfont icon-xiajiantou"></i></p>
      </div>

      <div class="mainContent">
        <table class="information-list">
            <tbody>
              <tr class="list-thead">
              <td>序号</td>
              <td>库工编号</td>
              <td>库工姓名</td>
              <td>所属仓库</td>
              <td>状态</td>
              <td>所属劳务商</td>
              <td>手机号码</td>
              <td>工种</td>
              <td>年龄</td>
              <td>居住地址</td>
              <td>姓名</td>
              <td>备注</td>
            </tr>
            <tr class="choose-tr">
              <td class="td-first">1</td>
              <td><a href="javascript:;">A01</a></td>
              <td>张三</td>
              <td>1号仓库</td>
              <td>是</td>
              <td>理货服务商</td>
              <td>13112345678</td>
              <td>特种工</td>
              <td>99</td>
              <td>北京昌平区软件园二期</td>
              <td>男</td>
              <td>备注是什么</td>
            </tr>
            <tr class="choose-tr">
              <td class="td-first">2</td>
              <td><a href="javascript:;">A01</a></td>
              <td>张三</td>
              <td>1号仓库</td>
              <td>是</td>
              <td>理货服务商</td>
              <td>13112345678</td>
              <td>特种工</td>
              <td>99</td>
              <td>北京昌平区软件园二期</td>
              <td>男</td>
              <td>备注是什么备注是什么备注是什么</td>
            </tr>
            </tbody>
          </table>
      </div>
      <!--右侧内容 end-->
    </div>
  </div>
  <!--主体内容  end-->


</body>
<script src="../../plugins/bootstrap-table-develop/dist/extensions/reorder-rows/bootstrap-table-reorder-rows.js"></script>
<script src="../../plugins/jquery/jquery.tablednd.js"></script>
<script src="../../plugins/jquery/jquery.contextify.js"></script>
<script src="../../js/list.js"></script>
<script src="../../plugins/tree/jquery.ztree.core-3.5.js"></script>
<script src="../../plugins/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
</html>
