<template>
  <div class="bod">
    <div class="form-wrapper">
      <div class="showAlert">
        <el-alert
          v-show="successAlert"
          title="登录成功!"
          type="success"
        ></el-alert>
        <el-alert
          v-show="faultAlert"
          title="用户名或密码错误!"
          type="error"
        ></el-alert>
        <el-alert
          v-show="registerAlert"
          title="注册成功!"
          type="success"
        ></el-alert>
      </div>

      <div class="header" v-show="wantLogin">login</div>
      <div class="header" v-show="wantResister">Register</div>
      <div class="input-wrapper" v-show="wantLogin">
        <div class="border-wrapper">
          <input
            type="text"
            placeholder="username"
            class="border-item"
            v-model="user"
          />
        </div>
        <div class="border-wrapper">
          <input
            type="password"
            placeholder="password"
            class="border-item"
            v-model="pass"
            ref="passDom"
          />
          <img src="../assets/眼睛.png" @click="loginPassShow" />
        </div>
      </div>

      <div class="action" v-show="wantLogin">
        <div class="btn" @click="readData">login</div>
        <div class="btn" @click="saveData">Enroll</div>
      </div>

      <div class="input-wrapper" v-show="wantResister">
        <div class="border-wrapper">
          <input
            type="text"
            placeholder="username"
            class="border-item"
            v-model="userResister"
          />
        </div>
        <div class="border-wrapper">
          <input
            type="password"
            placeholder="password"
            class="border-item"
            v-model="passResister"
          />
        </div>
        <div class="registerBtn" @click="confirmRegister">点击注册</div>
        <a href="" class="hasId">已有账号，<span>马上登录</span></a>
      </div>

      <div class="wxLogin" v-show="showwx">
        <WxLogin
          :appid="appid"
          :scope="scope"
          :redirect_uri="redirect_uri"
          key="1"
        ></WxLogin>
      </div>
      <div :class="classObject" @click="showVx" v-show="QRcode"></div>
    </div>
  </div>
</template>

<script>
import WxLogin from "./WxLogin.vue";
export default {
  name: "UserLogin",
  data() {
    return {
      user: "",
      pass: "",
      userResister: "",
      passResister: "",
      wantResister: false,
      wantLogin: true,
      isPass: true,
      isLogin: false,
      successAlert: false,
      faultAlert: false,
      registerAlert: false,
      showwx: false,
      QRcode: true,
      classObject: {
        wxsvg: true,
        websvg: false,
      },
      time: "",
      appid: "wxe1f5def243e0390b",
      scope: "snsapi_login",
      redirect_uri: "https://abstest.tenpay.com/abs/author/callBack.do",
    };
  },
  methods: {
    loginPassShow() {
      if (this.isPass) {
        this.$refs.passDom.type = "text";
        this.isPass = !this.isPass;
      } else {
        this.$refs.passDom.type = "password";
        this.isPass = !this.isPass;
      }
    },
    saveData() {
      this.wantLogin = !this.wantLogin;
      this.wantResister = !this.wantResister;
      this.QRcode = !this.QRcode;
    },
    confirmRegister() {
      axios({
        method: "POST",
        url: `http://1.117.61.116:8081/User?purpose=register&Name=${this.userResister}&Password=${this.passResister}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((data) => {
        if (data.data.info === "注册成功") {
          this.registerAlert = true;
          setTimeout(() => {
            this.wantLogin = !this.wantLogin;
            this.wantResister = !this.wantResister;
            this.QRcode = !this.QRcode;
            this.registerAlert = false;
          }, 1000);
        }
      });
    },
    readData() {
      axios({
        method: "GET",
        url: `http://1.117.61.116:8081/User?purpose=login&Name=${this.user}&Password=${this.pass}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((data) => {
        if (data.data.info === "登录成功") {
          this.successAlert = true;
          var date = new Date();
          var year = date.getFullYear(); //获取当前年份
          var month = date.getMonth() + 1; //获取当前月份
          var dat = date.getDate(); //获取当前日
          var hour = date.getHours(); //获取小时
          var minutes = date.getMinutes(); //获取分钟
          var second = date.getSeconds(); //获取秒
          this.time =
            year +
            "-" +
            month +
            "-" +
            dat +
            " " +
            hour +
            ":" +
            minutes +
            ":" +
            second;
          let loginInfo = {
            LoginName: this.user,
            LoginTime: this.time,
            openId: "asfafsfsfsdfsdfsdfdsf",
          };
          this.cookie.setCookie(loginInfo, 7);
          setTimeout(() => {
            this.$router.replace({
              name: "home",
            });
          }, 1000);
        } else {
          this.faultAlert = true;
          setTimeout(() => {
            this.faultAlert = false;
          }, 1500);
        }
      });
    },
    showVx() {
      this.wantLogin = !this.wantLogin;
      this.showwx = !this.showwx;
      this.classObject.wxsvg = !this.classObject.wxsvg;
      this.classObject.websvg = !this.classObject.websvg;
    },
  },
  components: {
    WxLogin,
  },
};
</script>

<style scoped>
.wxsvg {
  width: 50px;
  height: 50px;
  background: url("../assets/wx_l.svg") no-repeat;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}
.websvg {
  width: 50px;
  height: 50px;
  background: url("../assets/web_l.svg") no-repeat;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}
.wxLogin {
  display: flex;
  justify-content: center;
}
.registerBtn {
  width: 100%;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 40px;
  border-radius: 30px;
  cursor: pointer;
}
.registerBtn:hover {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
.hasId {
  text-decoration: none;
  color: #fff;
  font-size: 15px;
  display: block;
  text-align: center;
  margin-top: 30px;
}
.hasId span {
  color: #e8198b;
}
.bod {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../assets/login.jpg") no-repeat;
  background-size: 100% 100%;
}
.showAlert {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.form-wrapper {
  width: 300px;
  height: 350px;
  background-color: rgba(41, 45, 62, 0.8);
  color: #fff;
  border-radius: 10px;
  padding: 50px;
  position: relative;
}

.header {
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 100px;
}

.input-wrapper input {
  background-color: rgb(41, 45, 62);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #fff;
  outline: none;
}

.input-wrapper input::placeholder {
  text-transform: uppercase;
}

.input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #e8198b, #0eb4dd);
  width: 100%;
  height: 50px;
  margin-bottom: 25px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.input-wrapper .border-wrapper .border-item {
  height: calc(100% - 5px);
  width: calc(100% - 5px);
  border-radius: 30px;
}

.input-wrapper img {
  position: absolute;
  bottom: 13px;
  right: 12px;
  cursor: pointer;
}

.action {
  display: flex;
  justify-content: space-between;
}

.action .btn {
  width: 46%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 45px;
  border-radius: 30px;
  cursor: pointer;
}

.action .btn:hover {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
</style>