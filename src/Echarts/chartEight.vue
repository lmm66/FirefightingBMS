<template>
  <div style="height: 300px" ref="echarts" id="main"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartEight",
  mounted() {
    var ROOT_PATH =
      "https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom, "dark");
    var option;

    $.get(
      ROOT_PATH + "/data/asset/data/life-expectancy-table.json",
      function (_rawData) {
        run(_rawData);
      }
    );
    function run(_rawData) {
      // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
      const countries = [
        "Finland",
        "France",
        "Germany",
        "Iceland",
        "Norway",
        "Poland",
        "Russia",
        "United Kingdom",
      ];
      const datasetWithFilters = [];
      const seriesList = [];
      echarts.util.each(countries, function (country) {
        var datasetId = "dataset_" + country;
        datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: "dataset_raw",
          transform: {
            type: "filter",
            config: {
              and: [
                { dimension: "Year", gte: 1988 },
                { dimension: "Country", "=": country },
              ],
            },
          },
        });
        seriesList.push({
          type: "line",
          datasetId: datasetId,
          showSymbol: false,
          name: country,
          endLabel: {
            show: true,
            formatter: function (params) {
              return params.value[3] + ": " + params.value[0];
            },
          },
          labelLayout: {
            moveOverlap: "shiftY",
          },
          emphasis: {
            focus: "series",
          },
          encode: {
            x: "Year",
            y: "Income",
            label: ["Country", "Income"],
            itemName: "Year",
            tooltip: ["Income"],
          },
        });
      });
      option = {
        animationDuration: 5000,
        dataset: [
          {
            id: "dataset_raw",
            source: _rawData,
          },
          ...datasetWithFilters,
        ],
        title: {
          text: "多国森林火灾损失评估（美元）",
        },
        tooltip: {
          order: "valueDesc",
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          nameLocation: "middle",
        },
        yAxis: {
          name: "Loss",
        },
        grid: {
          right: 140,
          top: 55,
          bottom: 35,
        },
        series: seriesList,
      };
      myChart.setOption(option);
    }

    option && myChart.setOption(option);
  },
};
</script>

<style>
</style>