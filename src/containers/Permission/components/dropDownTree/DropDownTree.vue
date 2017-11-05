<!--本组件可配置的参数有
    外层input大小: size
    外层input默认显示值: placeholder,
    tree结构的标识id: nodeKey,
    是否多选: showCheckbox,
    重置props: defaultProps,
    treeData: 下拉树形结构数据
-->
<template>
    <div class="dropDownTree" :style="{'width': width}">
        <div class="input" :class="['el-input', size ? 'el-input--' + size : '']" @click="showTree">
            <i class="el-input__icon el-icon-caret-top"></i>
            <input autocomplete="off" size="small" readonly="readonly" icon="caret-top" type="text" rows="2" class="el-input__inner" v-model="dropTreeResult" :placeholder="placeholder">
        </div>
        <transition name="el-zoom-in-top">
            <div class="tree-wrapper" v-show="isShowTree">
                <el-input placeholder="输入关键字进行过滤" size="mini" :icon="filterText.length ? 'close' : 'search'" style="width: 216px; margin: 10px auto; display: block;" :on-icon-click="handleIconClick" v-model="filterText" v-if="searchShow">
                </el-input>
                <Tree :data="treeData" :show-checkbox="showCheckbox" default-expand-all :node-key="nodeKey" @node-click="handleNodeClick" ref="tree" :filter-node-method="filterNode" :props="defaultProps" :check-strictly="checkStrictly" highlight-current>
                </Tree>
                <div class="footer clearfix">
                    <span class="sure" @click="sure">确定</span>
                    <span class="cancel" @click="cancel">取消</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
// 测试专用
/*
let arr = [
  {
    permissionId: 1,
    orgName: '一级1',
    childOrgs: [
      {
        permissionId: 2,
        orgName: '二级1-1',
        childOrgs: []
      },
      {
        permissionId: 3,
        orgName: '二级1-2',
        childOrgs: []
      },
      {
        permissionId: 4,
        orgName: '二级1-3',
        childOrgs: [
          {
            permissionId: 5,
            orgName: '三级1-4',
            childOrgs: []
          }
        ]
      }
    ]
  },
  {
    permissionId: 6,
    orgName: '一级2',
    childOrgs: [
      {
        permissionId: 7,
        orgName: '二级2-1',
        childOrgs: []
      },
      {
        permissionId: 8,
        orgName: '二级2-2',
        childOrgs: []
      },
      {
        permissionId: 9,
        orgName: '二级2-3',
        childOrgs: [
          {
            permissionId: 10,
            orgName: '三级2-4',
            childOrgs: []
          }
        ]
      }
    ]
  }
]
*/
import 'element-ui/lib/theme-default/select.css'
export default {
    props: {
        size: {
            type: String,
            default: 'small'
        },
        width: {
            type: String,
            default: '130px'
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        nodeKey: {
            type: String,
            default: 'permissionId'
        },
        showCheckbox: {
            type: Boolean,
            default: true
        },
        defaultProps: {
            type: Object,
            default: function() {
                return {
                    children: 'childOrgs',
                    label: 'orgName'
                }
            }
        },
        treeData: {
            type: Array,
            default: function() {
                return []
            }
        },
        checkNodeListProp: {
            type: Array,
            default: function () {
                return []
            }
        },
        searchShow: {
            type: Boolean,
            default: false
        },
        checkNodeProp: {
            type: Object,
            default: function () {
                return {}
            }
        },
        formReadOnly: {
            type: Boolean,
            default: false
        },
        checkStrictly: {
            type: Boolean,
            default: false
        },
        checkOrgId: {
        }
    },
    data() {
        return {
            isShowTree: false,
            checkNodeList: [],
            checkNode: {},
            getCheckedNodes: [],
            filterText: ''
        }
    },
    computed: {
        dropTreeResult: function() {
            if (this.showCheckbox) {
                if (this.checkNodeList.length) {
                    return this.checkNodeList.length > 1 ? '已选择多项' : this.checkNodeList[0].orgName
                }
            } else {
                return this.checkNode.orgName
            }
        }
    },
    updated () {
        // 这里setTimeout的意思是让此组件捕获到prop
        setTimeout(() => {
            if (this.checkOrgId) {
                this._showCheckOrgName(this.checkOrgId)
            }
        }, 30)
        console.log(this.treeData, 'treeDatatreeDatatreeDatatreeData')
        if (this.checkNodeListProp.length) {
            this.checkNodeList = this.checkNodeListProp
        }
    },
    methods: {
        showTree() {
            if (this.formReadOnly) return
            this.isShowTree = !this.isShowTree
            if (this.isShowTree === false) return
            this.$nextTick(() => {
                if (this.dropTreeResult) {
                    this.$refs.tree.setCheckedNodes(this.getCheckedNodes)
                }
            })
        },
        sure() {
            this.isShowTree = false
            if (this.showCheckbox) {
                this.checkNodeList = []
                this.getCheckedNodes = this.$refs.tree.getCheckedNodes()
                this.getCheckedNodes.forEach((value, index) => {
                    if (!value.childOrgs.length) {
                        this.checkNodeList.push(value)
                    }
                })
            }
            console.log(this.checkNodeList, 'this.getCheckedNodes')
        },
        resetChecked() {
            this.checkNodeList = []
            this.checkNode = ''
            this.getCheckedNodes = []
            this.$refs.tree.setCheckedKeys([])
        },
        cancel() {
            this.isShowTree = false
        },
        filterNode(value, data) {
            if (!value) return true
            return data[this.defaultProps.label].indexOf(value) !== -1
        },
        handleNodeClick(data) {
            console.log(data, 6666666666666)
            this.checkNode = data
        },
        handleIconClick() {
            this.filterText = ''
        },
        _showCheckOrgName(orgId) {
            this.treeData.forEach(value => {
                if (value.permissionId === orgId) {
                    this.checkNode = value
                }
            })
        }
    },
    watch: {
        'checkNodeProp.orgName': function (newV, oldV) {
            this.checkNode = newV
        },
        filterText(val) {
            this.$refs.tree.filter(val)
        }
    }
}
</script>

<style lang="scss">
.dropDownTree {
    .tree-wrapper {
        position: absolute;
        z-index: 10;
        width: 238px;
        margin-bottom: 40px;
        border: 1px solid #ccc;
        border-radius: 4px;
        z-index: 100;
        background-color: #fff;
        .footer {
            border-top: 1px solid #eee;
            padding: 6px 0;
            &>span {
                float: right;
                width: 48px;
                height: 22px;
                line-height: 22px;
                border: 1px solid rgb(204, 204, 204);
                text-align: center;
                border-radius: 3px;
                font-size: 12px;
                margin-right: 10px;
                cursor: pointer;
                &.sure {
                    border-color: #28a7e1;
                }
            }
        }
    }
}

// elementUI样式
.input {
    position: relative;
    input {
        cursor: pointer;
    }
    .el-input__icon {
        color: #bfcbd9;
        font-size: 12px;
        transition: transform .3s;
        transform: translateY(-50%) rotate(180deg);
        line-height: 16px;
        top: 50%;
        cursor: pointer;
    }
}

.el-tree {
    border: 0;
}
</style>


