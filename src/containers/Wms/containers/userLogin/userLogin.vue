<template>
  <div class="wms-items" v-if="isCache">
      <div class="content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
              <div class="login-panel">
                  <div class="title">用户登录</div>
                  <el-form-item prop="username" class="item">
                      <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item prop="password" class="item">
                      <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                  </el-form-item>
                  <div class="submit">
                      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                  </div>
                  <p style="color:deeppink">用户名:15676204915、密码:fw123456</p>
              </div>
          </el-form>
      </div>
  </div>
</template>
<script type="es6">
	let api = {
		login:'/service-ucenter/user/login',
	}
  export default {
    data () {
      return {
          ruleForm: {
              username: '',
              password: ''
          },
          rules: {
              username: [
                  { required: true, message: '请输入用户名', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: '请输入密码', trigger: 'blur' }
              ]
          }
      }
    },
    methods: {
        submitForm(formName) {
            let _this = this

            _this.$refs[formName].validate((valid) => {
                if (valid) {
                		_this.postData()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },

        // 请求
        postData(){
        		let _this = this

        		_this.$request({
                url:api.login,
                context:_this,
                sendData:{
                		loginName:_this.ruleForm.username,
                		password:_this.ruleForm.password,
                		useCode:'false',
                		businessSystem:'CRM',
                		code:null,
                	},
                successCallback:(_this,response)=>{
                    localStorage.setItem('ms_username',_this.ruleForm.username)
                    _this.$router.push('/home')
                },
                needWare:false,
                headers:{
                	'Content-Type': 'application/json'
                }
            })
        }
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
.content {
    margin-top: 200px;
    form {
        height:0;
        text-align: center;
    }
    .login-panel {
        width: 400px;
        background: #f1f2f7;
        border: 1px solid #ccc;
        display: inline-block;
        -webkit-box-shadow: 0px 0px 2px 2px #f1f2f7;
        -moz-box-shadow: 0px 0px 2px 2px #f1f2f7;
        box-shadow: 0px 0px 2px 2px #f1f2f7;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        .title {
            font-size: 16px;
            line-height: 56px;
            padding:0 24px;
            border-bottom: 1px solid #ccc;
        }
        .item {
            margin: 20px 0;
           input {
               width: 200px;
               height: 30px;
               border: 1px solid #ccc;
           }
        }
        .submit {
            margin-bottom: 20px;
        }
        p {
            text-align: left;
            margin-left: 20px;
            margin-bottom: 10px;
        }
    }
}
</style>

