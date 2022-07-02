<template>
  <div style="height: 240px" ref="echarts" id="main"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartOne",
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    // prettier-ignore
    const data = [["2020-03-25", 24], ["2020-03-26", 26], ["2020-03-27", 25], ["2020-03-28", 22], ["2020-03-29", 27], ["2020-03-30", 297], ["2020-03-31", 146], ["2020-04-1", 214], ["2020-04-2", 92], ["2020-04-3", 75], ["2020-04-4", 58], ["2020-04-5", 44], ["2020-04-6", 38], ["2020-04-7", 29], ["2020-04-8", 27], ["2020-04-9", 26], ["2020-04-10", 29]];
    const dateList = data.map(function (item) {
      return item[0];
    });
    const valueList = data.map(function (item) {
      return item[1];
    });
    option = {
      // Make gradient line here
      visualMap: [
        {
          show: false,
          type: "continuous",
          seriesIndex: 0,
          min: 0,
          max: 400,
        },
        {
          show: false,
          type: "continuous",
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: dateList.length - 1,
        },
      ],
      title: [
        {
          left: "center",
          top: "-1%",
          text: "皮家山森林火灾温度变化(°C)",
        },
      ],
      tooltip: {
        trigger: "axis",
      },
      xAxis: [
        {
          data: dateList,
        },
        {
          data: dateList,
          gridIndex: 1,
        },
      ],
      yAxis: [
        {},
        {
          gridIndex: 1,
        },
      ],
      grid: [
        {
          top: "10%",
        },
        {},
      ],
      series: [
        {
          type: "line",
          showSymbol: false,
          data: valueList,
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>
<style>
</style>