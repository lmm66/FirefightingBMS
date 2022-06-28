<template>
  <el-card ref="echarts" id="mainss"></el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartThree",
  mounted() {
    let chartDom2 = document.getElementById("mainss");
    let myChart2 = echarts.init(chartDom2);
    let option2;

    let base = +new Date(2019, 3, 30);
    let oneDay = 24 * 3600 * 1000;
    let date = [];
    let data = [Math.random() * 600];
    for (let i = 1; i < 20000; i++) {
      var now = new Date((base += oneDay));
      date.push(
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
      );
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    option2 = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      title: {
        top: "5px",
        left: "center",
        text: "最高气温分布",
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: date,
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
        },
      ],
      series: [
        {
          name: "Fake Data",
          type: "line",
          symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "rgb(255, 70, 131)",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 158, 68)",
              },
              {
                offset: 1,
                color: "rgb(255, 70, 131)",
              },
            ]),
          },
          data: data,
        },
      ],
    };

    option2 && myChart2.setOption(option2);
  },
};
</script>
<style>
</style>