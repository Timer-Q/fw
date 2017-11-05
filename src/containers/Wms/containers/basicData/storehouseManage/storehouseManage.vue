<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>库房管理</title>
  <link rel="stylesheet" href="../../plugins/bootstrap-3.3.7-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../plugins/bootstrap-table-develop/dist/bootstrap-table.min.css">
  <link rel="stylesheet" href="../../plugins/tree/zTreeStyle/zTreeStyle.css">
  <link rel="stylesheet" href="../../plugins/scroll/jquery.mCustomScrollbar.css"/>
  <link rel="stylesheet" href="../../fonts/iconfont.css">
  <link rel="stylesheet" href="../../css/reset.css">
  <link rel="stylesheet" href="../../css/list.css">
  <link rel="stylesheet" href="../../css/public.css">
  <link rel="stylesheet" href="../../css/popup.css">
  <link rel="stylesheet" href="../../css/storehouseManage/storehouseManage.css">
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
        <a href="newStorehouse.html">新增</a>
      </p>
      <p class="btnGroup">
        <a href="javascript:;" class="use-btn">启用</a>
        <i>|</i>
        <a href="javascript:;" class="disable-btn">停用</a>
      </p>
      <p class="btnGroup">
        <a href="javascript:;">日志</a>
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
      <!--左侧内容  start-->
      <div class="mainLeft">
        <div class="mainLeft-hide">
          <a href="javascript:;" class="active-color f14-title">查询方案</a>
          <i class="iconfont icon-shouqi" id="hideLeft-btn"></i>
        </div>
        <ul class="search-list">
          <li><a href="javascript:;" class="active-color">我的操作日志</a></li>
          <li><a href="javascript:;">人民币操作日志</a></li>
          <li><a href="javascript:;">人民币操作日志</a></li>

        </ul>
        <div class="mainLeft-bottom">
          <div class="mainLeft-title f14-title title-top">快速查询<i class="iconfont icon-xiajiantou"></i></div>
          <div class="bottom-hide">
            <p>库房名称</p>
            <input type="text" />
            <p>库房编码</p>
            <input type="text" />
            <div class="groupL-pr">
              <p class="groupL-p group-l">
                <span class="pb-2 f_l">物流园区</span>
                <select type="text" class="comboBox comboBox-l f_l">
                  <option value=""></option>
                  <option value="">园区</option>
                  <option value="">仓库</option>
                </select>
                <i class="newArrow newArrow-l"></i>
              </p>
            </div>
            <p>仓库名称</p>
            <input type="text"/>
            <div class="groupL-pr">
              <p class="groupL-p group-l">
                <span class="pb-2 f_l">库房属性</span>
                <select type="text" class="comboBox comboBox-l f_l">
                  <option value=""></option>
                  <option value="">仓库</option>
                  <option value="">仓库</option>
                </select>
                <i class="newArrow newArrow-l"></i>
              </p>
            </div>
            <div class="groupL-pr">
              <p class="groupL-p group-l">
                <span class="pb-2 f_l">库房性质</span>
                <select type="text" class="comboBox comboBox-l f_l">
                  <option value=""></option>
                  <option value="">仓库</option>
                  <option value="">仓库</option>
                </select>
                <i class="newArrow newArrow-l"></i>
              </p>
            </div>
            <div class="groupL-pr">
              <p class="groupL-p group-l">
                <span class="pb-2 f_l">库房结构</span>
                <select type="text" class="comboBox comboBox-l f_l">
                  <option value=""></option>
                  <option value="">仓库</option>
                  <option value="">仓库</option>
                </select>
                <i class="newArrow newArrow-l"></i>
              </p>
            </div>
            <p class="mainLeft-bottomBtn"><a href="javascript:;" class="clear-btn">清空值</a><a href="javascript:;" class="search-btn active">查询</a></p>
          </div>
        </div>
        <p class="mainLeft-title f14-title title-bottom">快速查询<i class="iconfont icon-xiajiantou"></i></p>
      </div>
      <!--左侧内容  end-->
      <!--右侧内容  start-->
      <div class="mainContent" style="left: 0px;">
        <table class="information-list informationR-list">
          <tbody>
          <tr class="list-thead">
            <td>序号</td>
            <td><input type="checkbox"></td>
            <td>仓库编码</td>
            <td>仓库名称</td>
            <td>物流园区</td>
            <td>区域</td>
            <td>所属单位</td>
            <td>仓库属性</td>
            <td>温控属性</td>
            <td>仓库类型</td>
            <td>仓库结构</td>
            <td>仓库性质</td>
            <td>面积</td>
            <td>省份</td>
          </tr>
          <tr class="choose-tr">
            <td class="td-first">1</td>
            <td><input type="checkbox"></td>
            <td><a href="newStorehouse.html">YFLZSD-0001</a></td>
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
            <td>备注是什么</td>
          </tr>
          <tr class="choose-tr">
            <td class="td-first">2</td>
            <td><input type="checkbox"></td>
            <td><a href="newStorehouse.html">YFLZSD-0002</a></td>
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
            <td>备注是什么备注是什么备注是什么</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--右侧内容 end-->
    </div>
  </div>
  <!--主体内容  end-->

  <!--
    作者：李晶
    时间：2017-06-15
    描述：点击删除按钮弹出新增输入框
  -->
  <div id="msg_box" class="pop pop-err">
    <h2 id="prompt_title" class="pop-title clearfix">
      <span class="txt">删除提示</span>
      <i class="iconfont icon-guanbi close-box"></i>
    </h2>
    <div class="pop-con">
      <div class="content" id="msgContent">
        <div class="pop-text1">
          <p>您确定要删除吗？</p>
          <p>删除后将不再恢复</p>
        </div>
        <div class="pop-text2">
          <p>您确定要取消吗？</p>
          <p>取消后将编辑失效.</p>
        </div>
      </div>
    </div>
    <div  class="pop-footer ">
      <a class="btn-base active-border"  href="javascript:;">取消</a>
      <a class="btn-base " id="hide_msg_box" href="javascript:;">确定</a>
    </div>
  </div>

  <!--
    	作者：李晶
    	时间：2017-06-19
    	描述：启用成功弹出提示
    -->
  <div id="use_box" class="pop pop-err">
    <div class="use-success">
      <i class="iconfont icon-gouxuan"></i><b>启用成功！</b>
    </div>
  </div>
</div>
</body>
<script src="../../plugins/bootstrap-table-develop/dist/extensions/reorder-rows/bootstrap-table-reorder-rows.js"></script>
<script src="../../plugins/jquery/jquery.tablednd.js"></script>
<script src="../../plugins/jquery/jquery.contextify.js"></script>
<script src="../../js/list.js"></script>
<script src="../../plugins/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
</html>
