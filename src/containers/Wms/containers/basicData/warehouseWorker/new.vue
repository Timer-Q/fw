<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>新增信息</title>
  <link rel="stylesheet" href="../../plugins/bootstrap-3.3.7-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../plugins/bootstrap-table-develop/dist/bootstrap-table.min.css">
  <link rel="stylesheet" href="../../plugins/tree/zTreeStyle/zTreeStyle.css">
  <link rel="stylesheet" href="../../plugins/scroll/jquery.mCustomScrollbar.css"/>
  <link rel="stylesheet" href="../../fonts/iconfont.css">
  <link rel="stylesheet" href="../../css/reset.css">
  <link rel="stylesheet" href="../../css/list.css">
  <link rel="stylesheet" href="../../css/public.css">
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
      <span class="return">
      <i class="iconfont icon-fanhui"></i>
      <a href="worker-Information.html">返回</a>
    </span>
      <p class="btnGroup">
        <a href="javascript:;">保存</a>
        <i>|</i>
        <a href="javascript:;">取消</a>
      </p>
      <p class="btnGroup">
        <a href="newInformation.html">保存并新增</a>
      </p>
    </div>
  </div>
  <!--标签功能操作栏  end-->
  <!--主体内容  start-->
  <div class="wms-main">
    <div class="mainContainer clearfix">
      <!--右侧新增  start-->
      <div class="newContent">
        <div class="newContentBox">
          <div class="groupL">
            <p class="groupL-p">
              <span>库工编号</span>
              <input type="text" class="disabled-bg" placeholder="请输入内容" value="TIX56328" disabled="disabled">
            </p>
            <p class="groupL-p ml-22 f_l">
              <span class="f_l">类型</span>
              <select type="text" class="comboBox f_l">
                <option value="">类型</option>
                <option value="">类型</option>
                <option value="">类型</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>年龄</span>
              <input type="text" class="" placeholder="请输入内容">
            </p>
          </div>
          <div class="groupL">
            <p class="groupL-p ml-22 f_l">
              <span class="f_l">工种</span>
              <select type="text" class="comboBox f_l">
                <option value="">技工</option>
                <option value="">技工</option>
                <option value="">技工</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-22 f_l">
              <span class="f_l">所属服务商</span>
              <select type="text" class="comboBox f_l">
                <option value="">类型</option>
                <option value="">类型</option>
                <option value="">类型</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>电话号码</span>
              <input type="text" class="" placeholder="请输入内容">
            </p>
          </div>
          <div class="groupL">
            <p class="groupL-p ml-22 f_l">
              <span class="f_l">所属仓库</span>
              <select type="text" class="comboBox f_l">
                <option value="">仓库</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>库工姓名</span>
              <i class="star-icon">*</i>
              <input type="text" class="must-text" placeholder="请输入内容">
            </p>
            <p class="groupL-p enabled-state">
              <span>性别</span>
              <input type="radio" name="state" id="click-enabled" value=""> <label for="click-enabled">男</label>
              <input type="radio" name="state" id="click-disabled" value=""> <label for="click-disabled">女</label>
            </p>
          </div>
          <p class="groupL-p groupL-pTextarea">
            <span>品牌描述</span>
            <textarea name="" rows="" cols="" class="catagory-discribe"></textarea>
            <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
          </p>
        </div>
      </div>
      <!--右侧新增  end-->
    </div>
  </div>
  <!--主体内容  end-->

  <!--
    	作者：李晶
    	时间：2017-06-19
    	描述：启用成功弹出提示
    -->
 <!-- <div id="use_box" class="pop pop-err">
    <div class="use-success">
      <i class="iconfont icon-gouxuan"></i><b>启用成功！</b>
    </div>
  </div>-->
</body>
<script src="../../plugins/bootstrap-table-develop/dist/extensions/reorder-rows/bootstrap-table-reorder-rows.js"></script>
<script src="../../plugins/jquery/jquery.tablednd.js"></script>
<script src="../../plugins/jquery/jquery.contextify.js"></script>
<script src="../../js/list.js"></script>
<script src="../../plugins/tree/jquery.ztree.core-3.5.js"></script>
<script src="../../plugins/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
</html>
