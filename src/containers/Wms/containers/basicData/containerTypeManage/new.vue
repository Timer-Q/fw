<template>
    <div class="wms-items" v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
      <span class="return">
          <i class="iconfont icon-fanhui"></i>
          <a href="###">返回</a>
      </span>
        <p class="btnGroup">
            <a href="javascript:;">保存</a>
            <i>|</i>
            <a href="javascript:;">取消</a>
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
                            <p class="groupL-p ml-22 f_l">
                                <span class="f_l">仓库信息</span>
                                <select type="text" class="comboBox f_l">
                                    <option value="">类型</option>
                                    <option value="">类型</option>
                                    <option value="">类型</option>
                                </select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </p>
                            <p class="groupL-p">
                                <span>长度(cm)</span>
                                <i class="star-icon">*</i>
                                <input type="text" class="must-text" placeholder="请输入内容">
                            </p>
                            <p class="groupL-p">
                                <span>体积(㎡)</span>
                                <input type="text" class="disabled-bg" placeholder="请输入内容" value="" disabled="disabled">
                            </p>
                        </div>
                        <div class="groupL">
                            <p class="groupL-p ml-22 f_l">
                                <span class="f_l">容器类型</span>
                                <select type="text" class="comboBox f_l">
                                    <option value="">仓库</option>
                                    <option value="">仓库</option>
                                    <option value="">仓库</option>
                                </select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </p>
                            <p class="groupL-p">
                                <span>宽度(cm)</span>
                                <i class="star-icon">*</i>
                                <input type="text" class="must-text" placeholder="请输入内容">
                            </p>
                            <p class="groupL-p">
                                <span>最大承重(KG)</span>
                                <i class="star-icon">*</i>
                                <input type="text" class="must-text" placeholder="请输入内容">
                            </p>
                        </div>
                        <div class="groupL">
                            <p class="groupL-p">
                                <span>容器类型</span>
                                <i class="star-icon">*</i>
                                <input type="text" class="must-text" placeholder="请输入内容">
                            </p>
                            <p class="groupL-p">
                                <span>高度(cm)</span>
                                <i class="star-icon">*</i>
                                <input type="text" class="must-text" placeholder="请输入内容">
                            </p>
                        </div>
                        <div class="groupL-hide">
                            <p class="groupL-p groupL-check">
                                <span>是否带格子</span>
                                <input type="checkbox" id="btn-check" placeholder="请输入内容">
                            </p>
                            <div class="groupL">
                                <p class="groupL-p">
                                    <span>列数</span>
                                    <input type="text" class="" placeholder="请输入内容">
                                </p>
                            </div>
                            <div class="groupL">
                                <p class="groupL-p">
                                    <span>行数</span>
                                    <input type="text" class="" placeholder="请输入内容">
                                </p>
                            </div>
                            <div class="groupL">
                                <p class="groupL-p">
                                    <span>格子顺序</span>
                                    <input type="text" class="" placeholder="请输入内容">
                                </p>
                            </div>
                        </div>
                        <p class="groupL-p groupL-pTextarea">
                            <span>备注</span>
                            <textarea name="" rows="" cols="" class="catagory-discribe"></textarea>
                            <a class="textarea-prompt"><b class="words-number">0</b>/200</a>
                        </p>
                    </div>
                </div>
                <!--右侧新增  end-->
            </div>
        </div>
        <!--主体内容  end-->
    </div>
</template>
