<template>
  <!--Smart component for filters-->
  <!--Get and update filter data-->

  <b-tabs position="is-centered" class="block" expanded>
    <!--General Tab-->
    <b-tab-item label="GENERAL">
      <b-field label="Animation" custom-class="is-small">
        <b-switch :value="filters.animation" @input="resetAnimation">Enable Animation</b-switch>
      </b-field>
      <b-field label="View" custom-class="is-small"></b-field>
      <div class="field">
        <b-checkbox :value="filters.showRoutes" :disabled="isLoading" @input="resetShowRoutes">Show Route</b-checkbox>
      </div>
      <div class="field">
        <b-checkbox :value="filters.showHotSpots" :disabled="isLoading" @input="resetShowHotSpots">Show Hotspots</b-checkbox>
      </div>
    </b-tab-item>

    <!--Types Tab-->
    <b-tab-item label="TYPES">
      <b-field label="From" custom-class="is-small">
        <!--min date - start date in list, max-date: selected end date-->
        <b-datepicker
          :loading="isLoading"
          :min-date="selectedStartDateObj"
          :max-date="selectedEndDateObj"
          v-model="selectedStartDateObj"
          @input="updateStartDate"
          icon="calendar-today"
          editable
        ></b-datepicker>
      </b-field>
      <b-field label="To" custom-class="is-small" expanded>
        <!--min date - selected start date, max-date: end date in list-->
        <b-datepicker
          :loading="isLoading"
          :min-date="selectedStartDateObj"
          :max-date="selectedEndDateObj"
          v-model="selectedEndDateObj"
          @input="updateEndDate"
          icon="calendar-today"
          editable
        ></b-datepicker>
      </b-field>
      <div v-if="!selectedStartDateObj || !selectedEndDateObj">Enter valid Start Date and End Date</div>
      <div v-else>
        <b-field label="Trafficking Types" custom-class="is-small">
          <SmartFiltersTagInput
            elementName="Trafficking Type"
            :elements="options.traffickingTypeOptions"
            :selected="filters.selectedTraffickingTypes"
            @onUpdateElement="updateTraffickingTypes"
          ></SmartFiltersTagInput>
        </b-field>
        <b-field label="Trafficking Sub Types" custom-class="is-small">
          <SmartFiltersTagInput
            elementName="Trafficking Sub-Type"
            :elements="options.traffickingSubTypeOptions"
            :selected="filters.selectedTraffickingSubTypes"
            @onUpdateElement="updateTraffickingSubTypes"
          ></SmartFiltersTagInput>
        </b-field>
      </div>
    </b-tab-item>

    <!--Victim Tab-->
    <b-tab-item label="VICTIMS">
      <b-field label="Gender" custom-class="is-small">
        <div class="block">
          <b-checkbox
            @input="updateGender"
            v-model="filters.selectedGender"
            v-for="gender in options.victimGenderOptions"
            :disabled="isLoading"
            :key="gender"
            :native-value="gender"
          >{{gender}}</b-checkbox>
        </div>
      </b-field>
      <b-field label="Age Range" custom-class="is-small"></b-field>
      <div class="field" v-for="range in options.victimAgeRangeOptions" :key="range">
        <b-checkbox
          :native-value="range"
          :disabled="isLoading"
          @input="updateAgeRange"
          v-model="filters.selectedAgeRange"
        >{{range}}</b-checkbox>
      </div>
    </b-tab-item>

    <!--Country Tab-->
    <b-tab-item label="COUNTRIES">
      <b-field label="Countries" custom-class="is-small">
        <SmartFiltersTagInput
          elementName="Country"
          :selected="filters.selectedCountries"
          :elements="options.countryOptions"
          @onUpdateElement="updateCountries"
        ></SmartFiltersTagInput>
      </b-field>
      <div v-if="filters.selectedCountries.length > 0">
        <b-field label="Country Types" custom-class="is-small"></b-field>
        <!-- <div class="field" v-for="type in options.countryTypes" :key="type">
        <b-checkbox
          :native-value="type"
          @input="updateCountryTypes"
          v-model="filters.selectedCountryTypes"
        >{{type | capitalize}}</b-checkbox>
      </div> -->
        <div class="field">
          <b-checkbox :value="filters.asSource" :disabled="isLoading" @input="resetAsSource">Source</b-checkbox>
        </div>
        <div class="field">
          <b-checkbox :value="filters.asDestination" :disabled="isLoading" @input="resetAsDestination">Detination</b-checkbox>
        </div>
        <div class="field">
          <b-checkbox :value="filters.asTransit" :disabled="isLoading" @input="resetAsTransit">Transit</b-checkbox>
        </div>
      </div>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import SmartFiltersTagInput from "@/components/SmartFiltersTagInput.vue";
