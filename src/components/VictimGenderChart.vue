<template>
  <div class="chart-wrapper">
    <Echarts :options="options" autoresize></Echarts>
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 150px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import Echarts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
import 'echarts/lib/component/tooltip';
export default {
  components: {
    Echarts
  },
  props: {
    genders: {
      type: Array
    }
  },
  computed: {
    options() {
      return {
        color: ["#7957d5", "rgb(0,25,45)", "rgb(40,188,251)"],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 5,
          top: 20,
          bottom: 20,
          data: this.genders
        },
        series: [
          {
            name: "gender",
            type: "pie",

            legendHoverLink: false,
            hoverAnimation: false,
            center: ["30%", "50%"],
            radius: ["60%", "80%"],
            avoidLabelOverlap: true,
            label: {
              position: "inside",
              formatter: "{per|{d}%}  ",
              fontSize: 8,
              distanceToLabelLine: 2,

              textBorderColor: "transparent",
              textBorderWidth: 0,
              textShadowColor: "transparent",
              textShadowBlur: 0,
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              rich: {
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            labelLine: {
              length: 1
            },
            data: this.genders
          }
        ]
      };
    }
  },
  data() {
    return {

    };
  }
};
</script>

