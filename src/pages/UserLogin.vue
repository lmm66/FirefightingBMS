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
      </div>
      <div class="header">login</div>
      <div class="input-wrapper">
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
          <img src="../assets/眼睛.png" @click="show" />
        </div>
      </div>
      <div class="action">
        <div class="btn" @click="readData">login</div>

        <div class="btn" @click="saveData">Enroll</div>
      </div>
      <div class="icon-wrapper">
        <img class="icon-weixin" src="../assets/微信.png" @click="showVx" />
        <img class="icon-qq" src="../assets/QQ.png" />
      </div>
    </div>
    <transition-group
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__swing"
      leave-active-class="animate__zoomOutUp"
    >
      <WxLogin
        :appid="appid"
        :scope="scope"
        :redirect_uri="redirect_uri"
        v-show="showwx"
        key="1"
      ></WxLogin>
    </transition-group>
  </div>
</template>

<script>
// import Mock from "mockjs";
import "animate.css";
import WxLogin from "./WxLogin.vue";
export default {
  name: "UserLogin",
  data() {
    return {
      user: localStorage.getItem("username"),
      pass: localStorage.getItem("password"),
      isPass: true,
      isLogin: false,
      appid: "wxe1f5def243e0390b",
      scope: "snsapi_login",
      redirect_uri: "https://abstest.tenpay.com/abs/author/callBack.do",
      showwx: false,
      successAlert: false,
      faultAlert: false,
    };
  },
  methods: {
    show() {
      if (this.isPass) {
        this.$refs.passDom.type = "text";
        this.isPass = !this.isPass;
      } else {
        this.$refs.passDom.type = "password";
        this.isPass = !this.isPass;
      }
    },
    saveData() {
      localStorage.setItem("username", this.user);
      localStorage.setItem("password", this.pass);
    },
    readData() {
      if (
        this.user === localStorage.getItem("username") &&
        this.pass === localStorage.getItem("password")
      ) {
        this.successAlert = true;
        this.$store.commit("token/changeToken");
        setTimeout(() => {
          this.$router.replace({
            name: "home",
          });
        }, 1000);
      } else {
        this.faultAlert = true;
      }
    },
    showVx() {
      this.showwx = !this.showwx;
    },
  },
  components: {
    WxLogin,
  },
};
</script>

<style scoped>
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
  margin-bottom: 20px;
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

.form-wrapper .icon-wrapper {
  display: flex;
  justify-content: space-around;
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}

.form-wrapper .icon-wrapper img {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}

.form-wrapper .icon-wrapper img:hover {
  background-color: #0e92b3;
}
</style>