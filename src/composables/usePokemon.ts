import { ref, onMounted } from "vue";
import { usePokemonStore } from "@/stores/usePokemonStore";
import { fetchPokemonList, fetchPokemonDetails } from "@/service/api";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const usePokemon = () => {
  const store = usePokemonStore();
  const isLoadingMore = ref(false);
  const isLoadingDetails = ref(false);

  const loadPokemon = async (limit = 10, offset = 0) => {
    try {
      store.isLoading = true;
      const pokemonList = await fetchPokemonList(limit, offset);
      store.setPokemonList([...store.pokemonList, ...pokemonList]);
    } catch (error) {
      store.error = "Failed to load Pokémon";
    } finally {
      store.isLoading = false;
    }
  };

  const loadMorePokemon = async () => {
    if (isLoadingMore.value) return;

    try {
      isLoadingMore.value = true;
      const offset = store.pokemonList.length;
      const pokemonList = await fetchPokemonList(20, offset);
      store.setPokemonList([...store.pokemonList, ...pokemonList]);
    } catch (error) {
      store.error = "Failed to load more Pokémon";
    } finally {
      isLoadingMore.value = false;
    }
  };

  const getPokemonDetails = async (name: string) => {
    try {
      isLoadingDetails.value = true;
      const details = await fetchPokemonDetails(name);
      store.setSelectedPokemon(details);
    } catch (error) {
      store.error = "Failed to load Pokémon details";
      store.setSelectedPokemon(null);
    } finally {
      isLoadingDetails.value = false;
    }
  };

  onMounted(() => {
    if (store.pokemonList.length === 0) {
      loadPokemon();
    }
  });

  return {
    loadMorePokemon,
    getPokemonDetails,
    isLoadingMore,
    isLoadingDetails,
  };
};
