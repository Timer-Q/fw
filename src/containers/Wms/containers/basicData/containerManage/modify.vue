<template>
    <div class="wms-items" v-if="isCache">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
      <span class="return">
      <i class="iconfont icon-fanhui"></i>
      <a href="container-managed.html">返回</a>
    </span>
                <p class="btnGroup">
                    <a href="JavaScript:;">修改</a>
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
                        <div class="groupL-r4">
                            <p class="groupL-pr4 ml-27 f_l">
                                <span class="f_l">仓库信息</span>
                                <select type="text" class="comboBox-r4 f_l">
                                    <option value="">天津武清仓库</option>
                                    <option value="">类型</option>
                                    <option value="">类型</option>
                                </select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </p>
                            <p class="groupL-pr4">
                                <span>长度(cm)</span>
                                <input type="text" placeholder="150">
                            </p>
                            <p class="groupL-pr4">
                                <span>最大承重(KG)</span>
                                <input type="text" placeholder="2000">
                            </p>
                        </div>
                        <div class="groupL-r4">
                            <p class="groupL-pr4">
                                <span>容器编码</span>
                                <i class="star-icon">*</i>
                                <input type="text" class="" placeholder="请输入内容">
                            </p>
                            <p class="groupL-pr4">
                                <span>宽度(cm)</span>
                                <input type="text" placeholder="60">
                            </p>
                            <p class="groupL-pr4">
                                <span>最大堆叠量</span>
                                <input type="text" placeholder="20">
                            </p>
                        </div>
                        <div class="groupL-r4">
                            <p class="groupL-pr4 ml-27 f_l">
                                <span class="f_l">容器类型</span>
                                <select type="text" class="comboBox-r4 f_l">
                                    <option value="">仓库</option>
                                    <option value="">仓库</option>
                                    <option value="">仓库</option>
                                </select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </p>
                            <p class="groupL-pr4">
                                <span>高度(cm)</span>
                                <input type="text" placeholder="130">
                            </p>
                        </div>
                        <div class="groupL-r4">
                            <p class="groupL-pr4 ml-27 f_l">
                                <span class="f_l">容器类别</span>
                                <select type="text" class="comboBox-r4 f_l">
                                    <option value="">仓库</option>
                                    <option value="">仓库</option>
                                    <option value="">仓库</option>
                                </select>
                                <i class="iconfont icon-xiajiantou"></i>
                            </p>
                            <p class="groupL-pr4">
                                <span>体积(㎡)</span>
                                <input type="text" placeholder="30">
                            </p>
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

