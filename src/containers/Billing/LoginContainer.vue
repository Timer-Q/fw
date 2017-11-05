<template>
    <div class="loginContainer">
        <div class="main">
            <div class="title">
                <h1>Billing后台管理系统</h1>
            </div>
            <div class="content">
                <div class="left">
                    <img src="/asserts/images/login/xinwen.jpg">
                </div>
                <div class="right">

                </div>
            </div>
            <div class="footer">
                <div>
                    <span>电话 010-85236266 · 邮箱 contact@okoer.com · 公司地址 北京市朝阳区工体北路4号机电大院81楼4层</span>
                    <br>
                    <span>京ICP备 14058988 号-2 · 京ICP证150533号 · Copyright ©2015-2016 OKOer Inc. All Rights Reserved.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $contentWidth: 1200px;

    .loginContainer {
        overflow: auto;
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: limegreen;
    }

    .main {
        /*background-color: plum;*/
        position: relative;
        height: 100%;
        /*background-color: orangered;*/
        width: $contentWidth;
        margin: auto;
    }

    .title {
        position: relative;
        top: 30px;
        text-align: center;
        font-size: 60px;
        line-height: 100px;
        font-family: 微软雅黑;
        text-align: center;
        height: 100px;
        /*background-color: yellow;*/
        h1 {
            /*text-space: 40px;*/
            letter-spacing: 50px;
            color: white;
            text-shadow: 10px 10px 10px #000;
        }
    }

    .content {
        z-index: 99;
        background-color: purple;
        position: relative;
        top: 100px;
        .left {
            margin-left: 40px;
            height: 550px;
            width: 550px;
            float: left;
            img {
                height: 100%;
                width: 100%;
                padding: 10px;
            }
        }
        .right {
            margin-right: 40px;
            /*background-color: orange;*/
            height: 550px;
            width: 550px;
            float: right;
            .form {
                position: relative;
                height: 100%;
                width: 100%;
                padding: 10px;
                .outer {
                    height: 100%;
                    width: 100%;
                    background-color: yellowgreen;
                    border: 1px solid darkgray;
                }
                .inner {
                    height: 300px;
                    width: 300px;
                    width: 50%;
                    height: 50%;
                    overflow: auto;
                    margin: auto;
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                }
                .button {
                    width: 100%;
                }
            }
        }
    }

    .footer {
        /*background-color: #6d7380;*/
        position: relative;
        top: 100px;
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<script>
    export default{
        data(){
            return {
                formInline: {
                    user: 'admin',
                    password: '1234567890'
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.formInline.user == 'admin') {
                            if (this.formInline.password == '1234567890') {
                                this.$router.push('/main')
                            } else {
                                this.$Message.error('密码不正确!')
                            }
                        } else {
                            this.$Message.error('用户名不正确!')
                        }

                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            }
        }
    }
</script>
