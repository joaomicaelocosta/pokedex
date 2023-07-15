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
  const moreUrl = ref<string>("");

  async function fetchPokemons(): Promise<Pokemon[]> {
    try {
      const pokemons = await useFetch(
        moreUrl.value
          ? moreUrl.value
          : "https://pokeapi.co/api/v2/pokemon?limit=25"
      );
      console.log("pokemons first load", pokemons.data);
      isLoading.value = true;
      moreUrl.value = pokemons.data.value.next;
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
        pokemonList.value.push(newPoke);
      }
      isLoading.value = false;
      return pokemonList.value;
    } catch (error) {
      console.error("Error fetching pokemon data:", error);
      isLoading.value = false;
      return [];
    }
  }

  function filterList(filter: string) {
    pokemonList.value.filter((p: Pokemon) => p.name.includes(filter));
  }

  function loadMorePokemons() {
    console.log("load more pokemons");
    if (!isLoading.value) {
      isLoading.value = true;
      fetchPokemons().then(() => {
        isLoading.value = false;
      });
    }
  }

  return {
    isLoading,
    pokemonList,
    fetchPokemons,
    filterList,
    loadMorePokemons,
  };
});