// import moment from 'moment'
import { mapActions, mapState } from "vuex";
export default {
  components: {
    SmartFiltersTagInput
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      genderGroup: [],
      ageRange: [],
      selectedStartDateObj: null,
      selectedEndDateObj: null
    };
  },
  computed: {
    ...mapState(["filters", "isLoading"])
    // selectedStartDateObj(){
    //   return new Date(this.filters.selectedStartDate)
    // },
    // selectedEndDateObj() {
    //   return new Date(this.filters.selectedEndDate)
    // }
  },
  methods: {
    ...mapActions([
      "updateAnimation",
      "updateShowRoutes",
      "updateShowHotSpots",
      "updateSelectedGender",
      "updateSelectedAgeRange",
      "updateSelectedStartDate",
      "updateSelectedEndDate",
      "updateSelectedTraffickingTypes",
      "updateSelectedTraffickingSubTypes",
      "updateSelectedCountries",
      "updateSelectedCountryTypes",
      "updateAsSource",
      "updateAsDestination",
      "updateAsTransit",
      "setOption"
    ]),

    updateTraffickingTypes(selectedOptionsFromTagInput) {
      // eslint-disable-next-line no-console
      //console.log(selectedOptionsFromTagInput);
      this.updateSelectedTraffickingTypes(selectedOptionsFromTagInput);
      this.$emit("on-filter-data");
      //this.filterDataset();
    },

    updateTraffickingSubTypes(selectedOptionsFromTagInput) {
      // eslint-disable-next-line no-console
      //console.log(selectedOptionsFromTagInput);
      this.updateSelectedTraffickingSubTypes(selectedOptionsFromTagInput);
      this.$emit("on-filter-data");
      //this.filterDataset();
    },

    updateCountries(selectedOptionsFromTagInput) {
      // eslint-disable-next-line no-console
      //console.log(selectedOptionsFromTagInput);
      this.updateSelectedCountries(selectedOptionsFromTagInput);
      this.$emit("on-filter-data");
      //this.filterDataset();
    },


    resetAnimation(value) {
      // eslint-disable-next-line no-console
      //console.log(value);
      this.updateAnimation(value);
    },

    resetShowRoutes(value) {
      // eslint-disable-next-line no-console
      //console.log(value);
      this.updateShowRoutes(value);
    },

    resetShowHotSpots(value) {
      // eslint-disable-next-line no-console
      //console.log(value);
      this.updateShowHotSpots(value);
    },

    updateStartDate() {
      // eslint-disable-next-line no-console
      //console.log(this.selectedStartDateObj);
      this.updateSelectedStartDate(
        this.toTimestamp(this.selectedStartDateObj.toString())
      );
      this.$emit("on-filter-data");
      this.$emit("on-reset-options");
      //this.filterDataset();
    },

    updateEndDate() {
      // eslint-disable-next-line no-console
      //console.log(value);
      this.updateSelectedEndDate(
        this.toTimestamp(this.selectedEndDateObj.toString())
      );
      this.$emit("on-filter-data");
      this.$emit("on-reset-options");
      //this.filterDataset();
    },

    resetAsSource(value) {
      this.updateAsSource(value);
      this.$emit("on-filter-data");
      //this.filterDataset();
    },
    resetAsDestination(value) {
      this.updateAsDestination(value);
      this.$emit("on-filter-data");
      //this.filterDataset();
    },
    resetAsTransit(value) {
      this.updateAsTransit(value);
      this.$emit("on-filter-data");
      //this.filterDataset();
    },

    //update gender
    updateGender() {
      //this.updateSelectedGender(this.genderGroup);
      this.updateSelectedGender(this.filters.selectedGender);
      this.$emit("on-filter-data");
      //this.filterDataset();
    },
    //update age range
    updateAgeRange() {
      this.updateSelectedAgeRange(this.filters.selectedAgeRange);
      this.$emit("on-filter-data");
      //this.filterDataset();
    },

    updateCountryTypes(){
      this.updateSelectedCountryTypes(this.filters.selectedCountryTypes);
      //this.$emit("on-filter-data");
     },

    toTimestamp(strDate) {
      const datum = Date.parse(strDate);
      return datum;
    },

    timestampToMoment(timestamp) {
      const date = new Date(timestamp);
      return date.toString();
      // return moment(String(date)).format('MM/DD/YYYY')
    }
  },
  mounted() {
    this.selectedStartDateObj = new Date(this.filters.selectedStartDate);
    this.selectedEndDateObj = new Date(this.filters.selectedEndDate);
  }
};
</script>
<style lang="scss">
</style>