<template>
  <div class="container">
    <div style="width: 50%">
      <div class="bg"></div>
    </div>
    <div class="login-box">
      <h3 style="color: #1890ff">食惠吃管理后台</h3>
      <!-- 用户名 -->
      <el-input
        class="ipt"
        placeholder="请输入用户名"
        @focus="userErr = ''"
        v-model="userName"
        style=""
      >
        <i slot="prefix" class="el-input__icon el-icon-user"></i>
      </el-input>
      <span class="err" v-show="userErr">{{ userErr }}</span>
      <!-- 密码 -->
      <el-input
        class="ipt"
        placeholder="输入密码"
        v-model="password"
        type="password"
      >
        <i slot="prefix" class="el-input__icon el-icon-key"></i>
      </el-input>
      <!-- 验证码 -->
      <div class="captcha" style="display: flex; width: 314px">
        <el-input placeholder="请输入验证码" v-model="captcha">
          <i slot="prefix" class="el-input__icon el-icon-key"></i>
        </el-input>
        <!-- 验证码图片 -->
        <img @click="change" :src="captchaImg" alt="点击重试" />
      </div>
      <el-button class="touch" type="primary" @click="register">确定</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userName: "",
      password: "",
      userErr: "",
      captcha: "",
      captchaImg: "",
      timestamp: "",
      token: ""
    };
  },
  created() {
    // 获取时间戳
    this.timestamp = Date.parse(new Date()).toString();
    // 根据时间戳获取验证码图片
    this.axios.get("/sys/randomImage/" + this.timestamp).then(res => {
      this.captchaImg = res.data.result;
    });
  },
  methods: {
    // 调用 注册vuex内注册的editableTabs方法
    ...mapActions({
      handleOpen2: "editableTabs"
    }),
    // 点击验证码刷新验证码
    change() {
      this.timestamp = Date.parse(new Date()).toString();
      this.axios.get("/sys/randomImage/" + this.timestamp).then(res => {
        // console.log(res.data.result);
        this.captchaImg = res.data.result;
      });
    },
    register() {
      let data = {
        username: this.userName,
        password: this.password,
        captcha: this.captcha,
        checkKey: this.timestamp
      };
      // 执行登录
      this.axios.post("/sys/login", data).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "登录成功,欢迎" + res.data.result.userInfo.realname
          });
          // 登录成功后把获得的token值提交给vuex状态管理仓库store统一管理
          this.$store.commit("set_token", res.data.result.token);
          this.token = res.data.result.token;
          // this.timestamp = Date.parse(new Date()).toString();
          // this.timestamp = this.timestamp.substr(0, 10);
          // this.axios
          //   .get(
          //     "/sys/permission/getUserPermissionByToken?_t=" +
          //       this.timestamp +
          //       "&token=" +
          //       this.token
          //   )
          //   .then(res => {
          //     console.log(res);
          //   });
          setTimeout(() => {
            // replace和push的区别:
            // replace() 会替换当前路由, 不会添加路由历史记录
            // push()   添加新路由,  会把当前路由添加到历史记录
            this.$router.replace("/Index");

            // this.$router.back()
          }, 1000);
        } else {
          this.$message.error(res.data.message);
        }
        // 界面清空
        this.userName = this.userErr = this.password = this.pwdErr = "";
      });
    }
  }
};
</script>
<style lang="scss" scoped>

.bg {
  background: #fff url(http://linlilian.cn/img/bg.f916e487.jpg) no-repeat 50%;
  background-size: contain;
  //   padding: 110px 0 144px 0;
  margin-left: 53px;
  position: relative;
  width: 100%;
  min-height: 100%;
  height: 323px;
  
}
.container {
  margin: -40px -10px 0 -10px;
  display: flex;
  background: #fff url(http://linlilian.cn/img/background.a568162c.svg)
    no-repeat 50%;
  width: 100%;
  background-size: 100%;
  padding-top: 180px !important;
}
.login-box {
  width: 30%;
  box-sizing: border-box;
  padding-left: 106px;
  .ipt {
    margin-bottom: 24px;
    height: 40px;
    width: 314px;
  }
  .touch {
    margin: 24px 0;
    width: 100%;
  }
}
.err {
  color: red;
  font-size: 12px;
}
</style>
