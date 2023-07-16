<script setup lang="ts">
import { Pokemon, usePokemonStore } from "~/store/pokemon";
const store = usePokemonStore();

store.fetchPokemons();
let pokemons = store.pokemonList;

const isPopupOpen = ref(false);

const selectedPokemon = ref();

const showPopup = (pokemon: Pokemon) => {
  selectedPokemon.value = pokemon;
  isPopupOpen.value = true;
};

const closePopup = () => {
  console.log("closePopup");

  isPopupOpen.value = false;
};

const listEndRef = ref<Element>();
let observer = null;

onMounted(() => {
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          store.loadMorePokemons();
        }
      },
      { threshold: 1 }
    );
    observer.observe(listEndRef.value);
  }
});
</script>

<template>
  <div class="flex mx-auto justify-center">
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto items-center md:p-8"
    >
      <div v-for="(pokemon, index) in pokemons" :key="index">
        <div class="flex justify-center min-w-130">
          <Card :pokemon="pokemon" @click="showPopup(pokemon)" />
        </div>
      </div>
      <Popup
        :pokemon="selectedPokemon"
        v-if="isPopupOpen"
        @closePopup="closePopup"
      />
    </div>
  </div>
  <div class="border" ref="listEndRef"></div>
</template>
