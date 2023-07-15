<script setup>
import { usePokemonStore } from "~/store/pokemon";
const store = usePokemonStore();

store.fetchPokemons();
let pokemons = store.pokemonList;
console.log("pokemons", pokemons);
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-y-auto items-center p-8"
  >
    <div
      v-for="(pokemon, index) in pokemons"
      :key="index"
      class="flex justify-center w-128"
    >
      <Card :pokemon="pokemon" />
    </div>
  </div>
</template>
