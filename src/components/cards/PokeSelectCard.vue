<template>
<v-card class="poke-select-card">
    <v-card-title class="subheading font-weight-bold">Pokémon elegidos</v-card-title>
    <v-divider></v-divider>
    <v-list dense>
        <v-list-item>
        <v-list-item-content><b>Nombre</b></v-list-item-content>
        <v-list-item-content><b>Habilidad</b></v-list-item-content>
        <v-list-item-content><center><b>Acción</b></center></v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(pokemon, key) in pokemons" v-bind:key="key">
        <v-list-item-content>{{pokemon.name}}</v-list-item-content>
        <v-list-item-content>{{pokemon.ability}}</v-list-item-content>
        <v-list-item-content >
            <v-btn
            text
            color="error"
            @click="removePokemon(key)"
            >
            Quitar
            </v-btn>
        </v-list-item-content>
        </v-list-item>
    </v-list>
    <v-btn
        text
        color="deep-purple accent-4"
        @click="refreshPokemonCards"
        >
        Regargar Pokémons
    </v-btn>
    <v-btn
        text
        color="deep-purple accent-4"
        @click="removeAllPokemonSelected"
        >
        Quitar seleccionados
    </v-btn>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            darkMode: false,
            pokemons: this.pokeList
        }   
    },
    created() {},
    methods: {
        removePokemon(id) {
            this.pokeList.splice(id, 1);
        },
        removeAllPokemonSelected() {
            if (this.pokemons.length > 0) {
                this.pokemons.splice(0, this.pokemons.length);
            }
        },
        refreshPokemonCards() {
            this.$emit('refreshCards')
        }
    },
    props: ['pokeList']
}
</script>