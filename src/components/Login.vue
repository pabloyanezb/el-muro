<template>
  <v-form v-model="valid">
    <v-container>
    <h1>Ingresar</h1>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        label="Contraseña"
        v-model="password"
        type="password"
        :rules="passRules"
        required
      ></v-text-field>
      <v-btn color="secondary" :disabled="!valid">Ingresar</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'Debes ingresar un E-mail',
        v => /.+@.+/.test(v) || 'E-mail no válido',
      ],
      password: '',
      passRules: [
        v => !!v || 'Debes ingresar una contraseña', 
        v => (v && v.length >= 5) || 'La contraseña debe tener 5 o más carácteres' 
      ],
    }
  },
}
</script>