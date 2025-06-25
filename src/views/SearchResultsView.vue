<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "@/stores/usePokemonStore";
import PokemonGrid from "@/components/molecules/PokemonGrid.vue";
import PokemonModal from "@/components/organisms/PokemonModal.vue";
import { usePokemon } from "@/composables/usePokemon";

const route = useRoute();
const store = usePokemonStore();
const { getPokemonDetails, isLoadingDetails } = usePokemon();

const query = computed(() => ((route.query.q as string) || "").toLowerCase());

const filteredPokemons = computed(() =>
  store.pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.value)
  )
);

const showDetails = (name: string) => {
  getPokemonDetails(name);
};
</script>

<template>
  <div class="pokeapp-results">
    <h2>Resultados para "{{ query }}"</h2>
    <template v-if="filteredPokemons.length === 0">
      <h3 class="title">Uh-oh!</h3>
      <p class="description">You look lost on your journey!</p>
      <button class="main-button">Go back home</button>
    </template>
    <template v-else>
      <PokemonGrid
        :pokemons="filteredPokemons"
        :is-favorite="store.isFavorite"
        :is-loading="isLoadingDetails"
        @toggle-favorite="store.toggleFavorite"
        @show-details="showDetails"
      />
    </template>
    <PokemonModal />
  </div>
</template>

<style lang="scss">
.pokeapp-results {
  .title {
    font-size: 1.65rem;
    font-weight: 700;
    margin-bottom: 1.88rem;
  }

  .description {
    font-size: 1.15rem;
    font-weight: 500;
    color: #5e5e5e;
    margin-bottom: 3.5rem;
    max-width: 570px;
  }

  .main-button {
    padding: 0.75rem 1rem;
    font-size: 1.2rem;
    border-radius: 30px;
    background-color: #f22539;
    color: white;
    border: none;
    cursor: pointer;
  }
}
</style>
