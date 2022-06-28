<template>
  <el-card ref="echarts" id="mains"></el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartTwo",
  mounted() {
    let chartDom1 = document.getElementById("mains");
    let myChart1 = echarts.init(chartDom1);
    let option1;
    option1 = {
      legend: {
        bottom: "5px",
      },
      title: {
        top: "5px",
        left: "center",
        text: "火灾类型",
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [8, 80],
          center: ["50%", "48%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 3,
          },
          data: [
            { value: 40, name: "雷电击火" },
            { value: 38, name: "上坟烧香" },
            { value: 32, name: "阳光直射" },
            { value: 30, name: "林中吸烟" },
            { value: 28, name: "故意纵火" },
            { value: 26, name: "开荒烧杂" },
            { value: 22, name: "取暖做饭" },
            { value: 18, name: "其他" },
          ],
        },
      ],
    };
    option1 && myChart1.setOption(option1);
  },
};
</script>
<style>
</style>