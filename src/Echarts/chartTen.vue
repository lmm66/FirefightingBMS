<template>
  <div style="height: 450px" ref="echarts" id="main_2"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartTen",
  mounted() {
    var chartDom = document.getElementById("main_2");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    option = {
      title: {
        top: "5px",
        left: "center",
        text: "可燃物因子",
      },
      dataset: {
        source: [
          ["score", "amount", "product"],
          [66.5, 425, "乔木"],
          [70.2, 436, "灌木"],
          [74.4, 452, "草木"],
          [89.3, 578, "地衣"],
          [48.6, 365, "枯枝落叶"],
          [39.3, 278, "腐殖质"],
          [42.6, 301, "泥炭"],
        ],
      },
      grid: {
        containLabel: true,
      },
      xAxis: { name: "燃烧指数" },
      yAxis: { type: "category" },
      visualMap: {
        orient: "horizontal",
        left: "center",
        min: 10,
        max: 100,
        text: ["High Score", "Low Score"],
        dimension: 0,
        inRange: {
          color: ["#65B581", "#FFCE34", "#FD665F"],
        },
      },
      series: [
        {
          type: "bar",
          encode: {
            x: "amount",
            y: "product",
          },
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style>
</style>