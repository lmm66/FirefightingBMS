<template>
  <div style="height: 450px" ref="echarts" id="main_3"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartEleven",
  mounted() {
    var chartDom = document.getElementById("main_3");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    option = {
      title: {
        top: "5px",
        left: "center",
        text: "气象因子",
      },
      xAxis: {
        name: "相对湿度",
        type: "category",
        data: ["15%", "35%", "55%", "75%", "95%"],
      },
      yAxis: {
        name: "火灾指数",
        type: "value",
      },
      series: [
        {
          data: [98, 90, 47, 26, 12],
          type: "line",
          symbol: "triangle",
          symbolSize: 20,
          lineStyle: {
            color: "#5470C6",
            width: 4,
            type: "dashed",
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: "#EE6666",
            color: "yellow",
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