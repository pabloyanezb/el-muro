<template>
  <v-form v-model="valid" @submit.prevent="register">
    <v-container>
    <h1>Registro</h1>
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
      <v-text-field
        label="Confirmar Contraseña"
        v-model="confirm"
        type="password"
        :rules="[(password === confirm) || 'Las contraseñas no coinciden', v => !!v || 'Debes ingresar una contraseña']"
        required
      ></v-text-field>
      <v-btn color="secondary" :disabled="!valid" type='submit'>Registrar</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Register',
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
        v => (v && v.length >= 6) || 'La contraseña debe tener 5 o más carácteres' 
      ],
      confirm: '',
    }
  },
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    register() {
      const datos = {email: this.email, password: this.password};
      this.$store.dispatch('register', datos);
    }
  }
}
</script>

<style>
.v-btn {
  margin-top: 1rem;
}
</style>