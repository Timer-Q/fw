<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>新增库区管理</title>
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
      <span class="return">
      <i class="iconfont icon-fanhui"></i>
      <a href="reservoir-manage.html">返回</a>
    </span>
      <p class="btnGroup">
        <a href="javascript:;">保存</a>
        <i>|</i>
        <a href="javascript:;">取消</a>
      </p>
      <p class="btnGroup">
        <a href="newReservoir.html">保存并新增</a>
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
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">库区类型</span>
              <select type="text" class="comboBox f_l">
                <option value="">类型</option>
                <option value="">类型</option>
                <option value="">类型</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">退货属性</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">属性</option>
                <option value="">属性</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">商品品类</span>
              <select type="text" class="comboBox f_l">
                <option value="">品类</option>
                <option value="">品类</option>
                <option value="">品类</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">温控属性</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">属性</option>
                <option value="">品类</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>隶属楼层</span>
              <input type="text" class="" placeholder="请输入内容">
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">停止移出</span>
              <select type="text" class="comboBox f_l">
                <option value="">xxxx</option>
                <option value="">品类</option>
                <option value="">品类</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p groupL-pTextarea">
              <span>品牌描述</span>
              <textarea name="" rows="" cols="" class="catagory-discribe"></textarea>
              <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
            </p>
          </div>
          <div class="groupL">
            <p class="groupL-p">
              <span>库区编码</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
            <p class="groupL-p">
              <span>用途属性</span>
              <i class="star-icon">*</i>
              <input type="text" class="must-text" placeholder="请输入内容">
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">补货属性</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">技工</option>
                <option value="">技工</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">一品一位属性</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">类型</option>
                <option value="">类型</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">存储规则</span>
              <select type="text" class="comboBox f_l">
                <option value="">规则</option>
                <option value="">类型</option>
                <option value="">类型</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p">
              <span>库区编码</span>
              <input type="text" class="disabled-bg"value="" disabled="disabled">
            </p>
          </div>
          <div class="groupL">
            <p class="groupL-p">
              <span>库区名称</span>
              <i class="star-icon">*</i>
              <input type="text" class="must-text" placeholder="请输入内容">
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">货物属性</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">存储属性</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">一位一货主</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">商品ABC分类</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
            <p class="groupL-p ml-24 f_l">
              <span class="f_l">停止移入</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">仓库</option>
                <option value="">仓库</option>
              </select>
              <i class="iconfont icon-xiajiantou"></i>
            </p>
          </div>

        </div>
      </div>
      <!--右侧新增  end-->
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
