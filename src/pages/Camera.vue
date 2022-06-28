<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card>
        <chart-five></chart-five>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import ChartFive from "../Echarts/chartFive.vue";
export default {
  name: "Camera",
  components: {
    ChartFive,
  },
  data() {
    return {
      str: "",
    };
  },
};
</script>

<style>
#iframeId {
  width: 100%;
  height: 600px;
}
</style>