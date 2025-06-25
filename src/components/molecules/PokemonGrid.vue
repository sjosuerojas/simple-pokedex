<script setup lang="ts">
import PokemonCard from "@/components/atoms/PokemonCard.vue";
import type { Pokemon } from "@/types/pokemon";

defineProps<{
  pokemons: Pokemon[];
  isFavorite: (id: number) => boolean;
}>();

const emit = defineEmits<{
  (e: "toggle-favorite", id: number): void;
  (e: "show-details", name: string): void;
}>();
</script>

<template>
  <div class="pokemon-grid">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :is-favorite="isFavorite(pokemon.id)"
      @toggle-favorite="emit('toggle-favorite', $event)"
      @show-details="emit('show-details', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1rem 0;
  justify-items: center;
}
</style>
