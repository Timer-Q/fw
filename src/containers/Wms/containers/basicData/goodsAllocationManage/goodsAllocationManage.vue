<template>
    <div class="items">
        <!--标签功能操作栏  start-->
        <div class="wms-modal-div clearfix">
            <div>
                <p class="btnGroup">
                    <a href="newGoodsAllocation.html">新增</a>
                    <i>|</i>
                    <a href="batchNewGoodsAllocation.html">批量新增</a>
                </p>
                <p class="btnGroup">
                    <a href="###" class="use-btn">启用</a>
                    <i>|</i>
                    <a href="###" class="disable-btn">停用</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;" id="import">导入</a>
                    <i>|</i>
                    <a href="javascript:;">下载模板</a>
                    <i>|</i>
                    <a href="javascript:;">导出</a>
                </p>
                <p class="btnGroup">
                    <a href="javascript:;">日志</a>
                </p>
                <p class="btnGroup">
                    <a href="###">条码打印</a>
                    <i>|</i>
                    <a href="###">货位占位清空</a>
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
                <div class="mainContainer-show">
                    <i class="iconfont icon-sousuo"></i>
                </div>
                <div class="mainLeft">
                    <div class="mainLeft-hide">
                        <a href="javascript:;" class="active-color f14-title">查询方案</a>
                        <i class="iconfont icon-shouqi" id="hideLeft-btn"></i>
                    </div>
                    <ul class="search-list">
                        <li><a href="javascript:;" class="active-color">装卸队查询></a></li>
                        <li><a href="javascript:;">个人查询<</a></li>
                    </ul>
                    <div class="mainLeft-bottom">
                        <div class="mainLeft-title f14-title title-top">快速查询<i class="iconfont icon-xiajiantou"></i></div>
                        <div class="bottom-hide">
                            <p>货位编码</p>
                            <input type="text" />
                            <div class="groupL-pr">
                                <p class="groupL-p group-l">
                                    <span class="pb-2">所属仓库</span>
                                    <select type="text" class="comboBox comboBox-l">
                                        <option value=""></option>
                                        <option value="">仓库</option>
                                        <option value="">仓库</option>
                                    </select>
                                    <i class="iconfont icon-xiajiantou newArrow-l"></i>
                                </p>
                            </div>
                            <div class="groupL-pr">
                                <p class="groupL-p group-l">
                                    <span class="pb-2">所属库区</span>
                                    <select type="text" class="comboBox comboBox-l">
                                        <option value=""></option>
                                        <option value="">仓库</option>
                                        <option value="">仓库</option>
                                    </select>
                                    <i class="iconfont icon-xiajiantou newArrow-l"></i>
                                </p>
                            </div>
                            <div class="groupL-pr">
                                <p class="groupL-p group-l">
                                    <span class="pb-2">货物属性</span>
                                    <select type="text" class="comboBox comboBox-l">
                                        <option value=""></option>
                                        <option value="">仓库</option>
                                        <option value="">仓库</option>
                                    </select>
                                    <i class="iconfont icon-xiajiantou newArrow-l"></i>
                                </p>
                            </div>
                            <div class="groupL-pr">
                                <p class="groupL-p group-l">
                                    <span class="pb-2">货位状态</span>
                                    <select type="text" class="comboBox comboBox-l">
                                        <option value=""></option>
                                        <option value="">状态</option>
                                        <option value="">状态</option>
                                    </select>
                                    <i class="iconfont icon-xiajiantou newArrow-l"></i>
                                </p>
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
                            <td><input type="checkbox"></td>
                            <td>启用状态</td>
                            <td>货位编号</td>
                            <td>所属仓库</td>
                            <td>所属库区</td>
                            <td>货位状态</td>
                            <td>货位条码</td>
                            <td>货位顺序号</td>
                            <td>货架类型</td>
                            <td>库区类型</td>
                            <td>用途属性</td>
                            <td>货物属性</td>
                            <td>退货属性</td>
                        </tr>
                        <tr class="choose-tr">
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr class="choose-tr">
                            <td class="td-first">1</td>
                            <td><input type="checkbox"></td>
                            <td>存盘</td>
                            <td><a href="javascript:;">A01</a></td>
                            <td>张三</td>
                            <td></td>
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
                            <td><input type="checkbox"></td>
                            <td>存盘</td>
                            <td><a href="javascript:;">A01</a></td>
                            <td>张三</td>
                            <td>xxx</td>
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
    </div>
</template>


