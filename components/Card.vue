<script setup lang="ts">
import { Pokemon } from "~/store/pokemon";

const props = defineProps<{
  pokemon: Pokemon;
}>();

const colorByType = (type: string) => {
  const { useColorByType } = useUtils();
  return useColorByType(type);
};
</script>
<template>
  <div
    class="border rounded border-gray-800 bg-white shadow-lg hover:shadow-xl md:hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer p-4 overflow-visible"
  >
    <div class="text-center capitalize">{{ props.pokemon.name }}</div>
    <div class="overflow-hidden flex justify-center">
      <img
        class="transform-gpu hover:scale-100"
        :src="props.pokemon.image"
        :alt="props.pokemon.name"
      />
    </div>
    <div class="flex flex-row justify-center">
      <div
        :class="
          'shadow-xl border w-5 h-5  m-1 rounded-full px-2  text-white text-center ' +
          colorByType(type)
        "
        v-for="(type, index) in props.pokemon.types"
        :key="index"
      ></div>
    </div>
  </div>
</template>
