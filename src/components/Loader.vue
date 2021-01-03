<template>
  <b-loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false">
    <b-icon pack="fas" icon="spinner" size="is-medium" custom-class="fa-spin"></b-icon>
     <span class="loading-text"> Loading ...</span>
  </b-loading>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean
        }
    }
}
</script>

<style lang="scss">

</style>