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
import "echarts/lib/component/tooltip";
import 'echarts/lib/component/legendScroll';
export default {
  components: {
    Echarts
  },
  props: {
    traffickingTypes: {
      type: Array
    }
  },
  computed: {
    options() {
      return {
        title: {
          show: false
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        legend: {
          type: 'scroll',
          orient: "vertical",
          left: "right",
          //TODO
          top: 5,
          //top: 5,
          //TODO
          bottom: 5,
          //bottom: 5,
          //TODO
          data: this.traffickingTypes,

          //data: traffickingTypes,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 8,
          textStyle: {
            //TODO
            fontSize: 9
            // fontSize: 8
          }
          //padding: 5
        },
        series: [
          {
            name: "trafficking",
            type: "pie",
            radius: "100%",
            left: "left",
            center: ["30%", "50%"],
            hoverAnimation: false,
            avoidLabelOverlap: true,
            //TODO
            // startAngle: 90 ,
            startAngle: 90,
            label: {
              rotate: true,
              position: "inside",
              formatter: "{d}%",
              color: "#fff",
              fontSize: 8,
              align: "left"
            },
            //TODO
            data: this.traffickingTypes
            //data: traffickingTypes,

            // emphasis: {
            //     itemStyle: {
            //         shadowBlur: 10,
            //         shadowOffsetX: 0,
            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //     }
            // }
          }
        ]
      };
    }
  },
  data() {
    return {};
  }
};
</script>

