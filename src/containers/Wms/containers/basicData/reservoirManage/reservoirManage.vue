<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>库区管理</title>
  <link rel="stylesheet" href="../../plugins/bootstrap-3.3.7-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../plugins/bootstrap-table-develop/dist/bootstrap-table.min.css">
  <link rel="stylesheet" href="../../plugins/tree/zTreeStyle/zTreeStyle.css">
  <link rel="stylesheet" href="../../plugins/scroll/jquery.mCustomScrollbar.css"/>
  <link rel="stylesheet" href="../../fonts/iconfont.css">
  <link rel="stylesheet" href="../../css/reset.css">
  <link rel="stylesheet" href="../../css/list.css">
  <link rel="stylesheet" href="../../css/public.css">
  <link rel="stylesheet" href="../../css/popup.css">
  <link rel="stylesheet" href="../../css/reservoirManage/reservoirManage.css">
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
        <a href="newReservoir.html">新增</a>
      </p>
      <p class="btnGroup">
        <a href="javascript:;" class="use-btn">启用</a>
        <i>|</i>
        <a href="javascript:;" class="disable-btn">停用</a>
      </p>
      <p class="btnGroup">
        <a href="javascript:;">导入</a>
        <i>|</i>
        <a href="javascript:;">下载模板</a>
        <i>|</i>
        <a href="javascript:;">导出</a>
      </p>
      <p class="btnGroup">
        <a href="javascript:;">日志</a>
      </p>
      <p class="btnGroup">
        <a href="javascript:;" class="del-btn">删除</a>
      </p>
    </div>
  </div>
  <!--标签功能操作栏  end-->
  <!--主体内容  start-->
  <div class="wms-main">
    <div class="mainContainer clearfix">
      <div class="mainContent">
        <!--查询方案  start-->
        <div class="vehicle-find">
          <div class="query-btn">
            <span>查询方案</span>
            <i class="iconfont icon-xiugai"></i>
          </div>
          <div class="vehicle-data">
            <p class="inblock">
              <span class="hspace">货主</span>
              <input type="text" class="license-number" placeholder="请输入电话号码">
            </p>
            <p class="inblock">
              <span class="hspace">商品条码</span>
              <input type="text" class="license-number" placeholder="请输入电话号码">
            </p>
            <p class="inblock">
              <span class="hspace">商品名称</span>
              <input type="text" class="license-number" placeholder="请输入电话号码">
            </p>
            <p class="inblock">
              <span class="hspace">货位</span>
              <input type="text" class="license-number" placeholder="请输入电话号码">
            </p>
            <span class="hspace">库区</span>
            <input type="text" class="license-number" placeholder="我是文本">
          </div>
          <div class="vehicle-btn">
            <button type="button" class="search-btn">查询</button>
            <a href="javascript:;">高级查询</a>
          </div>
        </div>
        <!--查询方案   end-->
        <table class="information-list">
          <tbody>
          <tr class="list-thead">
            <td>序号</td>
            <td>状态</td>
            <td>月台编码</td>
            <td>月台名称</td>
            <td>业务类型</td>
            <td>月台吞吐量</td>
            <td>吞吐单位</td>
            <td>占有数量</td>
            <td>停靠上限</td>
            <td>使用顺序</td>
            <td>创建时间</td>
            <td>提供升降平台</td>
            <td>状态</td>
            <td>备注</td>
          </tr>
          <tr class="choose-tr">
            <td class="td-first">1</td>
            <td>空闲</td>
            <td><a href="javascript:;">A01</a></td>
            <td>1号仓库</td>
            <td>是</td>
            <td>理货服务商</td>
            <td>13112345678</td>
            <td>特种工</td>
            <td>99</td>
            <td>北京昌平区软件园二期</td>
            <td>男</td>
            <td>备注是什么</td>
            <td>备注是什么</td>
            <td>备注是什么</td>
          </tr>
          <tr class="choose-tr">
            <td class="td-first">2</td>
            <td>空闲</td>
            <td><a href="javascript:;">A01</a></td>
            <td>1号仓库</td>
            <td>是</td>
            <td>理货服务商</td>
            <td>13112345678</td>
            <td>特种工</td>
            <td>99</td>
            <td>北京昌平区软件园二期</td>
            <td>男</td>
            <td>备注是什么备注是什么</td>
            <td>备注是什么备注是什么</td>
            <td>备注是什么备什么</td>
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
