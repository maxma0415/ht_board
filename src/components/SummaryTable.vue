<template>
  <div class="card has-text-centered">
    <header class="card-header">
      <p class="card-header-title">Number of Cases</p>
    </header>
    <div class="card-content">
      <div class="content">
        <nav class="level" v-for="data in summaryArray" :key="data.header">
          <div class="level-item level-left">
            <p class="subtitle is-5">{{data.header | capitalize}}</p>
          </div>
          <!-- <div class="level-item level-right" v-if="isLoading">
            <Loader :isLoading="isLoading"></Loader>
          </div> -->
          <div class="level-item level-right">
            <Loader v-if="isLoading" :isLoading="isLoading"></Loader>
            <p class="subtitle is-5" v-else>
              <strong v-if="isDate(data.header)">{{data.value | moment("MMM D, YYYY")}}</strong>
              <strong v-else>{{data.value | numberWithCommas}}</strong>
            </p>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <!--End Case Summary Table-->
</template>

<script>
import Loader from "@/components/Loader.vue"
export default {
  components:{
    Loader
  },
  props: {
    summary: {
      type: Object
    },
    isLoading: {
      type: Boolean
    }
  },
  computed: {
    summaryArray() {

      return   [
        {
          header: "from",
          value: this.summary.startDate
        },
        {
          header: "to",
          value: this.summary.endDate
        },
        {
          header: "total cases",
          value: this.summary.numCases
        }
      ]

    }
  },
  data() {
    return {

    };
  },
  methods: {
    isDate(header) {
      return header === 'from' || header === 'to'
    }
  }
};
</script>

<style lang="scss">

</style>


