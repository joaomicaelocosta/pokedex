export interface Pokemon {
  name: string;
  types: string[];
  stats: {
    stat_name: string;
    base_stat: number;
  }[];
  image: string;
  locations: string[];
}

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemonList = ref<Pokemon[]>([]);
  const isLoading = ref<boolean>(false);
  const isSearching = ref<boolean>(false);
  const selectedTypes = ref<string[]>([]);
  const ammount = ref<number>(20);
  const searchQuery = ref<string>("");
  const types = ref<string[]>([
    "grass",
    "fire",
    "water",
    "bug",
    "normal",
    "poison",
    "electric",
    "ground",
    "fairy",
    "fighting",
    "psychic",
    "rock",
    "ghost",
    "ice",
    "dragon",
    "dark",
    "steel",
    "flying",
  ]);

  async function fetchPokemons(): Promise<Pokemon[]> {
    try {
      const response = await useFetch(
        `/api/list?limit=${ammount.value}&search=${
          searchQuery.value
        }&types=${selectedTypes.value.join("-")}`
      );
      pokemonList.value = response.data.value.data;

      isLoading.value = false;
      return pokemonList.value;
    } catch (error) {
      console.error("Error fetching pokemon data:", error);
      isLoading.value = false;
      return [];
    }
  }

  function searchPokemon(name: string) {
    searchQuery.value = name;
    isSearching.value = true;
    fetchPokemons();
  }

  function resetFilters() {
    selectedTypes.value = [];
    ammount.value = 20;
    searchQuery.value = "";
    isSearching.value = false;
    fetchPokemons();
  }

  function loadMorePokemons() {
    if (!isLoading.value) {
      isLoading.value = true;
      ammount.value += 20;
      fetchPokemons().then(() => {
        isLoading.value = false;
      });
    }
  }

  return {
    isLoading,
    pokemonList,
    isSearching,
    types,
    selectedTypes,
    fetchPokemons,
    loadMorePokemons,
    searchPokemon,
    resetFilters,
  };
});
