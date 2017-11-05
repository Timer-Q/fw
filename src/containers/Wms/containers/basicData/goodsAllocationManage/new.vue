<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>货位管理新增</title>
  <link rel="stylesheet" href="../../plugins/bootstrap-3.3.7-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../plugins/bootstrap-table-develop/dist/bootstrap-table.min.css">
  <link rel="stylesheet" href="../../plugins/tree/zTreeStyle/zTreeStyle.css">
  <link rel="stylesheet" href="../../plugins/scroll/jquery.mCustomScrollbar.css"/>
  <link rel="stylesheet" href="../../fonts/iconfont.css">
  <link rel="stylesheet" href="../../css/reset.css">
  <link rel="stylesheet" href="../../css/list.css">
  <link rel="stylesheet" href="../../css/public.css">
  <link rel="stylesheet" href="../../css/popup.css">
  <link rel="stylesheet" href="../../css/goodsAllocationManage/goodsAllocationManage.css">
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
      <a href="goodsAllocation-manage.html">返回</a>
    </span>
      <p class="btnGroup">
        <a href="javascript:;">保存</a>
        <i>|</i>
        <a href="javascript:;">取消</a>
      </p>
      <p class="btnGroup">
        <a href="newGoodsAllocation.html">保存并新增</a>
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
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">所属仓库</span>
              <select type="text" class="comboBox f_l">
                <option value="">仓库</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>货位条码</span>
              <input type="text" class="disabled-bg" value="" disabled="disabled">
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">货架类型</span>
              <select type="text" class="comboBox f_l">
                <option value="">类型</option>
                <option value="">类型</option>
                <option value="">类型</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>货物属性</span>
              <input type="text" class="disabled-bg" value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>商品品类</span>
              <input type="text" class="disabled-bg" value="" disabled="disabled">
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">一位一品属性</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">属性</option>
                <option value="">属性</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>隶属楼层</span>
              <input type="text" class="disabled-bg" value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>长度</span>
              <input type="text">
              <i class="units">cm</i>
            </p>
            <p class="groupL-p">
              <span>可用最大数量</span>
              <input type="text">
            </p>
            <p class="groupL-p">
              <span>容积</span>
              <input type="text" class="disabled-bg" value="" disabled="disabled">
              <i class="units">m³</i>
            </p>
            <p class="groupL-p">
              <span>可用重量比例</span>
              <input type="text">
            </p>
            <p class="groupL-p">
              <span>剩余最大数量</span>
              <input type="text" class="disabled-bg" value="" disabled="disabled">
            </p>
            <p class="groupL-p groupL-pTextarea">
              <span>品牌描述</span>
              <textarea name="" rows="" cols="" class="catagory-discribe"></textarea>
              <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
            </p>
          </div>
          <div class="groupL">
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">所属库区</span>
              <select type="text" class="comboBox f_l">
                <option value="">类型</option>
                <option value="">类型</option>
                <option value="">类型</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>货位顺序号</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>库区类型</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>退货属性</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>储存属性</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">一位一货主</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">技工</option>
                <option value="">技工</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>贵重物品</span>
              <input type="checkbox" class="formckbox">
            </p>
            <p class="groupL-p">
              <span>宽度</span>
              <input type="text">
              <i class="units">cm</i>
            </p>
            <p class="groupL-p">
              <span>可用最大体积</span>
              <input type="text">
              <i class="units">m³</i>
            </p>
            <p class="groupL-p">
              <span>可用容积比例</span>
              <input type="text">
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">停止移入</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">类型</option>
                <option value="">类型</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>剩余最大体积</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
              <i class="units">m³</i>
            </p>
          </div>
          <div class="groupL">
            <p class="groupL-p">
              <span>货位编码</span>
              <i class="star-icon">*</i>
              <input type="text" class="must-text" placeholder="请输入内容">
            </p>
            <p class="groupL-p">
              <span>货位状态</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>用途属性</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>补货属性</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>存储规格</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p ml-24 f_l void">
              <span class="f_l">商品ABC分类</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
           <!-- <p class="groupL-p void">
              &lt;!&ndash;<span>货位顺序号</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">&ndash;&gt;
            </p>-->
            <p class="groupL-p">
              <span>高度</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
              <i class="units">cm</i>
            </p>
            <p class="groupL-p">
              <span>可用最大重量</span>
              <input type="text">
              <i class="units">kg</i>
            </p>
            <p class="groupL-p">
              <span>可用数量比例</span>
              <input type="text">
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">停止移出</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>剩余最大重量</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
              <i class="units">kg</i>
            </p>
          </div>
        </div>
      </div>
      <!--右侧新增  end-->
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
      <a class="btn-base " id="hide_msg_box" href="###">确定</a>
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
</body>
<script src="../../plugins/bootstrap-table-develop/dist/extensions/reorder-rows/bootstrap-table-reorder-rows.js"></script>
<script src="../../plugins/jquery/jquery.tablednd.js"></script>
<script src="../../plugins/jquery/jquery.contextify.js"></script>
<script src="../../js/list.js"></script>
<script src="../../plugins/tree/jquery.ztree.core-3.5.js"></script>
<script src="../../plugins/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
</html>
