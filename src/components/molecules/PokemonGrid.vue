<script setup lang="ts">
import PokemonCard from "@/components/atoms/PokemonCard.vue";
import type { Pokemon } from "@/types/pokemon";

defineProps<{
  pokemons: Pokemon[];
  isFavorite: (id: number) => boolean;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle-favorite", id: number): void;
  (e: "show-details", name: string): void;
}>();
</script>

<template>
  <div class="pokeapp-grid">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :is-favorite="isFavorite(pokemon.id)"
      :is-loading="isLoading"
      @toggle-favorite="emit('toggle-favorite', $event)"
      @show-details="emit('show-details', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.pokeapp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
  padding: 1rem 0;
  justify-items: center;
}
</style>
