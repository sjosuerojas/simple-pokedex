<script setup lang="ts">
import PokemonGrid from "@/components/molecules/PokemonGrid.vue";
import PokemonModal from "@/components/organisms/PokemonModal.vue";
import { usePokemonStore } from "@/stores/usePokemonStore";
import { usePokemon } from "@/composables/usePokemon";
import { onMounted, ref, onBeforeUnmount } from "vue";

const store = usePokemonStore();
const { loadMorePokemon, getPokemonDetails, isLoadingMore, isLoadingDetails } =
  usePokemon();
const loadingElement = ref<HTMLElement | null>(null);

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting && !isLoadingMore.value) {
    loadMorePokemon();
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  if (loadingElement.value) {
    observer.observe(loadingElement.value);
  }

  onBeforeUnmount(() => {
    if (loadingElement.value) {
      observer.unobserve(loadingElement.value);
    }
  });
});

const showDetails = (name: string) => {
  getPokemonDetails(name);
};
</script>

<template>
  <div class="home-view">
    <PokemonGrid
      :pokemons="store.pokemonList"
      :is-favorite="store.isFavorite"
      :is-loading="isLoadingDetails"
      @toggle-favorite="store.toggleFavorite"
      @show-details="showDetails"
    />

    <div ref="loadingElement" class="loading-more">
      <span v-if="isLoadingMore">Loading more Pokémon...</span>
      <span v-else-if="!isLoadingMore && store.pokemonList.length > 0"
        >Scroll to load more</span
      >
    </div>

    <PokemonModal />
  </div>
</template>
