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
        `/api/list?limit=${
          ammount.value
        }&search=${searchQuery.value.toLowerCase()}&types=${selectedTypes.value.join(
          "-"
        )}`
      );
      if (response.data && response.data.value) {
        pokemonList.value = response.data.value.data;
      } else {
        throw new Error("Invalid data structure received.");
      }
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

  //Function used to get all the pokemon data to save on my own API
  /* async function getData() {
    let data: Pokemon[] = [];
    const pokemons = await useFetch(
      "https://pokeapi.co/api/v2/pokemon?limit=30"
    );
    for (let pokemon of pokemons.data.value.results as any) {
      const name = pokemon.name;
      // Get detailed information
      const detailsResponse = await useFetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const details: any = detailsResponse.data.value;
      // Get location information
      const locationResponse = await useFetch(
        `https://pokeapi.co/api/v2/pokemon/${name}/encounters`
      );
      const locations: any = locationResponse.data.value;

      let newPoke: Pokemon = {
        name: details.name,
        types: details.types.map((t: any) => t.type.name),
        stats: details.stats.map((s: any) => ({
          stat_name: s.stat.name,
          base_stat: s.base_stat,
        })),
        image: details.sprites.front_default,
        locations: locations.map((l: any) => l.location_area.name),
      };
      // Push the information into the pokemons array
      data.push(newPoke);
      console.log("Pokemon data:", data);
    }
  } */

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
