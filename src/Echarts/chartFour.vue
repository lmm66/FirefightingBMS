<template>
  <div style="height: 208px" ref="echarts" id="main"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartFour",
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "2%",
        left: "center",
      },
      series: [
        {
          top: "20%",
          type: "pie",
          radius: ["70%", "95%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          color: ["#10ddc2", "#ff5722", "#6eb6ff"],
          data: [
            { value: 484, name: "在岗" },
            { value: 58, name: "牺牲" },
            { value: 78, name: "负伤" },
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