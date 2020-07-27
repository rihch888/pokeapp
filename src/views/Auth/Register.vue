<template>
    <div class="container">
        <h3>Crear un usuario</h3>
        <form @submit.prevent="register">
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
          <v-text-field
            v-model="password2"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="password2Errors"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="Repite la contraseña"
            required
            @input="$v.password2.$touch()"
            @blur="$v.password2.$touch()"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-btn class="mr-4 my-green" @click="register" :disabled="this.$v.$invalid" x-large>Regístrate</v-btn>
        </form>
        <v-snackbar
          v-model="snackbar"
          color="red"
        >
          {{ textError }}
        </v-snackbar>
    </div>
</template>

<style lang="scss">
    @import '../../scss/global.scss';
    .my-green {
        background-color: $green !important;
        color: $dark-words !important;
    }
</style>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import firebase from 'firebase';

export default {
    name: 'Register',
    mixins: [validationMixin],
    validations: {
      email: { required, email },
      password: {required, minLength: minLength(6)},
      password2: {required, sameAsPassword: sameAs('password')}
    },
    data: () => ({
        email: '',
        show1: false,
        show2: false,
        password: '',
        password2: '',
        snackbar: false,
        textError: '',
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
      password2Errors () {
            const errors = []
            if (!this.$v.password2.$dirty) return errors
            !this.$v.password2.required && errors.push('Confirmación de contraseña requerida')
            !this.$v.password2.sameAsPassword && errors.push('Las contraseñas no son iguales')
            return errors
      }
    },
    methods: {
      register () {
        this.submitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                this.$v.$reset()
                this.email = ''
                this.password = ''
                this.password2 = ''
                console.log(user);
                this.$router.push('/home');
            }).catch(err => {
                this.error = err.message;
                this.textError = err.message;
                this.snackbar = true;
            })
        }
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.password = ''
        this.password2 = ''
      },
    },
}
</script>