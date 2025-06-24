<script setup lang="ts">
import PokemonGrid from "@/components/molecules/PokemonGrid.vue";
import PokemonModal from "@/components/organisms/PokemonModal.vue";
import { usePokemonStore } from "@/stores/pokemonStore";
import { usePokemon } from "@/composables/usePokemon";
import { computed } from "vue";

const store = usePokemonStore();
const { getPokemonDetails } = usePokemon();
const favoritePokemons = computed(() =>
  store.pokemonList.filter((pokemon) => store.isFavorite(pokemon.id))
);

const showDetails = (name: string) => {
  store.setSelectedPokemon(null);
  getPokemonDetails(name);
};
</script>

<template>
  <div class="favorites-view">
    <h1>Favorite Pokémon</h1>

    <template v-if="favoritePokemons.length === 0">
      <div class="empty-state">You haven't favorited any Pokémon yet.</div>
    </template>

    <template v-else>
      <PokemonGrid
        :pokemons="favoritePokemons"
        :is-favorite="store.isFavorite"
        @toggle-favorite="store.toggleFavorite"
        @show-details="showDetails"
      />
    </template>

    <PokemonModal />
  </div>
</template>

<style lang="scss" scoped>
.favorites-view {
  h1 {
    margin-top: 0;
    color: #333;
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
}
</style>
