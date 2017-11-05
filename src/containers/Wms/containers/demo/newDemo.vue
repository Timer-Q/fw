<template>
    <div class="wms-popup">
        <!--主体内容  start-->
        <div ref="main">
            <!--表单头部    start-->
            <div class="vehicle-find">
                <div class="inblock">
                    <span class="hspace">用户编码</span>
                    <el-input type="text" v-model="user.userNo" class="license-number"
                              placeholder="请输入用户编码"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">用户姓名</span>
                    <el-input type="text" v-model="user.userName" class="license-number"
                              placeholder="请输入用户姓名"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">其他项</span>
                    <el-input type="text" class="license-number" placeholder="请输入/扫描"></el-input>
                </div>
                <div class="inblock">
                    <span class="hspace">其他项</span>
                    <el-input type="text" class="license-number" placeholder="请选择"></el-input>
                </div>
            </div>

            <div class="vehicle-foot">
                <div class="vehicle-btn">
                    <el-button @click="save">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
        <!--主体内容  end-->
    </div>
</template>
<script type="es6">
    let _this
    let api = {
        test: ''
    }
    export default {
        created() {
            _this = this
            _this.api = api
        },
        // props为固定写法，用来从父组件获取一个参数
        // 如果需要获取的参数不只一个，来咨询一下
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                // 空用户，备用
                emptyUser: {
                    userNo: '',
                    userName: ''
                },
                // 新增或者编辑用户，绑定到页面
                user: {}
            }
        },
        watch: {
            // 监听value值变化，从而去加载需要编辑的数据
            value() {
                _this.loadUser()
            }
        },
        methods: {
            loadUser() {
                // 如果传入了用户id，则标识需要编辑指定的用户
                // 否则，需要清空数据
                if (typeof _this.value === 'string' && _this.value.length > 0) {
                    // 调用接口，获取指定id的用户，假设服务返回了user对象
                    let user = {
                        userNo: 'zhangsan',
                        userName: '加载出来的：张三'
                    }
                    // 绑定到界面

                    _this.user = user
                }
                else {
                    // 清掉数据
                    _this.user = this.emptyUser
                }
            },
            cancel() {
                // 触发事件cancel
                _this.$emit('cancel')
            },
            save() {
                // 先校验数据是否有效
                if (_this.userNo.length < 1) {
                    _this.$alert('请录入用户编码！', '', {
                        type: 'warning',
                        closeOnClickModal: true
                    })

                    // 验证失败，则return，否则下面的代码就要放在else里

                    return
                }
                let user = {
                    userNo: _this.userNo,
                    userName: _this.userName
                }

                /*
                *
                * 此处写调用api，保存user对象
                * 如果保存失败，则给出相应提示
                *
                * 假设保存成功了
                *
                * */

                // 保存成功，触发事件saved
                _this.$emit('saved')

                // 也可以触发事件时返回一些参数
                // _this.$emit('saved', user)
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .wms-popup {
        padding: 16px;
        .vehicle-find {
            margin-bottom: 10px;
            .inblock {
                margin-right: 10px;
            }
        }
        .vehicle-foot {
            position: absolute;
            bottom: 10px;
            right: 20px;
        }
    }
</style>
