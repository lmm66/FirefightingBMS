<template>
  <div class="body">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <chart-eight></chart-eight>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <chart-nine></chart-nine>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <chart-ten></chart-ten>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <chart-eleven></chart-eleven>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartTen from "@/Echarts/chartTen.vue";
import chartEight from "../Echarts/chartEight.vue";
import ChartNine from "../Echarts/chartNine.vue";
import ChartEleven from "@/Echarts/chartEleven.vue";
export default {
  components: {
    chartEight,
    ChartNine,
    ChartTen,
    ChartEleven,
  },
};
</script>

<style scoped>
.body {
  background-color: #19143c;
  /* margin-left: -20px;
  margin-right: -20px; */
  padding: 0 10px;
  margin: 0 -20px;
}
.el-card {
  background-color: #19143c;
  border: none;
}
</style>