<template>
<v-card class="mx-auto poke-card" >
    <v-list-item>
        <v-list-item-content>
        <v-list-item-title class="headline">{{name.charAt(0).toUpperCase()+name.slice(1)}}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    <v-img
        v-bind:src="image"
        height="300"
        class="pokeImg"
    ></v-img>
    <v-card-text>
        <p class="font-weight-bold">Descripción:</p>
        {{description.substring(0,220)+ '...'}}
    </v-card-text>
    <v-card-text>
        <p class="font-weight-bold">Habilidad:</p>
        {{ability.charAt(0).toUpperCase()+ability.slice(1)}}
    </v-card-text>
    <v-card-text>
        <p class="font-weight-bold">Tipo:</p>
        <v-chip
        class="ma-2"
        :color="colorType1"
        text-color="white"
        >
        {{type1.charAt(0).toUpperCase()+type1.slice(1)}}
        </v-chip>
        <v-chip
        class="ma-2"
        :color="colorType2"
        text-color="white"
        v-if="type2"
        >
         {{type2.charAt(0).toUpperCase()+type2.slice(1)}}
        </v-chip>
    </v-card-text>
    <v-card-actions>
        <v-btn
        text
        color="deep-purple accent-4"
        @click="addPokemon"
        >
        Escoger pokémon
        </v-btn>
        <v-btn
        text
        color="deep-purple accent-4"
        @click="showPokemonDetail"
        >
        Ver detalle
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            darkMode: false,
        }
    },
    created() {},
    methods: {
        addPokemon() {
            let id = this.id;
            let name = this.name.charAt(0).toUpperCase()+this.name.slice(1);
            let ability = this.ability.charAt(0).toUpperCase()+this.ability.slice(1);
            let item = new Object();
            item.name = name;
            item.ability = ability
            item.id = id;
            this.$emit('added', item)
        },
        showPokemonDetail() {
            let item = new Object();
            item.id = this.id;
            item.name = this.name;
            item.weight = this.weight;
            item.height = this.height;
            item.base_experience = this.base_experience;
            item.moves = this.moves;
            item.image = this.image;
            this.$emit('detail', item)
        }
    },
    props: ['name','image','description','ability', 'type1', 'type2', 'id', 'weight', 'height', 'base_experience', 'moves', 'colorType1', 'colorType2']
}
</script>