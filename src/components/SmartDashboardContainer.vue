<template>
  <!--Smart compoent:
  Get map data with Vuex
  Get summary data with Vuex
  Get victim data with Vuex
  Get trafficiking type data with Vuex
  -->
  <div>
    <SmartFilters
      :isLoading="isLoading"
      :filters="filters"
      :options="options"
      @on-filter-data="filterDataset"
      @on-reset-options="resetOptions"
    ></SmartFilters>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box child-box" v-if="isLoading">
          <Loader v-if="isLoading" :isLoading="isLoading"></Loader>
        </div>
        <div class="tile is-child box child-box" v-else>
          <CustomMap
            :allCoords="data.coordinates"
            :hotspots="data.map.hotspots"
            :coordinates="data.map.coordinates"
            :showAnimation="filters.animation"
            :showHotSpots="filters.showHotSpots"
            :showRoutes="filters.showRoutes"
            v-if="data.map.hotspots !== null && data.map.coordinates !== null"
          ></CustomMap>
        </div>
      </div>
      <div class="tile is-3 is-vertical is-parent">
        <div class="tile is-child box child-box">
          <SummaryTable :summary="data.summary" :isLoading="isLoading"></SummaryTable>
          <!-- </div>
          <div class="tile is-child box child-box">-->
          <VictimCharts :victims="data.victims" :isLoading="isLoading"></VictimCharts>
          <!-- </div>
          <div class="tile is-child box child-box">-->
          <TraffickingTypeChart :traffickingTypes="data.traffickingTypes" :isLoading="isLoading"></TraffickingTypeChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmartFilters from "@/components/SmartFilters.vue";
