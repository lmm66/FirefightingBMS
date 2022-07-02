<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <h3 style="color: #fff">智慧消防森林区域化管理</h3>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <div @click="exit">
            <el-dropdown-item>退出</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/userImg.jpg"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("tab/collapseMenu");
    },
    exit() {
      this.cookie.clearCookie("LoginName");
      this.cookie.clearCookie("openId");
      this.cookie.clearCookie("LoginTime");
      this.$router.replace({
        name: "login",
      });
    },
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  h3 {
    margin-left: 20px;
  }
}
.r-content {
  .user {
    width: 35px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>