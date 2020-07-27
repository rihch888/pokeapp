<template>
<div class="pokemon-detail">
<div class="row detail">
<div class="poke-col-detail-tables">
<v-card class="poke-select-card">
<v-btn
    x-large
    text
    color="deep-purple"
    @click="regresar"
    >
    Regresar
    </v-btn>
<v-card>
<v-img
    :src="details.image"
    class="white--text align-end"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    height="200px"
>
    <v-card-title >{{details.name.charAt(0).toUpperCase()+details.name.slice(1)}}</v-card-title>
</v-img>
</v-card>
<v-card-title class="subheading font-weight-bold">Detalles generales</v-card-title>
<v-divider></v-divider>
<v-list dense>
    <v-list-item>
    <v-list-item-content><center><b>Altura</b></center></v-list-item-content>
    <v-list-item-content><center><b>Peso</b></center></v-list-item-content>
    <v-list-item-content><center><b>Experiencia base</b></center></v-list-item-content>
    </v-list-item>
    <v-list-item>
    <v-list-item-content><center>{{details.height}} m</center></v-list-item-content>
    <v-list-item-content><center>{{details.weight}} kg</center></v-list-item-content>
    <v-list-item-content><center>{{details.base_experience}} xp</center></v-list-item-content>
    </v-list-item>
</v-list>
</v-card>
<v-card class="poke-select-card">
<v-card-title class="subheading font-weight-bold">Movimientos</v-card-title>
<v-divider></v-divider>
<v-list dense>
    <v-list-item>
    <v-list-item-content><center><b>Movimiento</b></center></v-list-item-content>
    </v-list-item>
    <v-list-item v-for="(move, key) in moves" v-bind:key="key">
    <v-list-item-content><center>{{move.name.charAt(0).toUpperCase()+move.name.slice(1)}}</center></v-list-item-content>
    </v-list-item>
</v-list>
</v-card>
</div>
</div>
</div>

</template>
<script>
export default {
  name: 'PokemonDetail',
  mounted() {
      this.getDetails();
  },
  methods: {
      getDetails() {
          let details = this.$route.params.details;
          this.details = details;
          for (let i = 0; i<5; i++) {
              var mo = new Object();
              mo.name = details.moves[i]['move'].name;
              this.moves.push(mo);
          }
      },
      regresar() {
          this.$router.push('/home');
      }
  },
   data() {
    return {
        details: {
            name: "",
            image: "",
            height: 0,
            weight: 0,
            base_experience: 0,
        },
        moves: [],
    }
  },
}
</script>
