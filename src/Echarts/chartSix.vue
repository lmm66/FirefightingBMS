<template>
  <div style="height: 208px" ref="echarts" id="mains"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartSix",
  mounted() {
    var chartDom = document.getElementById("mains");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "-6px",
        left: "center",
      },
      series: [
        {
          top: "20%",
          type: "pie",
          radius: ["0%", "95%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
            borderColor: "#fff",
            borderWidth: 1,
          },
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          color: ["#ff6f3c", "#f85f73", "#3ec1d3", "#d59bf6"],
          data: [
            { value: 38, name: "意外爆炸" },
            { value: 58, name: "坍塌事故" },
            { value: 16, name: "高空坠落" },
            { value: 24, name: "触电事故" },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style>
</style>