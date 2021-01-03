<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Trafficking Types</p>
    </header>
    <div class="card-content">
      <div class="content">
        <!-- :traffickingTypes="traffickingTypes" v-if="traffickingTypes !== null" -->
        <Loader v-if="isLoading" :isLoading="isLoading"></Loader>
        <div v-else>
          <TraffickingTypePieChart
            :traffickingTypes="traffickingTypes.types"
            v-if="traffickingTypes.types !== null"
          ></TraffickingTypePieChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import TraffickingTypePieChart from "@/components/TraffickingTypePieChart.vue";
export default {
  components: {
    TraffickingTypePieChart,
    Loader
  },
  props: {
    traffickingTypes: {
      type: Object
    },
    isLoading:{
      type: Boolean
    }
  }
};
</script>