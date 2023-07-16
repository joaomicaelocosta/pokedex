<script setup lang="ts">
import { Pokemon } from "~/store/pokemon";
const emit = defineEmits(["closePopup"]);

const props = defineProps<{
  pokemon: Pokemon;
}>();

const locations = ref<string>(
  "Can be found in " + props.pokemon.locations.slice(0, 3).join(", ")
);

const closePopup = () => {
  console.log("closePopup");
  emit("closePopup");
};

const colorByType = (type: string) => {
  let color: string = "";
  switch (type) {
    case "grass":
      color = "bg-green-400";
      break;
    case "fire":
      color = "bg-red-400";
      break;
    case "water":
      color = "bg-blue-400";
      break;
    case "bug":
      color = "bg-green-400";
      break;
    case "normal":
      color = "bg-gray-400";
      break;
    case "poison":
      color = "bg-purple-400";
      break;
    case "electric":
      color = "bg-yellow-400";
      break;
    case "ground":
      color = "bg-yellow-400";
      break;
    case "fairy":
      color = "bg-pink-400";
      break;
    case "fighting":
      color = "bg-red-400";
      break;
    case "psychic":
      color = "bg-purple-400";
      break;
    case "rock":
      color = "bg-gray-400";
      break;
    case "ghost":
      color = "bg-purple-400";
      break;
    case "ice":
      color = "bg-blue-400";
      break;
    case "dragon":
      color = "bg-red-400";
      break;
    case "dark":
      color = "bg-gray-400";
      break;
    case "steel":
      color = "bg-gray-400";
      break;
    case "flying":
      color = "bg-blue-400";
      break;
  }
  return color;
};
</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div
      class="relative z-30 border rounded-xl border-gray-800 bg-white shadow-xl flex flex-col gap-4 p-6"
    >
      <div class="text-2xl capitalize text-center">
        {{ props.pokemon.name }}
      </div>
      <div class="flex flex-row gap-4">
        <div class="w-1/2 flex justify-center">
          <img :src="props.pokemon.image" :alt="props.pokemon.name" />
        </div>
        <div class="w-1/2">
          <div class="flex flex-row">
            <div class="flex justify-center my-auto">Types:</div>
            <div
              :class="'   m-1 rounded-xl px-3  text-white ' + colorByType(type)"
              v-for="(type, index) in props.pokemon.types"
              :key="index"
            >
              <span>{{ type }}</span>
            </div>
          </div>
          <div class="my-3">
            <table class="grid grid-cols-2 border border-blue-400">
              <div
                class="border p-1 border-blue-400 no-wrap"
                v-for="(stat, index) in props.pokemon.stats"
                :key="index"
              >
                {{ stat.stat_name }}: {{ stat.base_stat }}
              </div>
            </table>
          </div>
          <div class="flex flex-row">
            <div>{{ locations }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="closePopup"
      class="absolute top-0 left-0 w-full h-full bg-black z-10 opacity-20"
    ></div>
  </div>
</template>
