<script setup>
import { usePokemonStore } from "~/store/pokemon";
const store = usePokemonStore();

store.fetchPokemons();
let pokemons = store.pokemonList;
console.log("pokemons", pokemons);

definePageMeta({
  layout: "custom",
  //middleware: "auth",
});
</script>

<template>
  <div>
    <h1>Hello {{ pending ? "Loading" : pokemons }}</h1>
  </div>
</template>
