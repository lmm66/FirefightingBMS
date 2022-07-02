<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <div style="height: 60px"></div>
    <el-menu-item
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="item in hasChildren"
      :key="item.path"
      :index="item.path + ''"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="SubItem in item.children" :key="SubItem.path">
        <el-menu-item
          class="sub_menu"
          :index="SubItem.path"
          @click="clickMenu(SubItem)"
          ><i :class="'el-icon-' + SubItem.icon"></i
          >{{ SubItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
        },
        {
          path: "/firehouse",
          name: "firehouse",
          label: "消防站管理",
          icon: "office-building",
        },
        {
          path: "/firemen",
          name: "firemen",
          label: "消防员管理",
          icon: "s-custom",
        },
        {
          path: "/video",
          label: "摄像头管理",
          icon: "video-camera-solid",
          children: [
            {
              path: "/fireSystem",
              name: "fireSystem",
              label: "火源识别系统",
              icon: "s-grid",
            },
            {
              path: "/camera",
              name: "camera",
              label: "道路检测标记",
              icon: "place",
            },
          ],
        },
        {
          path: "/info",
          label: "信息管理",
          icon: "s-order",
          children: [
            {
              path: "/message",
              name: "message",
              label: "报警信息汇总",
              icon: "document-copy",
            },
            {
              path: "/datas",
              name: "datas",
              label: "数据分析",
              icon: "s-marketing",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 175px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-item-group {
  .sub_menu {
    text-indent: -13px;
    margin-top: -10px;
  }
}
</style>