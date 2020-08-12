<template>
  <v-app>
    <div class="background blue-grey darken-4" >
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  updated() {
    console.log(this.$store.state.user);
  }
};
</script>

<style>
.background {
  width: 100%;
  height: 100%;
  margin: 0 0;
}
.logout {
  margin-left: 2rem;
  top: -0.5rem;
}
@import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@700&display=swap');
.v-toolbar__title {
  font-family: 'Rowdies', cursive;
}
</style>