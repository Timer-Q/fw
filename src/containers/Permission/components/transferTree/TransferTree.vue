<template>
    <div class="transferTree-layer" @click.self="fadeTransferTree">
        <div class="transferTree">
            <div class="transferTree-head clearfix">
                <span class="title">添加功能权限</span>
                <i class="iconfont icon-guanbi" @click="fadeTransferTree"></i>
            </div>
            <div class="transferTree-content clearfix">
                <div class="left">
                    <div class="title">所有功能</div>
                    <div class="content">
                        <el-input placeholder="请输入功能名称" icon="search" v-model="allPower" @change="allPowerChange" :on-icon-click="searchAllPower" style="width: 206px; height: 27px; margin: 10px auto 0;">
                        </el-input>
                        <el-tree :data="allDate" show-checkbox node-key="id" :filter-node-method="allTreeFilter" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" @check-change="checkChange" ref="allTree">
                        </el-tree>
                    </div>
                </div>
                <div class="mid">
                    <div class="add" @click="addTree">添加 > </div>
                    <div class="remove">
                        < 移除</div>
                    </div>
                    <div class="right">
                        <div class="title">所有功能</div>
                        <div class="content">
                            <el-input placeholder="请输入功能名称" icon="search" v-model="selectedPower" @change="selectedPowerChange" :on-icon-click="searchSelectedPower" style="width: 206px; height: 27px; margin: 10px auto 0;">
                            </el-input>
                            <el-tree :data="selectDate" show-checkbox node-key="id" ref="selectedTree" :filter-node-method="selectedTreeFilter" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]">
                            </el-tree>
                        </div>
                    </div>
                </div>
                <div class="transferTree-foot">
                    <span class="sure">确认</span>
                    <span class="cancel">取消</span>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            allPower: '',
            selectedPower: '',
            allDate: [
                {
                    id: 1,
                    label: '一级 2',
                    children: [
                        {
                            id: 3,
                            label: '二级 2-1',
                            children: [
                                {
                                    id: 4,
                                    label: '三级 3-1-1'
                                },
                                {
                                    id: 5,
                                    label: '三级 3-1-2'
                                }
                            ]
                        },
                        {
                            id: 2,
                            label: '二级 2-2',
                            children: [
                                {
                                    id: 6,
                                    label: '三级 3-2-1'
                                },
                                {
                                    id: 7,
                                    label: '三级 3-2-2',
                                    children: [
                                        {
                                            id: 6,
                                            label: '四级 4-2-1'
                                        },
                                        {
                                            id: 7,
                                            label: '四级 4-2-2'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            selectDate: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        searchAllPower() {
            this.$refs.allTree.filter(this.allPower)
        },
        searchSelectedPower() {
            this.$refs.selectedTree.filter(this.selectedPower)
        },
        fadeTransferTree() {
            this.$emit('fadeTransferTree')
        },
        allTreeFilter(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        selectedTreeFilter(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        allPowerChange(value) {
            if (value === '') {
                this.$refs.allTree.filter(this.allPower)
            }
        },
        selectedPowerChange(value) {
            if (value === '') {
                this.$refs.selectedTree.filter(this.selectedPower)
            }
        },
        addTree() {
            var checkKeyList = this.$refs.allTree.getCheckedKeys()
            console.log(checkKeyList)
            this._sortArr(this.allDate)
        },
        _sortArr(arr) {
            arr.forEach(value => {
                console.log(value)
            })
        },
        checkChange() {
            console.log(arguments, '111111111')
        }
    }
}
</script>

<style lang="scss">
.transferTree-layer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
    .transferTree {
        width: 594px;
        height: 440px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -287px;
        margin-top: -220px;
        background-color: #fff;
        .transferTree-head {
            height: 36px;
            line-height: 36px;
            color: #fff;
            background-color: #49b1df;
            padding: 0 17px;
            .icon-guanbi {
                float: right;
                cursor: pointer;
            }
        }
        .transferTree-content {
            width: 96%;
            min-height: 360px;
            margin: 0 auto;
            overflow-x: auto;
            font-size: 14px;
            &>div {
                float: left;
            }
            .left,
            .right {
                width: 228px;
                .title {
                    height: 30px;
                    line-height: 30px;
                    margin-top: 7px;
                }
                .el-tree {
                    border: 0;
                }
                .el-input {
                    display: block;
                    .el-input__inner {
                        height: 27px;
                    }
                }
                .content {
                    height: 300px;
                    overflow-y: auto;
                    border: 1px solid #cacaca;
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
            .left {}
            .mid {
                width: 114px;
                margin-top: 26%;
                &>div {
                    width: 66px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin: 0 auto;
                    cursor: pointer;
                }
                .remove {
                    margin-top: 16px;
                    background-color: #f0fbff;
                    border-color: #2aa5e4;
                }
            }
        }
        .transferTree-foot {
            background-color: #f5f5f5;
            height: 45px;
            padding: 0 17px;
            font-size: 14px;
            span {
                float: right;
                width: 66px;
                height: 24px;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin-top: 11px;
                line-height: 24px;
                text-align: center;
                cursor: pointer;
                &.sure {
                    border: 1px solid #2aa5e4;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
