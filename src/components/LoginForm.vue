<template>
  <div>
    <app-alert v-if="authError" :authError="authError.message"></app-alert>
    <form @submit.prevent="onSignin">
      <div class="modal-card" style="width: 30%">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Email">
            <b-input type="email" v-model="email" :value="email" placeholder="Your email" required></b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="password"
              :value="password"
              password-reveal
              placeholder="Your password"
              required
            ></b-input>
          </b-field>

          <!-- <b-checkbox>Remember me</b-checkbox> -->
        </section>
        <footer class="modal-card-foot">
          <button type="submit" class="button is-primary" :loading="isLoading">Login</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props:{
    authError:{
      type: Object
    }
  },
  data: () => ({
    email: "",
    password: "",
    isLoading: false
  }),
  methods: {
    onSignin() {
      this.isLoading = true;
      this.$emit("on-sign-in", {
        email: this.email,
        password: this.password
      });
      this.isLoading = false;
    }
  }
};
</script>