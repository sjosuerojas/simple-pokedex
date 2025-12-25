import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_URL_API || "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit = 10, offset = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: { limit, offset },
    });

    return response.data.results.map((pokemon: any, index: number) => ({
      id: offset + index + 1,
      name: pokemon.name,
      url: pokemon.url,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        offset + index + 1
      }.png`,
    }));
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};

export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
    return {
      id: response.data.id,
      name: response.data.name,
      url: `${API_BASE_URL}/pokemon/${name}`,
      image: response.data.sprites.front_default,
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities,
      types: response.data.types,
      stats: response.data.stats,
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};
