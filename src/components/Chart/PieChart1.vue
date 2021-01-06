<!--
 * @Author: your name
 * @Date: 2021-01-04 17:21:07
 * @LastEditTime: 2021-01-04 18:08:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-elment-admin\src\components\Chart\PieChart1.vue
-->
<template>
  <div id="main" style="width: 100%;height:300px;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("main"));
      this.chart.setOption({
        title: {
          text: "南丁格尔玫瑰图",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["rose1", "rose2", "rose3", "rose4", "rose5"]
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["55%", "50%"],
            roseType: "area",
            data: [
              { value: 10, name: "rose1" },
              { value: 5, name: "rose2" },
              { value: 15, name: "rose3" },
              { value: 25, name: "rose4" },
              { value: 20, name: "rose5" }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>