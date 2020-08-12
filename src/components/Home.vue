<template>
  <div>
    <v-app-bar
      class="font-weight-bold"
      color="deep-purple darken-4"
      dense
      dark
    >
      <v-toolbar-title>El Muro</v-toolbar-title>
      <v-spacer></v-spacer>
      <h3>Success! Welcome {{ user.displayName }}</h3>
      <v-btn color="grey lighten-3 blue-grey--text text--darken-3" @click="logOut" class="logout">Log Out</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
    }
  }
};
</script>

<style>
</style>
