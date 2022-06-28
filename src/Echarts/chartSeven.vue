<template>
  <div style="height: 320px" ref="echarts" id="mainss"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartSeven",
  mounted() {
    var ROOT_PATH =
      "https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

    var chartDom = document.getElementById("mainss");
    var myChart = echarts.init(chartDom);
    var option;

    const weatherIcons = {
      Sunny: ROOT_PATH + "/data/asset/img/weather/sunny_128.png",
      Cloudy: ROOT_PATH + "/data/asset/img/weather/cloudy_128.png",
      Showers: ROOT_PATH + "/data/asset/img/weather/showers_128.png",
    };
    const seriesLabel = {
      show: true,
    };
    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["凉山州木里县", "西藏自治区林芝市巴宜区", "宁夏固原市"],
      },
      grid: {
        left: 70,
        top: 40,
        height: 250,
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "value",
        name: "Days",
        axisLabel: {
          formatter: "{value}",
        },
      },
      yAxis: {
        type: "category",
        inverse: true,
        data: ["Sunny", "Cloudy", "Showers"],
        axisLabel: {
          formatter: function (value) {
            return "{" + value + "| }\n{value|" + value + "}";
          },
          margin: 20,
          rich: {
            value: {
              lineHeight: 20,
              align: "center",
            },
            Sunny: {
              height: 40,
              align: "center",
              backgroundColor: {
                image: weatherIcons.Sunny,
              },
            },
            Cloudy: {
              height: 40,
              align: "center",
              backgroundColor: {
                image: weatherIcons.Cloudy,
              },
            },
            Showers: {
              height: 40,
              align: "center",
              backgroundColor: {
                image: weatherIcons.Showers,
              },
            },
          },
        },
      },
      series: [
        {
          name: "凉山州木里县",
          type: "bar",
          data: [165, 170, 30],
          label: seriesLabel,
          markPoint: {
            symbolSize: 1,
            symbolOffset: [0, "50%"],
            label: {
              formatter: "{b|{b} }{c|{c}}",
              backgroundColor: "#eaffd0",
              borderColor: "#95e1d3",
              borderWidth: 1,
              borderRadius: 6,
              padding: [6, 5],
              lineHeight: 8,
              position: "right",
              distance: 20,
              rich: {
                b: {
                  color: "#333",
                },
                c: {
                  color: "#ff8811",
                  fontSize: 15,
                },
              },
            },
            data: [
              { type: "max", name: "max days: " },
              { type: "min", name: "min days: " },
            ],
          },
        },
        {
          name: "西藏自治区林芝市巴宜区",
          type: "bar",
          label: seriesLabel,
          data: [150, 105, 110],
        },
        {
          name: "宁夏固原市",
          type: "bar",
          label: seriesLabel,
          data: [220, 82, 63],
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style>
</style>