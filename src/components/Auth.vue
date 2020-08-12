<template>
  <div>
    <v-app-bar
      color="deep-purple darken-4"
      dense
      dark
    >
      <v-toolbar-title>El Muro</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row>
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
  </div>
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
</style>