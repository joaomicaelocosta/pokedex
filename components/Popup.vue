<script setup lang="ts">
import { Pokemon } from "~/store/pokemon";
const emit = defineEmits(["closePopup"]);
const { useDeSlugify, useColorByType } = useUtils();

const props = defineProps<{
  pokemon: Pokemon;
}>();

const locations = ref<string>(
  props.pokemon.locations.length === 0
    ? "Cannot be found, only evolved!"
    : "Can be found in " + props.pokemon.locations.slice(0, 3).join(", ")
);

const closePopup = () => {
  emit("closePopup");
};

const colorByType = (type: string) => {
  return useColorByType(type);
};
</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div
      class="p-4 md:p-8 z-30 border rounded-xl border-gray-800 bg-amber-50 shadow-xl flex flex-col gap-4"
    >
      <div class="text-2xl capitalize text-center">
        {{ props.pokemon.name }}
      </div>
      <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div
          class="flex justify-center bg-white rounded-xl border border-gray-800 shadow-xl"
        >
          <img class="" :src="props.pokemon.image" :alt="props.pokemon.name" />
        </div>
        <div class="max-w-xs">
          <div class="flex flex-row">
            <div class="flex justify-center my-auto">Types:</div>
            <div
              :class="
                'shadow-xl border  m-1 rounded-xl px-3  text-white  ' +
                colorByType(type)
              "
              v-for="(type, index) in props.pokemon.types"
              :key="index"
            >
              <span>{{ type }}</span>
            </div>
          </div>
          <div class="my-3">
            <table class="grid grid-cols-2 bg-blue-400 border border-white">
              <div
                class="border p-1 border-white no-wrap text-white capitalize"
                v-for="(stat, index) in props.pokemon.stats"
                :key="index"
              >
                {{ useDeSlugify(stat.stat_name) }}: {{ stat.base_stat }}
              </div>
            </table>
          </div>
          <div class="flex flex-row">
            <div>{{ useDeSlugify(locations) }}</div>
            <div v-if="locations.length === 0">
              Can't be found, only evolved
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="closePopup"
      class="absolute top-0 left-0 w-full h-full bg-black z-20 opacity-20"
    ></div>
  </div>
</template>
