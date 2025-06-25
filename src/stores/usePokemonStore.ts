import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";
import type { Pokemon, PokemonDetails } from "@/types/pokemon";

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemonList = ref<Pokemon[]>([]);
  const favorites = useStorage<number[]>("favorites:pks", []);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const selectedPokemon = ref<PokemonDetails | null>(null);

  const setPokemonList = (list: Pokemon[]) => {
    pokemonList.value = list;
  };

  const setSelectedPokemon = (pokemon: PokemonDetails | null) => {
    selectedPokemon.value = pokemon;
  };

  const toggleFavorite = (pokemonId: number) => {
    const index = favorites.value.indexOf(pokemonId);
    if (index === -1) {
      favorites.value.push(pokemonId);
    } else {
      favorites.value.splice(index, 1);
    }
  };

  const isFavorite = computed(
    () => (id: number) => favorites.value.includes(id)
  );

  return {
    pokemonList,
    favorites,
    error,
    isLoading,
    isFavorite,
    selectedPokemon,
    setPokemonList,
    toggleFavorite,
    setSelectedPokemon,
  };
});