import Loader from "@/components/Loader.vue";
import CustomMap from "@/components/CustomMap.vue";
import SummaryTable from "@/components/SummaryTable.vue";
import VictimCharts from "@/components/VictimCharts.vue";
import TraffickingTypeChart from "@/components/TraffickingTypeChart.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Loader,
    SmartFilters,
    CustomMap,
    SummaryTable,
    VictimCharts,
    TraffickingTypeChart
  },

  computed: {
    ...mapState(["options", "data", "filters", "isLoading"])
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions([
      //'updateSelectedTraffickingTypes',
      "loadInitialData",
      "updateFilteredData",
      "setOptions",
      "updateIsLoading"
    ]),
    checkDateRange(date, startDate, endDate) {
      return (date >= startDate && date <= endDate) || date === null;
    },

    checkTypes(dataTraffickTypes, filterTraffickTypes) {
      if (filterTraffickTypes === null || filterTraffickTypes.length === 0) {
        return true;
      }
      // if (
      //   filterTraffickSubTypes === null ||
      //   filterTraffickSubTypes.length === 0
      // ) {
      //   return true;
      // }
      // if any of types in data can be found in filter type list, return true
      let dataTypes = dataTraffickTypes.map(type => type.type).flat();
      // let subTypes = dataTraffickTypes.map(type => type.subtype).flat();
      const foundType = dataTypes.some(
        r => filterTraffickTypes.includes(r)
      );
      // const foundSubType = subTypes.some(r=> filterTraffickSubTypes.includes(r));
      return foundType;
    },

    checkSubTypes(dataTraffickTypes, filterTraffickSubTypes) {
      if (filterTraffickSubTypes === null || filterTraffickSubTypes.length === 0) {
        return true;
      }
      // if any of types in data can be found in filter type list, return true
      let dataTypes = dataTraffickTypes.map(type => type.subtype).flat();
      // let subTypes = dataTraffickTypes.map(type => type.subtype).flat();
      const foundType = dataTypes.some(
        r => filterTraffickSubTypes.includes(r)
      );
      return foundType;
    },

    checkGender(victims, filterGenders) {
      if (filterGenders === null || filterGenders.length === 0) {
        return true;
      }
      let genderData = victims.map(victim => victim.gender).flat();
      // eslint-disable-next-line no-console

      return genderData.some(r => filterGenders.includes(r));
    },

    checkAgeRange(victims, filterAges) {
      if (filterAges === null || filterAges.length === 0) {
        return true;
      }
      let ageData = victims.map(victim => victim.age).flat();
      // eslint-disable-next-line no-console

      return ageData.some(r => filterAges.includes(r));
    },

    checkCountry(countries, filterCountries) {
      if (filterCountries === null || filterCountries.length === 0) {
        return true;
      }
      let countryData = countries.flat();
      // eslint-disable-next-line no-console

      return countryData.some(r => filterCountries.includes(r));
    },

    checkSource(source, countries, option) {
      // eslint-disable-next-line no-console
      //  //console.log(countries)
      // eslint-disable-next-line no-console
      //  //console.log(source)
      if (option === false) {
        return true;
      }
      return countries.includes(source);
    },

    filterDataset() {
      // this.updateIsLoading(true);
      // eslint-disable-next-line no-console
      //console.log("filtering in container");

      //  filters: {
      //       selectedGender: [],
      //       selectedAgeRange: [],
      //       selectedStartDate: null,
      //       selectedEndDate: null,
      //       selectedTraffickingTypes: [],
      //       selectedTraffickingSubTypes: [],
      //       selectedCountries: [],
      //       selectedCountryTypes: [],
      //       asSource: false,
      //       asDestination: false,
      //       asTransit: false,

      //   },
      let filteredData = this.data.routes.filter(route => {
        // eslint-disable-next-line no-console
        // //console.log(route.sdate)
        return (
          this.checkDateRange(
            route.sdate,
            this.filters.selectedStartDate,
            this.filters.selectedEndDate
          ) &&
          this.checkDateRange(
            route.edate,
            this.filters.selectedStartDate,
            this.filters.selectedEndDate
          ) &&
          this.checkTypes(
            route.traffick_type,
            this.filters.selectedTraffickingTypes
          ) &&
          this.checkSubTypes(
            route.traffick_type,
            this.filters.selectedTraffickingSubTypes
          ) &&
          this.checkGender(route.victims, this.filters.selectedGender) &&
          this.checkAgeRange(route.victims, this.filters.selectedAgeRange) &&
          this.checkCountry(route.ctry, this.filters.selectedCountries)
          //TODO - Rethink logic for selected multiple types!!!!!
          // this.checkSource(
          //   route.fctry,
          //   this.filters.selectedCountries,
          //   this.filters.asSource
          // ) &&
          // this.checkSource(
          //   route.tctry,
          //   this.filters.selectedCountries,
          //   this.filters.asDestination
          // ) &&
          // (this.checkSource(
          //   route.vctry1,
          //   this.filters.selectedCountries,
          //   this.filters.asTransit
          // ) ||
          //   this.checkSource(
          //     route.vctry2,
          //     this.filters.selectedCountries,
          //     this.filters.asTransit
          //   ))
          // && this.checkSource(route.ttry, route.ctry, this.filters.asSource)
          // && (this.checkSource(route.vtry1, route.ctry, this.filters.asSource) ||this.checkSource(route.vtry2, route.ctry, this.filters.asSource))
          // ||
          // this.checkDateRange(route.edate, this.filters.selectedStartDate, this.filters.selectedEndDate)
        );
        // return (route.sdate !== null && route.sdate >= this.filters.selectedStartDate)
      });

      // eslint-disable-next-line no-console
      // //console.log(filteredData);
      // let countryTypeRoutes = filteredData;
      // let sourceData = countryTypeRoutes.filter(route => {
      //   return this.checkSource(
      //     route.fctry,
      //     this.filters.selectedCountries,
      //     this.filters.asSource
      //   );
      // });
      // let desData = countryTypeRoutes.filter(route => {
      //   return this.checkSource(
      //     route.tctry,
      //     this.filters.selectedCountries,
      //     this.filters.asDestination
      //   );
      // });
      // let transitData = countryTypeRoutes.filter(route => {
      //   return this.checkSource(
      //     route.vctry1,
      //     this.filters.selectedCountries,
      //     this.filters.asTransit
      //   ) || this.checkSource(
      //     route.vctry2,
      //     this.filters.selectedCountries,
      //     this.filters.asTransit
      //   );
      // });
      let newDataset = []
      let countryTypeRoutes = filteredData;
      if (this.filters.selectedCountries.length > 0) {
        if (this.filters.asSource === true) {
          let data = countryTypeRoutes.filter(route => {
            return this.filters.selectedCountries.includes(route.fctry);
          });
           // eslint-disable-next-line no-console
          //console.log('selected source')
          newDataset.push(data);
        } else {
          // eslint-disable-next-line no-console
          //console.log('unselected source')
          newDataset.push([]);
        }
        if (this.filters.asDestination === true) {
          let data = countryTypeRoutes.filter(route => {
            return this.filters.selectedCountries.includes(route.tctry);
          });
          newDataset.push(data);
        } else {
          newDataset.push([]);
        }
        if (this.filters.asTransit === true) {
          let data = countryTypeRoutes.filter(route => {
            return (
              this.filters.selectedCountries.includes(route.vctry1) ||
              this.filters.selectedCountries.includes(route.vctry2)
            );
          });
          newDataset.push(data);
        }else {
          newDataset.push([]);
        }
        newDataset = newDataset.flat()
        // let newDataset = [...sourceData, ...desData, ...transitData];
        // eslint-disable-next-line no-console
        //console.log(newDataset.length);
        newDataset = [...new Set(newDataset)];
      } else {
        newDataset = filteredData;
      }
      // eslint-disable-next-line no-console
      //console.log(newDataset.length);
      // if selected destination as type,
      // check routes that have ttry of any selected countries ( country 1 OR country 2 OR country 3)

      this.updateFilteredData(newDataset);
      // this.updateIsLoading(false);
    },

    resetOptions() {
      this.setOptions(this.data.filteredRoutes);
    }
  },

  mounted() {
    this.loadInitialData();
  }
};
</script>

<style lang="scss">
.is-ancestor {
  padding-left: 2%;
  padding-right: 2%;

  .is-parent {
    .child-box {
      padding: 0px;
      margin-bottom: 0px !important;
      border: 0px;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
      .card {
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        .card-header {
          .card-header-title {
            padding: 10px 12px;
          }
        }
        .card-content {
          padding: 8px 12px;
          .subtitle {
            margin-bottom: 0px;
            font-size: 14px;
          }

          .level {
            &:not(:last-child) {
              margin-bottom: 8px;
            }
            //margin-bottom: 8px;
          }

          // .level:not(:last-child){
          //   margin-bottom: 8px;
          // }
        }
      }
    }
  }
}
</style>