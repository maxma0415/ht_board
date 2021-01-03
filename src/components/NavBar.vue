<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item>
        <h1>Trafficking Spots and Routes</h1>
        <!-- <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
        >-->
      </b-navbar-item>
    </template>

    <template slot="end" v-if="user.isLoggedIn">
      <b-navbar-item>
        <strong>{{ user.email}}</strong>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-button type="is-primary" outlined @click="onSignOut">
          <b-icon pack="fas" icon="sign-out-alt" size="is-small" custom-class></b-icon>
          <span>Log out</span>
        </b-button>
        <!-- <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">Log in</a>
        </div>-->
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    onSignOut() {
       this.$emit("on-sign-out");
    },
  }
};
</script>
<style lang="scss">
.navbar {
  border: 0;
  //border-radius: 3px;
  padding: 0.625rem 1rem;
  margin-bottom: 20px;
  //height: auto !important;
  color: #555;
  background-color: #fff !important;
  box-shadow: 0 4px 18px 0px rgba(0, 0, 0, 0.12),
    0 7px 10px -5px rgba(0, 0, 0, 0.15);
}
</style>

