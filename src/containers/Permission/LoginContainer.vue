<template>
    <div class="login_or_register">
        <div class="" v-show="showLogin">
            <div class="login_content ">
                <h3>登录</h3>
                <div class="blockInp">
                    <input type="text" placeholder="用户账号/手机号/邮箱" v-model="username">
                </div>
                <div class="blockInp">
                    <input type="password" placeholder="请输入密码" v-model="password">
                </div>
                <div class="blockInp">
                    <div class="mid-blockInp" style="overflow: hidden;">
                        <input type="text" placeholder="请输入验证码" class="yanzhengma_input" v-model="code"
                               style="height: 35px;width: 100px; float: left;"/>
                        <img id="code" :src="captcha" @click="createCode"
                             style="width: 120px; height: 35px; float: right;"/> <br>
                    </div>
                </div>
                <p v-show="showTishi">{{tishi}}</p>
                <!--<div class="forget-p">-->
                <!--<router-link to="/forget" class="forget">忘记密码</router-link>-->
                <!--</div>-->
                <button @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .forget-p {
        width: 250px;
        margin: 20px auto 0;
        text-align: right;
    }

    .forget {
        color: #666;
    }

    .blockInp {
        margin-bottom: 20px;
    }

    .blockInp .mid-blockInp {
        width: 250px;
        margin: 0 auto;
    }

    .yanzhengma_input {
        width: 170px;
    }

    .verification1 {
        vertical-align: middle;
        transform: translate(-15px, 0);
        width: 102px;
    }

    #code {
        font-size: 18px;
        letter-spacing: 3px;
        color: #053d84;
        margin-bottom: 0px;
        background: #f2f2f5;
    }

    .login_content {
        width: 400px;
        background-color: #fff;
        box-shadow: 0 0 15px rgba(0, 0, 0, .5);
        position: absolute;
        left: calc(50% - 200px);
        top: calc(50% - 200px);
    }

    .login_content h3 {
        text-align: center;
    }

    .login_content p {
        margin-top: 30px;
        font-size: 25px;
        line-height: 18px;
        margin-bottom: 15px;
    }

    .login_content input {
        padding: 5px 0 5px 10px;
        height: 30px;
        /*margin-top: 25px;*/
        border: 1px solid #e6e6e6;
    }

    .login_bac {
        width: 1180px;
        height: 728px;
        background-size: 1180px 728px;
        margin: 0 auto;
        position: relative;
    }

    .login_or_register {
        background-color: #f2f2f5;
        padding-bottom: 50px;
    }

    .inline {
        display: inline-block;
    }

    /*begin*/
    .login-wrap {
        text-align: center;
    }

    input {
        display: block;
        width: 250px;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        outline: none;
        border: 1px solid #888;
        padding: 10px;
        box-sizing: border-box;
    }

    p {
        color: red;
    }

    button {
        display: block;
        width: 250px;
        height: 40px;
        line-height: 40px;
        margin: 20px auto 30px;
        border: none;
        background-color: #41b883;
        color: #fff;
        font-size: 16px;
    }

    span {
        cursor: pointer;
    }

    span:hover {
        color: #41b883;
    }
</style>

<script>
    import config from '@/config'
    import loginService from '@Permission/services/loginService.js'
    import * as loginAndPermissionConst from '@/store/loginAndPermissionConst.js'

    export default {
        data() {
            return {
                showLogin: true,
                showRegister: false,
                showTishi: false,
                tishi: '',
                username: '',
                password: '',
                newUsername: '',
                newPassword: '',
                // 前端是否显示验证码
                useCode: true,
                // 区分web和app
                sourceType: 'WEB',
                // 输入的验证码
                code: '',
                captcha: '',
                captchaToken: '',
                businessSystem: 'PERMISSION'
            }
        },
        created() {
            loginService.getCode().then(res=> {
                this.captcha = res.data.captcha
                this.captchaToken = res.data.captchaToken
            })
        },
        methods: {
            login() {
                if (this.username == "" || this.password == "") {
                    this.showTishi = true
                    this.tishi = "请输入用户名或密码"
                    setTimeout(function () {
                        this.showTishi = false
                        this.tishi = ""
                    }.bind(this), 1000)
                } else {
                    let data = {
                        'loginName': this.username,
                        'password': this.password,
                        'useCode': this.useCode,
                        'businessSystem': this.businessSystem,
                        'sourceType': this.sourceType,
                        'code': this.code,
                        'captchaToken': this.captchaToken
                    }

                    loginService.userLogin(data).then(res => {
                        // 使用vuex存储
                        // this.$store.commit(loginAndPermissionConst.M_SET_USERAUTHOR, res.data.result)
                        // 使用localstorage存储
                        localStorage['userAuthor']=JSON.stringify(res.data.result)
                        localStorage['funcMenuList']=JSON.stringify(res.data.result.menus.funcs)

                        if (res.data.status.statusCode === 0) {
                            this.tishi = "登录成功"
                            this.showTishi = true
                            setTimeout(function () {
                                this.$router.push('/permission')
                            }.bind(this), 1000)
                        } else {
                            this.showTishi = true
                            this.tishi = res.data.status.statusReason
                            setTimeout(function () {
                                this.showTishi = false
                                this.tishi = ""
                            }.bind(this), 1000)
                        }
                    })


                }
            },
            // 图片验证码
            createCode() {
                loginService.getCode().then(res=> {
                    this.captcha = res.data.captcha
                    this.captchaToken = res.data.captchaToken
                })
            }
        }
    }
</script>

