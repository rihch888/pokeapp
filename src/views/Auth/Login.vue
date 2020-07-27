<template>
    <div class="container">
        <h3>Iniciar Sesión</h3>
        <form @submit.prevent="login">
            <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="Correo Electrónico"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="passwordErrors"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            hint="Al menos 6 caracteres"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn class="mr-4" color="primary" @click="login" :disabled="this.$v.$invalid">Iniciar Sesión</v-btn>
        </form>
        <v-snackbar
          v-model="snackbar"
        >
          {{ textError }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
import firebase from 'firebase';

export default {
    name: 'Login',
    mixins: [validationMixin],
    validations: {
      email: { required, email },
      password: {required, minLength: minLength(6)},
    },

    data: () => ({
        email: '',
        show1: false,
        password: '',
        snackbar: false,
        textError: ''
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Debe ser un correo válido')
        !this.$v.email.required && errors.push('Correo electrónico requerido')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Contraseña requerida')
        !this.$v.password.minLength && errors.push('Mínimo 6 caracteres')
        return errors
      },
    },
    methods: {
      login () {
        this.submitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        } else {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                console.log(user);
                this.$router.push('/home');
            }).catch(err => {
                this.error = err.message;
                this.textError = err.message;
                this.snackbar = true;
                this.$v.$reset();
            })
        }
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.password = ''
      },
    },
}
</script>