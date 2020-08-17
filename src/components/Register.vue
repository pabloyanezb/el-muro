<template>
  <v-form v-model="valid" @submit.prevent="upload">
    <v-container>
    <h1>Registro</h1>
      <v-text-field
        v-model="name"
        :rules="[v => !!v || 'Debes ingresar un nombre']"
        label="Nombre"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        label="Contraseña"
        v-model="password"
        :type="show1 ? 'text' : 'password'"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        :rules="passRules"
        counter
        required
      ></v-text-field>
      <v-text-field
        label="Confirmar Contraseña"
        v-model="confirm"
        :type="show2 ? 'text' : 'password'"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show2 = !show2"
        :rules="[(password === confirm) || 'Las contraseñas no coinciden', v => !!v || 'Debes ingresar una contraseña']"
        counter
        required
      ></v-text-field>
      <v-file-input
        accept="image/*" 
        label="Foto de Perfil" 
        prepend-icon="" 
        append-icon="mdi-camera"
        @change='get_img'
      ></v-file-input>
      <v-btn color="accent" :disabled="!valid" type='submit'>Registrar</v-btn>
      <v-alert v-if="error != null" type="error" dense outlined>{{error}}</v-alert>
    </v-container>
  </v-form>
</template>

<script>
import { fb } from '@/firebase'

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
      show1: false,
      passRules: [
        v => !!v || 'Debes ingresar una contraseña', 
        v => (v && v.length >= 6) || 'La contraseña debe tener 6 o más carácteres' 
      ],
      confirm: '',
      show2: false,
      name: '',
      img: null,
    }
  },
  computed: {
    error() {
      return this.$store.state.error_register;
    }
  },
  methods: {
    register(img_url) {
      const datos = {
        email: this.email, 
        password: this.password,
        name: this.name,
        img: img_url
      };
      this.$store.dispatch('register', datos);
    },
    get_img(img) {
      console.log(img);
      this.img = img
    },
    upload() {
      if (this.img == null) {
        this.register(null);
        return;
      }
      const storageRef = fb.storage().ref('profile-pic/' + this.img.name).put(this.img);
      
      storageRef.on('state_changed',
        function(){},
        function(upload_error) {
          console.log(upload_error)
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL()
          .then(url => {
            this.register(url)
          })
        }      
      )
    }
  }
}
</script>

<style>
.v-btn {
  margin-top: 1rem;
}
.v-alert {
  margin-top: 1rem;
}
</style>