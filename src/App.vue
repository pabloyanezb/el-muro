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
};
</script>

<style>
.background {
  width: 100%;
  height: 100%;
  margin: 0 0;
}
@import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@700&display=swap');
.v-toolbar__title {
  font-family: 'Rowdies', cursive;
}
.v-card .container {
  padding: 1rem 2rem 2rem 2rem;
}
</style>