# Pokedex App

This project was developed utilizing Nuxt 3, supplemented with TypeScript for type safety and enhanced developer productivity. For styling, we leveraged the capabilities of Tailwind CSS.

## Important Note

The API specified by the challenge did not support a single request for retrieving a list of Pokémon with their corresponding data, such as type, stats, and locations. In order to obtain this information, it was necessary to make individual requests for each Pokémon's details. This approach required multiple requests just to display a list, which was not optimal. Therefore, I decided to develop a simple API utilizing Nuxt's built-in server functions that could provide me with the required information in an efficient manner.

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
