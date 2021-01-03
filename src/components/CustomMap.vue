<template>
  <div class="chart-wrapper">
    <Echarts :options="options" autoresize></Echarts>
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
  /* min-height: 650px; */
}
.echarts {
  width: 100%;
  height: 100%;
  //height: 650px;
  min-height: 650px;
  @media (max-width: 600px) {
    min-height: 300px
  }
}

</style>

<script>
import Echarts from "vue-echarts";
import "echarts/lib/chart/map";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/line";
import "echarts/lib/chart/lines";
import "echarts/lib/component/legend";
import "echarts/lib/component/geo";
import "echarts/lib/component/dataset";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legendScroll";

//Default world map
// import "echarts/map/js/world";

// Cutom world map
import customMap from '../world.json'
// registering map data
Echarts.registerMap('world', customMap)

export default {
  components: {
    Echarts
  },
  props: {
    hotspots: {
      type: Array
    },
    coordinates: {
      type: Array
    },
    showAnimation: {
      type: Boolean
    },
    showRoutes: {
      type: Boolean
    },
    showHotSpots: {
      type: Boolean
    }
  },
  computed: {
    scatterColor() {
      let opacity = this.showHotSpots ? 1 : 0;
      let color = `rgba(40,188,251,${opacity})`;
      return color;
    },

    staticOpacity() {
      let opacity = this.showRoutes ? 0.3 : 0;
      return opacity;
    },

    scatterType() {
      let animation = this.showAnimation ? "effectScatter" : "scatter";
      return animation;
    },

    options() {
      return {
        backgroundColor: "rgb(0,45,68)",
        title: {},
        tooltip: {
          // trigger: "item",
          //show: this.showRoutes || this.showAnimation,
          show: false
          // formatter: function(params) {
          //   // eslint-disable-next-line no-console
          //   // let route_length = params.data.coords.length;
          //   let results = '';
          //   for (let country in params.data.coords){
          //     // let longitude = country[0]
          //     // let latitude = country[1]
          //     // eslint-disable-next-line no-console
          //     //console.log(country)
          //     // eslint-disable-next-line no-console
          //     //console.log(test)
          //     // let countryName = this.allCoords.find(country => country.longitude === longitude && country.latitude === latitude)
          //     // if (countryName) {
          //     //   countryName = countryName.name
          //     // } else {
          //     //   countryName = 'error'
          //     // }
          //     // results = countryName + ' --> '
          //   }
          //   return (
          //     results
          //   );
          // }
        },
        // legend: {
        //     orient: 'vertical',
        //     top: 'bottom',
        //     left: 'right',
        //     data: ['World', 'Australia'],
        //     textStyle: {
        //         color: '#fff'
        //     },
        //     selectedMode: 'single'
        // },
        geo: {
          map: "world",
          center: [36.53, 0],
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          label: {
            show: true,
            position: "insideBottom",
            fontSize: 8,
            color: "rgb(96,96,98)",
            emphasis: {
              position: "right",
              fontSize: 12,
              formatter: "{text|{b}}  ",
              color: "#fff",
              backgroundColor: "rgb(140,74,255)",
              offset: [100, 0],
              padding: [2, 4],
              borderRadius: 2
            }
          },
          roam: true,
          zoom: 1,
          scaleLimit: {
            min: 1,
            max: 10
          },
          itemStyle: {
            normal: {
              areaColor: "rgb(0,25,45)",
              borderColor: "rgb(96,96,98)"
            },
            emphasis: {
              areaColor: "rgb(222,202,253)",
              borderColor: "rgb(140,74,255)"
            }
          }
        },
        series: [
          {
            tooltip: {
              show: this.showHotSpots,
              trigger: "item",
              formatter: function(data) {
                return (
                  data.name + "<br/>" + "Number of Cases: " + data.value[2]
                );
              }
            },
            name: "hotspots",
            type: this.scatterType,
            coordinateSystem: "geo",
            zlevel: 2,
            animation: true,
            rippleEffect: {
              brushType: "stroke"
            },

            // label: {
            //   normal: {
            //     show: true,
            //     position: "right",
            //     formatter: "{b}"
            //   }
            // },
            symbolSize: function(val) {
              return Math.sqrt(val[2]);
            },
            itemStyle: {
              color: this.scatterColor //update opacity
              // normal: {
              //   color: "rgb(40,188,251)",
              // }
            },
            data: this.hotspots
          },
          {
            name: "moving path",
            type: "lines",
            zlevel: 1,
            effect: {
              show: this.showAnimation, //update value when show animation === false
              period: 6,
              trailLength: 0.4,
              color: "#fff",
              symbolSize: 2
            },
            lineStyle: {
              normal: {
                color: "rgb(18,70,100)",
                width: 0,
                curveness: 0.2
              }
            },
            data: this.coordinates
          },
          {
            //static blue path

            name: "static path",
            type: "lines",
            zlevel: 0,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol:
                "path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705",
              //symbolSize: 15
              symbolSize: function(val) {
                return val[2] / 8;
              }
            },
            lineStyle: {
              normal: {
                color: "rgb(18,70,100)",
                width: 1,
                opacity: this.staticOpacity,
                curveness: 0.2
              }
            },
            data: this.coordinates
          }
        ]
      };
    }
  },
  data() {
    return {
      autoresize: false,
    };
  },
};
</script>

