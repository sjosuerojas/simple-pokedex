<script setup lang="ts">
import PokemonGrid from "@/components/molecules/PokemonGrid.vue";
import PokemonModal from "@/components/organisms/PokemonModal.vue";
import { usePokemonStore } from "@/stores/usePokemonStore";
import { usePokemon } from "@/composables/usePokemon";
import { computed } from "vue";

const store = usePokemonStore();
const { getPokemonDetails, isLoadingDetails } = usePokemon();
const favoritePokemons = computed(() =>
  store.pokemonList.filter((pokemon) => store.isFavorite(pokemon.id))
);

const showDetails = (name: string) => {
  store.setSelectedPokemon(null);
  getPokemonDetails(name);
};
</script>

<template>
  <div class="pokeapp-favorites">
    <template v-if="favoritePokemons.length === 0">
      <div class="empty-state">You haven't favorited any Pokémon yet.</div>
    </template>

    <template v-else>
      <PokemonGrid
        :pokemons="favoritePokemons"
        :is-favorite="store.isFavorite"
        :is-loading="isLoadingDetails"
        @toggle-favorite="store.toggleFavorite"
        @show-details="showDetails"
      />
    </template>
    <PokemonModal />
  </div>
</template>

<style lang="scss" scoped>
.pokeapp-favorites {
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
