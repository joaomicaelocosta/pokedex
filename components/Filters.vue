<script setup lang="ts">
import { usePokemonStore } from "~/store/pokemon";

const store = usePokemonStore();

const showDropdown = ref(false);

let searchQuery = ref("");

const isValid = computed(() => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(searchQuery.value);
});

//Search pokemon by name
const search = () => {
  if (!isValid.value) return;
  store.searchPokemon(searchQuery.value);
};

//Reset filters
const reset = () => {
  searchQuery.value = "";
  store.resetFilters();
};

//Gets the color code of the type
const colorByType = (type: string) => {
  const { useColorByType } = useUtils();
  return useColorByType(type);
};

//Checks if the type is selected or not and adds or removes it from the list of selected types
const toggleTypeSelection = (type: string) => {
  const index = store.selectedTypes.indexOf(type);
  if (index > -1) {
    // type is already selected, remove it
    store.selectedTypes.splice(index, 1);
    if (store.selectedTypes.length < 1) {
      store.isSearching = false;
    }
  } else {
    // type is not selected, add it
    store.isSearching = true;
    store.selectedTypes.push(type);
  }
  store.fetchPokemons();
};

//Checks if the type is selected or not
const isSelected = (type: string) => {
  return store.selectedTypes.indexOf(type) > -1;
};
</script>
<template>
  <div class="flex justify-center mt-8 mx-2">
    <div class="relative">
      <div class="block sm:hidden">
        <span
          v-if="!isValid"
          class="text-red-400 text-xs absolute left-0 -top-5"
          >Only letters and spaces are allowed</span
        >
      </div>
      <input
        class="block my-auto border rounded-xl py-1 px-2 w-64 h-10"
        :class="{ 'border-gray-400': isValid, 'border-red-400': !isValid }"
        type="text"
        placeholder="Search"
        v-model="searchQuery"
        @keyup.enter="search"
      />
      <IconsSearch
        @click="search"
        class="w-5 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      />
      <div class="hidden sm:flex">
        <span
          v-if="!isValid"
          class="text-red-400 text-xs absolute left-0 -bottom-4"
          >Only letters and spaces are allowed</span
        >
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="hidden sm:flex justify-center mt-8">
      <div class="flex flex-row gap-2 w-1/2 flex-wrap">
        <div
          v-for="(type, index) in store.types"
          :key="index"
          :class="[
            'shadow-xl border m-1 rounded-full px-3 text-white text-center cursor-pointer ',
            colorByType(type),
            isSelected(type) ? 'opacity-100' : 'opacity-20',
          ]"
          @click="toggleTypeSelection(type)"
        >
          {{ type }}
        </div>
      </div>
    </div>
    <div class="relative block sm:hidden z-5">
      <button
        @click="showDropdown = !showDropdown"
        class="border border-gray-400 rounded-xl py-1 px-2 w-64 h-10 bg-white text-gray-400 text-left mt-2 z-20"
      >
        Select Types
      </button>
      <div
        class="absolute z-20 w-64 bg-white rounded-lg shadow-lg grid grid-cols-3 gap-1 p-1 translate-x-1/2 right-1/2"
        v-show="showDropdown"
      >
        <div
          v-for="(type, index) in store.types"
          :key="index"
          :class="
            'shadow-xl border m-1 rounded-full px-1 text-white text-center  ' +
            colorByType(type) +
            (store.selectedTypes.includes(type)
              ? ' opacity-100'
              : ' opacity-20')
          "
          @click="toggleTypeSelection(type)"
        >
          {{ type }}
        </div>
      </div>
      <IconsArrow
        @click="showDropdown = !showDropdown"
        class="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 mt-1 cursor-pointer"
      />
    </div>
  </div>
  <div v-if="store.isSearching" class="flex justify-center mt-2 md:mt-8">
    <span
      @click="reset"
      class="bg-red-400 text-white rounded-xl px-4 cursor-pointer"
      >reset</span
    >
  </div>
  <div
    v-if="showDropdown"
    @click="showDropdown = false"
    class="absolute top-0 left-0 w-full h-full z-10 opacity-20"
  ></div>
</template>
