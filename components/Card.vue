<script setup lang="ts">
import { Pokemon } from "~/store/pokemon";

const props = defineProps<{
  pokemon: Pokemon;
}>();
</script>
<template>
  <div
    class="border rounded border-gray-800 bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer p-4 overflow-visible"
  >
    <div class="text-center capitalize">{{ props.pokemon.name }}</div>
    <div class="overflow-hidden flex justify-center">
      <img
        class="transform-gpu hover:scale-100"
        :src="props.pokemon.image"
        :alt="props.pokemon.name"
      />
    </div>
  </div>
</template>
