<script setup lang="ts">
import { Pokemon, usePokemonStore } from "~/store/pokemon";
const store = usePokemonStore();

//Initial fetch of pokemons
store.fetchPokemons();

//Computed property to get the list of pokemons from the store
const pokemons = computed(() => store.pokemonList);

const isPopupOpen = ref(false);

//Selected pokemon to show in the popup
const selectedPokemon = ref();

//Show popup
const showPopup = (pokemon: Pokemon) => {
  selectedPokemon.value = pokemon;
  isPopupOpen.value = true;
};

//Close popup
const closePopup = () => {
  isPopupOpen.value = false;
};

//Reference to the end of the list
const listEndRef = ref<Element>();
let observer = null;

//Intersection Observer for infinite scrolling
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
  <Filters />
  <div class="flex mx-auto justify-center">
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto items-center md:p-8 py-8"
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
