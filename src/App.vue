<template>
  <div id="app">
    <NavBar :user="user" @on-sign-out="logOut"></NavBar>
    <LoginForm v-if="!user.isLoggedIn" @on-sign-in="logIn" :authError="authError"></LoginForm>
    <SmartDashboardContainer v-else></SmartDashboardContainer>
  </div>
</template>

<script>

import NavBar from "./components/NavBar.vue";
import SmartDashboardContainer from './components/SmartDashboardContainer.vue';
import LoginForm from "./components/LoginForm.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "app",
  components: {
    NavBar,
    SmartDashboardContainer,
    LoginForm,
    // HelloWorld
  },
  computed: {
    ...mapState(["user", "authError"])
  },
  methods:{
    ...mapActions([
      'signIn',
      'signOut'
    ]),
    logIn(credentials){
      this.signIn(credentials)
    },
    logOut(){
      this.signOut()
    }

  }

};
</script>

<style>
#app {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
