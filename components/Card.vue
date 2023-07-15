<script setup lang="ts">
import { Pokemon } from "~/store/pokemon";
const props = defineProps<{
  pokemon: Pokemon;
}>();
console.log("pokemon", props.pokemon);
</script>
<template>
  <div
    class="border rounded border-gray-800 bg-white shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer p-4"
  >
    <div class="text-center capitalize">{{ props.pokemon.name }}</div>
    <img :src="props.pokemon.image" :alt="props.pokemon.name" />
  </div>
</template>
