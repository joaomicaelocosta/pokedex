<script setup lang="ts">
import { Pokemon, usePokemonStore } from "~/store/pokemon";
const store = usePokemonStore();

store.fetchPokemons();
const pokemons = computed(() => store.pokemonList);

const isPopupOpen = ref(false);

const selectedPokemon = ref();

let searchQuery = ref("");

const showPopup = (pokemon: Pokemon) => {
  selectedPokemon.value = pokemon;
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};

const search = () => {
  store.searchPokemon(searchQuery.value);
};

const reset = () => {
  searchQuery.value = "";
  store.isSearching = false;
  store.fetchPokemons();
};

const listEndRef = ref<Element>();
let observer = null;

onMounted(() => {
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!store.isSearching) {
            store.loadMorePokemons();
          }
        }
      },
      { threshold: 1 }
    );
    observer.observe(listEndRef.value);
  }
});
</script>

<template>
  <div class="flex justify-center pt-8">
    <img
      src="https://fontmeme.com/permalink/230717/2309363c88c773bbdaaeff78daad883f.png"
      alt="poke"
    />
  </div>
  <div class="flex justify-center mt-8 mx-2">
    <input
      class="flex my-auto border border-gray-400 rounded-xl py-1 px-2 w-64 h-10"
      type="text"
      placeholder="Search"
      v-model="searchQuery"
      @keyup.enter="search"
    />
    <IconsSearch @click="search" class="w-8 flex my-auto ml-2 cursor-pointer" />
  </div>
  <div v-if="store.isSearching" class="flex justify-center">
    <span
      @click="reset"
      class="bg-red-400 text-white rounded-xl px-4 mt-2 cursor-pointer"
      >reset</span
    >
  </div>
  <div class="flex mx-auto justify-center">
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto items-center md:p-8 py-8 px-2"
    >
      <div v-for="(pokemon, index) in pokemons" :key="index">
        <div class="flex justify-center md:min-w-130 min-w-240">
          <Card class="w-full" :pokemon="pokemon" @click="showPopup(pokemon)" />
        </div>
      </div>

      <Popup
        :pokemon="selectedPokemon"
        v-if="isPopupOpen"
        @closePopup="closePopup"
      />
    </div>
  </div>
  <div class="text-center text-xl" v-if="pokemons.length < 1">
    No pokemons to show!
  </div>

  <div ref="listEndRef"></div>
</template>
