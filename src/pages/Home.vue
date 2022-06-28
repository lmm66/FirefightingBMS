<template>
  <el-row class="home" :gutter="24">
    <el-col :span="8" style="margin-top: -5px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
          <hr />
          <div class="loginInfo">
            <p>上次登录时间:<span>2022-6-4</span></p>
            <p>上次登录地点:<span>郑州</span></p>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 347px">
        <el-table :data="tableData" height="308" border style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name">
          <i
            class="icon"
            :style="{ background: item.color }"
            :class="'el-icon-' + item.icon"
          />
          <div class="detail">
            <div class="sale">{{ item.value }}</div>
            <!-- <div class="txt">{{ item.name }}</div> -->
            <div style="width: 150px">
              <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-card>
      </div>
      <el-card style="height: 220px; margin-top: 20px">
        <chart-one></chart-one>
      </el-card>
      <div class="graph">
        <chart-two></chart-two>
        <chart-three></chart-three>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import chartOne from "../Echarts/chartOne.vue";
import chartTwo from "../Echarts/chartTwo.vue";
import ChartThree from "../Echarts/chartThree.vue";
export default {
  name: "Home",
  data() {
    return {
      userImg: require("../assets/userImg.jpg"),
      tableData: [
        {
          date: "2019年3月30日17时",
          address: "凉山州木里县",
        },
        {
          date: "2020年3月30日15时35分",
          address: "凉山州西昌市经久乡和安哈镇交界的皮家山山脊处",
        },
        {
          date: "2020年4月14日17时35分",
          address: "西藏自治区林芝市巴宜区尼西村附近",
        },
        {
          date: "2021年3月13日12时",
          address: "宁夏固原市原州区张易镇马场村二林沟",
        },
        {
          date: "2021年3月14日13时",
          address: "云南省昆明市盘龙区茨坝街道与龙泉街道交界处三丘田附近",
        },
      ],
      tableLabel: {
        date: "火灾日期",
        address: "灾害地址",
      },
      countData: [
        {
          value: "36起",
          icon: "map-location",
          color: "#2ec7c9",
        },
        {
          value: "210个",
          icon: "video-camera",
          color: "#ffb980",
        },
        {
          value: "25~35℃",
          icon: "sunny",
          color: "#5ab1ef",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "凉山州木里县附近",
        },
        {
          value: "选项2",
          label: "凉山州西昌市经久乡和安哈镇交界的皮家山",
        },
        {
          value: "选项3",
          label: "西藏自治区林芝市巴宜区尼西村附近",
        },
        {
          value: "选项4",
          label: "宁夏固原市原州区张易镇马场村二林沟附近",
        },
        {
          value: "选项5",
          label: "云南省昆明市盘龙区茨坝街道与龙泉街道交界处附近",
        },
      ],
      value: "",
    };
  },
  components: {
    chartOne,
    chartTwo,
    ChartThree,
  },
};
</script>

<style scoped>
.el-row {
  margin-top: 15px;
}
.user {
  position: relative;
  box-sizing: border-box;
}
hr {
  background-color: #999;
  height: 1px;
  border: none;
}
.user img {
  width: 120px;
  border-radius: 50%;
  margin-bottom: 5px;
}
.user .userInfo {
  position: absolute;
  right: 32%;
  top: 10%;
}
.user .userInfo .name {
  font-size: 30px;
  font-weight: 520;
  line-height: 0;
}
.user .userInfo .access {
  font-size: 14px;
  color: rgb(139, 135, 135);
  line-height: 5px;
}
.user .loginInfo {
  color: rgb(107, 103, 103);
  font-size: 12px;
  margin-top: 23px;
}
.user .loginInfo p span {
  margin-left: 60px;
  color: rgb(0, 0, 0);
}
.num {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: -25px;
}
.num .el-card {
  position: relative;
  width: 270px;
  height: 65px;
  margin-top: 20px;
}
.num .el-card .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 65px;
  width: 65px;
  left: 0;
  font-size: 30px;
  color: white;
  text-align: center;
  line-height: 65px;
}
.num .el-card .detail {
  position: absolute;
  left: 26%;
  top: 50%;
  transform: translateY(-50%);
}
.num .el-card .detail .sale {
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 3px;
  margin-left: 20px;
  color: #3490de;
}
.num .el-card .detail .txt {
  font-size: 12px;
  color: #999;
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.graph .el-card {
  width: 420px;
  height: 297px;
}
</style>