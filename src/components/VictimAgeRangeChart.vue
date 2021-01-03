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
import "echarts/lib/chart/bar";
import "echarts/lib/component/legend";
import 'echarts/lib/component/tooltip';
export default {
  components: {
    Echarts
  },
  props: {
    ageRanges: {
      type: Array
    }
  },
  computed: {
    options() {
     return {
        color: ['rgb(0,45,68)'],
        grid: {
            left: 0,
            top: 20,
            right: 0,
            bottom: 30
            //bottom: 0
        },
        title: {
            show: false,
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: 'bottom',
            show: false
        },
        toolbox: {
            show: false,
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: this.ageRanges.map(age => age.name),
            axisLabel: {
              fontSize: 8,
              formatter: function(value){
                if (value === '11 or younger') {
                  return '< 12'
                } else if ( value === '75 or older') {
                  return '> 74'
                } else {
                  return value
                }
              }
            }
            // data: ['<18', '18-30', '31-45', '>45'],
        }],
        yAxis: [{
            show: false,
            type: 'value'
        }],
        series: [{
            name: 'victims',
            type: 'bar',
            data: this.ageRanges.map(age => age.value),
            label: {
                show: true,
                fontWeight: 'bold',
                position: 'top',
                fontSize: 10,
            },

        }, ]
    };
    }
  },
  data() {
    return {

    };
  }
};
</script>

