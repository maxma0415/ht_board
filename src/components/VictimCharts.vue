<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Victims</p>
    </header>
    <div class="card-content">
      <div class="content">
        <p class="subtitle">By Gender</p>
        <Loader v-if="isLoading" :isLoading="isLoading"></Loader>
        <div v-else>
        <VictimGenderChart :genders="victims.genders" v-if="victims.genders != null"></VictimGenderChart>
        </div>
        <p class="subtitle">By Age Group</p>
        <Loader v-if="isLoading" :isLoading="isLoading"></Loader>
        <div v-else>
        <VictimAgeRangeChart :ageRanges="victims.ageRanges" v-if="victims.ageRanges !== null"></VictimAgeRangeChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue"
import VictimGenderChart from "@/components/VictimGenderChart.vue";
import VictimAgeRangeChart from "@/components/VictimAgeRangeChart.vue";
export default {
  components: {
    VictimGenderChart,
    VictimAgeRangeChart,
    Loader
  },
  props: {
    victims: {
      type: Object
    },
    isLoading: {
      type: Boolean
    }

  },
  // computed: {
  //   gender() {
  //     return this.victims.genders.map(gender => {
  //       return {
  //         name: gender.gender,
  //         value: gender.num
  //       }
  //     })
  //   }
  // },
  data() {
    // let genders = this.victims.genders.map(gender => {
    //     return {
    //       name: gender.gender,
    //       value: gender.num
    //     }
    //   });
    return {

    }
  }
};
</script>