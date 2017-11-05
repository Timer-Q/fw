<template>
    <div class="inquirePlanLayer clearfix">
        <div class="header clearfix">
            <span class="title">查询</span>
            <span class="iconfont icon-close close"></span>
        </div>
        <div class="body">
            <div class="slide">
                <div class="title">查询方案</div>
                <ul>
                    <li v-for="(item, index) in inquirePlanList" :key="index" class="plan-item">{{item.name}}</li>
                </ul>
            </div>
            <div class="content">
                <div class="title">查询条件</div>
                <div class="searchBar">
                    <input type="text" placeholder="综合查询">
                    <span class="saveInquirePlan">保持查询方案</span>
                    <span class="alter">修改</span>
                    <span class="clear">清空</span>
                </div>
                <div class="scroll-area">
                    <div class="inquirePlanTable">
                        <el-table :data="tableData" border style="width: 96%;margin: 0 auto">
                            <el-table-column prop="index" label="序号" type="index" width="58">
                            </el-table-column>
                            <el-table-column prop="conditionName" label="条件名称" width="102">
                            </el-table-column>
                            <el-table-column prop="relation" label="关系符" width="90">
                            </el-table-column>
                            <el-table-column prop="conditionValue" label="条件值" width="285">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <span class="inquireBtn">立即查询</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inquirePlanList: [
                { name: '查询方案1' },
                { name: '查询方案2' },
                { name: '查询方案3' },
                { name: '查询方案4' },
                { name: '查询方案5' },
                { name: '查询方案6' },
                { name: '查询方案7' },
                { name: '查询方案8' },
                { name: '查询方案9' },
                { name: '查询方案10' },
                { name: '查询方案11' },
                { name: '查询方案12' },
                { name: '查询方案13' },
                { name: '查询方案14' }
            ],
            tableData: [
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                },
                {
                    conditionName: '所属组织',
                    relation: '等于',
                    conditionValue: 'FWCGTZ201709041043'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.inquirePlanLayer {
    position: absolute;
    width: 760px;
    height: 490px;
    top: 50%;
    left: 50%;
    margin-left: -380px;
    margin-top: -245px;
    .header {
        background-color: #49b1df;
        color: #fff;
        padding: 0 2%;
        height: 38px;
        line-height: 38px;
        .title {
            float: left;
        }
        .close {
            float: right;
        }
    }
    .body {
        height: 376px;
        background-color: #fff;
        font-size: 14px;
        .title {
            height: 38px;
            padding-left: 18px;
            background-color: #f8f8f8;
            line-height: 38px;
        }
        .slide {
            float: left;
            width: 196px;
            overflow-y: auto;
            height: 100%;
            color: #333;
            ul {
                .plan-item {
                    width: 170px;
                    height: 28px;
                    border-bottom: 1px solid #efefef;
                    margin: 0 auto;
                    line-height: 28px;
                }
            }
            /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
            &::-webkit-scrollbar {
                width: 5px;
                height: 16px;
                background-color: #eee;
            }
            /*定义滚动条的轨道，内阴影及圆角*/
            &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px #fff;
                border-radius: 10px;
                background-color: #fff;
            }
            /*定义滑块，内阴影及圆角*/
            &::-webkit-scrollbar-thumb {
                width: 10px;
                height: 20px;
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px #eee;
                background-color: #eee;
            }
        }
        .content {
            .searchBar {
                margin-top: 16px;
                margin-left: 208px;
                margin-bottom: 10px;
                span {
                    cursor: pointer;
                    margin-left: 5px;
                }
                input {
                    width: 340px;
                    height: 24px;
                    display: inline-block;
                    border: 1px solid #ccc;
                    padding: 0 8px;
                    outline: none;
                    &::-webkit-input-placeholder {
                        color: #ccc;
                    }
                }
                .saveInquirePlan {
                    height: 24px;
                    display: inline-block;
                    width: 92px;
                    border: 1px solid #cdcdcd;
                    border-radius: 4px;
                    background-color: #f5f5f5;
                    text-align: center;
                    line-height: 24px;
                    color: #cdcdcd;
                }
                .alter {
                    color: #49b1df;
                    text-decoration: underline;
                }
                .clear {
                    color: #929292;
                }
            }
            .scroll-area {
                margin-left: 197px;
                overflow-y: scroll;
                height: 286px;
                .inquirePlanTable {
                    .el-table__header-wrapper {
                        thead tr th .cell {
                            font-weight: normal;
                            padding: 0;
                            text-align: center;
                        }
                    }
                    .el-table__body-wrapper {
                        tbody tr td {
                            padding: 0;
                        }
                    }
                }
                /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
                &::-webkit-scrollbar {
                    width: 5px;
                    height: 16px;
                    background-color: #eee;
                }
                /*定义滚动条的轨道，内阴影及圆角*/
                &::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px #fff;
                    border-radius: 10px;
                    background-color: #fff;
                }
                /*定义滑块，内阴影及圆角*/
                &::-webkit-scrollbar-thumb {
                    width: 10px;
                    height: 20px;
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px #eee;
                    background-color: #eee;
                }
            }
        }
    }
}
</style>


