<template>
  <div class="login_container">
    <div class="login_box">
      <!--登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <p class="guan">智慧宿管云平台</p>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" class="yzm">
          <el-input v-model="loginForm.code" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <img :src="src" alt />
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    var that = this
    this.$http({
      url: `http://122.112.253.28:8095/prod-api/captchaImage`,
      method: 'GET'
    }).then(response => {
      console.log(response.data.data.uuid)
      that.src = 'data:image/gif;base64,' + response.data.data.img
      that.uuid = response.data.data.uuid
    })
  },
  data() {
    return {
      src: '',
      uuid: '',
      //这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: 'accpyy',
        code: '',
        uuid: ''
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        //验证码是否输入
        //验证密码是否合法
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度必须5个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      //console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login() {
        var that = this;
        console.log(this.loginForm)
        this.$http({
          url:'http://122.112.253.28:8095/prod-api/admin/login',
          method:'POST',
          data:{
            username:that.loginForm.username,
            password:that.loginForm.password,
            code:that.loginForm.code,
            uuid:that.uuid
          },
          
        }).then((result) => {
          if (result.data.code) {
          console.log(result)
          sessionStorage.setItem("token",result.data.data.tokenHead + result.data.data.token);
          this.$router.push("/home");
          this.$message.success("登录成功");
        } else {
          this.$message.errop("登录失败!");
          console.log("登陆失败");
        }
        }).catch((error) => {
          console.log(error)
        })
        // this.$refs.loginFormRef.validate(async valid =>{
        //   if(!valid) return
        //   const{data:res}=await this.$http.post("login",this.loginForm);
        //   if(res.status !==200)return this.$message.errop("登录失败！");
        //   this.$message.success("登录成功");
        //   window.sessionStorage.setItem('token', res.data.token)
        //   this.$router.push('/home')
        // })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #808080;
  height: 100%;
  background-image: url('../assets/bg_2.jpg');
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.guan {
  display: flex;
  justify-content: center;
  transform: translate(0%, -20%);
  font-weight: bold;
}
.btns {
  display: flex;
  justify-content: center;
}
.login_form {
  position: absolute;
  bottom: -2%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.yzm {
  position: relative;
  left: -90px;
  padding: 0 90px;
  box-sizing: border-box;
}
</style>