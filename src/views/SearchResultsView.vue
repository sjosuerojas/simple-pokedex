<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { usePokemon } from "@/composables/usePokemon";
import { usePokemonStore } from "@/stores/usePokemonStore";
import PokemonGrid from "@/components/molecules/PokemonGrid.vue";
import PokemonModal from "@/components/organisms/PokemonModal.vue";

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
    <template v-if="filteredPokemons.length === 0">
      <div class="no-results">
        <h3 class="title">Uh-oh!</h3>
        <p class="description">You look lost on your journey!</p>
      </div>
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

    <RouterLink class="main-button" to="/">Go back home</RouterLink>
    <PokemonModal />
  </div>
</template>

<style lang="scss">
.pokeapp-results {
  text-align: center;

  .no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .title {
      font-size: 2.3rem;
      font-weight: 700;
      margin-bottom: 0.625rem;
    }

    .description {
      font-size: 1.25rem;
      font-weight: 500;
      color: #5e5e5e;
      margin-bottom: 1.563rem;
      max-width: 570px;
    }
  }

  .main-button {
    padding: 0.688rem 1.25rem;
    font-size: 1.125rem;
    font-weight: 700;
    border-radius: 30px;
    background-color: #f22539;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 1.563rem;
  }
}
</style>
