<template>
    <v-toolbar
      dark
      fixed
      class="header"
      :class="mode"
    >
    <template v-if="user">
      <v-toolbar-title>Bienvenido {{user.email}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-img
          alt="Pokemon Logo"
          class="shrink mr-2"
          contain
          src="../../assets/pokemon-logo.png"
          transition="scale-transition"
          width="140"
        />
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-lg-flex d-xl-none d-none d-xl-flex">
        <v-btn
          to="/home"
          text
        >
        <span class="mr-2">Home</span>
        </v-btn>
        <v-btn
          to="/home/#"
          text
        >
        <span class="mr-2">Habilidades</span>
        </v-btn>
        <v-switch class="mr-2" v-model="darkMode" :label="`Modo Dark`" @change="$emit('toggle')"></v-switch>
        <v-btn
          @click.prevent="logout"
          text
        >
        <span class="mr-2">Cerrar Sesión</span>
        <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar-items>

    <!-- MOBILE MENU -->
    <v-toolbar-items class="d-none d-md-flex d-lg-none d-none d-sm-flex d-md-none d-flex d-sm-none">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item>
            <v-btn
              to="/home"
              text
            >
            <span class="mr-2">Home</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              to="/home/#"
              text
            >
            <span class="mr-2">Habilidades</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-switch class="mr-2" v-model="darkMode" :label="`Modo Dark`" @change="$emit('toggle')"></v-switch>
          </v-list-item>
          <v-list-item>
            <v-btn
              @click.prevent="logout"
              text
            >
              <span class="mr-2">Cerrar Sesión</span>
              <v-icon>mdi-export</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
      
    </template>
    <template v-else>
    <div class="d-flex align-center">
        <v-img
          alt="Pokemon Logo"
          class="shrink mr-2"
          contain
          src="../../assets/pokemon-logo.png"
          transition="scale-transition"
          width="140"
        />
      </div>
    <v-spacer></v-spacer>
     <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        to="/"
        text
      >
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn
        to="/register"
        text
      >
        <span class="mr-2">Regístrate</span>
      </v-btn>
    </v-toolbar-items>

    <!-- MOBILE MENU -->
    <v-toolbar-items class="d-none d-sm-flex d-md-none d-flex d-sm-none">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item>
            <v-btn
              to="/"
              text
            >
            <span class="mr-2">Login</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              to="/register"
              text
            >
            <span class="mr-2">Regístrate</span>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    </template>
    </v-toolbar>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            user: null,
            darkMode: false,
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push('/');
            })
        },
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        })
    },
    props: ['mode']
}
</script>