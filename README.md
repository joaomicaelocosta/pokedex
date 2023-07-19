# Pokedex App

This project was developed utilizing Nuxt 3, supplemented with TypeScript for type safety and enhanced developer productivity. For styling, I leveraged the capabilities of Tailwind CSS. Deployed in Vercel: https://pokedex-ten-beta-95.vercel.app

## Important Note

The API specified by the challenge did not support a single request for retrieving a list of Pokémon with their corresponding data, such as type, stats, and locations. In order to obtain this information, it was necessary to make individual requests for each Pokémon's details. This approach required multiple requests just to display a list, which was not optimal. Therefore, I decided to develop a simple API utilizing Nuxt's built-in server functions that could provide me with the required information in an efficient manner, all the data used in my API was fetched from PokeAPI.

## Features

1. List of Pokemons
2. Filter pokemon by type
3. Search pokemon by name
4. Detailed pokemon data
5. Dedicated API
6. Responsive UI

## Setup

To run this code locally follow this instructions:

```bash
# npm
npm install

# run
npm run dev
```

The development server should be on `http://localhost:3000`

## Code using the provided API

This code is designed to work with the API specified for this challenge. Initially, it fetches a list of 30 Pokémon. For each Pokémon in the list, it retrieves detailed information along with its respective location. After processing these Pokémon, the URL for the next page in the Pokémon database is stored in the moreUrl variable. This URL is subsequently used to fetch the next set of 30 Pokémon.

```
  let moreUrl = ref<string>('');

  async function getData() {
    let data: Pokemon[] = [];
    const pokemons = await useFetch(
      moreUrl.value
          ? moreUrl.value
          : "https://pokeapi.co/api/v2/pokemon?limit=30"
    );

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

      // Transform the response to align with our existing data structure
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
  }
```
