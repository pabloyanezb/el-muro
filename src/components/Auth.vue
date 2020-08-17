<template>
  <div>
    <v-app-bar
      color="grey darken-4"
      dense
      dark
    >
      <v-toolbar-title>The Wall</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row>
      <v-col md='4' offset-md='1'>
        <v-container>
          <v-card>
            <Register></Register>
          </v-card>
        </v-container>
      </v-col>
      <v-col md='4' offset-md='2'>
        <v-container>
          <v-card>
            <Login></Login>
          </v-card>
        </v-container>
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

<style scoped>
</style>