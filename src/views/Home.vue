<template>
  <div class="home">
  <div class="selectPokemon">
    <v-col class="d-flex" cols="12" sm="3">
        <v-select
          :items="tipos"
          :value="tipos"
          @input="selectPokemonType"
          label="SELECTOR DE POKÉMON"
          outlined
        ></v-select>
      </v-col>
  </div>
    <div class="row">
      <div class="poke-col">
      <v-skeleton-loader class="mx-auto  poke-card" type="card" height="550" v-if="loading" transition="fade-transition"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto  poke-card" type="card" height="550" v-if="loading" transition="fade-transition"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto  poke-card" type="card" height="550" v-if="loading" transition="fade-transition"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto  poke-card" type="card" height="550" v-if="loading" transition="fade-transition"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto  poke-card" type="card" height="550" v-if="loading" transition="fade-transition"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto  poke-card" type="card" height="550" v-if="loading" transition="fade-transition"></v-skeleton-loader>
      <PokeCard v-for="pokemon in pokemons" v-bind:key="pokemon.id" :name="pokemon.name" :image="pokemon.image" :ability="pokemon.ability" :description="pokemon.description" :weight="pokemon.weight" :height="pokemon.height" :base_experience="pokemon.base_experience" :moves="pokemon.moves" :type1="pokemon.type1" :type2="pokemon.type2" :colorType1="pokemon.colorType1" :colorType2="pokemon.colorType2" :id="pokemon.id" @added="addPokemon" @detail="showPokemonDetail"/>      
      </div>
      <div class="poke-select-col">
        <PokeSelectCard :pokeList="pokeList" @refreshCards="refreshPokemonCards"/>     
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      color="green"
    >
      <center>
        {{ textAddList }}
      </center>
    </v-snackbar>
    <v-snackbar
      v-model="snackbar2"
      color="red"
    >
      <center>
        {{ textErrList }}
      </center>
    </v-snackbar>
  </div>
</template>

<script>
import PokeCard from '@/components/cards/PokeCard'
import PokeSelectCard from '@/components/cards/PokeSelectCard'
import PokemonService from '@/services/pokemonService.js';
const pokeService = new PokemonService();

export default {
  name: 'Home',
  components: {
    PokeCard,
    PokeSelectCard
  },
  data() {
    return {
      tipos: [],
      pokemons: [],
      pokeList: [],
      loading: false,
      snackbar: false,
      textAddList: '',
      snackbar2: false,
      textErrList: ''
    }
  },
  mounted() {
    this.getPokemonsTypes();
  },
  methods: {
    getPokemonsTypes() {
      let pokSe = pokeService.getAllPokemonTypes();
      this.tipos = pokSe;
    },
    setLoadingActive() {
      this.loading=true;
    },
    setLoadingInactive() {
      this.loading=false;
    },
    async selectPokemonType(value) {
      this.setLoadingActive();
      let pokemons = await pokeService.getAllPokemonByType(value);
      this.pokemons = pokemons;
      this.setLoadingInactive();
    },
    addPokemon(value) {
      let existe = 0;
      for (let i = 0; i<this.pokeList.length; i++) {
        if (this.pokeList[i].id==value.id) {
          existe++;
        }
      }
      if (existe==0) {
        this.snackbar = true;
        this.textAddList = 'Agregaste a '+value.name+' a tu equipo.';
        this.pokeList.push(value);
      } else {
        this.snackbar2 = true;
        this.textErrList = 'Ya tienes a '+value.name+' en tu equipo.';
      }
    },
    showPokemonDetail(details) {
      this.$router.push({ name: 'pokemonDetail', params: { details: details }});
    },
    refreshPokemonCards() {
      if (this.pokemons.length > 0) {
          this.pokemons.splice(0, this.pokemons.length);
      }
    }
  }
}
</script>
