<template>
  <div style="height: 300px" ref="echarts" id="main_1"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartNine",
  mounted() {
    var chartDom = document.getElementById("main_1");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    option = {
      title: {
        left: "center",
        text: "2017-2022年林业防火物资研发数据（件）",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {
        top: "9%",
      },
      grid: {
        left: "3%",
        right: "5%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: ["2022", "2021", "2020", "2019", "2018", "2017"],
      },
      series: [
        {
          name: "灭火剂",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [4897, 4577, 3954, 3354, 2985, 2550],
        },
        {
          name: "灭火器械",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [4589, 4258, 3685, 3057, 2678, 2357],
        },
        {
          name: "防护装备",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [4300, 3756, 3575, 3354, 3098, 2750],
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style>
</style>