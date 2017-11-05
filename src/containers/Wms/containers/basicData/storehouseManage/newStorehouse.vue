<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>库房管理新增</title>
  <link rel="stylesheet" href="../../plugins/bootstrap-3.3.7-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../fonts/iconfont.css">
  <link rel="stylesheet" href="../../css/reset.css">
  <!--<link rel="stylesheet" href="../../css/brand.css">-->
  <link rel="stylesheet" href="../../css/public.css">
  <link rel="stylesheet" href="../../css/storehouseManage/storehouseManage.css">
  <link rel="stylesheet" href="../../plugins/scroll/jquery.mCustomScrollbar.css"/>
  <link rel="stylesheet" href="../../plugins/city/css/city-picker.css">
</head>
<body>
  <!--标签功能操作栏  start-->
  <div id="tab-nav" class="modal-div clearfix">
    <div>
      <span class="return">
      <i class="iconfont icon-fanhui"></i>
      <a href="storehouse-manage.html">返回</a>
    </span>
      <p class="btnGroup btnGroup2">
        <a href="javascript:;">保存</a>
        <i>|</i>
        <a href="javascript:;">取消</a>
      </p>
      <p class="btnGroup btnGroup2">
        <a href="newStorehouse.html" class="btnGroup-last save-newBox">保存并新增</a>
      </p>
    </div>
  </div>
  <!--标签功能操作栏  end-->
  <!--仓库管理新增  start-->
  <div class="wms-main">
    <div class="mainContainer clearfix">
      <!--上内容  start-->
      <div class="mainContainer-t">
        <div class="groupL">
          <p class="groupL-p">
            <span>库房名称</span>
            <i class="star-icon">*</i>
            <input type="text" class="must-text" placeholder="请输入内容">
          </p>
          <div class="groupL">
            <p class="groupL-p f_l">
              <span class="f_l">库房性质</span>
              <select type="text" class="comboBox f_l">
                <option value="">单位</option>
                <option value="">单位</option>
                <option value="">单位</option>
              </select>
              <i class="newArrow"></i>
            </p>
          </div>
          <div class="groupL">
            <p class="groupL-p f_l">
              <span class="f_l">库房结构</span>
              <select type="text" class="comboBox f_l">
                <option value="">仓库</option>
                <option value="">单位</option>
                <option value="">单位</option>
              </select>
              <i class="newArrow"></i>
            </p>
          </div>
          <p class="groupL-p">
            <span>所属单位</span>
            <input type="text" class="disabled-bg" disabled="disabled">
          </p>
        </div>
        <div class="groupL group-gray">
          <p class="groupL-p  group-p-gray">
            <span>库房编码</span>
            <i class="star-icon">*</i>
            <input type="text" class="must-text" placeholder="请输入内容">
          </p>
          <p class="groupL-p">
            <span>温控属性</span>
            <i class="star-icon">*</i>
            <input type="text" class="must-text" placeholder="请输入内容">
          </p>
          <div class="groupL">
            <p class="groupL-p">
              <span>仓库面积</span>
              <i class="star-icon">*</i>
              <input type="text" class="must-text" placeholder="请输入内容">
              <i class="square">㎡</i>
            </p>
          </div>
          <p class="groupL-p">
            <span>物流园区</span>
            <input type="text" class="disabled-bg" placeholder="请输入内容">
          </p>
        </div>
        <div class="groupL">
          <p class="groupL-p f_l">
            <span class="f_l">库房属性</span>
            <select type="text" class="comboBox f_l">
              <option value="">一区</option>
              <option value="">一区</option>
              <option value="">一区</option>
            </select>
            <i class="newArrow"></i>
          </p>
          <div class="groupL">
            <p class="groupL-p f_l">
              <span class="f_l">卸货月台</span>
              <select type="text" class="comboBox f_l">
                <option value="">属性</option>
                <option value="">单位</option>
                <option value="">单位</option>
              </select>
              <i class="newArrow"></i>
            </p>
          </div>
          <p class="groupL-p">
            <span>所属仓库</span>
            <i class="star-icon">*</i>
            <input type="text" class="must-text" placeholder="请输入内容">
          </p>
        </div>
        <div class="groupb">
          <div class="group-p f_l">
            <span class="f_l">仓库所在地</span>
            <select type="text" class="countryBox f_l">
              <option value="">中国</option>
            </select>
            <i class="arrow-country"></i>
            <div class="docs-methods f_l">
              <form class="form-inline">
                <div id="distpicker">
                  <div class="form-group">
                    <div style="position: relative;">
                      <input id="city-picker3" class="form-control" readonly type="text" value="" data-toggle="city-picker">
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <input type="text" class="warehouse-address f_l" name="text" placeholder="请输入内容">
            <i class="iconfont icon-guanbi"></i>
          </div>
        </div>
        <p class="groupL-p groupL-pTextarea">
          <span>备注</span>
          <textarea name="" rows="" cols="" class="catagory-discribe"></textarea>
          <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
        </p>
      </div>
      <!--上内容  end-->
      <!--下内容  start-->
      <div class="mainContainer-b">
        <h2 class="information clearfix">
          <span>联系人信息</span>
        </h2>
        <div class="information-btn">
          <p class="btnGroup btnGroup2">
            <a href="javascript:;">增行</a>
          </p>
          <p class="btnGroup btnGroup2">
            <a href="javascript:;">删行</a>
          </p>
        </div>
        <table class="information-list">
          <tbody><tr class="list-thead">
            <td>序号</td>
            <td><input type="checkbox"></td>
            <td>岗位</td>
            <td>姓名</td>
            <td>联系电话</td>
            <td>邮箱</td>
            <td>自定义</td>
          </tr>
          <tr class="choose-tr">
            <td class="td-first">1</td>
            <td><input type="checkbox"></td>
            <td>收货组</td>
            <td>王宇龙</td>
            <td>15811431046</td>
            <td>wangyulong@163.com</td>
            <td>没有此人</td>
          </tr>
          <tr class="choose-tr">
            <td class="td-first">2</td>
            <td><input type="checkbox"></td>
            <td>收货组</td>
            <td>王宇龙</td>
            <td>15811431046</td>
            <td>wangyulong@163.com</td>
            <td>没有此人</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--下内容  end-->
    </div>
  </div>
  <!--仓库管理新增  end-->
</body>
<script src="../../plugins/jquery/jquery-1.11.1.min.js"></script>
<script src="../../plugins/jquery/jquery.contextify.js"></script>
<script src="../../plugins/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="../../js/list.js"></script>
<script src="../../plugins/city/js/city-picker.data.js"></script>
<script src="../../plugins/city/js/city-picker.js"></script>
</html>
