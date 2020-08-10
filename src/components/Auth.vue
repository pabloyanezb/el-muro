<template>
  <v-row class="background blue-grey darken-4" >
    <v-col md='3' offset-md='1'>
      <v-card>
        <Register></Register>
      </v-card>
    </v-col>
    <v-col md='3' offset-md='4'>
      <v-card>
        <Login></Login>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Login from './Login'
import Register from './Register'

export default {
  components: {
    Login, 
    Register 
  },

}
</script>

<style>
.background {
  width: 100%;
  height: 100vh;
  margin: 0 0;
}
</style>